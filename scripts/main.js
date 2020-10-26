
import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { NoteForm } from "./notes/NoteForm.js";
import { OfficerList } from "./officers/OfficerList.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { NoteList} from "./notes/NoteList.js"
import { createAlibiEventListener } from "./criminals/AlibiList.js"


OfficerList()
ConvictionSelect()
CriminalList()
OfficerSelect()
NoteForm()

NoteList()

createAlibiEventListener()