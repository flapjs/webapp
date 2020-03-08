import React, { useContext } from 'react';

import { GraphElementEditorContext } from '@flapjs/services/graph/widgets/editor/GraphElementEditorContext.jsx';

import { useGraphElement } from '@flapjs/services/graph/elements/GraphElementHooks.jsx';
import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';

import GraphElementEditor from '@flapjs/services/graph/widgets/editor/GraphElementEditor.jsx';
import FiniteAutomataNodeEditor from './FiniteAutomataNodeEditor.jsx';
import FiniteAutomataEdgeEditor from './FiniteAutomataEdgeEditor.jsx';
import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';

export default function FiniteAutomataGraphEditor(props)
{
    const { elementType, elementId, closeEditor } = useContext(GraphElementEditorContext);

    const forceUpdate = useForceUpdate();
    const element = useGraphElement(elementType, elementId, forceUpdate);
    
    return (
        <GraphElementEditor>
            {element && (elementType === NodeElement
                ? <FiniteAutomataNodeEditor element={element} closeEditor={closeEditor}/>
                : <FiniteAutomataEdgeEditor element={element} closeEditor={closeEditor}/>)}
        </GraphElementEditor>
    );
}
