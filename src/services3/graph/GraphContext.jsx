import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Graph } from './Graph.js';
import { BindableGraph } from './BindableGraph.js';

/**
 * @typedef {import('./Graph.js').NodeKey} NodeKey
 * @typedef {import('./Graph.js').EdgeKey} EdgeKey
 * @typedef {import('./Graph.js').WriteonlyGraph} WriteonlyGraph
 * @typedef {import('./Graph.js').SetNodeAttributeCallback} SetNodeAttributeCallback
 * @typedef {import('./Graph.js').SetEdgeAttributeCallback} SetEdgeAttributeCallback
 */

const GraphContext = React.createContext(null);
const GraphAPIContext = React.createContext(null);

/**
 * @template T
 * @param {() => T} initialValueCallback 
 * @returns {React.MutableRefObject<T|null>}
 */
function useLazyRef(initialValueCallback)
{
    let ref = useRef(null);
    if (ref.current === null)
    {
        ref.current = initialValueCallback();
    }
    return ref;
}

/**
 * @param {object} [props]
 * @param {React.ReactNode} [props.children]
 */
export function GraphProvider({ children })
{
    const graphRef = useLazyRef(() => new BindableGraph());
    return (
        <GraphContext.Provider value={graphRef.current}>
            <GraphAPIProvider graph={graphRef.current}>
                {children}
            </GraphAPIProvider>
        </GraphContext.Provider>
    );
}
GraphProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/** @returns {BindableGraph} */
function useGraph()
{
    return useContext(GraphContext);
}

/**
 * @param {object} [props] 
 * @param {Graph} [props.graph]
 * @param {React.ReactNode} [props.children]
 */
function GraphAPIProvider({ graph, children })
{
    const copyGraphFrom = useCallback(
        (other) => graph.copyGraphFrom(other),
        [graph]);
    const moveGraphFrom = useCallback(
        (other) => graph.moveGraphFrom(other),
        [graph]);
    const clearGraph = useCallback(
        () => graph.clearGraph(),
        [graph]);
    const addNode = useCallback(
        (key, value, attributes) =>
            graph.addNode(key, value, attributes),
        [graph]);
    const addEdge = useCallback(
        (key, from, to, value, attributes) =>
            graph.addEdge(key, from, to, value, attributes),
        [graph]);
    const moveEdge = useCallback(
        (key, from, to) => graph.moveEdge(key, from, to),
        [graph]);
    const deleteNode = useCallback(
        (key) => graph.deleteNode(key),
        [graph]);
    const deleteEdge = useCallback(
        (key) => graph.deleteEdge(key),
        [graph]);
    const setNodeValue = useCallback(
        (key) => graph.setNodeValue(key),
        [graph]);
    const setEdgeValue = useCallback(
        (key) => graph.setEdgeValue(key),
        [graph]);
    const setNodeAttribute = useCallback(
        (key, attribute, value) =>
        {
            if (typeof value === 'function')
            {
                let nextValue = value(graph.getNodeAttribute(key, attribute));
                graph.setNodeAttribute(key, attribute, nextValue);
            }
            else
            {
                graph.setNodeAttribute(key, attribute, value);
            }
        },
        [graph]);
    const setEdgeAttribute = useCallback(
        (key, attribute, value) =>
        {
            if (typeof value === 'function')
            {
                let nextValue = value(graph.getEdgeAttribute(key, attribute));
                graph.setEdgeAttribute(key, attribute, nextValue);
            }
            else
            {
                graph.setEdgeAttribute(key, attribute, value);
            }
        },
        [graph]);
    const deleteNodeAttribute = useCallback(
        (key, attribute) => graph.deleteNodeAttribute(key, attribute),
        [graph]);
    const deleteEdgeAttribute = useCallback(
        (key, attribute) => graph.deleteEdgeAttribute(key, attribute),
        [graph]);
    /** @type {WriteonlyGraph} */
    const api = {
        copyGraphFrom,
        moveGraphFrom,
        clearGraph,
        addNode,
        addEdge,
        moveEdge,
        deleteNode,
        deleteEdge,
        setNodeValue,
        setEdgeValue,
        setNodeAttribute,
        setEdgeAttribute,
        deleteNodeAttribute,
        deleteEdgeAttribute,
    };
    return (
        <GraphAPIContext.Provider value={api}>
            {children}
        </GraphAPIContext.Provider>
    );
}
GraphAPIProvider.propTypes = {
    graph: PropTypes.instanceOf(Graph).isRequired,
    children: PropTypes.node.isRequired,
};

/** @returns {WriteonlyGraph} */
export function useGraphAPI()
{
    return useContext(GraphAPIContext);
}

/** @returns {Array<NodeKey>} */
export function useNodeKeys()
{
    const graph = useGraph();
    const [list, update] = useState([]);
    const onAdd = useCallback(
        (e) => e.targetType === 'node'
            && update(graph.getNodeKeys()),
        [graph]);
    const onDelete = useCallback(
        (e) => e.targetType === 'node'
            && update(graph.getNodeKeys()),
        [graph]);
    useEffect(() =>
    {
        graph.addEventListener('add', onAdd);
        graph.addEventListener('delete', onDelete);
        return () =>
        {
            graph.removeEventListener('add', onAdd);
            graph.removeEventListener('delete', onDelete);
        };
    }, [graph, onAdd, onDelete]);
    return list;
}

