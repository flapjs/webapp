import React from 'react';
import PropTypes from 'prop-types';
import RendererStyle from '../../Renderer.module.css';

const SIXTH_PI = Math.PI / 6;
const HALF_PI = Math.PI / 2;

export default function EdgeEndpointArrowRenderer(props)
{
    const { x, y, angle, length, childProps, maskProps } = props;
    return (
        <>
        <path className={RendererStyle.decorative}
            d={`M ${(x - (length * Math.sin(angle - SIXTH_PI)))}` +
                ` ${(y - (length * Math.cos(angle - SIXTH_PI)))}` +
                ` L ${x} ${y}` +
                ` L ${(x - (length * Math.sin(angle + SIXTH_PI)))}` +
                ` ${(y - (length * Math.cos(angle + SIXTH_PI)))}`}
            fill="none"
            {...childProps} />
        <circle className={RendererStyle.mask}
            cx={x - (length * Math.cos(-angle + HALF_PI))}
            cy={y - (length * Math.sin(-angle + HALF_PI))}
            r={length}
            {...maskProps} />
        </>
    );
}
EdgeEndpointArrowRenderer.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    angle: PropTypes.number,
    length: PropTypes.number,
    childProps: PropTypes.object,
    maskProps: PropTypes.object,
};
EdgeEndpointArrowRenderer.defaultProps = {
    x: 0,
    y: 0,
    angle: 0,
    length: 10,
    childProps: {},
    maskProps: {},
};
