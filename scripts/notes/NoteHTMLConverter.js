// convert object to HTML string
// return that HTML String

export const NoteAsHTML = (noteObject) => {
    return `
    <div class="note">
        <h5>Author: ${noteObject.author}</h5>
        <p>Suspect: ${noteObject.suspect}</p>
        <p>Date of Interview: ${noteObject.dateOfInterview}</p>
        <p>Time Note Entered: ${new Date(noteObject.timestamp).toLocaleDateString('en-US')}</p>
        <p>Note: ${noteObject.note}</p>
    </div>
    `
    }