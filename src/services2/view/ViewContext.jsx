import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

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
