import React from 'react';
import PropTypes from 'prop-types';

import { useView } from '../ViewContext.jsx';

import SVGPlayground from '../svg/SVGPlayground.jsx';

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
