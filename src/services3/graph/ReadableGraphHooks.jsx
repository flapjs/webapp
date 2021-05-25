import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useBindableGraph } from './GraphContext.jsx';

/**
 * @typedef {import('./BindableGraph.js').BindableGraph} BindableGraph
 * @typedef {import('./BindableGraph.js').GraphAddEvent} GraphAddEvent
 * @typedef {import('./BindableGraph.js').GraphDeleteEvent} GraphDeleteEvent
 * @typedef {import('./BindableGraph.js').GraphEdgeMoveEvent} GraphEdgeMoveEvent
 * @typedef {import('./BindableGraph.js').GraphValueEvent} GraphValueEvent
 * @typedef {import('./BindableGraph.js').GraphAttributeEvent} GraphAttributeEvent
 */

function useStableCallback(callback)
{
    const innerCallback = useRef(callback);
    useLayoutEffect(() =>
    {
        innerCallback.current = callback;
    });
    const stable = useCallback((...args) => innerCallback.current(...args), []);
    return stable;
}

/**
 * 
 * @param {BindableGraph} graph 
 * @param {(e: GraphAddEvent) => void} addCallback 
 * @param {(e: GraphDeleteEvent) => void} [deleteCallback] 
 */
function useAddDeleteGraphEffect(graph, addCallback, deleteCallback = undefined)
{
    const onAdd = useStableCallback(addCallback);
    const onDelete = useStableCallback(deleteCallback || addCallback);
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
}

/** @type {import('./Graph.js').IsEmpty} */
export function useGraphEmpty()
{
    const graph = useBindableGraph();
    const [empty, setEmpty] = useState(graph.isEmpty());
    useAddDeleteGraphEffect(graph,
        e =>
        {
            if (e.targetType === 'node')
            {
                if (graph.countNodes() === 1)
                {
                    setEmpty(false);
                }
            }
            else if (e.targetType === 'edge')
            {
                if (graph.countEdges() === 1)
                {
                    setEmpty(false);
                }
            }
        },
        e =>
        {
            if (graph.isEmpty())
            {
                setEmpty(true);
            }
        });
    return empty;
}

/** @type {import('./Graph.js').CountNodes} */
export function useNodeCount()
{
    const graph = useBindableGraph();
    const [count, setCount] = useState(graph.countNodes());
    useAddDeleteGraphEffect(graph, e =>
    {
        if (e.targetType === 'node')
        {
            setCount(graph.countNodes());
        }
    });
    return count;
}

/** @type {import('./Graph.js').CountEdges} */
export function useEdgeCount()
{
    const graph = useBindableGraph();
    const [count, setCount] = useState(graph.countEdges());
    useAddDeleteGraphEffect(graph, e =>
    {
        if (e.targetType === 'edge')
        {
            setCount(graph.countEdges());
        }
    });
    return count;
}

/** @type {import('./Graph.js').HasNode} */
export function useNodeExists(nodeKey)
{
    const graph = useBindableGraph();
    const [exists, setExists] = useState(graph.hasNode(nodeKey));
    useAddDeleteGraphEffect(graph, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            setExists(true);
        }
    }, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            setExists(false);
        }
    });
    return exists;
}

/** @type {import('./Graph.js').HasEdge} */
export function useEdgeExists(edgeKey)
{
    const graph = useBindableGraph();
    const [exists, setExists] = useState(graph.hasEdge(edgeKey));
    useAddDeleteGraphEffect(graph, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setExists(true);
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setExists(false);
        }
    });
    return exists;
}

/**
 * @param {BindableGraph} graph 
 * @param {(e: GraphAddEvent) => void} addCallback 
 * @param {(e: GraphDeleteEvent) => void} deleteCallback
 * @param {(e: GraphEdgeMoveEvent) => void} edgeMoveCallback
 */
