import { BookingForm } from "./bookingForm.js"
import { Requests } from "./requests.js"

export const ButtonsTheClown = () => {
    return `
        <h1>Buttons The Clown</h1>
        <section class="bookingForm">
            ${BookingForm()}
        </section>

        <section class="bookingRequests">
            <h2>Booking Requests</h2>
            ${Requests()}
        </section>
    `
}

// Put in input text boxes next then post to API then event listener for it