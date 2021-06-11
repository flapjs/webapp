import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import EdgeQuadraticRenderer from '@flapjs/renderers/edges/EdgeQuadraticRenderer.jsx';
import EdgeEndpointArrowRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointArrowRenderer.jsx';
import EdgeEndpointNoneRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointNoneRenderer.jsx';

import * as QuadraticEdgeHelper from '../elements/QuadraticEdgeHelper.js';
import NodeElement from '../elements/NodeElement.js';
import { useEdgeBehaviors } from '../behaviors/EdgeBehaviors.jsx';
import { useEdgeAttribute, useEdgeFrom, useEdgeTo, useNodeAttribute } from '@flapjs/services3/graph/ReadableGraphHooks.jsx';

export default function EdgeElementComponent(props)
{
    const { edgeKey } = props;
    
    const elementRef = useRef(null);
    const labelRef = useRef(null);
    const forwardEndpointRef = useRef(null);

    const fromKey = useEdgeFrom(edgeKey);
    const toKey = useEdgeTo(edgeKey);
    const label = useEdgeAttribute(edgeKey, 'label');

    const fromX = useNodeAttribute(fromKey, 'x');
    const fromY = useNodeAttribute(fromKey, 'y');
    const toX = useNodeAttribute(toKey, 'x');
    const toY = useNodeAttribute(toKey, 'y');
    const from = { x: fromX || 0, y: fromY || 0 };
    const to = { x: toX || 0, y: toY || 0 };

    const opts = {
        placeholderLength: 15,
        forceLine: false,
        margin: 0,
        quad: {
            radians: 0,
            length: 0,
            coords: { x: 0, y: 0 },
        },
    };

    const start = QuadraticEdgeHelper.getStartPoint(from, to, opts);
    const end = QuadraticEdgeHelper.getEndPoint(from, to, opts);
    const center = QuadraticEdgeHelper.getCenterPoint(from, to, opts);
    const normal = QuadraticEdgeHelper.getNormalDirection(from, to, opts);

    // const [ , moving ] = useEdgeBehaviors(elementRef, labelRef, forwardEndpointRef, edge, from, to, start, center, end);

    return (
        <>
            <EdgeQuadraticRenderer
                start={start}
                end={end}
                center={center}
                label={label}
                labelDirection={normal}
                labelKeepUp={true}
                maskProps={{ ref: elementRef }}
                labelProps={{ ref: labelRef }}
                hidden={false/* moving */}
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
EdgeElementComponent.propTypes = {
    children: PropTypes.node,
    edgeKey: PropTypes.string.isRequired,
};
