import React, { useCallback, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { parse, jsonify } from './Graph.js';
import { BindableGraph } from './BindableGraph.js';

/**
 * @typedef {import('./Graph.js').ReadableGraph} ReadableGraph
 * @typedef {import('./Graph.js').WriteableGraph} WriteableGraph
 */

const GraphContext = React.createContext(null);

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
            {children}
        </GraphContext.Provider>
    );
}
GraphProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/**
 * Use writeable graph operations.
 * @returns {WriteableGraph}
 */
export function useGraph()
{
    return useContext(GraphContext);
}

/**
 * Use readable graph operations.
 * @returns {ReadableGraph}
 */
export function useReadonlyGraph()
{
    return useContext(GraphContext);
}

/**
 * Use bindable graph operations. This should only be used internally.
 * @returns {BindableGraph}
 */
export function useBindableGraph()
{
    return useContext(GraphContext);
}

export function useGraphSerializer()
{
    const graph = useBindableGraph();
    const serializer = useCallback(
        () => jsonify(graph),
        [graph]);
    return serializer;
}

export function useGraphDeserializer()
{
    const deserializer = useCallback(
        data => parse(data),
        []);
    return deserializer;
}
