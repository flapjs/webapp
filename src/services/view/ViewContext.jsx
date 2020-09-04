import React, { useRef, useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

const ViewContext = React.createContext(null);

export const ViewConsumer = ViewContext.Consumer;

/**
 * Creates a context provider for the View context so the children of the
 * context provider can consume View context's value.
 * 
 * @param {Object} props The props of ViewProvider passed down from a parent
 * component, if there is a parent component.
 * @returns {JSX.Element} A context provider component wrapped around its
 * children components.
 */
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

/**
 * Returns the View context value via useContext hook call.
 * 
 * @returns {any} The current value of the View context
 */
export function useView()
{
    return useContext(ViewContext);
}
