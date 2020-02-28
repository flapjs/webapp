import React from 'react';
import PropTypes from 'prop-types';

import EdgeQuadraticRenderer from '../renderer/edges/EdgeQuadraticRenderer.jsx';
import EdgeEndpointArrowRenderer from '../renderer/edges/endpoints/EdgeEndpointArrowRenderer.jsx';
import EdgeEndpointNoneRenderer from '../renderer/edges/endpoints/EdgeEndpointNoneRenderer.jsx';

import * as QuadraticEdgeHelper from './QuadraticEdgeHelper.js';

export default function ControlledEdgeElementComponent(props)
{
    const { from, to, opts } = props;

    const start = QuadraticEdgeHelper.getStartPoint(from, to, opts);
    const end = QuadraticEdgeHelper.getEndPoint(from, to, opts);
    const center = QuadraticEdgeHelper.getCenterPoint(from, to, opts);

    return (
        <EdgeQuadraticRenderer
            start={start}
            end={end}
            center={center}
            renderEndpoint={(point, angle, direction) =>
            {
                if (direction === 'forward')
                {
                    return <EdgeEndpointArrowRenderer
                        x={point.x} y={point.y} angle={angle}
                        maskProps={{style: {pointerEvents: 'none'}}}/>;
                }
                else
                {
                    return <EdgeEndpointNoneRenderer 
                        x={point.x} y={point.y} angle={angle}
                        maskProps={{style: {pointerEvents: 'none'}}}/>;
                }
            }}
            maskProps={{style: {pointerEvents: 'none'}}}/>
    );
}
ControlledEdgeElementComponent.propTypes = {
    from: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }).isRequired,
    to: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }).isRequired,
    opts: PropTypes.object,
};
