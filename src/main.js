import "beercss";
import './style.css'
import {createStore, createStoreElement, updateStore} from "./store";
import Alpine from 'alpinejs'
import Toolkit from '@alpine-collective/toolkit'
import {serializeObject} from "./helpers.js";
import {drawGraph} from "./graph.js";
import {generateMermaid} from "./mermaid.js";
import {createHtmlLinkFromLine, createIdeaLinkFromLine} from "./idea.js";

document.addEventListener('alpine:init', () => {
    const store = createStore()
    const jsonRep = serializeObject(store)
    drawGraph(store)
    Alpine.store('graph', {
        store: store,
        nodeName: 'graph',
        line: '',
        jsonRep: jsonRep,
        connectToSelected: '',
        mermaidJs: '',
        selectedTab: 'json',
        addNode (evt) {
            const connections = this.connectToSelected === '' ? [] : [this.connectToSelected]
            const storeElement = createStoreElement({line: this.line, description: '', nodeName: this.nodeName, connections: connections})
            this.store = updateStore(this.store, storeElement)
            drawGraph(this.store)
            this.connectToSelected = ''
            this.line = ''
            this.jsonRep = serializeObject(this.store)
            this.mermaidJs = generateMermaid(this.store).join("\n")
        },
        selectNode(nodeName) {
            console.log(createIdeaLinkFromLine(this.store[nodeName].line))
            if (this.nodeName === nodeName) {
                this.connectToSelected = ""
                return
            }

            if (this.nodeName !== "" && this.connectToSelected !=="") {
                this.nodeName = ""
                this.connectToSelected = ""
            }

            if (this.nodeName !== "") {
                this.connectToSelected = nodeName
            } else {
                this.nodeName = nodeName;
            }
        },
        loadFromJson() {
            this.store = JSON.parse(this.jsonRep);
            drawGraph(this.store);
            this.mermaidJs = generateMermaid(this.store).join("\n")
        },
        selectTab(tabName) {
            this.selectedTab = tabName
        },
        getNodeValue(node) {
            return this.store[node]
        },
        openInIdea(e) {
            debugger
            e.stopPropagation()
            e.preventDefault()

            if (!this.nodeName || this.nodeName === "") {
                return ""
            }
            if (!this.store[this.nodeName] || !this.store[this.nodeName].line || this.store[this.nodeName].line === '') {
                return ""
            }
            const url = createIdeaLinkFromLine(this.store[this.nodeName].line)
            fetch(url).then(response => { console.log(response) }).catch(error => { console.error(error) })
        },
        generateLineLinkIdea() {
            if (!this.nodeName || this.nodeName === "") {
                return ""
            }
            if (!this.store[this.nodeName] || !this.store[this.nodeName].line || this.store[this.nodeName].line === '') {
                return ""
            }
            return createHtmlLinkFromLine(this.store[this.nodeName].line)
        }
    })
})
window.Alpine = Alpine
Alpine.plugin(Toolkit)
Alpine.start()
