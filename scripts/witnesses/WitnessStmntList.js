import "./WitnessStmntButton.js"
import { WitnessesButton } from "./WitnessStmntButton.js"
import { getWitnessStatements, useWitnessStatements } from "./WitnessStmntProvider.js"
import { WitnessStatement } from "./WitnessStmnt.js"

const eventHub = document.querySelector(".container")
const witnessesContainer = document.querySelector(".caseDataContainer")

eventHub.addEventListener("witnessesClicked", () => {
    console.log("EVENT LISTENER HEARD WITNESSESCLICKED ")
    WitnessesList();

})

const WitnessesList = () => {

    getWitnessStatements()
    .then(() => {
        const witnessesArray = useWitnessStatements()
        console.log(witnessesArray)
        render(witnessesArray)
    })
}

const render = (witnessStatementsArray) => {
    let witnessStatementsHTMLRepresentations = ""
    for (const witness of witnessStatementsArray){

     witnessStatementsHTMLRepresentations += WitnessStatement(witness)

     witnessesContainer.innerHTML = `
     <h3> Glassdale Witnesses</h3>
     <section class="witnessesList">
     ${witnessStatementsHTMLRepresentations}
     </section>
     `
}
}