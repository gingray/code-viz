import { describe, it, expect } from 'vitest'
import {createHtmlLinkFromLine, createIdeaLinkFromLine} from "../src/idea.js";

describe('createIdeaLinkFromLine()', () => {
    it('when pass line return url', () => {
        const line = 'lib/xxx/yyy/user.rb:81'
        const expected = 'http://localhost:63342/api/file?file=lib/xxx/yyy/user.rb&line=81'
        expect(createIdeaLinkFromLine(line)).toEqual(expected)
    })

    it('when pass empty', () => {
        const line = ''
        const expected = ''
        expect(createIdeaLinkFromLine(line)).toEqual(expected)
    })
})

describe('createHtmlLinkFromLine', () => {
    it('when pass line return html', () => {
        const line = 'lib/xxx/yyy/user.rb:81'
        const expected = '<a href="http://localhost:63342/api/file?file=lib/xxx/yyy/user.rb&line=81" target="_blank">http://localhost:63342/api/file?file=lib/xxx/yyy/user.rb&line=81</a>'
        expect(createHtmlLinkFromLine(line)).toEqual(expected)
    })
})

