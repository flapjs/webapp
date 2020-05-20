import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import GraphElementComponentLayer from '@flapjs/services/graph/components/GraphElementComponentLayer.jsx';
import FiniteAutomataTooltip from './components/FiniteAutomataTooltip.jsx';

import { ProxyEdgeProvider } from '@flapjs/modules/node/graph/widgets/ProxyEdgeContext.jsx';
import { StartMarkerProvider } from './widgets/StartMarkerContext.jsx';

import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services/view/ViewBehaviors.jsx';
import { useNodeGraphActions } from '@flapjs/modules/node/graph/NodeGraphActionHooks.jsx';

import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement.js';

import FiniteAutomataEdgeElementComponent from './components/FiniteAutomataEdgeElementComponent.jsx';
import FiniteAutomataNodeElementComponent from './components/FiniteAutomataNodeElementComponent.jsx';
import { GraphElementEditorContext } from '@flapjs/services/graph/widgets/editor/GraphElementEditorContext.jsx';

import * as QuadraticEdgeHelper from '@flapjs/modules/node/graph/elements/QuadraticEdgeHelper.js';

import FiniteAutomataGraph from '@flapjs/modules/fa/graph/FiniteAutomataGraph.js';

import { useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';

export default function FiniteAutomataGraphPlayground(props)
{
    const { openEditor } = useContext(GraphElementEditorContext);
    const { createNode, createEdge, swapInitial } = useNodeGraphActions();

    const graphState = useGraphState();

    useViewNavigationBehavior();
    useViewDoubleTapBehavior((x, y) => createNode({ x, y }));


    return (
        <>
        <StartMarkerProvider onConnect={swapInitial}>
            <ProxyEdgeProvider
                onConnect={(from, to, cursor, opts) =>
                {
                    
                    let dupEdge = edgeExists(from, to, graphState);
                    if(dupEdge)
                    {
                        openEditor(dupEdge.type, dupEdge.id);
                    }
                    else if (opts.prevEdge)
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
                <FiniteAutomataTooltip/>
                <GraphElementComponentLayer elementType={NodeElement}>
                    {element => <FiniteAutomataNodeElementComponent element={element}/>}
                </GraphElementComponentLayer>
                <GraphElementComponentLayer elementType={EdgeElement}>
                    {element => <FiniteAutomataEdgeElementComponent element={element}/>}
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

function edgeExists(from, to, graphState)
{
    let edges = FiniteAutomataGraph.getElements(graphState, EdgeElement);
    for(let edge of edges) 
    {
        if(edge.fromId === from.id && edge.toId === to.id) 
        {
            return edge;
        }
    }
    return undefined;
}
