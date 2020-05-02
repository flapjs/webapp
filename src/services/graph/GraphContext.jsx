import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@flapjs/util/MathHelper.js';

import { useUpdateCycle } from '@flapjs/hooks/UpdateCycleHook.jsx';
import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';

import { getElementListeners } from './elements/GraphElementListener.js';
import { getStateListeners } from './GraphStateListener.js';

import { getElementTypeListeners } from './elements/GraphElementTypeListener.js';

const DEFAULT_GRAPH_STATE = {};

export const GraphTypeContext = React.createContext(null);
export const GraphDispatchContext = React.createContext(null);

/**
 * This should not be used anywhere! Because it usually used improperly. Refer
 * to GraphHooks for more info.
 */
const GraphStateContext = React.createContext(null);

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
 * @param {object} props The component props.
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
    const [ currentState, dispatch ] = useAsyncReducer((state, action) =>
    {
        const result = graphType.reducer && graphType.reducer(state, action);
        return result || GraphReducer(graphType, state, action);
    },
    props.graphState, true);

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
        let stateDirty = false;
        for(let elementByIds of Object.values(state))
        {
            let dirty = false;
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

            // Allow element type listeners to be updated...
            if (dirty)
            {
                stateDirty = true;
                for(let listener of getElementTypeListeners(elementByIds))
                {
                    listener.call(undefined, elements);
                }
            }
        }

        // Allow state listeners to be updated...
        if (stateDirty)
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

/**
 * The default graph reducer (if action was not handled by the given reducer() from the graph type).
 * 
 * @param {typeof import('./BaseGraph.js').default} graphType The type of graph for the state.
 * @param {object} graphState The previous state.
 * @param {object} action The action options to perform. Specify `type` to select which action to perform.
 * @returns {object} The resultant state. Or falsey if no changes.
 */
export function GraphReducer(graphType, graphState, action)
{
    switch(action.type)
    {
        case 'add':
        {
            const { elementType, elementId, opts } = action;

            let next = { ...graphState };
            let key = graphType.getElementTypeKeyForElementType(elementType);
            let nextElements = key in next ? {...next[key]} : {};
            let id = elementId || uuid();
            let element = new (elementType)(id, opts || {});
            nextElements[id] = element;
            next[key] = nextElements;
            return [ next, element ];
        }
        case 'delete':
        {
            const { elementType, elementId } = action;

            let next = { ...graphState };
            let key = graphType.getElementTypeKeyForElementType(elementType);
            if (key in next)
            {
                let nextElements = {...next[key]};
                let element = nextElements[elementId];
                delete nextElements[elementId];
                next[key] = nextElements;
                element.onDestroy(graphType, next);
                element.markDead();
            }
            return next;
        }
        case 'deleteAll':
        {
            const { elementType, elementIds } = action;

            let next = { ...graphState };
            let key = graphType.getElementTypeKeyForElementType(elementType);
            if (key in next)
            {
                let nextElements = {...next[key]};
                for(let elementId of elementIds)
                {
                    let element = nextElements[elementId];
                    delete nextElements[elementId];
                    next[key] = nextElements;
                    element.onDestroy(graphType, next);
                    element.markDead();
                }
            }
            return next;
        }
        case 'clear':
        {
            const { elementType } = action;
            
            let next = { ...graphState };
            let key = graphType.getElementTypeKeyForElementType(elementType);
            if (key in next)
            {
                for(let element of Object.values(next[key]))
                {
                    element.onDestroy(graphType, next);
                    element.markDead();
                }
                next[key] = {};
            }
            return next;
        }
        case 'clearAll':
        {
            const next = {};

            // Destroy all previous elements...
            for(let elementType of Object.keys(graphState))
            {
                for(let element of Object.values(graphState[elementType]))
                {
                    element.onDestroy(graphType, next);
                    element.markDead();
                }
            }
            return next;
        }
        case 'forceUpdate':
        {
            // Do nothing. It's a forceUpdate().
            return { ...graphState };
        }
        // NOTE: Be careful when using "resetState", any references to old elements
        // are marked as DEAD and therefore should not be re-used.
        case 'resetState':
        {
            const { state } = action;

            if (state)
            {
                // Destroy all previous elements...
                for(let elementType of Object.keys(graphState))
                {
                    for(let element of Object.values(graphState[elementType]))
                    {
                        element.onDestroy(graphType, state);
                        element.markDead();
                    }
                }
    
                return state;
            }
            else
            {
                // eslint-disable-next-line no-console
                console.warn('Trying to resetState to null - skipping...');
            }

            return;
        }
        case 'swapProperty':
        {
            let element = graphType.getElement(graphState, action.elementType, action.elementId);
            let other = graphType.getElement(graphState, action.targetType || action.elementType, action.targetId);
            let value = element[action.property];
            element[action.property] = other[action.property];
            other[action.property] = value;
            
            // NOTE: Why not cause a re-render?
            // This action's changes should really only be handled by markDirty(), because it deals only
            // with individual elements.
            return graphState;
        }
    }
}
