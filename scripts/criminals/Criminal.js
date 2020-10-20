export const Criminal = (criminalObj) => {
    return `<section> 
            <h3>Name: ${criminalObj.name}</h3>
            <p>Crime: ${criminalObj.conviction}</p>
            <p> Start Date:${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
            <p>End Date: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
            </section>
    `
}

