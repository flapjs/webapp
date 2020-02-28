import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@flapjs/util/MathHelper.js';
import { getElementListeners } from './GraphElement.js';

const DEFAULT_GRAPH_STATE = {};

export const GraphStateContext = React.createContext();
export const GraphDispatchContext = React.createContext();

export function GraphReducer(prev, action)
{
    let next = {...prev};
    let result = next;
    switch(action.type)
    {
        case 'add':
            {
                let key = computeElementsKey(action.elementType);
                let nextElements = key in next ? {...next[key]} : {};
                let id = action.elementId || uuid();
                let element = new (action.elementType)(id, action.opts || {});
                nextElements[id] = element;
                next[key] = nextElements;
                result = id;
            }
            break;
        case 'delete':
            {
                let key = computeElementsKey(action.elementType);
                if (key in next)
                {
                    let nextElements = {...next[key]};
                    let element = nextElements[action.elementId];
                    delete nextElements[action.elementId];
                    next[key] = nextElements;
                    element.destroy();
                }
            }
            break;
        case 'clear':
            {
                let key = computeElementsKey(action.elementType);
                if (key in next)
                {
                    next[key] = {};
                }
            }
            break;
        case 'clearAll':
            {
                next = {};
            }
            break;
        case 'update':
            // Do nothing. It's a forceUpdate().
            break;
        default:
            throw new Error(`Unsupported action type '${action.type}'`);
    }
    return [ next, result ];
}

export function GraphProvider(props)
{
    const { value } = props;
    const [ state, setState ] = useState(value);
    async function dispatch(action)
    {
        let [ nextState, result ] = GraphReducer(state, action);
        setState(nextState);
        return result;
    }

    // NOTE: Manages the graph element dirty/update cycle.
    useEffect(() =>
    {
        let animationFrameHandle = requestAnimationFrame(onAnimationFrame);
        function onAnimationFrame(now)
        {
            animationFrameHandle = requestAnimationFrame(onAnimationFrame);
            for(let elementByIds of Object.values(state))
            {
                for(let element of Object.values(elementByIds))
                {
                    // This is where all elements are washed (updated) if they are dirty :P
                    if (element.isDirty())
                    {
                        element.markDirty(false);
                        element.update();
                        for(let listener of getElementListeners(element))
                        {
                            listener.call(undefined, element);
                        }
                    }
                }
            }
        }
        return () =>
        {
            cancelAnimationFrame(animationFrameHandle);
        };
    },
    [ state ]);

    return (
        <GraphStateContext.Provider value={state}>
            <GraphDispatchContext.Provider value={dispatch}>
                {props.children}
            </GraphDispatchContext.Provider>
        </GraphStateContext.Provider>
    );
}
GraphProvider.propTypes = {
    children: PropTypes.node,
    value: PropTypes.object,
};
GraphProvider.defaultProps = {
    value: DEFAULT_GRAPH_STATE,
};

export function GraphConsumer(props)
{
    return (
        <GraphStateContext.Consumer>
            {state => (
                <GraphDispatchContext.Consumer>
                    {dispatch => (
                        props.children(state, dispatch)
                    )}
                </GraphDispatchContext.Consumer>
            )}
        </GraphStateContext.Consumer>
    );
}
GraphConsumer.propTypes = { children: PropTypes.func.isRequired };

export function UNSAFE_getGraphElements(graphState, elementType)
{
    return graphState[computeElementsKey(elementType)];
}

export function computeElementsKey(elementType)
{
    return elementType.name;
}
