import { describe, it, expect } from 'vitest'
import {createIdeaLinkFromLine} from "../src/idea.js";

describe('createIdeaLinkFromLine()', () => {
    it('when pass line return url', () => {
        const line = 'lib/xxx/yyy/user.rb:81'
        const expected = 'http://localhost:63342/file?file=lib/xxx/yyy/user.rb&line=81'
        expect(createIdeaLinkFromLine(line)).toEqual(expected)
    })

    it('when pass empty', () => {
        const line = ''
        const expected = ''
        expect(createIdeaLinkFromLine(line)).toEqual(expected)
    })
})