import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement.js';

/**
 * Applies a circle layout to the graph.
 * 
 * @param {typeof import('@flapjs/services/graph/BaseGraph.js').default} graphType The graph type for the graph state.
 * @param {object} graphState The graph state to apply the layout to.
 */
export default function CircleLayout(graphType, graphState)
{
    // Seperate nodes to reachable and unreachable
    const nodes = graphType.getElements(graphState, NodeElement);

    const startNode = findStartNode(nodes);
    const reachableNodes = getReachableNodes(graphType, graphState, startNode);
    const unreachableNodes = nodes.filter(node => !reachableNodes.includes(node));

    // Find number of nodes
    const numOfReachable = reachableNodes.length;
    const numOfUnreachable = unreachableNodes.length;
    const numOfNode = nodes.length;
    const maxNum = Math.max(numOfReachable, numOfUnreachable);
    if (numOfNode <= 0) return;

    // Set radius
    let radius;
    if (numOfReachable < 10 && numOfUnreachable < 10)
    {
        radius = maxNum / 4 * 50 + 30;
    }
    else
    {
        radius = (maxNum / 5) * 40 + 30;
    }

    let currentStep = 0;

    if (numOfReachable === 1)
    {
        let degree = 2 * Math.PI / numOfNode;
        for (const node of nodes)
        {
            node.y = Math.sin(degree * currentStep + Math.PI) * radius;
            node.x = Math.cos(degree * currentStep + Math.PI) * radius;
            node.markDirty();
            currentStep += 1;
        }
    }
    else 
    {
        const degree_re = 2 * Math.PI / numOfReachable;
        currentStep = 0;
        for (const node of reachableNodes)
        {
            node.y = Math.sin(degree_re * currentStep + Math.PI) * radius;
            node.x = Math.cos(degree_re * currentStep + Math.PI) * radius;
            node.markDirty();
            currentStep += 1;
        }

        const degree_un = 2 * Math.PI / numOfUnreachable;
        currentStep = 0;
        for (const node of unreachableNodes)
        {
            node.y = Math.sin(degree_un * currentStep + Math.PI) * (radius + 100);
            node.x = Math.cos(degree_un * currentStep + Math.PI) * (radius + 100);
            node.markDirty();
            currentStep += 1;
        }
    }
}

function findStartNode(nodes)
{
    for(let node of nodes)
    {
        if (node.initial) return node;
    }
    return null;
}

function getReachableNodes(graphType, graphState, startNode)
{
    const edges = graphType.getElements(graphState, EdgeElement);
    
    let reachableIds = [];
    reachableIds.push(startNode.id);
    for (let i = 0; i < reachableIds.length; i++)
    {
        for (let edge of edges)
        {
            if (edge.fromId === reachableIds[i])
            {
                if (!reachableIds.includes(edge.toId))
                {
                    reachableIds.push(edge.toId);
                }
            }
        }
    }
    
    return reachableIds.map(nodeId => graphType.getElement(graphState, NodeElement, nodeId));
}
