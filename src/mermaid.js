const replaceTable = {
    ":": "#colon;"
}
const escapeNodeName = (value) => {
    let newValue = value
    Object.keys(replaceTable).forEach(key => {
        const regex = new RegExp(key, 'g')
        newValue = newValue.replaceAll(regex, replaceTable[key])
    })
    return newValue
}

const generateMermaid = (store) => {
    let tokens = ['stateDiagram-v2']
    Object.keys(store).forEach((key) => {
        store[key].connections.forEach(connection => {
            tokens.push(`${escapeNodeName(key)} -->${escapeNodeName(connection)}`)
        })
    })

    return tokens
}

export { generateMermaid, escapeNodeName }