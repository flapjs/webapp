import React from 'react';
import PropTypes from 'prop-types';

import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';
import { useGraphUpdateCycle } from './GraphHooks.jsx';

import GraphReducer from './GraphReducer.js';

const DEFAULT_GRAPH_STATE = {};
const DEFAULT_GRAPH_REDUCER = GraphReducer;

export const GraphStateContext = React.createContext();
export const GraphDispatchContext = React.createContext();

export function GraphProvider(props)
{
    const { state, reducer } = props;
    const [ currentState, dispatch ] = useAsyncReducer(reducer, state);

    useGraphUpdateCycle(currentState);

    return (
        <GraphStateContext.Provider value={currentState}>
            <GraphDispatchContext.Provider value={dispatch}>
                {props.children}
            </GraphDispatchContext.Provider>
        </GraphStateContext.Provider>
    );
}
GraphProvider.propTypes = {
    children: PropTypes.node,
    state: PropTypes.object,
    reducer: PropTypes.func,
};
GraphProvider.defaultProps = {
    state: DEFAULT_GRAPH_STATE,
    reducer: DEFAULT_GRAPH_REDUCER,
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
