import React from 'react';
import PropTypes from 'prop-types';

import GraphElementComponentLayer from '@flapjs/services/graph/components/GraphElementComponentLayer.jsx';

import NodeElement from '@flapjs/modules/node/graph/elements/node/NodeElement.js';
import EdgeElement from '@flapjs/modules/node/graph/elements/edge/EdgeElement.js';

import NodeElementComponent from '@flapjs/modules/node/graph/components/NodeElementComponent.jsx';
import EdgeElementComponent from '@flapjs/modules/node/graph/components/EdgeElementComponent.jsx';

import { ProxyEdgeProvider } from './widgets/ProxyEdgeContext.jsx';
import { SelectionBoxProvider } from '@flapjs/services/graph/widgets/selection/SelectionBoxContext.jsx';

import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services/view/ViewBehaviors.jsx';
import { useNodeGraphActions } from './NodeGraphHooks.jsx';

export default function NodeGraphPlayground(props)
{
    const { createNode, createEdge } = useNodeGraphActions();

    useViewNavigationBehavior({ useButton: 0 });
    useViewDoubleTapBehavior((x, y) => createNode({ x, y }));

    return (
        <>
        <SelectionBoxProvider>
            <ProxyEdgeProvider onConnect={createEdge}>
                <GraphElementComponentLayer elementType={NodeElement}>
                    {element => <NodeElementComponent element={element}/>}
                </GraphElementComponentLayer>
            </ProxyEdgeProvider>
        </SelectionBoxProvider>
    
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
