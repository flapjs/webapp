import React from 'react';
import PropTypes from 'prop-types';
import Style from './SVGViewArea.module.css';

const DEFAULT_VIEWBOX_SIZE = 300;

export default function SVGViewArea(props)
{
    const { offsetX, offsetY, scale, childProps } = props;
    
    let fullViewBoxScale = DEFAULT_VIEWBOX_SIZE * (Math.min(Number.MAX_SAFE_INTEGER, Math.max(Number.EPSILON, scale)));
    let halfViewBoxScale = fullViewBoxScale / 2;
    let viewBox = `${-halfViewBoxScale} ${-halfViewBoxScale} ${fullViewBoxScale} ${fullViewBoxScale}`;

    return (
        <svg className={Style.view + ' viewarea ' + props.className} viewBox={viewBox} {...childProps}>
            <g transform={`translate(${offsetX} ${offsetY})`}>
                {props.children}
            </g>
        </svg>
    );
}
SVGViewArea.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    scale: PropTypes.number,
    childProps: PropTypes.object,
};
SVGViewArea.defaultProps = {
    offsetX: 0,
    offsetY: 0,
    scale: 1,
    childProps: {},
};
