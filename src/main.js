import "beercss";
import './style.css'
import {createStoreElement, loadNewStore, store, updateStore} from "./store";
import Alpine from 'alpinejs'
import Toolkit from '@alpine-collective/toolkit'
import {serializeObject} from "./helpers.js";
import {drawGraph} from "./graph.js";
import {generateMermaid} from "./mermaid.js";

window.addEventListener("load", function() {
    drawGraph(store)
})

document.addEventListener('alpine:init', () => {
    const nodes = Object.keys(store)
    const jsonRep = serializeObject(store)
    Alpine.store('graph', {
        nodes: nodes,
        nodeName: 'graph',
        jsonRep: jsonRep,
        connectToSelected: '',
        mermaidJs: '',
        selectedTab: 'json',
        addNode (evt) {
            const connections = this.connectToSelected === '' ? [] : [this.connectToSelected]
            const storeElement = createStoreElement({line: '', description: '', nodeName: this.nodeName, connections: connections})
            updateStore(store, storeElement)
            this.nodes = [...new Set([...this.nodes ,...[this.nodeName]])]
            drawGraph(store)
            this.connectToSelected = ''
            this.jsonRep = serializeObject(store)
            this.mermaidJs = generateMermaid(store).join("\n")
        },
        selectNode(nodeName) {
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
            const newStore = JSON.parse(this.jsonRep);
            loadNewStore(newStore);
            drawGraph(store);
            this.nodes = Object.keys(newStore)
            this.mermaidJs = generateMermaid(store).join("\n")
        },
        selectTab(tabName) {
            this.selectedTab = tabName
        }
    })
})
window.Alpine = Alpine
Alpine.plugin(Toolkit)
Alpine.start()
