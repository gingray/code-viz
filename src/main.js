import "beercss";
import './style.css'
import {createStoreElement, loadNewStore, store, updateStore} from "./store";
import Alpine from 'alpinejs'
import {serializeObject} from "./helpers.js";
import {drawGraph} from "./graph.js";

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
        addNode (evt) {
            const connections = this.connectToSelected === '' ? [] : [this.connectToSelected]
            const storeElement = createStoreElement({line: '', description: '', nodeName: this.nodeName, connections: connections})
            updateStore(store, storeElement)
            this.nodes = [...new Set([...this.nodes ,...[this.nodeName]])]
            drawGraph(store)
            this.connectToSelected = ''
            this.jsonRep = serializeObject(store)
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
            this.nodes = Object.keys(newStore)
            drawGraph(store);
        }
    })
})
window.Alpine = Alpine
Alpine.start()
