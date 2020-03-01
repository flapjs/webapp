import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import SVGViewArea from '@flapjs/components/viewport/SVGViewArea.jsx';

export const ViewContext = React.createContext();

export function ViewProvider(props)
{
    const svgRef = useRef(null);
    const [ pos, setPos ] = useState({ x: 0, y: 0 });
    const [ scale, setScale ] = useState(1);

    return (
        <ViewContext.Provider value={{ svgRef, pos, setPos, scale, setScale }}>
            {props.children}
        </ViewContext.Provider>
    );
}
ViewProvider.propTypes = {
    children: PropTypes.node,
};

export function ViewArea(props)
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
ViewArea.propTypes = {
    children: PropTypes.node,
};
