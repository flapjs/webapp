import React from 'react';
import PropTypes from 'prop-types';

import GraphElementLayer from '@flapjs/services2/graph/components/GraphElementLayer.jsx';

import NodeElement from '@flapjs/services2/graph/elements/node/NodeElement.js';
import EdgeElement from '@flapjs/services2/graph/elements/edge/EdgeElement.js';

import NodeElementComponent from '@flapjs/services2/graph/elements/node/NodeElementComponent.jsx';
import EdgeElementComponent from '@flapjs/services2/graph/elements/edge/EdgeElementComponent.jsx';

import { ProxyEdgeProvider } from '@flapjs/services2/graph/components/ProxyEdgeContext.jsx';
import { StartMarkerProvider } from '@flapjs/services2/graph/components/StartMarkerContext.jsx';

import { useGraphElementIds } from '@flapjs/services2/graph/elements/GraphElementHooks.jsx';
import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services2/view/ViewBehaviorHooks.jsx';

import { useNodeGraphActions } from '@flapjs/services2/graph/nodegraph/NodeGraphHooks.jsx';

export default function FiniteAutomataPlayground(props)
{
    const { createNode, createEdge, swapInitial } = useNodeGraphActions();

    useViewNavigationBehavior();
    useViewDoubleTapBehavior((x, y) => createNode({ x, y }));

    const [ nodes ] = useGraphElementIds(NodeElement);
    const [ edges ] = useGraphElementIds(EdgeElement);

    return (
        <>
        <StartMarkerProvider onConnect={swapInitial}>
            <ProxyEdgeProvider onConnect={createEdge}>
                <GraphElementLayer
                    elementType={NodeElement}
                    elementIds={nodes}>
                    {(elementType, elementId) => (
                        <NodeElementComponent key={elementId}
                            elementType={elementType}
                            elementId={elementId}/>
                    )}
                </GraphElementLayer>
            </ProxyEdgeProvider>
        </StartMarkerProvider>
    
        <GraphElementLayer
            elementType={EdgeElement}
            elementIds={edges}>
            {(elementType, elementId) => (
                <EdgeElementComponent key={elementId}
                    elementType={elementType}
                    elementId={elementId}/>
            )}
        </GraphElementLayer>

        {props.children}
        </>
    );
}
FiniteAutomataPlayground.propTypes = {
    children: PropTypes.node,
};
