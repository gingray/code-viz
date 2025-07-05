import "beercss";
import './style.css'
import {createStore, createStoreElement, updateStore} from "./store";
import Alpine from 'alpinejs'
import Toolkit from '@alpine-collective/toolkit'
import {checkEmpty, afterStateChanges, serializeObject} from "./helpers.js";
import {drawGraph} from "./graph.js";
import {generateMermaid} from "./mermaid.js";
import {createIdeaLinkFromLine} from "./idea.js";
import {extendAlpine} from "./alpineExt.js";

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
        upsertNode() {
            const connections = this.connectToSelected === '' ? [] : [this.connectToSelected]
            const storeElement = createStoreElement({line: this.line, description: '', nodeName: this.nodeName, connections: connections})
            this.store = updateStore(this.store, storeElement)
            afterStateChanges(this)
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

            if (!checkEmpty(this.nodeName) && !checkEmpty(this.store[this.nodeName])) {
                this.line = this.store[this.nodeName].line
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
            e.stopPropagation()
            e.preventDefault()
            if (checkEmpty(this.nodeName) || checkEmpty(this[store]) || checkEmpty(this[store].line)) {
                return
            }

            const url = createIdeaLinkFromLine(this.store[this.nodeName].line)
            fetch(url).then(response => { console.log(response) }).catch(error => { console.error(error) })
        }
    })
})
window.Alpine = Alpine
Alpine.plugin(Toolkit)
extendAlpine(Alpine)
Alpine.start()
