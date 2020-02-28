import React from 'react';
import PropTypes from 'prop-types';

export default function EdgeDirectionalLabelRenderer(props)
{
    const { x, y, textDirection, invertText, label, childProps } = props;

    let labels = label && label.split('\n');
    let degrees = textDirection * 180 / Math.PI;
    return (
        <g transform={`translate(${x} ${y}) rotate(${degrees})`}>
            {labels && labels.length > 0 && labels.map((s, i) => (
                <text key={`${s}:${i}`}
                    transform={`translate(0 ${((i + 1) * -15)})` + (invertText ? ' scale(-1,-1)' : '')}
                    alignmentBaseline="central"
                    textAnchor="middle"
                    style={{ userSelect: 'none' }}
                    {...childProps}>
                    {s}
                </text>
            ))}
        </g>
    );
}
EdgeDirectionalLabelRenderer.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    textDirection: PropTypes.number,
    invertText: PropTypes.bool,
    label: PropTypes.string,
    childProps: PropTypes.object,
};
EdgeDirectionalLabelRenderer.defaultProps = {
    x: 0,
    y: 0,
    textDirection: 0,
    invertText: false,
    childProps: {},
};
