import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement.js';

import { EMPTY_SYMBOL as FSA_EMPTY_SYMBOL, State } from '@flapjs/modules/fa/machine/FSA.js';
import { EMPTY_SYMBOL } from '@flapjs/modules/fa/machine/Symbols.js';

import FiniteAutomataMachineValidator from './FiniteAutomataMachineValidator.js';

export function buildMachineFromGraph(machineBuilder, machine, graphType, graphState, opts)
{
    const nodeTypeKey = graphType.getElementTypeKeyForElementType(NodeElement);
    const edgeTypeKey = graphType.getElementTypeKeyForElementType(EdgeElement);

    machineBuilder.sourceMap.clear();
    machineBuilder.errors.length = 0;
    machineBuilder.warnings.length = 0;

    const deterministic = machine.isDeterministic();
    machine.clear();

    const validator = new FiniteAutomataMachineValidator().setDeterministic(deterministic);

    const nodeToStateMap = new Map();

    if (graphState[nodeTypeKey])
    {
        for (const nodeId of Object.keys(graphState[nodeTypeKey]))
        {
            const node = graphState[nodeTypeKey][nodeId];
            const { label, final, initial } = node;

            let state = new State(label, node);
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
                validator.setStartState(nodeId, state);
            }

            validator.addState(nodeId, state);
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
                validator.addPlaceholder(edgeId);
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

                    // Add to machine...
                    machine.addTransition(srcState, dstState, transitionSymbol, edge);

                    // NOTE: This validates the user-input symbols, not the translated symbols.
                    validator.addSymbolForEdge(edgeId, symbol);
                    // This prepares to validate the entire transition.
                    validator.addTransition(edgeId, srcState, dstState, transitionSymbol);
                }
            }
        }
    }
    
    return validator.validate(graphType, graphState);
}
