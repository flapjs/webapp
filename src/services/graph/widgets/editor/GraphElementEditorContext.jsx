import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const GraphElementEditorContext = React.createContext(null);

export function GraphElementEditorProvider(props)
{
    const [targetElementTypeAndId, setTargetElementTypeAndId] = useState(null);

    let elementType = null;
    let elementId = null;
    let isOpen = false;
    if (targetElementTypeAndId)
    {
        elementType = targetElementTypeAndId[0];
        elementId = targetElementTypeAndId[1];
        isOpen = true;
    }

    const openEditor = useCallback((elementType, elementId) =>
    {
        setTargetElementTypeAndId([ elementType, elementId ]);
    },
    [ setTargetElementTypeAndId ]);

    const closeEditor = useCallback(() =>
    {
        setTargetElementTypeAndId(null);
    },
    [ setTargetElementTypeAndId ]);

    function toggleEditor(elementType, elementId)
    {
        if (targetElementTypeAndId)
        {
            close();
        }
        else
        {
            open(elementType, elementId);
        }
    }

    return (
        <GraphElementEditorContext.Provider value={{ elementType, elementId, isOpen, openEditor, closeEditor, toggleEditor }}>
            {props.children}
        </GraphElementEditorContext.Provider>
    );
}
GraphElementEditorProvider.propTypes = {
    children: PropTypes.node,
};
