import { useContext } from 'react';
import { SelectionBoxStateContext, SelectionBoxDispatchContext } from './SelectionBoxContext.jsx';
import { useTapBehavior } from '@flapjs/behaviors/TapBehavior.jsx';

export function useSelectableBehavior(elementRef, elementId, tapOpts = {})
{
    const selectionBoxState = useContext(SelectionBoxStateContext);
    const selectionBoxDispatch = useContext(SelectionBoxDispatchContext);
    
    useTapBehavior(elementRef, false, () =>
    {
        selectionBoxDispatch({ type: 'toggle', elementId });
    },
    tapOpts);

    return selectionBoxState.elementIds.has(elementId);
}