function useAddDeleteEdgeMoveGraphEffect(graph, addCallback, deleteCallback, edgeMoveCallback)
{
    const onAdd = useStableCallback(addCallback);
    const onDelete = useStableCallback(deleteCallback);
    const onEdgeMove = useStableCallback(edgeMoveCallback);
    useEffect(() =>
    {
        graph.addEventListener('add', onAdd);
        graph.addEventListener('delete', onDelete);
        graph.addEventListener('edgemove', onEdgeMove);
        return () =>
        {
            graph.removeEventListener('add', onAdd);
            graph.removeEventListener('delete', onDelete);
            graph.removeEventListener('edgemove', onEdgeMove);
        };
    }, [graph, onAdd, onDelete, onEdgeMove]);
}

/** @type {import('./Graph.js').GetEdgeFrom} */
export function useEdgeFrom(edgeKey)
{
    const graph = useBindableGraph();
    const [from, setFrom] = useState(graph.hasEdge(edgeKey)
        ? graph.getEdgeFrom(edgeKey)
        : null);
    useAddDeleteEdgeMoveGraphEffect(graph, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setFrom(graph.getEdgeFrom(edgeKey));
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setFrom(null);
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setFrom(e.from);
        }
    });
    return from;
}

/** @type {import('./Graph.js').GetEdgeTo} */
export function useEdgeTo(edgeKey)
{
    const graph = useBindableGraph();
    const [to, setTo] = useState(graph.hasEdge(edgeKey)
        ? graph.getEdgeTo(edgeKey)
        : null);
    useAddDeleteEdgeMoveGraphEffect(graph, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setTo(graph.getEdgeTo(edgeKey));
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setTo(null);
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setTo(e.to);
        }
    });
    return to;
}

/**
 * @param {BindableGraph} graph 
 * @param {(e: GraphAddEvent) => void} addCallback 
 * @param {(e: GraphDeleteEvent) => void} deleteCallback
 * @param {(e: GraphValueEvent) => void} valueCallback
 */
function useAddDeleteValueGraphEffect(graph, addCallback, deleteCallback, valueCallback)
{
    const onAdd = useStableCallback(addCallback);
    const onDelete = useStableCallback(deleteCallback);
    const onValue = useStableCallback(valueCallback);
    useEffect(() =>
    {
        graph.addEventListener('add', onAdd);
        graph.addEventListener('delete', onDelete);
        graph.addEventListener('value', onValue);
        return () =>
        {
            graph.removeEventListener('add', onAdd);
            graph.removeEventListener('delete', onDelete);
            graph.removeEventListener('value', onValue);
        };
    }, [graph, onAdd, onDelete, onValue]);
}

/** @type {import('./Graph.js').GetNodeValue} */
export function useNodeValue(nodeKey)
{
    const graph = useBindableGraph();
    const [value, setValue] = useState(graph.hasNode(nodeKey)
        ? graph.getNodeValue(nodeKey)
        : null);
    useAddDeleteValueGraphEffect(graph, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            setValue(graph.getNodeValue(value));
        }
    }, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            setValue(null);
        }
    }, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            setValue(e.value);
        }
    });
    return value;
}

/** @type {import('./Graph.js').GetEdgeValue} */
export function useEdgeValue(edgeKey)
{
    const graph = useBindableGraph();
    const [value, setValue] = useState(graph.hasEdge(edgeKey)
        ? graph.getEdgeValue(edgeKey)
        : null);
    useAddDeleteValueGraphEffect(graph, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setValue(graph.getEdgeValue(value));
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setValue(null);
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setValue(e.value);
        }
    });
    return value;
}

/**
 * @param {BindableGraph} graph 
 * @param {(e: GraphAddEvent) => void} addCallback 
 * @param {(e: GraphDeleteEvent) => void} deleteCallback
 * @param {(e: GraphAttributeEvent) => void} attributeCallback
 */
function useAddDeleteAttributeGraphEffect(graph, addCallback, deleteCallback, attributeCallback)
{
    const onAdd = useStableCallback(addCallback);
    const onDelete = useStableCallback(deleteCallback);
    const onAttribute = useStableCallback(attributeCallback);
    useEffect(() =>
    {
        graph.addEventListener('add', onAdd);
        graph.addEventListener('delete', onDelete);
        graph.addEventListener('attribute', onAttribute);
        return () =>
        {
            graph.removeEventListener('add', onAdd);
            graph.removeEventListener('delete', onDelete);
            graph.removeEventListener('attribute', onAttribute);
        };
    }, [graph, onAdd, onDelete, onAttribute]);
}

