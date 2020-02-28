import React from 'react';
import PropTypes from 'prop-types';
import RendererStyle from '@flapjs/renders/Renderer.module.css';

const MASK_RADIUS_OFFSET = 4;

export default function NodeCircleRenderer(props)
{
    const { x, y, radius, inner, label, childProps, maskProps } = props;
    
    let labels = label && label.split('\n');
    return (
        <>
        <circle className={RendererStyle.decorative}
            cx={x} cy={y} r={radius}
            {...childProps}/>
        { inner &&
            <circle className={RendererStyle.decorative}
                cx={x} cy={y} r={inner}/> }
        {labels && labels.length > 0 && labels.map((s, i) => (
            <text className={RendererStyle.decorative}
                key={`${s}:${i}`}
                x={x} y={y}
                transform={`translate(0 ${(i * -15)})`}
                style={{ fontSize: `${magicFontSize(s.length)}em` }}
                textAnchor="middle">
                {s}
            </text>
        ))}
        <circle className={RendererStyle.mask}
            cx={x} cy={y} r={radius + MASK_RADIUS_OFFSET}
            {...maskProps}/>
        </>
    );
}
NodeCircleRenderer.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    radius: PropTypes.number,
    inner: PropTypes.number,
    label: PropTypes.string,
    childProps: PropTypes.object,
    maskProps: PropTypes.object,
};
NodeCircleRenderer.defaultProps = {
    x: 0,
    y: 0,
    radius: 10,
    childProps: {},
    maskProps: {},
};

function magicFontSize(labelLength)
{
    return (1 - Math.min(Math.max(labelLength, 0) / 6, 0.5));
}
