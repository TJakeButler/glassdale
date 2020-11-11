let criminalFacilities = []

export const useCriminalFacilities = () => {
    return criminalFacilities.slice()
}

export const getCriminalFacilities = () => {
    return fetch("https://criminals.glassdale.us/criminalFacilities")
        .then(response => response.json())
        .then(apiData => {
            criminalFacilities = apiData
        })
}


getCriminalFacilities()
.then(() => {
    const outPut = useCriminalFacilities()
    console.log(outPut)
})