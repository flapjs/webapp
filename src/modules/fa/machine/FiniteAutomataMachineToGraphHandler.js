import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement.js';

import { EMPTY_SYMBOL as FSA_EMPTY_SYMBOL, State } from './FSA.js';
import { EMPTY_SYMBOL } from './Symbols.js';

export function buildMachineFromGraph(machineBuilder, machine, graphType, graphState, opts)
{
    const nodeTypeKey = graphType.getElementTypeKeyForElementType(NodeElement);
    const edgeTypeKey = graphType.getElementTypeKeyForElementType(EdgeElement);

    machineBuilder.sourceMap.clear();
    machineBuilder.errors.length = 0;
    machineBuilder.warnings.length = 0;

    // const deterministic = machine.isDeterministic();
    machine.clear();

    const nodeToStateMap = new Map();

    const nodeLabels = new Map();
    const nodeOutgoings = new Map();
    const edgeSymbols = new Set();
    const edgePlaceholders = [];
    const edgeEmpties = [];

    if (graphState[nodeTypeKey])
    {
        for (const nodeId of Object.keys(graphState[nodeTypeKey]))
        {
            const node = graphState[nodeTypeKey][nodeId];
            const { label, final, initial } = node;

            let state = new State(label);
            machine.addState(state);

            nodeToStateMap.set(nodeId, state.getStateID());
            machineBuilder.sourceMap.set(state.getStateID(), nodeId);

            if (final)
            {
                machine.setFinalState(state, true);
            }

            if (initial)
            {
                machine.setStartState(state);
            }

            // Check for duplicate states
            if (nodeLabels.has(label)) nodeLabels.get(label).push(state);
            else nodeLabels.set(label, [state]);

            // For duplicate transitions
            nodeOutgoings.set(state, new Map());
        }
    }

    if (graphState[edgeTypeKey])
    {
        for (const edgeId of Object.keys(graphState[edgeTypeKey]))
        {
            const edge = graphState[edgeTypeKey][edgeId];

            const { fromId, toId, label } = edge;
            
            if (!toId)
            {
                edgePlaceholders.push(edgeId);
                continue;
            }
            else if (fromId && toId)
            {
                const sourceId = nodeToStateMap.get(fromId);
                const destinationId = nodeToStateMap.get(toId);

                const srcState = machine.getStateByID(sourceId);
                const dstState = machine.getStateByID(destinationId);

                if (!srcState || !dstState) throw new Error('Cannot find state for edge source/destination nodes - mismatch id');

                const symbols = label.split('\n');
                for (const symbol of symbols)
                {
                    if (!symbol) continue;

                    if (symbol === EMPTY_SYMBOL)
                    {
                        // For empties
                        edgeEmpties.push(edgeId);
                    }
                    else
                    {
                        // For used symbol
                        edgeSymbols.add(symbol);
                    }

                    // Translate all labels to symbols
                    let transitionSymbol;
                    switch (symbol)
                    {
                        case EMPTY_SYMBOL:
                            transitionSymbol = FSA_EMPTY_SYMBOL;
                            break;
                        default:
                            transitionSymbol = symbol;
                    }

                    // For duplicate/missing transitions
                    let outSymbols = nodeOutgoings.get(srcState);
                    let outEdges = outSymbols.get(transitionSymbol);
                    if (!outEdges) outSymbols.set(transitionSymbol, outEdges = new Array());
                    outEdges.push(edgeId);

                    // Add to machine...
                    machine.addTransition(srcState, dstState, transitionSymbol);
                }
            }
        }
    }

    /*
    machineBuilder.errors.push('There is nothing here.');
    // console.log('ERROR!', machineBuilder.errors);

    //Check for duplicate node labels
    for (const [nodeLabel, sharedStates] of nodeLabels.entries())
    {
        if (sharedStates.length > 1)
        {
            machineBuilder.errors.push(`Found duplicate states for ${sharedStates.length} states.`);
        }
    }

    //Check for incomplete edge
    if (edgePlaceholders.length > 0)
    {
        errors.push({
            name: ERROR_INCOMPLETE_TRANSITION,
            edges: edgePlaceholders
        });
    }

    /*
    //Check for duplicate node labels
    for (const [nodeLabel, sharedStates] of nodeLabels.entries())
    {
        if (sharedStates.length > 1)
        {
            errors.push({
                name: ERROR_DUPLICATE_STATE,
                label: nodeLabel,
                nodes: sharedStates.map(e => e.getSource())
            });
        }
    }

    //Check for incomplete edge
    if (edgePlaceholders.length > 0)
    {
        errors.push({
            name: ERROR_INCOMPLETE_TRANSITION,
            edges: edgePlaceholders
        });
    }

    //Check for unreachable nodes
    const unreachables = getUnreachableNodes(graph);
    if (unreachables && unreachables.length > 0)
    {
        warnings.push({
            name: ERROR_UNREACHABLE_STATE,
            nodes: unreachables
        });
    }

    if (deterministic)
    {
        //Check for empty transitions
        if (edgeEmpties.length > 0)
        {
            errors.push({
                name: ERROR_EMPTY_TRANSITION,
                edges: edgeEmpties
            });
        }

        //Check for duplicate edge labels
        //Check for missing edge labels
        const missingSymbols = [];
        for (const [state, edgeMapping] of nodeOutgoings.entries())
        {
            for (const symbol of edgeSymbols)
            {
                const edges = edgeMapping.get(symbol);
                if (edges)
                {
                    if (edges.length !== 1)
                    {
                        errors.push({
                            name: ERROR_DUPLICATE_TRANSITION,
                            edges: edges,
                            symbol: symbol
                        });
                    }
                }
                else
                {
                    missingSymbols.push(symbol);
                }
            }

            if (missingSymbols.length > 0)
            {
                errors.push({
                    name: ERROR_MISSING_TRANSITION,
                    node: state.getSource(),
                    symbols: missingSymbols.slice()
                });
                missingSymbols.length = 0;
            }
        }
    }

    if (errors.length <= 0)
    {
        //Errors should be empty
        return dst;
    }
    else
    {
        //Reasons are stored in errors
        return null;
    }
    */

    return true;
}
