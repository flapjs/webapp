import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const ViewContext = React.createContext(null);

export function ViewProvider(props)
{
    const svgRef = useRef(null);
    const [ pos, setPos ] = useState({ x: 0, y: 0 });
    const [ scale, setScale ] = useState(1);

    // Use this to change where the view is "looking" at.
    // NOTE: If you've taken computer graphics, you know why it's negative...
    // (hint: this is the view matrix)
    const setLookAt = useCallback((x, y) =>
    {
        setPos({ x: -x, y: -y });
    },
    [ setPos ]);

    return (
        <ViewContext.Provider value={{ svgRef, pos, setPos, scale, setScale, setLookAt }}>
            {props.children}
        </ViewContext.Provider>
    );
}
ViewProvider.propTypes = {
    children: PropTypes.node,
};
