import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import RendererStyle from '@flapjs/renderers/Renderer.module.css';

const LINE_HEIGHT_RATIO = 0.8;
const DEFAULT_LINE_HEIGHT = 15;
const DEFAULT_CHAR_WIDTH = 8;

export default function EdgeDirectionalLabelRenderer(props)
{
    const { x, y, textDirection, invertText, label, childrenProps, maskProps } = props;

    const someTextRef = useRef(null);

    let labels = label && label.split('\n');
    let degrees = textDirection * 180 / Math.PI;

    let charWidth = DEFAULT_CHAR_WIDTH;
    let charHeight = DEFAULT_LINE_HEIGHT;
    if (someTextRef.current)
    {
        let bbox = someTextRef.current.getBBox();
        charWidth = bbox.width / someTextRef.current.textContent.length;
        charHeight = bbox.height * LINE_HEIGHT_RATIO;
    }

    let maskPoints = calculateMaskPoints(labels, charWidth, charHeight);

    return (
        <g transform={`translate(${x} ${y}) rotate(${degrees})`}>
            <polygon className={RendererStyle.mask}
                points={maskPoints}
                {...maskProps}/>
            {labels && labels.length > 0 && labels.map((s, i) => (
                <text key={`${s}:${i}`}
                    className={RendererStyle.decorative}
                    ref={someTextRef}
                    transform={`translate(0 ${((i + 1) * -charHeight)})` + (invertText ? ' scale(-1,-1)' : '')}
                    alignmentBaseline="central"
                    textAnchor="middle"
                    style={{ userSelect: 'none' }}
                    {...childrenProps}>
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
    childrenProps: PropTypes.object,
    maskProps: PropTypes.object,
};
EdgeDirectionalLabelRenderer.defaultProps = {
    x: 0,
    y: 0,
    textDirection: 0,
    invertText: false,
    childrenProps: {},
    maskProps: {},
};

function calculateMaskPoints(labels = [], charWidth = 1, charHeight = 1, paddingX = 0, paddingY = 0)
{
    const lineCount = labels.length;
    let index = 0;
    let prepend = [];
    let append = [];
    let x;
    let y;
    let label;

    for(let i = 0; i < lineCount; ++i)
    {
        label = labels[i];
        x = label.length / 2 * charWidth;
        y = (index + 1) * charHeight;
        if (i === 0)
        {
            // Add the points of the TOP of the first text (since we were adding all CENTERS).
            prepend.push(`${-x - paddingX},${-y + charHeight / 2 + paddingY}`);
            append.push(`${x + paddingX},${-y + charHeight / 2 + paddingY}`);
        }
        prepend.push(`${-x - paddingX},${-y}`);
        append.push(`${x + paddingX},${-y}`);
        ++index;
    }

    if (lineCount > 0)
    {
        // Add the points of the BOTTOM of the last text (since we were adding all CENTERS).
        prepend.push(`${-x - paddingX},${-y - charHeight / 2 - paddingY}`);
        append.push(`${x + paddingX},${-y - charHeight / 2 - paddingY}`);
    }

    // Reverse the other side since it must be a sequential loop.
    append.reverse();

    return prepend.join(' ') + ' ' + append.join(' ');
}
