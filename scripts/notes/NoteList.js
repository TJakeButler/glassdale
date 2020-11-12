import { NoteAsHTML } from './NoteHTMLConverter.js';
import {getNotes, useNotes, deleteNote} from './NotesDataProvider.js'

import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"

// get the notes from the api >> use the notes array
// iterate the notes array >> make an html representation each
// render html string of notes to the notesContainer element on the DOM


const notesContainer = document.querySelector(".notesContainer");
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", () => NoteList())


export const NoteList = () => {
  getNotes()
      .then(getCriminals)
      .then(() => {
          const notes = useNotes()
          const criminals = useCriminals()
          render(notes, criminals)
      })
}

const render = (noteCollection, criminalCollection) => {
  notesContainer.innerHTML = noteCollection.map(note => {
      // Find the related criminal
      const relatedCriminal = criminalCollection.find(criminal => 
        
        criminal.id === note.criminalId)
        
      return `
          <section class="note">
              <h2>Note about:  ${relatedCriminal.name}</h2>
              ${note.note}
          </section>
          <button id="deleteNote--${note.id}">Delete</button>
      `
  }).join("")
}




eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")

        /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
       deleteNote(id).then(
           () => {
               const updatedNotes = useNotes()
               const criminals = useCriminals()
               render(updatedNotes, criminals)
           }
       )
    }
})