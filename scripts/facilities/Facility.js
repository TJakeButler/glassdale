

export const Facility = (facilityObj, matchingCriminals) => {
    return `
    <div class="facility">
        <h5>Name: ${facilityObj.facilityName}</h5>
        <p>Security Level: ${facilityObj.securityLevel}</p>
        <p>Capacity: ${facilityObj.capacity}</p>
        <ul>${matchingCriminals.map(c => `<li>${c.name}</li>`).join("")}</ul>
    </div>
    `
}

