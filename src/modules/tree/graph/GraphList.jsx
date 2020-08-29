import React from 'react';

import { useGraph } from './GraphContext.jsx';

export function GraphList()
{
    const { updateNode, updateEdge, nodeList, edgeList } = useGraph();
    
    return (
        <div>
            {nodeList.map(node =>
            {
                return (
                    <button key={node.id} onClick={() =>
                    {
                        updateNode(node.id, {
                            x: Math.floor(Math.random() * 100),
                            y: Math.floor(Math.random() * 100),
                        });
                    }}>
                        Randomize Node {node.id} : {JSON.stringify(node, null, 4)}
                    </button>
                );
            })}
            {edgeList.map(edge =>
            {
                return (
                    <button key={edge.id} onClick={() =>
                    {
                        updateEdge(edge.id, {
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
