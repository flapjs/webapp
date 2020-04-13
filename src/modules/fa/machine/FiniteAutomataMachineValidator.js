import { EMPTY_SYMBOL } from './Symbols.js';
import { getUnreachableNodes } from './FiniteAutomataGraphUnreachableHandler.js';

export const ERROR_DUPLICATE_STATE = 'duplicateState';
export const ERROR_UNREACHABLE_STATE = 'unreachableState';
export const ERROR_DUPLICATE_TRANSITION = 'duplicateTransition';
export const ERROR_EMPTY_TRANSITION = 'emptyTransition';
export const ERROR_INCOMPLETE_TRANSITION = 'incompleteTransition';
export const ERROR_MISSING_TRANSITION = 'missingTransition';

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
     * @param {import('./FSA.js').State} state The state trying to be added to the machine.
     * @returns {this} Self for method-chaining.
     */
    addState(nodeId, state)
    {
        const label = state.getStateLabel();

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
        } = this;

        //Check for incomplete edge
        if (edgePlaceholders.length > 0)
        {
            errors.push({
                name: ERROR_INCOMPLETE_TRANSITION,
                edges: edgePlaceholders
            });
        }

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
        const unreachables = getUnreachableNodes(graphType, graphState, this.startState);
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

        return {
            errors,
            warnings,
        };
    }
}
