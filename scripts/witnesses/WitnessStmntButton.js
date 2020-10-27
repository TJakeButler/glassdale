const contentTarget = document.querySelector(".buttons__witnesses")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click" , (clickEvent) => {
    
    if(clickEvent.target.id === "display-witnesses-button"){
        console.log("Witness Button was Clicked!!!!")
        const witnessButtonClicked = new CustomEvent("witnessesClicked")

     eventHub.dispatchEvent(witnessButtonClicked)   
    }
})


export const WitnessesButton = () => {
    
        contentTarget.innerHTML = `
        <button id="display-witnesses-button">Witness Statement</button>
        `
    
}


