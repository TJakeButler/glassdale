export const WitnessStatement = (witness) => {
    return `
    <div class="witness">
        <h5>Name: ${witness.name}</h5>
        <p>Statement: ${witness.statements}</p>
    </div>
    `
}