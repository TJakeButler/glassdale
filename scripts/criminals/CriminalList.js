import { Criminal } from "./Criminal.js";
import { getCriminals, useCriminals } from "./CriminalProvider.js";


export const CriminalList = () => {
    let criminalString = ""
    const criminalContentContainer = document.querySelector(".criminalsContainer")

    const criminals = getCriminals()
    .then(() => {
        const criminalArray = useCriminals()
        
        for (const criminal of criminalArray) {
           criminalString += Criminal(criminal)
        }
        
    criminalContentContainer.innerHTML = criminalString;
        
    })
    



}

