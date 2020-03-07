import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useUpdateCycle } from '@flapjs/hooks/UpdateCycleHook.jsx';
import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';

import { getElementListeners } from './elements/GraphElementListener.js';
import { getStateListeners } from './GraphStateListener.js';

const DEFAULT_GRAPH_STATE = {};

export const GraphTypeContext = React.createContext();
export const GraphDispatchContext = React.createContext();

/**
 * This should not be used anywhere! Because it usually used improperly. Refer
 * to GraphHooks for more info.
 */
const GraphStateContext = React.createContext();

/**
 * To use this, you need 1 thing:
 * - the GraphType (aka BaseGraph)
 * 
 * The GraphType is simply an object (or a class with static properties)
 * that has an array of used "elementTypes" and an async "reducer" function.
 * The "reducer" is used by any behaviors or actions performed on the graph
 * elements themselves. The "elementTypes" is primarily used by the serializer
 * to identify all used elements of the graph.
 * 
 * You can also optionally provide it with the initial state of the "graphState".
 * Any time this "graphState" changes through props, the entire graph will be reset
 * to that state.
 * 
 * @param {React.Props} props The component props.
 * @returns {React.ReactNode} The rendered node.
 */
export function GraphProvider(props)
{
    const { graphType, graphState } = props;

    return (
        <GraphTypeContext.Provider value={graphType}>
            <GraphStateProvider graphState={graphState}>
                {props.children}
            </GraphStateProvider>
        </GraphTypeContext.Provider>
    );
}
GraphProvider.propTypes = {
    children: PropTypes.node,
    graphType: PropTypes.elementType.isRequired,
    graphState: PropTypes.object,
};
GraphProvider.defaultProps = {
    graphState: DEFAULT_GRAPH_STATE,
};

function GraphStateProvider(props)
{
    const graphType = useContext(GraphTypeContext);
    const [ currentState, dispatch ] = useAsyncReducer(graphType.reducer, props.graphState, true);

    useGraphUpdateCycle(currentState);

    return (
        <GraphStateContext.Provider value={currentState}>
            <GraphDispatchContext.Provider value={dispatch}>
                {props.children}
            </GraphDispatchContext.Provider>
        </GraphStateContext.Provider>
    );
}
GraphStateProvider.propTypes = {
    children: PropTypes.node,
    graphState: PropTypes.object,
};
GraphStateProvider.defaultProps = {
    graphState: {},
};

/**
 * This is only used by GraphHooks and GraphElementHooks. DO NOT USE THIS ANYWHERE ELSE!
 * This does not properly propagate ALL updates for re-renders.
 * 
 * @returns {object} The graph state object from the context.
 */
export function UNSAFE_useGraphStateContext()
{
    return useContext(GraphStateContext);
}

function useGraphUpdateCycle(state)
{
    const updateCallback = useCallback(() =>
    {
        let dirty = false;
        for(let elementByIds of Object.values(state))
        {
            let elements = Object.values(elementByIds);
            for(let element of elements)
            {
                // This is where all elements are washed (updated) if they are dirty :P
                if (element.isDirty())
                {
                    dirty = true;
                    element.markDirty(false);
                    element.onUpdate();

                    // Allow element listeners to be updated...
                    for(let listener of getElementListeners(element))
                    {
                        listener.call(undefined, element);
                    }
                }
            }
        }

        // Allow state listeners to be updated...
        if (dirty)
        {
            for(let listener of getStateListeners(state))
            {
                listener.call(undefined, state);
            }
        }
    },
    [ state ]);

    // NOTE: Manages the graph element dirty/update cycle.
    useUpdateCycle(updateCallback);
}

