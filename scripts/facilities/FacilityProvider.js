let facilities = []
export const useFacilities = () => {
    return facilities.slice()
}
export const getFacilities = () => {
   return fetch("https://criminals.glassdale.us/facilities")
    .then(response => {
        return response.json()
    })
    .then(apiData => {
        console.log(apiData)
        return facilities = apiData
        // return "Hello, I'm the ultimate return value from getFacilities"
    })
}
// getFacilities does not return a value so .then is used to chain the useFacilities call
// if you need the value from the prior promise, you need to return the value
// we tested this by adding a taco argument to the GF() call below and console.logging it out



// getFacilities().then( () => {
//     const facilitiesArray = useFacilities()
// })


// console.log(facilitiesArray)
// console.log("this is taco: ", taco)