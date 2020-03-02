import React from 'react';
import PropTypes from 'prop-types';

import GraphElementComponentLayer from '@flapjs/services2/graph/components/GraphElementComponentLayer.jsx';

import NodeElement from '@flapjs/services2/graph/elements/node/NodeElement.js';
import EdgeElement from '@flapjs/services2/graph/elements/edge/EdgeElement.js';

import NodeElementComponent from '@flapjs/services2/graph/elements/node/NodeElementComponent.jsx';
import EdgeElementComponent from '@flapjs/services2/graph/elements/edge/EdgeElementComponent.jsx';

import { ProxyEdgeProvider } from '@flapjs/services2/graph/components/ProxyEdgeContext.jsx';
import { StartMarkerProvider } from '@flapjs/services2/graph/components/StartMarkerContext.jsx';

import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services2/view/ViewBehaviorHooks.jsx';

import { useNodeGraphActions } from './NodeGraphHooks.jsx';

export default function NodeGraphPlayground(props)
{
    const { createNode, createEdge, swapInitial } = useNodeGraphActions();

    useViewNavigationBehavior();
    useViewDoubleTapBehavior((x, y) => createNode({ x, y }));

    return (
        <>
        <StartMarkerProvider onConnect={swapInitial}>
            <ProxyEdgeProvider onConnect={createEdge}>
                <GraphElementComponentLayer elementType={NodeElement}>
                    {element => <NodeElementComponent element={element}/>}
                </GraphElementComponentLayer>
            </ProxyEdgeProvider>
        </StartMarkerProvider>
    
        <GraphElementComponentLayer elementType={EdgeElement}>
            {element => <EdgeElementComponent element={element}/>}
        </GraphElementComponentLayer>

        {props.children}
        </>
    );
}
NodeGraphPlayground.propTypes = {
    children: PropTypes.node,
};
