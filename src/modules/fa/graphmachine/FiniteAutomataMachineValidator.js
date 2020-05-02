import { EMPTY_SYMBOL } from '@flapjs/modules/fa/machine/Symbols.js';
import { getUnreachableNodeIds } from './FiniteAutomataGraphUnreachableHandler.js';

import IncompleteTransitionErrorMessage from '../messages/IncompleteTransitionErrorMessage.jsx';
import DuplicateNodeErrorMessage from '../messages/DuplicateNodeErrorMessage.jsx';
import UnreachableNodeErrorMessage from '../messages/UnreachableNodeErrorMessage.jsx';
import EmptyTransitionErrorMessage from '../messages/EmptyTransitionErrorMessage.jsx';
import DuplicateTransitionErrorMessage from '../messages/DuplicateTransitionErrorMessage.jsx';
import MissingTransitionErrorMessage from '../messages/MissingTransitionErrorMessage.jsx';

export default class FiniteAutomataMachineValidator
{
    constructor()
    {
        this.deterministic = false;
        this.startNodeId = null;
        this.startState = null;

        this.nodeLabels = new Map();
        this.nodeOutgoings = new Map();
        this.edgeSymbols = new Set();
        this.edgePlaceholders = [];
        this.edgeEmpties = [];

        this.stateToNodeIdMap = new Map();
        this.nodeIdToStateLabelMap = new Map();
    }

    setDeterministic(deterministic)
    {
        this.deterministic = deterministic;
        return this;
    }

    setStartState(nodeId, state)
    {
        this.startNodeId = nodeId;
        this.startState = state;
        return this;
    }

    /**
     * Add a state to the machine to be validated.
     * 
     * @param {string} nodeId The id of the node in the graph.
     * @param {import('../machine/FSA.js').State} state The state trying to be added to the machine.
     * @returns {this} Self for method-chaining.
     */
    addState(nodeId, state)
    {
        const label = state.getStateLabel();

        this.nodeIdToStateLabelMap.set(nodeId, label);
        this.stateToNodeIdMap.set(state, nodeId);

        // Check for duplicate states
        if (this.nodeLabels.has(label)) this.nodeLabels.get(label).push(state);
        else this.nodeLabels.set(label, [state]);

        // For duplicate transitions
        this.nodeOutgoings.set(state, new Map());

        return this;
    }
    
    addTransition(edgeId, srcState, dstState, symbol)
    {
        // For duplicate/missing transitions
        let outSymbols = this.nodeOutgoings.get(srcState);
        let outEdges = outSymbols.get(symbol);
        if (!outEdges) outSymbols.set(symbol, outEdges = new Array());
        outEdges.push(edgeId);
        return this;
    }

    addPlaceholder(edgeId)
    {
        this.edgePlaceholders.push(edgeId);
        return this;
    }

    addSymbolForEdge(edgeId, symbol)
    {  
        if (symbol === EMPTY_SYMBOL)
        {
            // For empties
            this.edgeEmpties.push(edgeId);
        }
        else
        {
            // For used symbol
            this.edgeSymbols.add(symbol);
        }

        return this;
    }

    validate(graphType, graphState)
    {
        const errors = [];
        const warnings = [];

        const {
            deterministic,
            nodeLabels,
            edgePlaceholders,
            edgeEmpties,
            nodeOutgoings,
            edgeSymbols,
            stateToNodeIdMap,
            nodeIdToStateLabelMap,
        } = this;

        // Check for incomplete edge
        if (edgePlaceholders.length > 0)
        {
            errors.push({
                component: IncompleteTransitionErrorMessage,
                message: { edgeIds: edgePlaceholders },
            });
        }

        // Check for duplicate node labels
        for (const [nodeLabel, sharedStates] of nodeLabels.entries())
        {
            if (sharedStates.length > 1)
            {
                errors.push({
                    component: DuplicateNodeErrorMessage,
                    message: {
                        label: nodeLabel, 
                        nodeIds: sharedStates.map(e => stateToNodeIdMap.get(e))
                    }
                });
            }
        }

        // Check for unreachable nodes
        const unreachables = getUnreachableNodeIds(graphType, graphState, this.startNodeId);
        if (unreachables && unreachables.length > 0)
        {
            warnings.push({
                component: UnreachableNodeErrorMessage,
                message: {
                    labels: unreachables.map(nodeId => nodeIdToStateLabelMap.get(nodeId)),
                    nodeIds: unreachables,
                }
            });
        }

        if (deterministic)
        {
            // Check for empty transitions
            if (edgeEmpties.length > 0)
            {
                errors.push({
                    component: EmptyTransitionErrorMessage,
                    message: {
                        edgeIds: edgeEmpties,
                    }
                });
            }

            // Check for duplicate edge labels
            // Check for missing edge labels
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
                                component: DuplicateTransitionErrorMessage,
                                message: { edgeIds: edges, fromNodeLabel: nodeIdToStateLabelMap.get(stateToNodeIdMap.get(state)), symbol },
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
                        component: MissingTransitionErrorMessage,
                        message: {
                            symbols: [ ...missingSymbols ],
                            label: nodeIdToStateLabelMap.get(stateToNodeIdMap.get(state)),
                        }
                    });
                    missingSymbols.length = 0;
                }
            }
        }

        return {
            errors,
            warnings,
        };
    }
}
