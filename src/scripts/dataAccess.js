const applicationState = {
    bookingRequests: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requestedBookings`)
        .then(response => response.json())
        .then(
            (requestedBookings) => {
                // Store the external state in application state
                applicationState.bookingRequests = requestedBookings
            }
        )
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                // Store the external state in application state
                applicationState.clowns = data
            }
        )
}


// Function that makes copies of the application state requests above 
export const getRequests = () => {
    return applicationState.bookingRequests.map(request => ({...request}))
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
}


const mainContainer = document.querySelector("#container")

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requestedBookings`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const saveCompletion = (completedRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedRequest)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}

// Deletes request when delete button is clicked
export const deleteRequest = (id) => {
    return fetch(`${API}/requestedBookings/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}