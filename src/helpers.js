
const serializeObject = (store) => {
    return JSON.stringify(store, null, 2)
}
export {serializeObject}