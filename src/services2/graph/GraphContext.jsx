import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';
import { useGraphUpdateCycle } from './GraphHooks.jsx';

import { serialize } from './GraphLoader.js';

const DEFAULT_GRAPH_STATE = {};

export const GraphTypeContext = React.createContext();

export const GraphStateContext = React.createContext();
export const GraphDispatchContext = React.createContext();

export function GraphProvider(props)
{
    const { graphType, graphState } = props;

    return (
        <GraphTypeContext.Provider value={graphType}>
            <GraphStateProvider initialState={graphState}>
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
    const { initialState } = props;
    const graphType = useContext(GraphTypeContext);
    const [ currentState, dispatch, setStateImmediately ] = useAsyncReducer(graphType.reducer, initialState);

    useGraphUpdateCycle(currentState);

    useEffect(() =>
    {
        let data = serialize(graphType, currentState);
        localStorage.setItem('graphData', JSON.stringify(data));
    });

    // If the props (or graph type) changes at all, we need to reset the graph.
    useEffect(() => setStateImmediately(initialState), [graphType, initialState, setStateImmediately]);

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
    initialState: PropTypes.object,
};
GraphStateProvider.defaultProps = {
    initialState: {},
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
