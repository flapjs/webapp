import React, { useContext, useRef, useState } from 'react';
import Style from './NodeGraphLabelEditor.module.css';

import { GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';
import { GraphElementEditorContext } from '@flapjs/services/graph/widgets/editor/GraphElementEditorContext.jsx';

import { useGraphElement } from '@flapjs/services/graph/elements/GraphElementHooks.jsx';
import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';

import GraphElementEditor from '@flapjs/services/graph/widgets/editor/GraphElementEditor.jsx';

export default function NodeGraphLabelEditor(props)
{
    const { elementType, elementId, closeEditor } = useContext(GraphElementEditorContext);
    const graphDispatch = useContext(GraphDispatchContext);

    const forceUpdate = useForceUpdate();
    const element = useGraphElement(elementType, elementId, forceUpdate);

    const inputRef = useRef(null);
    const [ input, setInput ] = useState('');
    
    return (
        <GraphElementEditor className={Style.container}
            onOpen={() =>
            {
                inputRef.current.focus();
                setInput(element.label || '');
            }}>
            <textarea ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}/>
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
                graphDispatch({ type: 'delete', elementType, elementId });
                closeEditor();
            }}>
                Delete This
            </button>
        </GraphElementEditor>
    );
}
