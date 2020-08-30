import React from 'react';

import { ViewArea } from '@flapjs/services/view/ViewService.js';
import { useViewNavigationBehavior, useViewDoubleTapBehavior } from '@flapjs/services/view/ViewBehaviors.jsx';
import { useGraph } from '@flapjs/services/graph2/GraphService.js';

import EdgeQuadraticRenderer from '@flapjs/renderers/edges/EdgeQuadraticRenderer.jsx';
import TreeNodeElement from './TreeNodeElement.jsx';
import { GraphElements } from './renderer/GraphElements.jsx';

export function GraphPlayground(props)
{
    const { nodes, edges } = useGraph();

    useViewNavigationBehavior();
    useViewDoubleTapBehavior((x, y) => nodes.add({ x, y }));

    return (
        <ViewArea>
            <GraphElements elementList={nodes.nodeList} renderer={node =>
            {
                return (
                    <TreeNodeElement key={node.id} element={node} />
                );
            }}/>
            <GraphElements elementList={edges.edgeList} renderer={edge =>
            {
                const fromNode = nodes.get(edge.fromNodeId);
                const toNode = nodes.get(edge.toNodeId);
                return (
                    <EdgeQuadraticRenderer key={edge.id} start={fromNode} end={toNode} />
                );
            }}/>
        </ViewArea>
    );
}
