import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import EdgeQuadraticRenderer from '@flapjs/renderers/edges/EdgeQuadraticRenderer.jsx';
import EdgeEndpointArrowRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointArrowRenderer.jsx';
import EdgeEndpointNoneRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointNoneRenderer.jsx';

import * as QuadraticEdgeHelper from '@flapjs/modules/node/graph/elements/QuadraticEdgeHelper.js';
// import { useEdgeBehaviors } from '@flapjs/modules/node/graph/behaviors/EdgeBehaviors.jsx';

import { useGraph } from '@flapjs/services/graph2/GraphService.js';
// import { useDragBehavior } from '@flapjs/behaviors/DragBehavior';

export function TreeEdgeElement(props)
{
    const { element: edge } = props;
    
    // Reference to the rendered elements.
    const elementRef = useRef(null);
    const labelRef = useRef(null);
    const forwardEndpointRef = useRef(null);

    const graph = useGraph();
    const from = graph.nodes.get(edge.fromNodeId);
    const to = graph.nodes.get(edge.toNodeId);

    const opts = {
        margin: 15
    };

    const start = useMemo(() => QuadraticEdgeHelper.getStartPoint(from, to, opts), [from, opts, to]);
    const end = useMemo(() => QuadraticEdgeHelper.getEndPoint(from, to, opts), [from, opts, to]);
    const center = useMemo(() => QuadraticEdgeHelper.getCenterPoint(from, to, opts), [from, opts, to]);
    const normal = useMemo(() => QuadraticEdgeHelper.getNormalDirection(from, to, opts), [from, opts, to]);

    // Edge behaviors...
    // useGraphElementEditorBehavior(elementRef, edge, false, { useButton: 2 });
    // useGraphElementEditorBehavior(labelRef, edge);
    
    /*
    const curving = useDragBehavior(elementRef, center,
        value =>
        {
            let dst = { x: 0, y: 0 };
            QuadraticEdgeHelper.changeCenterPoint(value, from, to, dst);
            edge.markDirty();
        });
    const moving = useProxyEdgeFromBehavior(
        forwardEndpointRef,
        from,
        {
            // This is set for onConnect() and onCancel().
            prevEdge: edge,
            onDragBegin: () =>
            {
                resetQuadsIfPlaceholder(edge.fromId, edge.toId, edge);
                edge.markDirty();
                return true;
            }
        });
    */
    const moving = false;
    
    return (
        <>
            <EdgeQuadraticRenderer
                start={start}
                end={end}
                center={center}
                label={edge.label}
                labelDirection={normal}
                labelKeepUp={true}
                maskProps={{ ref: elementRef }}
                labelProps={{ ref: labelRef }}
                hidden={moving}
                renderEndpoint={(point, angle, direction) =>
                {
                    if (direction === 'forward')
                    {
                        return <EdgeEndpointArrowRenderer
                            x={point.x} y={point.y} angle={angle}
                            maskProps={{ref: forwardEndpointRef}}/>;
                    }
                    else
                    {
                        return <EdgeEndpointNoneRenderer 
                            x={point.x} y={point.y} angle={angle}
                            maskProps={{style: {pointerEvents: 'none'}}}/>;
                    }
                }}/>
            {props.children}
        </>
    );
}
TreeEdgeElement.propTypes = {
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
};
