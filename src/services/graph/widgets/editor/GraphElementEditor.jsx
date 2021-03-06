import React, { useContext, useRef, useEffect, useCallback, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Style from './GraphElementEditor.module.css';

import { useView } from '@flapjs/services/view/ViewContext.jsx';
import { GraphElementEditorContext } from './GraphElementEditorContext.jsx';

import { useGraphElement } from '@flapjs/services/graph/elements/GraphElementHooks.jsx';
import { useForceUpdate } from '@flapjs/hooks/ForceUpdateHook.jsx';

import { transformViewToScreen } from '@flapjs/util/ViewHelper.js';

import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { CrossIcon } from '@flapjs/components/icons/Icons.js';

import { eventConsumer } from '@flapjs/util/EventHelper.js';

export default function GraphElementEditor(props)
{
    const { className, offset, onOpen } = props;
    const { elementType, elementId, isOpen, closeEditor } = useContext(GraphElementEditorContext);

    const forceUpdate = useForceUpdate();
    const element = useGraphElement(elementType, elementId, forceUpdate);

    const editorRef = useRef(null);
    const { svgRef, pos } = useView();

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

    const onOutsideClick = useCallback(e =>
    {
        if (!editorRef.current || !editorRef.current.contains(e.target))
        {
            closeEditor(e);
        }
    },
    [ closeEditor ]);

    const [ wasOpen, setWasOpen ] = useState(false);
    useLayoutEffect(() =>
    {
        if (isOpen !== wasOpen)
        {
            setWasOpen(isOpen);
            if (isOpen)
            {
                document.addEventListener('mousedown', onOutsideClick, true);
                onOpen();
            }
        }

        return () =>
        {
            // Clean up! So no memory leak :)
            if (isOpen !== wasOpen)
            {
                if (!isOpen)
                {
                    document.removeEventListener('mousedown', onOutsideClick, true);
                }
            }
        };
    },
    // NOTE: Although this depends on "element.label" we only care when open changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ isOpen, wasOpen ]);
    
    return (
        <dialog ref={editorRef}
            className={`${Style.container} ${className}`}
            open={isOpen}
            onContextMenu={eventConsumer}>
            <IconButton className={Style.cancel}
                iconClass={CrossIcon}
                onClick={closeEditor}/>
            {props.children}
        </dialog>
    );
}
GraphElementEditor.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    offset: PropTypes.oneOfType([
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
        PropTypes.func,
    ]),
    onOpen: PropTypes.func,
};
GraphElementEditor.defaultProps = {
    onOpen: () => {},
};
