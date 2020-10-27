let witnesses = []

export const useWitnessStatements = () => {
    return witnesses.slice()
}

export const getWitnessStatements = () => {
    return fetch("https://criminals.glassdale.us/witnesses")
    .then(response => response.json())
    .then(parsedWitnessStatements => {
        witnesses = parsedWitnessStatements
    }
    )
}