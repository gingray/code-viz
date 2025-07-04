import "beercss";
import './style.css'
import {createStoreElement, store, updateStore} from "./store";
import Alpine from 'alpinejs'
import {serializeObject} from "./helpers.js";
import {drawGraph} from "./graph.js";
import * as d3 from "d3";


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
            d3.select("#graph").selectAll("*").remove();
            const connections = this.connectToSelected === '' ? [] : [this.connectToSelected]
            const storeElement = createStoreElement({line: '', description: '', nodeName: this.nodeName, connections: connections})
            updateStore(store, storeElement)
            this.nodes = [...new Set([...this.nodes ,...[this.nodeName]])]
            console.log(this.nodes)

            drawGraph(store)
            this.connectToSelected = ''
            this.jsonRep = serializeObject(store)
        },
        selectNode(nodeName) {
            this.nodeName = nodeName;
        }
    })
})
window.Alpine = Alpine
Alpine.start()
