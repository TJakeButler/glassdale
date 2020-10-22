export const Criminal = (criminalObj) => {
    return `
        <div class="criminal">
          <h5>${criminalObj.name}</h5>
          <p>Age: ${criminalObj.age}</p>
          <p>Crime: ${criminalObj.conviction}</p>
          <p>Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
          <p>Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
        </div>
    `
  }