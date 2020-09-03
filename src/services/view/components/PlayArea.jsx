import React from 'react';
import PropTypes from 'prop-types';

import { useView } from '../ViewContext.jsx';

import SVGPlayground from '../svg/SVGPlayground.jsx';

/**
 * Gives the SVG container and the SVG elements it is currently storing.
 * 
 * @param {Object} props Props passed down to PlayArea from parent component,
 * if there is one.
 * @returns {JSX.Element} The SVG container with its current SVG elements.
 */
export default function PlayArea(props)
{
    const { svgRef, pos, scale } = useView();

    return (
        <SVGPlayground className="viewport"
            offsetX={pos.x} offsetY={pos.y} scale={scale}
            childProps={{ref: svgRef}}>
            {props.children}
        </SVGPlayground>
    );
}
PlayArea.propTypes = {
    children: PropTypes.node,
};
