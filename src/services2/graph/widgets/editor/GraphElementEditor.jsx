import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ViewContext } from '@flapjs/services2/view/ViewContext.jsx';
import { GraphElementEditorContext } from './GraphElementEditorContext.jsx';

import { useGraphElement } from '@flapjs/services2/graph/elements/GraphElementHooks.jsx';
import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';

import { transformViewToScreen } from '@flapjs/util/ViewHelper.js';

export default function GraphElementEditor(props)
{
    const { offset } = props;
    const { elementType, elementId, isOpen, closeEditor } = useContext(GraphElementEditorContext);

    const forceUpdate = useForceUpdate();
    const element = useGraphElement(elementType, elementId, forceUpdate);

    const editorRef = useRef(null);
    const { svgRef, pos } = useContext(ViewContext);

    useEffect(() =>
    {
        if (element)
        {
            if (svgRef.current)
            {
                let svgElement = svgRef.current;
                let svgRect = svgElement.getBoundingClientRect();
                let { x, y } = pos;
        
                // NOTE: Must have { margin: 0 } otherwise this will happen.
                // if (x < 0) x *= 2; // I have no idea why it is scaling by half if negative.
    
                // Compute offset (if defined)...
                let elementPos;
                if (typeof offset === 'function')
                {
                    elementPos = offset(element);
                }
                else if (offset)
                {
                    elementPos = {
                        x: element.x + offset.x,
                        y: element.y + offset.y,
                    };
                }
                else
                {
                    elementPos = element;
                }
        
                // Compute transformed point...
                const point = transformViewToScreen(svgElement, elementPos.x + x, elementPos.y + y);
                let offsetX = -svgRect.left;
                let offsetY = -svgRect.top;
                if (editorRef.current)
                {
                    offsetX -= editorRef.current.offsetWidth / 2;
                    offsetY -= editorRef.current.offsetHeight / 2;
                    editorRef.current.style.left = `${point[0] + offsetX}px`;
                    editorRef.current.style.top = `${point[1] + offsetY}px`;
                }
            }
        }
    });
    
    return (
        <dialog ref={editorRef} style={{ margin: 0 }} open={isOpen}>
            <input type="text"/>
            <button onClick={() => closeEditor()}>Submit</button>
        </dialog>
    );
}
GraphElementEditor.propTypes = {
    offset: PropTypes.oneOfType([
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
        PropTypes.func,
    ])
};
