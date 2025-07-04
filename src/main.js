import "beercss";
import './style.css'

const app = () => {
    console.log('Hello World!')
    // Graph data - nodes and links
    const nodes = [
        { id: "A", group: 1, size: 20, name: "Node A" },
        { id: "B", group: 1, size: 15, name: "Node B" },
        { id: "C", group: 2, size: 25, name: "Node C" },
        { id: "D", group: 2, size: 18, name: "Node D" },
        { id: "E", group: 3, size: 22, name: "Node E" },
        { id: "F", group: 3, size: 16, name: "Node F" },
        { id: "G", group: 1, size: 20, name: "Node G" },
        { id: "H", group: 2, size: 14, name: "Node H" }
    ];

    const links = [
        { source: "A", target: "B", value: 1 },
        { source: "A", target: "C", value: 2 },
        { source: "B", target: "D", value: 1 },
        { source: "C", target: "D", value: 3 },
        { source: "C", target: "E", value: 2 },
        { source: "D", target: "F", value: 1 },
        { source: "E", target: "F", value: 2 },
        { source: "F", target: "G", value: 1 },
        { source: "G", target: "H", value: 1 },
        { source: "A", target: "H", value: 2 }
    ];

    // Set dimensions
    const width = 700;
    const height = 500;

    // Create color scale for groups
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create SVG
    const svg = d3.select("#graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip");

    // Create force simulation
    let simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => d.size + 5));

    // Create links
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", d => Math.sqrt(d.value) * 2);

    // Create nodes
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", d => d.size)
        .attr("fill", d => color(d.group))
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`${d.name}<br/>Group: ${d.group}<br/>Connections: ${links.filter(l => l.source.id === d.id || l.target.id === d.id).length}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        }).on("click", function(event, d) {
            console.log(["clicked", d]);
        });

    // Add labels to nodes
    const labels = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "node-label")
        .text(d => d.id)
        .attr("dy", 4);

    // Update positions on each tick
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        labels
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    // Drag functions
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // Control functions
    function restartSimulation() {
        simulation.alpha(1).restart();
    }

    let forceEnabled = true;
    function toggleForce() {
        forceEnabled = !forceEnabled;
        if (forceEnabled) {
            simulation.force("charge", d3.forceManyBody().strength(-300));
        } else {
            simulation.force("charge", d3.forceManyBody().strength(0));
        }
        simulation.alpha(0.3).restart();
    }

    // Add some visual enhancements
    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 4)
        .attr("markerHeight", 4)
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#999");
}
window.addEventListener("load", function() {
    window.app = app;
    app()
})