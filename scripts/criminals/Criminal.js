const eventHub = document.querySelector(".container")

export const Criminal = (criminalObj) => {
  return `
      <div id="criminal-${criminalObj.id}" class="criminal">
        <h5>${criminalObj.name}</h5>
        <p>Age: ${criminalObj.age}</p>
        <p>Crime: ${criminalObj.conviction}</p>
        <p>Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
        <p>Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
        <button id="associates--${criminalObj.id}">Associate Alibis</button>
      </div>
  `
}


eventHub.addEventListener("click", (eventObj) => {
  // split the id of the alibi button!
  const [nameOfId, criminalId] = eventObj.target.id.split("--")
  
  // check to see if the button that was clicked IS in fact the alibi button
  if(eventObj.target.id.startsWith("associates--")){
    console.log("buttoin was clicked:", nameOfId, criminalId)
    // build a custom event
    const myCustomEvent = new CustomEvent("alibiButtonClicked", {
      detail: {
        criminalId: criminalId
      }
    })

    // dispatch the event to the eventHub so that other modules can listen for this event
    eventHub.dispatchEvent(myCustomEvent)
  }
})