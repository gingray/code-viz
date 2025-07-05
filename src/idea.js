import {generateHtmlLink} from "./helpers.js";

const createIdeaLinkFromLine = (line) => {
    if (line === null || line === undefined || line === "") { return "" }

    const [path, pos] = line.split(":");
    return `http://localhost:63342/api/file?file=${path}&line=${pos}`;
}

const createHtmlLinkFromLine = (line) => {
    return generateHtmlLink(createIdeaLinkFromLine(line));
}

export {createIdeaLinkFromLine, createHtmlLinkFromLine};