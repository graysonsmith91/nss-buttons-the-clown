import { getRequests, deleteRequest, getClowns, saveCompletion } from "./dataAccess.js"


const convertRequestToListElement = (requestObj) => {
    const clowns = getClowns()
    
    let html = `<li>
    ${requestObj.description} on ${requestObj.date}
    <button class="request__delete"
        id="request--${requestObj.id}">
        Deny
        </button>
    </li>`
    html += `<select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${
        clowns.map(
            clown => {
                return `<option value="${requestObj.id}--${clown.id}">${clown.name}</option>`
            }
        ).join("")
    }
</select>`

    return html
}

// Used sort method to sort dates from request array. Slice made a copy to not affect
// original array
export const Requests = () => {
    const requests = getRequests()
    // console.log(requests)
    const sortedRequests = requests.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
    // console.log(sortedRequests)
    let html = `<ul>
            ${
                sortedRequests.map((request) => convertRequestToListElement(request)).join("")
            }
        </ul>`

    return html
}

// Listens for click on deny button to delete request
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId, clownId] = event.target.value.split("--")

            const completion = { requestId: requestId, clownId: clownId, date_created: Date.now() }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)