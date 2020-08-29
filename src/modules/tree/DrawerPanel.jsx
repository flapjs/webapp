import React from 'react';
import { useGraph } from './graph/GraphService.js';

export function DrawerPanel()
{
    const graph = useGraph();

    return (
        <div>
            WOOT!
            <button onClick={() =>
            {
                graph.addNode({ x: 0, y: 0, label: 'A' });
            }}>
                Add Node
            </button>
            <button onClick={() =>
            {
                let firstNode = graph.nodeList[Math.floor(Math.random() * graph.nodeList.length)];
                let secondNode = graph.nodeList[Math.floor(Math.random() * graph.nodeList.length)];
                
                graph.addEdge(firstNode, secondNode, { label: 'B' });
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
