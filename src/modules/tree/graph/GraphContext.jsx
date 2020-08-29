import React, { useContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@flapjs/util/MathHelper.js';

const GraphContext = React.createContext(null);

export const GraphConsumer = GraphContext.Consumer;

export function GraphProvider(props)
{
    const { children } = props;

    const [state, setState] = useState({ nodes: {}, edges: {} });

    // Make sure these are never modified.
    const nodeList = Object.freeze(Object.values(state.nodes));
    const edgeList = Object.freeze(Object.values(state.edges));

    const addNode = useCallback(function addNode(nodeProps = {})
    {
        const nodeId = nodeProps.id || uuid();
        if (nodeId in state.nodes) return;

        const node = createNodeObject(nodeId, nodeProps);

        const nextNodes = {
            ...state.nodes,
            [nodeId]: node,
        };
        
        state.nodes = nextNodes;
        setState({ ...state });
    },
    [state]);

    const removeNode = useCallback(function removeNode(nodeId)
    {
        if (nodeId in state.nodes)
        {
            const {
                // eslint-disable-next-line no-unused-vars
                [nodeId]: deletedNode,
                ...nextNodes
            } = state.nodes;

            state.nodes = nextNodes;
            setState({ ...state });
        }
    },
    [state]);

    const updateNode = useCallback(function updateNode(nodeId, nodeProps)
    {
        if (nodeId in state.nodes)
        {
            const node = state.nodes[nodeId];
            const nextNode = updateNodeObject(node, nodeProps);

            const nextNodes = {
                ...state.nodes,
                [nodeId]: nextNode,
            };
            
            state.nodes = nextNodes;
            setState({ ...state });
        }
    },
    [state]);

    const getNode = useCallback(function getNode(nodeId)
    {
        return state.nodes[nodeId];
    },
    [state]);

    const addEdge = useCallback(function addEdge(fromNodeId, toNodeId, edgeProps = {})
    {
        const edgeId = edgeProps.id || uuid();
        if (edgeId in state.edges) return;
        if (typeof fromNodeId !== 'string') throw new Error('Invalid from node id.');
        if (typeof toNodeId !== 'string') throw new Error('Invalid to node id.');

        const edge = createEdgeObject(edgeId, fromNodeId, toNodeId, edgeProps);

        const nextEdges = {
            ...state.edges,
            [edgeId]: edge,
        };
        
        state.edges = nextEdges;
        setState({ ...state });
    },
    [state]);

    const removeEdge = useCallback(function removeEdge(edgeId)
    {
        if (edgeId in state.edges)
        {
            const {
                // eslint-disable-next-line no-unused-vars
                [edgeId]: deletedEdge,
                ...nextEdges
            } = state.edges;

            state.edges = nextEdges;
            setState({ ...state });
        }
    },
    [state]);

    const updateEdge = useCallback(function updateEdge(edgeId, edgeProps)
    {
        if (edgeId in state.edges)
        {
            const edge = state.edges[edgeId];
            const nextEdge = updateEdgeObject(edge, edgeProps);

            const nextEdges = {
                ...state.edges,
                [edgeId]: nextEdge,
            };
            
            state.edges = nextEdges;
            setState({ ...state });
        }
    },
    [state]);

    const getEdge = useCallback(function getEdge(edgeId)
    {
        return state.edges[edgeId];
    },
    [state]);

    const clearGraph = useCallback(function clearGraph()
    {
        state.nodes = {};
        state.edges = {};
        setState({ ...state });
    },
    [state]);

    const graphProviderValues = {
        addNode,
        removeNode,
        updateNode,
        getNode,
        addEdge,
        removeEdge,
        updateEdge,
        clearGraph,
        getEdge,
        nodeList,
        edgeList,
    };
    return (
        <GraphContext.Provider value={graphProviderValues}>
            {children}
        </GraphContext.Provider>
    );
}
GraphProvider.propTypes = {
    children: PropTypes.node,
};

export function useGraph()
{
    const ctx = useContext(GraphContext);

    if (!ctx)
    {
        throw Error('useGraph() must be called from a descendent of "GraphProvider"');
    }

    return ctx;
}

function createNodeObject(id, props)
{
    return {
        id,
        ...props,
    };
}

function updateNodeObject(prevNode, props)
{
    return {
        ...prevNode,
        ...props,
    };
}

function createEdgeObject(id, fromNodeId, toNodeId, props)
{
    return {
        id,
        fromNodeId,
        toNodeId,
        ...props,
    };
}

function updateEdgeObject(prevEdge, props)
{
    return {
        ...prevEdge,
        ...props,
    };
}
