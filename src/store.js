const loadObject = () => {
    return {
        "MyAppNameReallyLongDefinitionOfCallAndIReallyProudOfItCozILikeLongNames": {
            description: "main method",
            line: '',
            connections: ["call1"]
        },
        "call1": {
            description: "call1 method",
            line: '',
            connections: []
        }
    }

}
const store = loadObject()
const updateStore = (store, item) => {
    if (store[item.nodeName] == null) {
        store[item.nodeName] = {
            line: item.line,
            description: item.description,
            connections: item.connections,
        }
        return store
    }
    if (item.connections.length > 0) {
        store[item.nodeName].connections = [...new Set([...store[item.nodeName].connections ,...item.connections])]
    }
    return store
}
const createStoreElement = ({line, description, connections, nodeName}) => {
    return {
        nodeName,
        description,
        connections,
        line
    }
}

export {store, updateStore, createStoreElement}