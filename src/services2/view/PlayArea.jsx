import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { ViewContext } from './ViewContext.jsx';

import SVGViewArea from './svg/SVGViewArea.jsx';

export default function PlayArea(props)
{
    const { svgRef, pos, scale } = useContext(ViewContext);

    return (
        <SVGViewArea className="viewport"
            offsetX={pos.x} offsetY={pos.y} scale={scale}
            childProps={{ref: svgRef}}>
            {props.children}
        </SVGViewArea>
    );
}
PlayArea.propTypes = {
    children: PropTypes.node,
};
