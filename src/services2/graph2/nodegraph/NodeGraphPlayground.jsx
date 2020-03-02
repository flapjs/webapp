import React from 'react';
import PropTypes from 'prop-types';

import GraphElementLayer from '../components/GraphElementLayer.jsx';

import NodeElement from '../elements/node/NodeElement.js';
import EdgeElement from '../elements/edge/EdgeElement.js';

import NodeElementComponent from '../elements/node/NodeElementComponent.jsx';
import EdgeElementComponent from '../elements/edge/EdgeElementComponent.jsx';

import { ProxyEdgeProvider } from '../components/ProxyEdgeContext.jsx';
import { StartMarkerProvider } from '../components/StartMarkerContext.jsx';

import { useGraphElementIds } from '../elements/GraphElementHooks.jsx';
import { useNodeGraphActions } from './NodeGraphHooks.jsx';
import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services2/view/ViewBehaviorHooks.jsx';

export default function NodeGraphPlayground(props)
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
NodeGraphPlayground.propTypes = {
    children: PropTypes.node,
};
