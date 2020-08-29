import React from 'react';

import { ViewArea } from '@flapjs/services/view/ViewService.js';
import NodeCircleRenderer from '@flapjs/renderers/nodes/NodeCircleRenderer.jsx';
import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services/view/ViewBehaviors.jsx';
import { useGraph } from './GraphContext.jsx';

export function GraphPlayground(props)
{
    const { addNode, nodeList } = useGraph();

    useViewNavigationBehavior();
    useViewDoubleTapBehavior((x, y) => addNode({ x, y }));

    return (
        <ViewArea>
            {nodeList.map(node =>
            {
                return (
                    <NodeCircleRenderer key={node.id} x={node.x} y={node.y} radius={10} inner={8} label={node.label} childProps={{}} maskProps={{}} />
                ); 
            })}
        </ViewArea>
    );
}
