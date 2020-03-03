import React from 'react';
import PropTypes from 'prop-types';

import GraphElementComponentLayer from '@flapjs/services2/graph/components/GraphElementComponentLayer.jsx';

import NodeElement from '@flapjs/modules2/node/nodegraph/elements/node/NodeElement.js';
import EdgeElement from '@flapjs/modules2/node/nodegraph/elements/edge/EdgeElement.js';

import NodeElementComponent from '@flapjs/modules2/node/nodegraph/components/NodeElementComponent.jsx';
import EdgeElementComponent from '@flapjs/modules2/node/nodegraph/components/EdgeElementComponent.jsx';

import { ProxyEdgeProvider } from './widgets/ProxyEdgeContext.jsx';
import { SelectionBoxProvider } from '@flapjs/services2/graph/widgets/selection/SelectionBoxContext.jsx';

import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services2/view/ViewBehaviors.jsx';
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