/** @returns {Array<EdgeKey>} */
export function useEdgeKeys()
{
    const graph = useGraph();
    const [list, update] = useState([]);
    const onAdd = useCallback(
        (e) => e.targetType === 'edge'
            && update(graph.getEdgeKeys()),
        [graph]);
    const onDelete = useCallback(
        (e) => e.targetType === 'edge'
            && update(graph.getEdgeKeys()),
        [graph]);
    useEffect(() =>
    {
        graph.addEventListener('add', onAdd);
        graph.addEventListener('delete', onDelete);
        return () =>
        {
            graph.removeEventListener('add', onAdd);
            graph.removeEventListener('delete', onDelete);
        };
    }, [graph, onAdd, onDelete]);
    return list;
}

/**
 * @param {NodeKey} nodeKey
 * @returns {any}
 */
export function useNodeValue(nodeKey)
{
    const graph = useGraph();
    const [value, update] = useState(null);
    const onValue = useCallback(
        (e) => e.targetType === 'node'
            && e.targetKey === nodeKey
            && update(graph.getNodeValue(nodeKey)),
        [graph, nodeKey]);
    useEffect(() =>
    {
        graph.addEventListener('value', onValue);
        return () => graph.removeEventListener('value', onValue);
    }, [graph, onValue]);
    return value;
}

/**
 * @param {EdgeKey} edgeKey
 * @returns {any}
 */
export function useEdgeValue(edgeKey)
{
    const graph = useGraph();
    const [value, update] = useState(null);
    const onValue = useCallback(
        (e) => e.targetType === 'edge'
            && e.targetKey === edgeKey
            && update(graph.getEdgeValue(edgeKey)),
        [graph, edgeKey]);
    useEffect(() =>
    {
        graph.addEventListener('value', onValue);
        return () => graph.removeEventListener('value', onValue);
    }, [graph, onValue]);
    return value;
}

/**
 * @param {NodeKey} nodeKey
 * @param {string} attributeKey
 * @returns {[any, SetNodeAttributeCallback]}
 */
export function useNodeAttribute(nodeKey, attributeKey)
{
    const graph = useGraph();
    const [value, update] = useState(null);
    const onAttribute = useCallback(
        (e) => e.targetType === 'node'
            && e.targetKey === nodeKey
            && e.attributeKey === attributeKey
            && update(graph.getNodeAttribute(nodeKey, attributeKey)),
        [graph, nodeKey, attributeKey]);
    useEffect(() =>
    {
        graph.addEventListener('attribute', onAttribute);
        return () => graph.removeEventListener('attribute', onAttribute);
    }, [graph, onAttribute]);
    const { setNodeAttribute } = useGraphAPI();
    const setter = useCallback(
        (value) => setNodeAttribute(nodeKey, attributeKey, value),
        [setNodeAttribute, nodeKey, attributeKey]);
    return [value, setter];
}

/**
 * @param {EdgeKey} edgeKey
 * @param {string} attributeKey
 * @returns {[any, SetEdgeAttributeCallback]}
 */
export function useEdgeAttribute(edgeKey, attributeKey)
{
    const graph = useGraph();
    const [value, update] = useState(null);
    const onAttribute = useCallback(
        (e) => e.targetType === 'edge'
            && e.targetKey === edgeKey
            && e.attributeKey === attributeKey
            && update(graph.getNodeAttribute(edgeKey, attributeKey)),
        [graph, edgeKey, attributeKey]);
    useEffect(() =>
    {
        graph.addEventListener('attribute', onAttribute);
        return () => graph.removeEventListener('attribute', onAttribute);
    }, [graph, onAttribute]);
    return value;
}

// TODO: Missing getEdgeAttributes()

/**
 * @param {EdgeKey} edgeKey
 * @returns {NodeKey}
 */
export function useEdgeFrom(edgeKey)
{
    const graph = useGraph();
    const [from, update] = useState(null);
    const onEdgeMove = useCallback(
        (e) => e.targetKey === edgeKey
            && e.previousFrom !== e.from
            && update(graph.getEdgeFrom(edgeKey)),
        [graph, edgeKey]);
    useEffect(() =>
    {
        graph.addEventListener('edgemove', onEdgeMove);
        return () => graph.removeEventListener('edgemove', onEdgeMove);
    }, [graph, onEdgeMove]);
    return from;
}

/**
 * @param {EdgeKey} edgeKey
 * @returns {NodeKey}
 */
export function useEdgeTo(edgeKey)
{
    const graph = useGraph();
    const [to, update] = useState(null);
    const onEdgeMove = useCallback(
        (e) => e.targetKey === edgeKey
            && e.previousTo !== e.to
            && update(graph.getEdgeTo(edgeKey)),
        [graph, edgeKey]);
    useEffect(() =>
    {
        graph.addEventListener('edgemove', onEdgeMove);
        return () => graph.removeEventListener('edgemove', onEdgeMove);
    }, [graph, onEdgeMove]);
    return to;
}

export function useGraphSerializer()
{
    const graph = useGraph();
    const serializer = useCallback(
        () => Graph.jsonify(graph),
        [graph]);
    return serializer;
}

export function useGraphDeserializer()
{
    const deserializer = useCallback(
        data => Graph.parse(data),
        []);
    return deserializer;
}
