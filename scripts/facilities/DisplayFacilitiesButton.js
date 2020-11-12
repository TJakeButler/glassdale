
const contentTarget = document.querySelector(".facility__button")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click" , (clickEvent) => {
    
    if(clickEvent.target.id === "display-Facility-button"){
        console.log("Facility Button was Click!!!!")
        const facilityButtonClicked = new CustomEvent("facilityClicked")

     eventHub.dispatchEvent(facilityButtonClicked)   
    }
})



export const FacilityButton = () => {
    
    contentTarget.innerHTML = `
    <button id="display-Facility-button">Facility Button</button>
    `

}