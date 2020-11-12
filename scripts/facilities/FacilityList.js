import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js"
import { Facility } from  "./Facility.js"
import { getFacilities,useFacilities } from "./FacilityProvider.js"






const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".caseDataContainer")

eventHub.addEventListener("facilityClicked", () => {
    console.log("EVENT LISTENER HEARD FacilityClicked!!! ")
    FacilityList();

})
let facilities = []
let criminals = []
let crimFac = []


const FacilityList = () => {

    getFacilities()
    .then(getCriminals)
    .then(getCriminalFacilities)
    .then(() => {
        facilities = useFacilities()
        criminals  = useCriminals()
        crimFac  =  useCriminalFacilities()

        console.log("All Facilities!:", facilities)
        console.log("All Criminals!:",criminals)
        console.log("All the relationships:",crimFac)
        render()
    })
}

const render = () => {
  
    // let criminalsHTMLRepresentations = ""
   // Step 1 - Iterate all facilities
   contentTarget.innerHTML = facilities.map(
    (facilityObject) => {
        // Step 2 - Filter all relationships to get only ones for this facility
        const criminalRelationshipsForThisFacility = crimFac.filter(cc => cc.criminalId === facilityObject.id)
  
        // Step 3 - Convert the relationships to criminals with map()
        const matchingCriminals = criminalRelationshipsForThisFacility.map(cc => {
            const matchingCriminalObject = criminals.find(criminal => criminal.id === cc.criminalId)
            return matchingCriminalObject
        })
        
        return Facility(facilityObject, matchingCriminals)
    }
  ).join("")
  
  
  }


// const render = (facilities) => {
//     let facilityStatementsHTMLRepresentations = ""
//     for (const facility of facilities){

//      facilityStatementsHTMLRepresentations += Facility(facilityObj)

//      facilityContainer.innerHTML = `
//      <h3> Glassdale Facilities</h3>
//      <section class="facilityList">
//      ${facilityStatementsHTMLRepresentations}
//      </section>
//      `
// }
// }