import React from 'react';
import PropTypes from 'prop-types';
import RendererStyle from '@flapjs/renderers/Renderer.module.css';

const MASK_RADIUS_OFFSET = 4;
const SIZE_RATIO = 1.2;

export default function MarkerTriangleRenderer(props)
{
    const { size, angle, offset, childProps, maskProps } = props;

    const dx = Math.cos(angle);
    const dy = Math.sin(angle);

    const x = props.x + dx * offset;
    const y = props.y + dy * offset;

    // TODO: this does not work for ALL arbitrary angles...
    const radiusX = dx * size;
    const diameterX = radiusX * SIZE_RATIO;
    
    return (
        <>
            <path className={RendererStyle.decorative}
                d={`M${x} ${y}`
                + ` L${x + diameterX} ${y + Math.sin(angle + Math.PI / 2) * size * SIZE_RATIO}`
                + ` L${x + diameterX} ${y - Math.sin(angle + Math.PI / 2) * size * SIZE_RATIO}`
                + ' Z'}
                fill="transparent"
                {...childProps}/>
            <circle className={RendererStyle.mask}
                cx={x + radiusX} cy={y} r={size + MASK_RADIUS_OFFSET}
                {...maskProps}/>
        </>
    );
}
MarkerTriangleRenderer.propTypes = {
    style: PropTypes.object,
    x: PropTypes.number,
    y: PropTypes.number,
    size: PropTypes.number,
    angle: PropTypes.number,
    offset: PropTypes.number,
    childProps: PropTypes.object,
    maskProps: PropTypes.object,
};
MarkerTriangleRenderer.defaultProps = {
    x: 0,
    y: 0,
    size: 10,
    angle: Math.PI,
    offset: 0,
    childProps: {},
    maskProps: {},
};
