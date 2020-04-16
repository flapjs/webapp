import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';
import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';

import TextArea from '@flapjs/components/lib/TextArea.jsx';
import Button from '@flapjs/components/lib/Button.jsx';
import FieldSwitch from '@flapjs/components/lib/FieldSwitch.jsx';

export default function FiniteAutomataNodeEditor(props)
{
    const { element, closeEditor } = props;

    const graphDispatch = useContext(GraphDispatchContext);

    const [ input, setInput ] = useState(element.label);
    const [ accept, setAccept ] = useState(element.final);
    
    return (
        <div onContextMenu={onContextMenu}>
            <TextArea
                value={input}
                onChange={e => setInput(e.target.value)}/>
            <FieldSwitch
                id="acceptNodeSwitch"
                checked={accept}
                onChange={value =>
                {
                    element.final = value;
                    element.markDirty();
                    setAccept(element.final);
                }}>
                Accepted
            </FieldSwitch>
            <Button
                onClick={() =>
                {
                    element.label = input;
                    element.markDirty();
                    closeEditor();
                }}>
                Change Label
            </Button>
            <Button
                onClick={() =>
                {
                    graphDispatch({ type: 'delete', elementType: NodeElement, elementId: element.id });
                    closeEditor();
                }}>
                Delete This
            </Button>
        </div>
    );
}
FiniteAutomataNodeEditor.propTypes = {
    element: PropTypes.object.isRequired,
    closeEditor: PropTypes.func.isRequired,
};

function onContextMenu(e)
{
    e.preventDefault();
    e.stopPropagation();
    return false;
}
