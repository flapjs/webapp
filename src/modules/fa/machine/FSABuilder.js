import GraphMachineBuilder from '@flapjs/services/graphmachine/GraphMachineBuilder.js';

import FSA, { EMPTY_SYMBOL as FSA_EMPTY_SYMBOL, State } from '@flapjs/modules/fa/machine/FSA.js';
import FiniteAutomataGraph from '../graph/FiniteAutomataGraph';
import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import { EMPTY_SYMBOL } from './Symbols.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement';

export default class FSABuilder extends GraphMachineBuilder
{
    /** @override */
    static build(from = null, opts = {})
    {
        if (from && opts.machineOnly)
        {
            return from;
        }
        else
        {
            let result = new FSA(false);
            if (from) result.copy(from);
            return result;
        }
    }

    /** @override */
    static updateGraphFromMachine(graphType, graphState, graphDispatch, machine, opts = {})
    {
        if (opts.machineOnly)
        {
            graphDispatch({ type: 'forceUpdate' });
            return;
        }
        
        const nodeTypeKey = graphType.getElementTypeKeyForElementType(NodeElement);
        const edgeTypeKey = graphType.getElementTypeKeyForElementType(EdgeElement);

        let result = {
            [nodeTypeKey]: {},
            [edgeTypeKey]: {},
        };

        // Compute all states...
        let xy = 0;
        for(const state of machine.getStates())
        {
            let nodeData = {};
            let nodeId = state.getStateID();

            if (opts.builder)
            {
                nodeId = opts.builder.sourceMap.get(state.getStateID()) || nodeId;
                let node = graphType.getElement(graphState, NodeElement, nodeId);
                if (node)
                {
                    NodeElement.serialize(node, nodeData);
                }
                else
                {
                    nodeData.x = xy;
                    nodeData.y = xy;
                    xy += 10;
                }
            }
            else
            {
                nodeData.x = xy;
                nodeData.y = xy;
                xy += 10;
            }

            nodeData.label = state.getStateLabel();
            if (machine.isStartState(state))
            {
                nodeData.initial = true;
            }
            else
            {
                nodeData.initial = false;
            }
            
            if (machine.isFinalState(state))
            {
                nodeData.final = true;
            }
            else
            {
                nodeData.final = false;
            }

            result[nodeTypeKey][nodeId] = nodeData;
        }

        // Compute all transitions...
        let index = 0;
        let source, destination;
        let edge, fromId, toId, label;
        for (const transition of machine.getTransitions())
        {
            source = transition.getSourceState();
            if (!source) continue;

            fromId = source.getStateID();
            if (!fromId) continue;

            if (opts.builder)
            {
                fromId = opts.builder.sourceMap.get(fromId) || fromId;
            }

            label = transition.getSymbols().join('\n');

            destination = transition.getDestinationState();
            if (!destination) continue;

            toId = destination.getStateID();
            if (!toId) continue;

            if (opts.builder)
            {
                toId = opts.builder.sourceMap.get(toId) || toId;
            }

            edge = {
                fromId,
                toId,
                label,
            };

            result[edgeTypeKey][index++] = edge;
        }
        
        let nextGraphState = FiniteAutomataGraph.deserialize(result, {}, { forceIgnoreVersion: true });
        graphDispatch({ type: 'resetState', state: nextGraphState });
    }

    constructor()
    {
        super();
        
        // From state ids to node ids
        this.sourceMap = new Map();
        this.errors = [];
        this.warnings = [];
    }

    /** @override */
    updateMachineFromSource(machine, source, opts = {})
    {
        if (opts.machineOnly)
        {
            return;
        }

        const graphType = FiniteAutomataGraph;
        
        const nodeTypeKey = graphType.getElementTypeKeyForElementType(NodeElement);
        const edgeTypeKey = graphType.getElementTypeKeyForElementType(EdgeElement);

        this.sourceMap.clear();
        this.errors.length = 0;
        this.warnings.length = 0;

        // const deterministic = machine.isDeterministic();
        machine.clear();

        const nodeToStateMap = new Map();

        const nodeLabels = new Map();
        const nodeOutgoings = new Map();
        const edgeSymbols = new Set();
        const edgePlaceholders = [];
        const edgeEmpties = [];

        if (source[nodeTypeKey])
        {
            for (const nodeId of Object.keys(source[nodeTypeKey]))
            {
                const node = source[nodeTypeKey][nodeId];
                const { label, final, initial } = node;
    
                let state = new State(label);
                machine.addState(state);
    
                nodeToStateMap.set(nodeId, state.getStateID());
                this.sourceMap.set(state.getStateID(), nodeId);
    
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

        if (source[edgeTypeKey])
        {
            for (const edgeId of Object.keys(source[edgeTypeKey]))
            {
                const edge = source[edgeTypeKey][edgeId];
    
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
        this.errors.push('There is nothing here.');
        // console.log('ERROR!', this.errors);

        //Check for duplicate node labels
        for (const [nodeLabel, sharedStates] of nodeLabels.entries())
        {
            if (sharedStates.length > 1)
            {
                this.errors.push(`Found duplicate states for ${sharedStates.length} states.`);
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
    }
}
