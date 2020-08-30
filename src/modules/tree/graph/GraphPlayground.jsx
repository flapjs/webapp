import React from 'react';
import PropTypes from 'prop-types';

import { ViewArea } from '@flapjs/services/view/ViewService.js';
import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services/view/ViewBehaviors.jsx';
import { useGraph } from '@flapjs/services/graph2/GraphService.js';

import { GraphElements } from './renderer/GraphElements.jsx';
import { ProxyEdgeProvider } from '@flapjs/modules/node/graph/widgets/ProxyEdgeContext.jsx';

import * as QuadraticEdgeHelper from './renderer/QuadraticEdgeHelper.js';
import { TreeNodeElement } from './TreeNodeElement.jsx';
import { TreeEdgeElement } from './TreeEdgeElement.jsx';

export function GraphPlayground(props)
{
    const { children } = props;
    const { nodes, edges } = useGraph();

    useViewNavigationBehavior();
    useViewDoubleTapBehavior((x, y) => nodes.add({ x, y }));

    function onProxyEdgeConnect(from, to, cursor, opts)
    {
        if (opts.prevEdge)
        {
            let edge = opts.prevEdge;
            edges.update(edge.id, {
                fromNodeId: from.id,
                toNodeId: to.id
            });
        }
        else
        {
            edges.add(from.id, to.id);
        }
    }

    function onProxyEdgeCancel(from, to, cursor, opts)
    {
        if (opts.prevEdge)
        {
            let edge = opts.prevEdge;
            
            // NOTE: This allows the edge to revert to placeholder form if the
            // "current" edge is using a proxy as its endpoint.
            let dst = { x: 0, y: 0 };
            QuadraticEdgeHelper.changeEndPoint(null, from, cursor, dst);
            edges.update(edge.id, {
                toNodeId: null,
                center: dst,
            });
        }
    }

    return (
        <ViewArea>
            <ProxyEdgeProvider
                onConnect={onProxyEdgeConnect}
                onCancel={onProxyEdgeCancel}>
                <GraphElements elementList={nodes.nodeList} renderer={node =>
                    <TreeNodeElement key={node.id} element={node} />} />
                <GraphElements elementList={edges.edgeList} renderer={edge =>
                    <TreeEdgeElement key={edge.id} element={edge} />} />
                {children}
            </ProxyEdgeProvider>
        </ViewArea>
    );
}
GraphPlayground.propTypes = {
    children: PropTypes.node,
};
