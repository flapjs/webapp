import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement';

/** @typedef {typeof import('@flapjs/services/graph/BaseGraph.js').default} BaseGraphClass */

/**
 * Gets an array of unreachable node ids from the start node.
 * 
 * @param {BaseGraphClass} graphType The graph type of the state.
 * @param {object} graphState The state of the graph.
 * @param {string} startNodeId The starting node id.
 * @returns {Array<string>} An array of node ids that are unreachable from the start node.
 */
export function getUnreachableNodeIds(graphType, graphState, startNodeId)
{
    let nodeIds = [ ...graphType.getElementIds(graphState, NodeElement) ];

    if (!startNodeId) return [];
    if (nodeIds.length <= 1) return [];

    nodeIds.splice(nodeIds.indexOf(startNodeId), 1);
    let edges = graphType.getElements(graphState, EdgeElement);
    
    let nextNodeIds = [];
    nextNodeIds.push(startNodeId);

    while(nextNodeIds.length > 0)
    {
        const nodeId = nextNodeIds.pop();
        for(const edge of edges)
        {
            if (edge.fromId === nodeId)
            {
                const i = nodeIds.indexOf(edge.toId);
                if (i >= 0)
                {
                    const nextNodeId = nodeIds.splice(i, 1)[0];
                    nextNodeIds.push(nextNodeId);
                }
            }
        }
    }

    return nodeIds;
}
