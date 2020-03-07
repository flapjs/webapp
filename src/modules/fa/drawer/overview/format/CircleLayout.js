import { UNSAFE_getGraphElements, UNSAFE_getGraphElement } from '@flapjs/services/graph/GraphHelper.js';
import NodeElement from '@flapjs/modules/node/graph/elements/node/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/edge/EdgeElement.js';

export default function apply(graphState)
{
    // Seperate nodes to reachable and unreachable
    const nodes = UNSAFE_getGraphElements(graphState, NodeElement);

    const startNode = findStartNode(nodes);
    const reachableNodes = getReachableNodes(graphState, startNode);
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
        const degree_un = 2 * Math.PI / numOfUnreachable;

        currentStep = 0;
        for (const node of reachableNodes)
        {
            node.y = Math.sin(degree_re * currentStep + Math.PI) * radius;
            node.x = Math.cos(degree_re * currentStep + Math.PI) * radius;
            node.markDirty();
            currentStep += 1;
        }

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

function getReachableNodes(graphState, startNode)
{
    const edges = UNSAFE_getGraphElements(graphState, EdgeElement);
    
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
    
    return reachableIds.map(nodeId => UNSAFE_getGraphElement(graphState, NodeElement, nodeId));
}
