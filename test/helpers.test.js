import { describe, it, expect } from 'vitest'
import {serializeObject} from "../src/helpers.js";

describe('serializeObject()', () => {
    it('adds two numbers', () => {
        const store = {}
        expect(serializeObject(store)).toBe("{}")
    })
})