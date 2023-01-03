import { fetchClowns, fetchRequests, fetchCompletions } from "./dataAccess.js"
import { ButtonsTheClown } from "./ButtonsTheClown.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchClowns())
        .then(() => fetchCompletions())
        .then(
            () => {
                mainContainer.innerHTML = ButtonsTheClown()
            }
        )
}

render()


mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)