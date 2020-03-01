import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useViewBehavior } from '@flapjs/services2/view/ViewBehaviorHook.jsx';

import GraphElementLayer from './components/GraphElementLayer.jsx';
import { GraphDispatchContext } from './GraphContext.jsx';

import NodeElement from './elements/node/NodeElement.js';
import EdgeElement from './elements/edge/EdgeElement.js';

import NodeElementComponent from './elements/node/NodeElementComponent.jsx';
import EdgeElementComponent from './elements/edge/EdgeElementComponent.jsx';

import { ProxyEdgeProvider } from './components/ProxyEdgeContext.jsx';
import { StartMarkerProvider } from './components/StartMarkerContext.jsx';

export default function GraphArea(props)
{
    const graphDispatch = useContext(GraphDispatchContext);

    /**
     * Creates a node by dispatching to the node context.
     * Assumes that "x" and "y" are defined and valid in opts as
     * positions for the node.
     * 
     * @param {object} opts Node options.
     */
    const createNode = useCallback(async function(opts)
    {
        return await graphDispatch({ type: 'add', elementType: NodeElement, opts: {
            x: opts.x, y: opts.y
        }});
    },
    [ graphDispatch ]);

    /**
     * Creates an edge by dispatching to the graph context.
     * Assumes that "from" and "to" are defined and valid in opts as targets
     * for the edge.
     * 
     * @param {object} from The from target of the connection.
     * @param {object} to The to target of the connection.
     */
    const createEdge = useCallback(async function(from, to)
    {
        return await graphDispatch({ type: 'add', elementType: EdgeElement, opts: {
            fromId: from.id, toId: to.id
        }});
    },
    [ graphDispatch ]);

    const swapInitial = useCallback(async function(from, to)
    {
        return await graphDispatch({ type: 'swapProperty', elementType: NodeElement, elementId: from.id, targetId: to.id, property: 'initial' });
    },
    [ graphDispatch ]);

    useViewBehavior((x, y) => createNode({ x, y }));

    return (
        <>
        <rect x="-5" y="-5" width="10" height="10" fill="blue"/>

        <StartMarkerProvider onConnect={swapInitial}>
            <ProxyEdgeProvider onConnect={createEdge}>
                <GraphElementLayer
                    elementType={NodeElement}
                    renderElement={(elementType, elementId) =>
                        <NodeElementComponent key={elementId}
                            elementType={elementType}
                            elementId={elementId}/>}/>
            </ProxyEdgeProvider>
        </StartMarkerProvider>
    
        <GraphElementLayer
            elementType={EdgeElement}
            renderElement={(elementType, elementId) =>
                <EdgeElementComponent key={elementId}
                    elementType={elementType}
                    elementId={elementId}/>}/>
        {props.children}
        </>
    );
}
GraphArea.propTypes = {
    children: PropTypes.node,
};
GraphArea.defaultProps = {
};