/** @type {import('./Graph.js').GetNodeAttribute} */
export function useNodeAttribute(nodeKey, attributeKey)
{
    const graph = useBindableGraph();
    const [attribute, setAttribute] = useState(
        graph.hasNode(nodeKey) && graph.hasNodeAttribute(nodeKey, attributeKey)
            ? graph.getNodeAttribute(nodeKey, attributeKey)
            : null);
    useAddDeleteAttributeGraphEffect(graph, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            if (graph.hasNodeAttribute(nodeKey, attributeKey))
            {
                setAttribute(graph.getNodeAttribute(nodeKey, attributeKey));
            }
            else
            {
                setAttribute(null);
            }
        }
    }, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            setAttribute(null);
        }
    }, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            setAttribute(e.value);
        }
    });
    return attribute;
}

/** @type {import('./Graph.js').GetNodeAttribute} */
export function useEdgeAttribute(edgeKey, attributeKey)
{
    const graph = useBindableGraph();
    const [attribute, setAttribute] = useState(
        graph.hasEdge(edgeKey) && graph.hasEdgeAttribute(edgeKey, attributeKey)
            ? graph.getEdgeAttribute(edgeKey, attributeKey)
            : null);
    useAddDeleteAttributeGraphEffect(graph, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            if (graph.hasEdgeAttribute(edgeKey, attributeKey))
            {
                setAttribute(graph.getEdgeAttribute(edgeKey, attributeKey));
            }
            else
            {
                setAttribute(null);
            }
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setAttribute(null);
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            setAttribute(e.value);
        }
    });
    return attribute;
}

/** @type {import('./Graph.js').GetNodeAttributeKeys} */
export function useNodeAttributeKeys(nodeKey)
{
    const graph = useBindableGraph();
    const [attributeKeys, updateAttributeKeys] = useState(graph.hasNode(nodeKey)
        ? graph.getNodeAttributeKeys(nodeKey)
        : []);
    useAddDeleteAttributeGraphEffect(graph, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            updateAttributeKeys(graph.getNodeAttributeKeys(nodeKey));
        }
    }, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            updateAttributeKeys([]);
        }
    }, e =>
    {
        if (e.targetType === 'node' && e.targetKey === nodeKey)
        {
            updateAttributeKeys(graph.getNodeAttributeKeys(nodeKey));
        }
    });
    return attributeKeys;
}

/** @type {import('./Graph.js').GetEdgeAttributeKeys} */
export function useEdgeAttributeKeys(edgeKey)
{
    const graph = useBindableGraph();
    const [attributeKeys, updateAttributeKeys] = useState(graph.hasEdge(edgeKey)
        ? graph.getEdgeAttributeKeys(edgeKey)
        : []);
    useAddDeleteAttributeGraphEffect(graph, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            updateAttributeKeys(graph.getEdgeAttributeKeys(edgeKey));
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            updateAttributeKeys([]);
        }
    }, e =>
    {
        if (e.targetType === 'edge' && e.targetKey === edgeKey)
        {
            updateAttributeKeys(graph.getEdgeAttributeKeys(edgeKey));
        }
    });
    return attributeKeys;
}

/** @type {import('./Graph.js').GetNodeKeys} */
export function useNodeKeys()
{
    const graph = useBindableGraph();
    const [nodeKeys, updateNodeKeys] = useState(graph.getNodeKeys());
    useAddDeleteGraphEffect(graph, e =>
    {
        if (e.targetType === 'node')
        {
            updateNodeKeys(graph.getNodeKeys());
        }
    });
    return nodeKeys;
}

/** @type {import('./Graph.js').GetEdgeKeys} */
export function useEdgeKeys()
{
    const graph = useBindableGraph();
    const [edgeKeys, updateEdgeKeys] = useState(graph.getEdgeKeys());
    useAddDeleteGraphEffect(graph, e =>
    {
        if (e.targetType === 'edge')
        {
            updateEdgeKeys(graph.getEdgeKeys());
        }
    });
    return edgeKeys;
}
