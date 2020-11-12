import { getCriminals, useCriminals } from "./CriminalProvider.js"
import { Criminal } from "./Criminal.js"
import { useConvictions } from "../convictions/ConvictionProvider.js"
import { getFacilities, useFacilities } from "../facilities/FacilityProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "../facilities/CriminalFacilityProvider.js"

/*
    Which element in your HTML contains all components?
    That's your Event Hub. Get a reference to it here.
*/
const eventHub = document.querySelector(".container")
// console.log(eventHub)

const contentTarget = document.querySelector(".caseDataContainer")
let facilities = []
let crimFac = []
let criminals = []


export const CriminalList = () => {
  
  getCriminals()
  .then(getFacilities)
  .then(getCriminalFacilities)
  .then(() => {
    
     facilities = useFacilities()
     crimFac = useCriminalFacilities()
     criminals = useCriminals()
    render()
  })
  
}

const render = () => {
  
  // let criminalsHTMLRepresentations = ""
 // Step 1 - Iterate all criminals
 contentTarget.innerHTML = criminals.map(
  (criminalObject) => {
      // Step 2 - Filter all relationships to get only ones for this criminal
      const facilityRelationshipsForThisCriminal = crimFac.filter(cf => cf.criminalId === criminalObject.id)

      // Step 3 - Convert the relationships to facilities with map()
      const matchingFacilities = facilityRelationshipsForThisCriminal.map(cf => {
          const matchingFacilityObject = facilities.find(facility => facility.id === cf.facilityId)
          return matchingFacilityObject
      })
      
      return Criminal(criminalObject, matchingFacilities)
  }
).join("")


}

eventHub.addEventListener("crimeSelected", event => {
 
  if (event.detail.crimeThatWasChosen !== 0) {

    const criminalsArray = useCriminals()
 
    // Get the array of convictions
    const convictionsArray = useConvictions()
    
    const convictionThatWasChosen = convictionsArray.find(convictionObj => {
      // debugger
      return convictionObj.id === event.detail.crimeThatWasChosen
    })
    
    const filteredCriminalsArray = criminalsArray.filter(criminalObj => {
      return criminalObj.conviction === convictionThatWasChosen.name
    })
    criminals = filteredCriminalsArray
    render(filteredCriminalsArray)
  }
})

eventHub.addEventListener("officerSelected", officerSelectedEventObj => {
  const selectedOfficerName = officerSelectedEventObj.detail.officerName
  console.log("CriminalList: officerSelected custom event has been heard on the event hub, selected officer name: ", selectedOfficerName)

  const criminalsArray = useCriminals()
  console.log("criminalsArray", criminalsArray)

  const filteredArrayCriminals = criminalsArray.filter(
    (criminalObj) => {
      
      if (criminalObj.arrestingOfficer === selectedOfficerName) {
        return true
      }
      return false
    }
  )
  console.log("CriminalList: Array of criminals filtered for only the criminals that were arrested by selected officer", filteredArrayCriminals)

  criminals = filteredArrayCriminals
  render(filteredArrayCriminals)
  console.log("CriminalList: Filtered list of criminals rendered to DOM")
})

