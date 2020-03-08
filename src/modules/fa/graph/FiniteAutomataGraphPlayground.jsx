import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import GraphElementComponentLayer from '@flapjs/services/graph/components/GraphElementComponentLayer.jsx';

import { ProxyEdgeProvider } from '@flapjs/modules/node/graph/widgets/ProxyEdgeContext.jsx';
import { StartMarkerProvider } from './widgets/StartMarkerContext.jsx';

import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services/view/ViewBehaviors.jsx';
import { useNodeGraphActions } from '@flapjs/modules/node/graph/NodeGraphHooks.jsx';

import NodeElement from '@flapjs/modules/node/graph/elements/node/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/edge/EdgeElement.js';

import EdgeElementComponent from '@flapjs/modules/node/graph/components/EdgeElementComponent.jsx';
import FiniteAutomataNodeElementComponent from './components/FiniteAutomataNodeElementComponent.jsx';
import { GraphElementEditorContext } from '@flapjs/services/graph/widgets/editor/GraphElementEditorContext.jsx';

import * as QuadraticEdgeHelper from '@flapjs/modules/node/graph/elements/edge/QuadraticEdgeHelper.js';

export default function FiniteAutomataGraphPlayground(props)
{
    const { openEditor } = useContext(GraphElementEditorContext);
    const { createNode, createEdge, swapInitial } = useNodeGraphActions();

    useViewNavigationBehavior();
    useViewDoubleTapBehavior((x, y) => createNode({ x, y }));

    return (
        <>
        <StartMarkerProvider onConnect={swapInitial}>
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
                        createEdge(from, to).then(edge => openEditor(edge.type, edge.id));
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
                <GraphElementComponentLayer elementType={NodeElement}>
                    {element => <FiniteAutomataNodeElementComponent element={element}/>}
                </GraphElementComponentLayer>
                <GraphElementComponentLayer elementType={EdgeElement}>
                    {element => <EdgeElementComponent element={element}/>}
                </GraphElementComponentLayer>
                {props.children}
            </ProxyEdgeProvider>
        </StartMarkerProvider>
        </>
    );
}
FiniteAutomataGraphPlayground.propTypes = {
    children: PropTypes.node,
};
