import React, { useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@flapjs/util/MathHelper.js';

import { useElements } from './GraphHelper.jsx';

/**
 * @typedef WithNodeList
 * @property {Array<Object>} nodeList
 * 
 * @typedef WithEdgeList
 * @property {Array<Object>} edgeList
 * 
 * @typedef {import('./GraphHelper.jsx').ElementActions & WithNodeList} NodesAPI
 * @typedef {import('./GraphHelper.jsx').ElementActions & WithEdgeList} EdgesAPI
 * 
 * @typedef GraphContextAPI
 * @property {String} graphId
 * @property {NodesAPI} nodes
 * @property {EdgesAPI} edges
 * @property {Readonly<Object>} metadata
 * @property {Function} updateMetadata
 * @property {Function} clearMetadata
 * @property {Function} clearGraph
 */
const GraphContext = React.createContext(null);

/**
 * @returns {GraphContextAPI}
 */
export function useGraph()
{
    const ctx = useContext(GraphContext);
    return ctx;
}

export const GraphConsumer = GraphContext.Consumer;

export function GraphProvider(props)
{
    const { children } = props;

    // TODO: Make this great again. Right now, it doesn't matter.
    const graphId = 'graph_001';

    const [state, setState] = useState({ metadata: {} });

    const [nodes, nodeActions] = useElements(createNode);
    const [edges, edgeActions] = useElements(createEdge);

    const clearGraph = useCallback(function clearGraph()
    {
        nodeActions.clear();
        edgeActions.clear();
    },
    [edgeActions, nodeActions]);

    const metadata = Object.freeze(state.metadata);
    const updateMetadata = useCallback(function updateMetadata(values)
    {
        setState(state =>
        {
            state.metadata = {
                ...state.metadata,
                ...values,
            };
            return { ...state };
        });
    },
    []);
    const clearMetadata = useCallback(function clearMetadata()
    {
        setState(state =>
        {
            state.metadata = {};
            return { ...state };
        });
    },
    []);
    
    const graphProviderValue = {
        graphId,
        nodes: {
            nodeList: nodes,
            ...nodeActions,
        },
        edges: {
            edgeList: edges,
            ...edgeActions,
        },
        metadata,
        updateMetadata,
        clearMetadata,
        clearGraph,
    };
    return (
        <GraphContext.Provider value={graphProviderValue}>
            {children}
        </GraphContext.Provider>
    );
}
GraphProvider.propTypes = {
    children: PropTypes.node,
};

function createNode(values = {})
{
    return {
        id: uuid(),
        ...values
    };
}

function createEdge(fromNodeId, toNodeId, values = {})
{
    return {
        id: uuid(),
        fromNodeId,
        toNodeId,
        ...values,
    };
}
