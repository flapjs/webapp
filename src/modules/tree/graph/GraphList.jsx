import React from 'react';

import { useGraph } from '@flapjs/services/graph2/GraphService.js';

export function GraphList()
{
    const { nodes, edges } = useGraph();
    
    return (
        <div>
            {nodes.nodeList.map(node =>
            {
                return (
                    <button key={node.id} onClick={() =>
                    {
                        nodes.update(node.id, {
                            x: Math.floor(Math.random() * 100),
                            y: Math.floor(Math.random() * 100),
                        });
                    }}>
                        Randomize Node {node.id} : {JSON.stringify(node, null, 4)}
                    </button>
                );
            })}
            {edges.edgeList.map(edge =>
            {
                return (
                    <button key={edge.id} onClick={() =>
                    {
                        edges.update(edge.id, {
                            x: Math.floor(Math.random() * 100),
                            y: Math.floor(Math.random() * 100),
                        });
                    }}>
                        Randomize Edge {edge.id} : {JSON.stringify(edge, null, 4)}
                    </button>
                );
            })}
        </div>
    );
}
