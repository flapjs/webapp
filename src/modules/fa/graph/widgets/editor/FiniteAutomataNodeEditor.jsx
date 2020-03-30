import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';
import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement';

export default function FiniteAutomataNodeEditor(props)
{
    const { element, closeEditor } = props;

    const graphDispatch = useContext(GraphDispatchContext);

    const inputRef = useRef(null);
    const [ input, setInput ] = useState(element.label);
    const [ accept, setAccept ] = useState(element.final);

    const acceptId = 'nodeEditor.accept';
    
    return (
        <>
        <div>
            <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}/>
            <button onClick={() =>
            {
                element.label = input;
                element.markDirty();
                closeEditor();
            }}>
                Change Label
            </button>
        </div>
        <div>
            <input id={acceptId} type="checkbox"
                checked={accept}
                onChange={e =>
                {
                    element.final = e.target.checked;
                    element.markDirty();
                    setAccept(element.final);
                }}/>
            <label htmlFor={acceptId}>Accept</label>
        </div>
        <button onClick={() =>
        {
            graphDispatch({ type: 'delete', elementType: NodeElement, elementId: element.id });
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
