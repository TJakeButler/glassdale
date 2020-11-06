import { saveNote } from "./NotesDataProvider.js"
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"

// create note form HTML with inputs and render form to DOM
// add a click event for when user clicks the submit button
// submit should grab values from form inputs, build new note object, and POST that note to the API

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")



export const NoteForm = () => {
    
    getCriminals()
    .then(() => {
        const NotesArray = useCriminals()
        console.log("Notes Array Being Invoked!!!!!!!!!!!", NotesArray)
        render(NotesArray)
    })
    
}

const render = (NotesArray) => {
    contentTarget.innerHTML = `
        <input id="note--dateOfInterview" type="date"/>
        <input id="note--author" type="text" placeholder="Your Name Here"/>
        
        <select id="noteForm--criminal" class="criminalSelect">
        <option value="0">Please select suspect</option>
        ${
            NotesArray.map(criminalObj => {
                return `<option value="${criminalObj.id}">${criminalObj.name}</option>`
            }
        ).join("")
        }
        </select>

        <textarea id="note--note" placeholder="Your Note Here"></textarea>
        <button id="saveNote">Save Note</button>


    `
}

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "saveNote") {
        // grab input values
        const dateOfInterview = document.querySelector("#note--dateOfInterview").value
        const author = document.querySelector("#note--author").value
        const criminalId = parseInt(document.querySelector("#noteForm--criminal").value)
        const note = document.querySelector("#note--note").value
        const timestamp = Date.now()

        // make a note object
        // const noteToSave = {
        //     text: noteText,
        //     criminalId: selectedCriminalId
        // }


        const newNote = {
            dateOfInterview,
            timestamp,
            author,
            criminalId,
            note,
        }

        // POST object to database / API / json file
        saveNote(newNote)
    }
})


