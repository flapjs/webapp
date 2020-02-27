import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { uuid } from '@flapjs/util/MathHelper.js';

const DEFAULT_GRAPH_STATE = {
};

export const GraphStateContext = React.createContext();
export const GraphDispatchContext = React.createContext();

export function GraphReducer(prev, action)
{
    let next = {...prev};
    switch(action.type)
    {
        case 'add':
            {
                let key = action.elementType.elementsKey;
                let nextElements = key in next ? {...next[key]} : {};
                let id = action.elementId || uuid();
                let element = new (action.elementType)(id, action.opts);
                nextElements[id] = element;
                next[key] = nextElements;
            }
            break;
        case 'delete':
            {
                let key = action.elementType.elementsKey;
                if (key in next)
                {
                    let nextElements = {...next[key]};
                    delete nextElements[action.elementId];
                    next[key] = nextElements;
                }
            }
            break;
        case 'clear':
            {
                let key = action.elementType.elementsKey;
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
        default:
            throw new Error(`Unsupported action type '${action.type}'`);
    }
    return next;
}

export function GraphProvider(props)
{
    const { value } = props;
    const [state, setState] = useState(value);
    function dispatch(action) { setState(GraphReducer(state, action)); }
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

export function useGraphElements(elementType)
{
    let graphState = useContext(GraphStateContext);
    let graphDispatch = useContext(GraphDispatchContext);
    let elements = Object.values(graphState[elementType.elementsKey] || {});
    let elementsDispatch = action => graphDispatch({elementType, ...action});
    return [ elements, elementsDispatch ];
}

export function useGraphElement(elementId)
{

}
