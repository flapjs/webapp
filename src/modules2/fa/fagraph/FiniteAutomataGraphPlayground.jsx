import React from 'react';
import PropTypes from 'prop-types';

import GraphElementComponentLayer from '@flapjs/services2/graph/components/GraphElementComponentLayer.jsx';

import { ProxyEdgeProvider } from '@flapjs/modules2/node/nodegraph/widgets/ProxyEdgeContext.jsx';
import { StartMarkerProvider } from '@flapjs/services2/graph/widgets/StartMarkerContext.jsx';

import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services2/view/ViewBehaviorHooks.jsx';
import { useNodeGraphActions } from '@flapjs/modules2/node/nodegraph/NodeGraphHooks.jsx';

import NodeElement from '@flapjs/modules2/node/nodegraph/elements/node/NodeElement.js';
import EdgeElement from '@flapjs/modules2/node/nodegraph/elements/edge/EdgeElement.js';

import EdgeElementComponent from '@flapjs/modules2/node/nodegraph/components/EdgeElementComponent.jsx';
import NodeElementComponent from '@flapjs/modules2/node/nodegraph/components/NodeElementComponent.jsx';

// import FiniteAutomataNodeElementComponent from './components/FiniteAutomataNodeElementComponent.jsx';

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
FiniteAutomataGraphPlayground.propTypes = {
    children: PropTypes.node,
};
