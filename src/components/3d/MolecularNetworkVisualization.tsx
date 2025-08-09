"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

interface CountryNode {
  id: string;
  name: string;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface ConnectionLink {
  source: string | CountryNode;
  target: string | CountryNode;
  value: number;
}

const countries: CountryNode[] = [
  { id: "linak", name: "LINAK HQ", group: 0 },
  { id: "canada", name: "Canada", group: 1 },
  { id: "australia", name: "Australia", group: 1 },
  { id: "singapore", name: "Singapore", group: 1 },
  { id: "germany", name: "Germany", group: 2 },
  { id: "italy", name: "Italy", group: 2 },
  { id: "spain", name: "Spain", group: 2 },
  { id: "armenia", name: "Armenia", group: 3 },
  { id: "georgia", name: "Georgia", group: 3 },
  { id: "russia", name: "Russia", group: 3 },
];

const connections: ConnectionLink[] = [
  // Hub connections from LINAK to all countries
  { source: "linak", target: "canada", value: 8 },
  { source: "linak", target: "australia", value: 7 },
  { source: "linak", target: "singapore", value: 6 },
  { source: "linak", target: "germany", value: 9 },
  { source: "linak", target: "italy", value: 8 },
  { source: "linak", target: "spain", value: 5 },
  { source: "linak", target: "armenia", value: 4 },
  { source: "linak", target: "georgia", value: 3 },
  { source: "linak", target: "russia", value: 4 },

  // Regional connections
  { source: "germany", target: "italy", value: 3 },
  { source: "italy", target: "spain", value: 2 },
  { source: "armenia", target: "georgia", value: 5 },
  { source: "singapore", target: "australia", value: 4 },
];

export default function MolecularNetworkVisualization({
  onCountrySelect,
  className = "",
  selectedCountry,
}: {
  readonly onCountrySelect: (countryId: string) => void;
  readonly className?: string;
  readonly selectedCountry?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = 800;
    const height = 600;

    svg.attr("width", width).attr("height", height);

    // Create gradient definitions
    const defs = svg.append("defs");

    // Gradient for links
    const linkGradient = defs
      .append("linearGradient")
      .attr("id", "link-gradient")
      .attr("gradientUnits", "userSpaceOnUse");

    linkGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#64FFDA")
      .attr("stop-opacity", 0.8);

    linkGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#BB86FC")
      .attr("stop-opacity", 0.3);

    // Glow filter
    const filter = defs.append("filter").attr("id", "glow");
    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Color scale for groups
    const color = d3
      .scaleOrdinal<string, string>()
      .domain(["0", "1", "2", "3"])
      .range(["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"]);

    // Create force simulation
    const simulation = d3
      .forceSimulation(countries)
      .force(
        "link",
        d3
          .forceLink(connections)
          .id((d: any) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-800))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    // Create container groups
    const g = svg.append("g");

    // Create links
    const link = g
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(connections)
      .enter()
      .append("line")
      .attr("stroke", "url(#link-gradient)")
      .attr("stroke-width", (d: ConnectionLink) => Math.sqrt(d.value) * 2)
      .attr("stroke-opacity", 0.7)
      .style("filter", "url(#glow)");

    // Create nodes
    const node = g
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(countries)
      .enter()
      .append("g")
      .attr("class", "node");

    // Add circles for nodes
    node
      .append("circle")
      .attr("r", (d: CountryNode) => (d.id === "linak" ? 25 : 15))
      .attr("fill", (d: CountryNode) => color(d.group.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("filter", "url(#glow)")
      .style("cursor", "pointer")
      .on("click", (event: MouseEvent, d: CountryNode) => {
        if (d.id !== "linak") {
          onCountrySelect(d.id);
        }
      })
      .on("mouseover", function (event: MouseEvent, d: CountryNode) {
        // Highlight connected nodes
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d.id === "linak" ? 30 : 20);

        // Highlight connected links
        link.style("stroke-opacity", (l: ConnectionLink) => {
          const isConnected =
            (l.source as CountryNode).id === d.id ||
            (l.target as CountryNode).id === d.id;
          return isConnected ? 1 : 0.1;
        });

        // Show tooltip
        const tooltip = svg
          .append("g")
          .attr("class", "tooltip")
          .attr(
            "transform",
            `translate(${event.offsetX + 10}, ${event.offsetY - 10})`
          );

        tooltip
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", d.name.length * 8 + 20)
          .attr("height", 25)
          .attr("fill", "rgba(0,0,0,0.8)")
          .attr("rx", 4);

        tooltip
          .append("text")
          .attr("x", 10)
          .attr("y", 17)
          .attr("fill", "white")
          .attr("font-size", "12px")
          .text(d.name);
      })
      .on("mouseout", function (event: MouseEvent, d: CountryNode) {
        // Reset highlighting
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d.id === "linak" ? 25 : 15);

        link.style("stroke-opacity", 0.7);

        // Remove tooltip
        svg.select(".tooltip").remove();
      });

    // Add text labels
    node
      .append("text")
      .text((d: CountryNode) => (d.id === "linak" ? "🏢" : "🌍"))
      .attr("font-size", (d: CountryNode) =>
        d.id === "linak" ? "20px" : "12px"
      )
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .style("pointer-events", "none");

    // Add country names
    node
      .append("text")
      .text((d: CountryNode) => d.name)
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .attr("dy", "25px")
      .attr("fill", "white")
      .style("pointer-events", "none");

    // Drag behavior
    const drag = d3
      .drag<SVGGElement, CountryNode>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: CountryNode) => `translate(${d.x},${d.y})`);
    });

    // Highlight selected country
    if (selectedCountry) {
      node
        .selectAll("circle")
        .style("stroke", (d: any) =>
          d.id === selectedCountry ? "#FFD700" : "#fff"
        )
        .style("stroke-width", (d: any) => (d.id === selectedCountry ? 4 : 2));
    }

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [onCountrySelect, selectedCountry]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className={`relative bg-gradient-to-br from-slate-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />

      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />

      {/* Overlay instructions */}
      <div className="absolute top-4 left-4 text-white/70 text-sm">
        <p>🔗 Global Migration Network</p>
        <p>🖱️ Click countries • Drag nodes • Scroll to zoom</p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-3">
        <p className="text-white/80 text-xs mb-2 font-semibold">
          Network Groups
        </p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-white/70 text-xs">LINAK Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-teal-400" />
            <span className="text-white/70 text-xs">Premium Destinations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-white/70 text-xs">European Markets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-white/70 text-xs">Emerging Markets</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
