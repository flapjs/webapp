import { stringHash } from '@flapjs/util/MathHelper.js';
import FiniteAutomataGraph from '@flapjs/modules/fa/graph/FiniteAutomataGraph.js';
import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement.js';

export function hashString(graphState)
{
    if (!graphState) return '';

    const nodeTypeKey = FiniteAutomataGraph.getElementTypeKeyForElementType(NodeElement);
    const edgeTypeKey = FiniteAutomataGraph.getElementTypeKeyForElementType(EdgeElement);

    let nodeIds = graphState[nodeTypeKey] ? Object.keys(graphState[nodeTypeKey]).sort() : [];
    let edgeIds = graphState[edgeTypeKey] ? Object.keys(graphState[edgeTypeKey]).sort() : [];

    let nodeHashes = [];
    for(let nodeId of nodeIds)
    {
        const node = graphState[nodeTypeKey][nodeId];
        nodeHashes.push(`${node.id} ${node.label} ${node.final} ${node.initial}`);
    }

    let edgeHashes = [];
    for(let edgeId of edgeIds)
    {
        const edge = graphState[edgeTypeKey][edgeId];
        edgeHashes.push(`${edge.fromId} ${edge.toId} ${edge.label}`);
    }

    return 'n:' + nodeHashes.join(',') + '|e:' + edgeHashes.join(',');
}

export function hashCode(graphState)
{
    return stringHash(hashString(graphState));
}
