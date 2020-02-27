import React, { useContext, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { GraphStateContext, GraphDispatchContext } from './GraphContext.jsx';
import ControlledEdgeElementComponent from './ControlledEdgeElementComponent.jsx';

import { findGraphElementWithinPosition } from './GraphElementHelper.js';
import NodeElement from './NodeElement.js';
import EdgeElement from './EdgeElement.js';

export default function ProxyEdgeArea(props)
{
    const [ proxyEdgeProps, updateProxyEdge ] = useProxyEdge();
    return (
        <>
        <ProxyEdgeContext.Provider value={updateProxyEdge}>
            {props.children}
        </ProxyEdgeContext.Provider>
        {proxyEdgeProps.to && <ControlledEdgeElementComponent {...proxyEdgeProps}/>}
        </>
    );
}
ProxyEdgeArea.propTypes = {
    children: PropTypes.node,
};

/** This is used to pass the proxy edge's update function to all ProxyEdgeArea's children. */
export const ProxyEdgeContext = React.createContext();

function useProxyEdge()
{
    const graphState = useContext(GraphStateContext);
    const graphDispatch = useContext(GraphDispatchContext);
    const [ proxyEdgeActive, setProxyEdgeActive ] = useState(false);
    const [ proxyEdgeProps, setProxyEdgeProps ] = useState({ from: null, to: null, opts: {}});
    useLayoutEffect(() =>
    {
        if (!proxyEdgeActive)
        {
            if (proxyEdgeProps.from || proxyEdgeProps.to)
            {
                if (proxyEdgeProps.to instanceof NodeElement)
                {
                    graphDispatch({ type: 'add', elementType: EdgeElement, opts: {
                        fromId: proxyEdgeProps.from.id,
                        toId: proxyEdgeProps.to.id
                    }});
                }
                // Reset to default. The render depends on it to make the proxy edge disappear.
                setProxyEdgeProps({ from: null, to: null, opts: {} });
            }
        }
    },
    /* Although this is also dependent on proxyEdgeProps, we only care about when proxyEdgeActive changes. */
    [ proxyEdgeActive ]);

    function updateProxyEdge(dragging, node, position)
    {
        if (dragging)
        {
            setProxyEdgeActive(true);
            let target = findGraphElementWithinPosition(graphState, NodeElement, position.x, position.y, NodeElement.RADIUS);
            setProxyEdgeProps({ from: node, to: target || position, opts: { forceLine: !target }});
        }
        else
        {
            setProxyEdgeActive(false);
        }
    }

    return [ proxyEdgeProps, updateProxyEdge ];
}
