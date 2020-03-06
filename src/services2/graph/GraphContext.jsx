import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';
import { useGraphUpdateCycle } from './GraphHooks.jsx';

const DEFAULT_GRAPH_STATE = {};

export const GraphTypeContext = React.createContext();

// NOTE: This should not be used anywhere! Because it usually used improperly. Refer to GraphHooks for proper usage.
export const GraphStateContext = React.createContext();
export const GraphDispatchContext = React.createContext();

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
 * If you ever need an old-fashioned context consumer...
 * 
 * @param {React.Props} props The component props.
 * @returns {React.ReactNode} The rendered node.
 */
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
