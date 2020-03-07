import React, { useContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';
import NodeElement from '@flapjs/modules/node/graph/elements/node/NodeElement';

export default function FiniteAutomataNodeEditor(props)
{
    const { element, closeEditor } = props;

    const graphDispatch = useContext(GraphDispatchContext);

    const inputRef = useRef(null);
    const [ input, setInput ] = useState('');

    useEffect(() =>
    {
        inputRef.current.focus();
        setInput(element.label || '');
    },
    [ element.label ]);
    
    return (
        <>
        <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}/>
        <button onClick={() =>
        {
            element.label = input;
            element.markDirty();
            closeEditor();
        }}>
            Submit
        </button>
        <button onClick={() =>
        {
            graphDispatch({ type: 'delete', elementType: NodeElement, elementId: element.elementId });
            closeEditor();
        }}>
            Delete This
        </button>
        </>
    );
}
FiniteAutomataNodeEditor.propTypes = {
    element: PropTypes.object.isRequired,
    closeEditor: PropTypes.func.isRequired,
};
