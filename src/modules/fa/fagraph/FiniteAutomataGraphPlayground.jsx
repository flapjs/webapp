import React from 'react';
import PropTypes from 'prop-types';

import GraphElementComponentLayer from '@flapjs/services/graph/components/GraphElementComponentLayer.jsx';

import { ProxyEdgeProvider } from '@flapjs/modules/node/nodegraph/widgets/ProxyEdgeContext.jsx';
import { StartMarkerProvider } from './widgets/StartMarkerContext.jsx';

import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services/view/ViewBehaviors.jsx';
import { useNodeGraphActions } from '@flapjs/modules/node/nodegraph/NodeGraphHooks.jsx';

import NodeElement from '@flapjs/modules/node/nodegraph/elements/node/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/nodegraph/elements/edge/EdgeElement.js';

import EdgeElementComponent from '@flapjs/modules/node/nodegraph/components/EdgeElementComponent.jsx';
import FiniteAutomataNodeElementComponent from './components/FiniteAutomataNodeElementComponent.jsx';

export default function FiniteAutomataGraphPlayground(props)
{
    const { createNode, createEdge, swapInitial } = useNodeGraphActions();

    useViewNavigationBehavior();
    useViewDoubleTapBehavior((x, y) => createNode({ x, y }));

    return (
        <>
        <StartMarkerProvider onConnect={swapInitial}>
            <ProxyEdgeProvider onConnect={createEdge}>
                <GraphElementComponentLayer elementType={NodeElement}>
                    {element => <FiniteAutomataNodeElementComponent element={element}/>}
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
FiniteAutomataGraphPlayground.propTypes = {
    children: PropTypes.node,
};