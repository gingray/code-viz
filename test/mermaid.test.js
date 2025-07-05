import { describe, it, expect } from 'vitest'
import {escapeNodeName, generateMermaid} from "../src/mermaid.js";
import {createStoreElement, updateStore} from "../src/store.js";

describe('generateMermaid()', () => {
    it('produce string for mermaid.js', () => {
        const expected = ['stateDiagram-v2', 'XXX#colon;#colon;YYY#call -->xxx1','XXX#colon;#colon;YYY#call -->xxx2']
        const store = { }
        const item = createStoreElement({line: 'some line', connections: ["xxx1", "xxx2"], nodeName: "XXX::YYY#call", description: ""})
        updateStore(store, item)
        expect(generateMermaid(store)).toStrictEqual(expected)
    })
})

describe('escapeNodeName()', () => {
    it('escape node name to valid format', () => {
        const value = "XXX::YY#method.call"
        const expected = 'XXX#colon;#colon;YY#method.call'
        expect(escapeNodeName(value)).toEqual(expected)
    })
})
