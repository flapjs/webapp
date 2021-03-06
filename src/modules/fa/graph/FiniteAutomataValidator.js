import { EMPTY_SYMBOL } from '@flapjs/modules/fa/machine/Symbols.js';

import { IncompleteTransitionErrorNotification } from '../notifications/IncompleteTransitionErrorNotification.jsx';
import { DuplicateNodeErrorNotification } from '../notifications/DuplicateNodeErrorNotification.jsx';
import { UnreachableNodeErrorNotification } from '../notifications/UnreachableNodeErrorNotification.jsx';
import { EmptyTransitionErrorNotification } from '../notifications/EmptyTransitionErrorNotification.jsx';
import { MissingTransitionErrorNotification } from '../notifications/MissingTransitionErrorNotification.jsx';
import { DuplicateTransitionErrorNotification } from '../notifications/DuplicateTransitionErrorNotification.jsx';

/**
 * Validates the finite automata graph.
 * 
 * @param {Object} nodes A map of node ids to node objects.
 * @param {Object} edges A map of edge ids to edge objects.
 * @param {Boolean} determinism Whether it is deterministic.
 */
export function validate(nodes, edges, determinism)
{
    fixDuplicateLabels(nodes);
    fixMissingStartNode(nodes);

    return [
        ...validateIncompleteEdges(edges),
        ...validateUnreachableNodes(nodes, edges),
        ...validateDeterminismForEmptyTransitions(determinism, edges),
        ...validateDeterminismForDuplicateOrMissingEdgeLabels(determinism, nodes, edges),
    ];
}

export function fixMissingStartNode(nodes)
{
    const startNodeIds = getStartNodeIds(nodes);
    if (startNodeIds.length == 0 && Object.keys(nodes).length > 0)
    {
        const nodeId = Object.keys(nodes)[0]; // just take the first one
        const node = nodes[nodeId];
        node.initial = true;
        node.markDirty(); // mark dirty so will be updated next cycle

        return [{
            message: 'Warning: Missing start node, so we added one for you. Drag the arrow to reassign',
            opts: {},
        }];
    }
    else if (startNodeIds.length > 1)
    {
        return [{
            message: 'Error: Can only have 1 start node.',
            opts: {},
        }];
    }
    else
    {
        return [];
    }
}

export function validateIncompleteEdges(edges)
{
    let result = [];

    let placeholderIds = [];
    for(const edgeId in edges)
    {
        const edge = edges[edgeId];
        if (!edge.toId)
        {
            placeholderIds.push(edgeId);
        }
    }

    if (placeholderIds.length > 0)
    {
        result.push({
            message: IncompleteTransitionErrorNotification,
            opts: { edgeIds: placeholderIds },
        });
    }

    return result;
}

export function fixDuplicateLabels(nodes)
{
    let result = [];

    let dupeLabels = [];
    let sharedNodes = {};
    for(const nodeId in nodes) // hashId of nodes
    {
        const { label } = nodes[nodeId]; // destructure label
        if (label in sharedNodes)
        {
            dupeLabels.push(label);
            sharedNodes[label].push(nodeId); // nodes sharing label
        }
        else
        {
            sharedNodes[label] = [nodeId];
        }
    }

    if (dupeLabels.length > 0)
    {
        for(const label of dupeLabels) // for each duplicate label
        {
            result.push({
                message: DuplicateNodeErrorNotification,
                opts: {
                    label,
                    nodeIds: sharedNodes[label],
                }
            }); // notify user

            let i = 1;
            sharedNodes[label].forEach(nodeId => 
            {
                const node = nodes[nodeId];
                node.label += '_'+(i++).toString();
                node.markDirty();
            });
        }
    }

    return result;
}

export function validateUnreachableNodes(nodes, edges)
{
    const startNodeIds = getStartNodeIds(nodes);
    const unreachableNodeIds = getUnreachableNodeIds(startNodeIds[0], nodes, edges);

    if (unreachableNodeIds.length > 0)
    {
        return [{
            message: UnreachableNodeErrorNotification,
            opts: {
                labels: unreachableNodeIds.map(nodeId => nodes[nodeId].label),
                nodeIds: unreachableNodeIds,
            },
        }];
    }
    else
    {
        return [];
    }
}

export function validateDeterminismForEmptyTransitions(determinism, edges)
{
    if (!determinism) return [];

    let empties = [];
    for(const edgeId in edges)
    {
        const edge = edges[edgeId];
        const symbols = edge.label.split('\n');
        if (symbols.length <= 0 || symbols.includes(EMPTY_SYMBOL))
        {
            empties.push(edgeId);
        }
    }

    if (empties.length > 0)
    {
        return [{
            message: EmptyTransitionErrorNotification,
            opts: {
                edgeIds: empties,
            },
        }];
    }
    else
    {
        return [];
    }
}

export function validateDeterminismForDuplicateOrMissingEdgeLabels(determinism, nodes, edges)
{
    let result = [];

    let alphabet = new Set();
    let outgoing = {};
    for(const edgeId in edges)
    {
        const { label, fromId, toId } = edges[edgeId];
        let symbols = label.split('\n');
        if (symbols.length <= 0) symbols = [EMPTY_SYMBOL];

        let outs;
        if (fromId in outgoing)
        {
            outs = outgoing[fromId];
        }
        else
        {
            outs = {};
            outgoing[fromId] = outs;
        }

        for(let symbol of symbols)
        {
            if (!(symbol in outs))
            {
                outs[symbol] = [];
            }
            outs[symbol].push(toId);

            if (symbol !== EMPTY_SYMBOL)
            {
                alphabet.add(symbol);
            }
        }
    }

    if (alphabet.size <= 0) return [];

    for(const nodeId in nodes)
    {
        if (!(nodeId in outgoing))
        {
            result.push({
                message: MissingTransitionErrorNotification,
                opts: {
                    symbols: Array.from(alphabet),
                    label: nodes[nodeId].label,
                },
            });
            continue;
        }
        
        let incompleteSymbols = [];
        let outs = outgoing[nodeId];
        for(const symbol of alphabet)
        {
            if (symbol in outs)
            {
                let outEdges = outs[symbol];
                if (outEdges.length > 1)
                {
                    result.push({
                        message: DuplicateTransitionErrorNotification,
                        opts: {
                            edgeIds: outEdges,
                            fromNodeLabel: nodes[nodeId].label,
                            symbol,
                        },
                    });
                }
            }
            else
            {
                incompleteSymbols.push(symbol);
            }
        }

        if (incompleteSymbols.length > 0)
        {
            result.push({
                message: MissingTransitionErrorNotification,
                opts: {
                    symbols: incompleteSymbols,
                    label: nodes[nodeId].label,
                },
            });
        }
    }

    return result;
}

export function getUnreachableNodeIds(startNodeId, nodes, edges)
{
    if (!startNodeId) return [];
    if (!(startNodeId in nodes)) return [];

    let nodeIds = Object.keys(nodes);
    if (nodes.length <= 1) return [];

    nodeIds.splice(nodeIds.indexOf(startNodeId), 1);
    
    let nextNodeIds = [];
    nextNodeIds.push(startNodeId);

    while(nextNodeIds.length > 0)
    {
        const nodeId = nextNodeIds.pop();
        for(const edgeId in edges)
        {
            const edge = edges[edgeId];
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

export function getStartNodeIds(nodes)
{
    let result = [];
    for(const nodeId in nodes)
    {
        const node = nodes[nodeId];
        if (node.initial)
        {
            result.push(nodeId);
        }
    }
    return result;
}
