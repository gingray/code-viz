import {checkEmpty} from "./helpers.js";

const extendAlpine = (Alpine) => {
    Alpine.magic('checkEmpty', () => subject => {
        return checkEmpty(subject)
    })
}
export {extendAlpine}