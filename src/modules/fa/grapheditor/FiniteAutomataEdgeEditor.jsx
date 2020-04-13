import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';
import EdgeElement from '@flapjs/modules/node/graph/elements/EdgeElement';
import Button from '@flapjs/components/lib/Button.jsx';
import TextArea from '@flapjs/components/lib/TextArea.jsx';

export default function FiniteAutomataEdgeEditor(props)
{
    const { element, closeEditor } = props;

    const graphDispatch = useContext(GraphDispatchContext);

    const [ input, setInput ] = useState(element.label);
    
    return (
        <div onContextMenu={onContextMenu}>
            <TextArea
                value={input}
                onChange={e => setInput(e.target.value)}/>
            <Button onClick={() =>
            {
                element.label = input;
                element.markDirty();
                closeEditor();
            }}>
                Submit
            </Button>
            <Button onClick={() =>
            {
                graphDispatch({ type: 'delete', elementType: EdgeElement, elementId: element.id });
                closeEditor();
            }}>
                Delete This
            </Button>
        </div>
    );
}
FiniteAutomataEdgeEditor.propTypes = {
    element: PropTypes.object.isRequired,
    closeEditor: PropTypes.func.isRequired,
};

function onContextMenu(e)
{
    e.preventDefault();
    e.stopPropagation();
    return false;
}
