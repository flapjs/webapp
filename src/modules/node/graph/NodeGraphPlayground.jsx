import React from 'react';
import PropTypes from 'prop-types';

import NodeGraphTooltip from './components/NodeGraphTooltip.jsx';

import NodeElementComponent from '@flapjs/modules/node/graph/components/NodeElementComponent.jsx';
import EdgeElementComponent from '@flapjs/modules/node/graph/components/EdgeElementComponent.jsx';

import { ProxyEdgeProvider } from './widgets/ProxyEdgeContext.jsx';
import { SelectionBoxProvider } from '@flapjs/services/graph/widgets/selection/SelectionBoxContext.jsx';

import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services/view/ViewBehaviors.jsx';
import { useNodeGraphActions } from './NodeGraphActionHooks.jsx';

import * as QuadraticEdgeHelper from '@flapjs/modules/node/graph/elements/QuadraticEdgeHelper.js';
import { useEdgeKeys, useNodeKeys } from '@flapjs/services3/graph/ReadableGraphHooks.jsx';

export default function NodeGraphPlayground(props)
{
    const { createNode, createEdge } = useNodeGraphActions();

    useViewNavigationBehavior({ useButton: 0 });
    useViewDoubleTapBehavior((x, y) => createNode({ x, y }));

    const nodeKeys = useNodeKeys();
    const edgeKeys = useEdgeKeys();

    return (
        <>
            <SelectionBoxProvider>
                <ProxyEdgeProvider
                    onConnect={(from, to, cursor, opts) =>
                    {
                        if (opts.prevEdge)
                        {
                            let edge = opts.prevEdge;
                            edge.fromId = from.id;
                            edge.toId = to.id;
                            edge.markDirty();
                        }
                        else
                        {
                            createEdge(from, to);
                        }
                    }}
                    onCancel={(from, to, cursor, opts) =>
                    {
                        if (opts.prevEdge)
                        {
                            let edge = opts.prevEdge;
                            edge.toId = 0;

                            // NOTE: This allows the edge to revert to placeholder form if the
                            // "current" edge is using a proxy as its endpoint.
                            QuadraticEdgeHelper.changeEndPoint(null, from, cursor, edge);
                            edge.markDirty();
                        }
                    }}>
                    {nodeKeys.map(nodeKey => <NodeElementComponent key={nodeKey} nodeKey={nodeKey}/>)}
                    {edgeKeys.map(edgeKey => <EdgeElementComponent key={edgeKey} edgeKey={edgeKey}/>)}
                    {props.children}
                </ProxyEdgeProvider>
            </SelectionBoxProvider>
        </>
    );
}
NodeGraphPlayground.propTypes = {
    children: PropTypes.node,
};
