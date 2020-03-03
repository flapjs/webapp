import { useContext } from 'react';
import { useTapBehavior } from '@flapjs/hooks/behaviors/TapBehavior.jsx';

import { GraphElementEditorContext } from './GraphElementEditorContext.jsx';

export function useGraphElementEditorBehavior(elementRef, graphElement, disabled = false, tapOpts = {})
{
    const { openEditor } = useContext(GraphElementEditorContext);
    useTapBehavior(elementRef, disabled, () =>
    {
        openEditor(graphElement.type, graphElement.id);
    },
    { ...tapOpts });
}
