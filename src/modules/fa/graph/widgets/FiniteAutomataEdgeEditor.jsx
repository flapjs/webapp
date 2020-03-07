import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';
import EdgeElement from '@flapjs/modules/node/graph/elements/edge/EdgeElement';

export default function FiniteAutomataEdgeEditor(props)
{
    const { element, closeEditor } = props;

    const graphDispatch = useContext(GraphDispatchContext);

    const inputRef = useRef(null);
    const [ input, setInput ] = useState(element.label);
    
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
            graphDispatch({ type: 'delete', elementType: EdgeElement, elementId: element.elementId });
            closeEditor();
        }}>
            Delete This
        </button>
        </>
    );
}
FiniteAutomataEdgeEditor.propTypes = {
    element: PropTypes.object.isRequired,
    closeEditor: PropTypes.func.isRequired,
};
