import React, { useContext, useRef, useState } from 'react';
import Style from './NodeGraphLabelEditor.module.css';

import { GraphElementEditorContext } from '@flapjs/services/graph/widgets/editor/GraphElementEditorContext.jsx';

import GraphElementEditor from '@flapjs/services/graph/widgets/editor/GraphElementEditor.jsx';
import { useGraphAPI, useNodeAttribute } from '@flapjs/services3/graph/GraphContext.jsx';

export default function NodeGraphLabelEditor(props)
{
    const { elementId, closeEditor } = useContext(GraphElementEditorContext);
    const [label, setLabel] = useNodeAttribute(elementId, 'label');
    const { deleteNode } = useGraphAPI();

    const inputRef = useRef(null);
    const [ input, setInput ] = useState('');
    
    return (
        <GraphElementEditor className={Style.container}
            onOpen={() =>
            {
                inputRef.current.focus();
                setInput(label || '');
            }}>
            <textarea ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}/>
            <button onClick={() =>
            {
                setLabel(input);
                closeEditor();
            }}>
                Submit
            </button>
            <button onClick={() =>
            {
                deleteNode(elementId);
                closeEditor();
            }}>
                Delete This
            </button>
        </GraphElementEditor>
    );
}
