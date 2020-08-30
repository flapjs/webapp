import React from 'react';
import { useGraph } from '@flapjs/services/graph2/GraphService.js';

export function DrawerPanel()
{
    const graph = useGraph();

    return (
        <div>
            <button onClick={() =>
            {
                graph.nodes.add({ x: 0, y: 0, label: 'A' });
            }}>
                Add Node
            </button>
            <button onClick={() =>
            {
                let firstNode = graph.nodes.nodeList[Math.floor(Math.random() * graph.nodes.nodeList.length)];
                let secondNode = graph.nodes.nodeList[Math.floor(Math.random() * graph.nodes.nodeList.length)];
                
                graph.edges.add(firstNode.id, secondNode.id, { label: 'B' });
            }}>
                Connect an Edge
            </button>
            <button onClick={() =>
            {
                graph.clearGraph();
            }}>
                Clear Graph
            </button>
        </div>
    );
}
