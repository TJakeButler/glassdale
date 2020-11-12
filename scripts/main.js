
import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { NoteForm } from "./notes/NoteForm.js";
import { OfficerList } from "./officers/OfficerList.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { NoteList} from "./notes/NoteList.js"
import { createAlibiEventListener } from "./criminals/AlibiList.js"
import { WitnessesButton } from "./witnesses/WitnessStmntButton.js";
import "./witnesses/WitnessStmntList.js"
import "./facilities/FacilityProvider.js"
import "./facilities/CriminalFacilityProvider.js"
import {FacilityButton } from "./facilities/DisplayFacilitiesButton.js"
import "./facilities/FacilityList.js"

OfficerList()
ConvictionSelect()
CriminalList()
OfficerSelect()
NoteForm()

NoteList()

createAlibiEventListener()

WitnessesButton()
FacilityButton()