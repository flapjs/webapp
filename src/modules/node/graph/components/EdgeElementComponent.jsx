import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';
import { useGraphElement } from '@flapjs/services/graph/elements/GraphElementHooks.jsx';

import EdgeQuadraticRenderer from '@flapjs/renderers/edges/EdgeQuadraticRenderer.jsx';
import EdgeEndpointArrowRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointArrowRenderer.jsx';
import EdgeEndpointNoneRenderer from '@flapjs/renderers/edges/endpoints/EdgeEndpointNoneRenderer.jsx';

import * as QuadraticEdgeHelper from '../elements/QuadraticEdgeHelper.js';
import NodeElement from '../elements/NodeElement.js';
import { useEdgeBehaviors } from '../behaviors/EdgeBehaviors.jsx';

export default function EdgeElementComponent(props)
{
    const { element: edge } = props;
    
    const elementRef = useRef(null);
    const labelRef = useRef(null);
    const forwardEndpointRef = useRef(null);

    const forceUpdate = useForceUpdate();
    const from = useGraphElement(NodeElement, edge.fromId, forceUpdate);
    const to = useGraphElement(NodeElement, edge.toId, forceUpdate);

    const start = QuadraticEdgeHelper.getStartPoint(from, to, edge);
    const end = QuadraticEdgeHelper.getEndPoint(from, to, edge);
    const center = QuadraticEdgeHelper.getCenterPoint(from, to, edge);
    const normal = QuadraticEdgeHelper.getNormalDirection(from, to, edge);

    const [ , moving ] = useEdgeBehaviors(elementRef, labelRef, forwardEndpointRef, edge, from, to, start, center, end);

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
EdgeElementComponent.propTypes = {
    children: PropTypes.node,
    element: PropTypes.object.isRequired,
};
