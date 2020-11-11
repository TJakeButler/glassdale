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
    render(criminals,facilities, crimFac)
  })
  
}



const render = (criminalsToRender, allFacilities, allRelationships) => {
  
  let criminalsHTMLRepresentations = ""
 // Step 1 - Iterate all criminals
 contentTarget.innerHTML = criminalsToRender.map(
  (criminalObject) => {
      // Step 2 - Filter all relationships to get only ones for this criminal
      const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

      // Step 3 - Convert the relationships to facilities with map()
      const facilities = facilityRelationshipsForThisCriminal.map(cf => {
          const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
          return matchingFacilityObject
      })

      // Must pass the matching facilities to the Criminal component
      
      return Criminal(criminalObject, facilities)
  }
).join("")


}

// for (const criminal of criminalsArray) {

//   criminalsHTMLRepresentations += Criminal(criminal)

//   criminalsContainer.innerHTML = `
//         <h3>Glassdale Criminals</h3>
//         <section class="criminalsList">
//           ${criminalsHTMLRepresentations}
//         </section>
//       `



// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeSelected", event => {
  // debugger
  // console.log("crimeSelected event happened", event.detail.crimeThatWasChosen)

  // Use the property you added to the event detail.
  if (event.detail.crimeThatWasChosen !== 0) {

    //Get the list of criminals
    const criminalsArray = useCriminals()
    // console.log("array of criminals", criminalsArray)

    /* 
      We have the the id of the conviction that the user selected from the drop down. But each criminal object has the name of the crime they were convicted for. So we need to get the name of the conviction associated with the unique identifier. 
    */

    // Get the array of convictions
    const convictionsArray = useConvictions()
    // console.log("array of convictions", convictionsArray)

    // Use the find method to get the first object in the convictions array that has the same id as the id of the chosen crime
    const convictionThatWasChosen = convictionsArray.find(convictionObj => {
      // debugger
      return convictionObj.id === event.detail.crimeThatWasChosen
    })
    // console.log("convictionThatWasChosen", convictionThatWasChosen)

    /*
      Now that we have the name of the chosen crime, filter the criminals application state down to the people that committed the crime
    */
    const filteredCriminalsArray = criminalsArray.filter(criminalObj => {
      return criminalObj.conviction === convictionThatWasChosen.name
    })
    // console.log("filteredCriminalsArray", filteredCriminalsArray)

    /*
      Then invoke render() and pass the filtered collection as
      an argument
    */
    render(filteredCriminalsArray,facilities, crimFac)
  }
})

eventHub.addEventListener("officerSelected", officerSelectedEventObj => {
  const selectedOfficerName = officerSelectedEventObj.detail.officerName
  console.log("CriminalList: officerSelected custom event has been heard on the event hub, selected officer name: ", selectedOfficerName)

  const criminalsArray = useCriminals()
  console.log("criminalsArray", criminalsArray)

  const filteredArrayCriminals = criminalsArray.filter(
    (criminalObj) => {
      // return criminalObj.arrestingOfficer === selectedOfficerName

      // OR

      // if (criminalObj.arrestingOfficer === selectedOfficerName) {
      //   return true
      // } else {
      //   return false
      // }

      // OR

      if (criminalObj.arrestingOfficer === selectedOfficerName) {
        return true
      }
      return false
    }
  )
  console.log("CriminalList: Array of criminals filtered for only the criminals that were arrested by selected officer", filteredArrayCriminals)

  render(filteredArrayCriminals,facilities, crimFac)
  console.log("CriminalList: Filtered list of criminals rendered to DOM")
})

