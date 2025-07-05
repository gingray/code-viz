// http://localhost:63342/api/file?file=lib/license_rules/estonian/limits/actions/sync_activator.rb&line=17

const createIdeaLinkFromLine = (line) => {
    if (line === null || line === undefined || line === "") { return "" }

    const [path, pos] = line.split(":");
    return `http://localhost:63342/api/file?file=${path}&line=${pos}`;
}

export {createIdeaLinkFromLine};