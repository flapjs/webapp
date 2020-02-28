import React from 'react';
import PropTypes from 'prop-types';
import RendererStyle from '../../Renderer.module.css';

const HALF_PI = Math.PI / 2;

export default function EdgeEndpointNoneRenderer(props)
{
    const { x, y, angle, length, maskProps } = props;
    return (
        <>
        <circle className={RendererStyle.mask}
            cx={x - (length * Math.cos(-angle + HALF_PI))}
            cy={y - (length * Math.sin(-angle + HALF_PI))}
            r={length}
            {...maskProps} />
        </>
    );
}
EdgeEndpointNoneRenderer.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    angle: PropTypes.number,
    length: PropTypes.number,
    maskProps: PropTypes.object,
};
EdgeEndpointNoneRenderer.defaultProps = {
    x: 0,
    y: 0,
    angle: 0,
    length: 10,
    maskProps: {},
};
