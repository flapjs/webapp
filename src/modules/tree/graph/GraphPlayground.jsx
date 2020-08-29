import React from 'react';

import { ViewArea } from '@flapjs/services/view/ViewService.js';
import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services/view/ViewBehaviors.jsx';
import { useGraph } from './GraphContext.jsx';

import EdgeQuadraticRenderer from '@flapjs/renderers/edges/EdgeQuadraticRenderer.jsx';
import TreeNodeElement from './TreeNodeElement.jsx';

export function GraphPlayground(props)
{
    const { addNode, getNode, nodeList, edgeList } = useGraph();

    useViewNavigationBehavior();
    useViewDoubleTapBehavior((x, y) => addNode({ x, y }));

    return (
        <ViewArea>
            {nodeList.map(node =>
            {
                return (
                    <TreeNodeElement key={node.id} element={node} />
                ); 
            })}
            {edgeList.map(edge =>
            {
                const fromNode = getNode(edge.fromNodeId);
                const toNode = getNode(edge.toNodeId);
                return (
                    <EdgeQuadraticRenderer key={edge.id} start={fromNode} end={toNode} />
                );
            })}
        </ViewArea>
    );
}
