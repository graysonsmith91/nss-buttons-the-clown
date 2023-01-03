import { sendRequest } from "./dataAccess.js"

export const BookingForm = () => {
    let html = `
    <div class="field">
    <label class="label" for="bookingDescription">Party Description</label>
    <input type="text" name="bookingDescription" class="input" />
</div>
<div class="field">
    <label class="label" for="bookingAddress">Address</label>
    <input type="text" name="bookingAddress" class="input" />
</div>
<div class="field">
    <label class="label" for="bookingBudget">Budget</label>
    <input type="number" name="bookingBudget" class="input" />
</div>
<div class="field">
    <label class="label" for="bookingAttendees">Number of Attendees</label>
    <input type="number" name="bookingAttendees" class="input" />
</div>
<div class="field">
    <label class="label" for="bookingLength">Party Length</label>
    <input type="number" name="bookingLength" class="input" />
</div>
<div class="field">
    <label class="label" for="bookingDate">Party Date</label>
    <input type="date" name="bookingDate" class="input" />
</div>

<button class="button" id="submitRequest">Submit Request</button>
    `
    return html
}


const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userDescription = document.querySelector("input[name='bookingDescription']").value
        const userAddress = document.querySelector("input[name='bookingAddress']").value
        const userBudget = document.querySelector("input[name='bookingBudget']").value
        const userAttendees = document.querySelector("input[name='bookingAttendees']").value
        const userLength = document.querySelector("input[name='bookingLength']").value
        const userDate = document.querySelector("input[name='bookingDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: userBudget,
            numKids: userAttendees,
            partyLength: userLength,
            date: userDate
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})