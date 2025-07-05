import {checkEmpty} from "./helpers.js";

const extendAlpine = (Alpine) => {
    Alpine.magic('checkEmpty', () => subject => {
        console.log([subject, checkEmpty(subject)]);
        return checkEmpty(subject)
    })
}
export {extendAlpine}