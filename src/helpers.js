import {generateMermaid} from "./mermaid.js";
import {drawGraph} from "./graph.js";

const serializeObject = (store) => {
    return JSON.stringify(store, null, 2)
}

const generateHtmlLink = (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
}

const checkEmpty = (value) => {
    if (!value) return true;
    if (typeof(value) == "object") {
        return Object.keys(value).length === 0
    }
    return value.length === 0
}

const afterStateChanges = (alpineState) => {
   drawGraph(alpineState.store)
   alpineState.connectToSelected = ''
   alpineState.line = ''
   alpineState.jsonRep = serializeObject(this.store)
   alpineState.mermaidJs = generateMermaid(this.store).join("\n")
}

export {serializeObject, generateHtmlLink, checkEmpty, afterStateChanges}