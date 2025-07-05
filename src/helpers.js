
const serializeObject = (store) => {
    return JSON.stringify(store, null, 2)
}

const generateHtmlLink = (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
}

export {serializeObject, generateHtmlLink}