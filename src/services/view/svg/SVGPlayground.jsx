import React from 'react';
import PropTypes from 'prop-types';
import Style from './SVGPlayground.module.css';

const DEFAULT_VIEWBOX_SIZE = 300;

/**
 * Creates an SVG container that wraps around a group of children SVG elements.
 * 
 * @param {Object} props Props passed down to SVGPlayground from its parent
 * component, if there is any.
 * @returns {JSX.Element} An SVG container with a group of children SVG elements in it.
 */
export default function SVGPlayground(props)
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
SVGPlayground.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    scale: PropTypes.number,
    childProps: PropTypes.object,
};
SVGPlayground.defaultProps = {
    offsetX: 0,
    offsetY: 0,
    scale: 1,
    childProps: {},
};
