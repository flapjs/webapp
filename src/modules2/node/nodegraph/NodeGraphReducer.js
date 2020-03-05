import { uuid } from '@flapjs/util/MathHelper.js';
import { computeElementsKey, UNSAFE_getGraphElement } from '@flapjs/services2/graph/GraphHelper.js';

export default function GraphReducer(prev, action)
{
    switch(action.type)
    {
        case 'add':
        {
            const { elementType, elementId, opts } = action;

            let next = { ...prev };
            let key = computeElementsKey(elementType);
            let nextElements = key in next ? {...next[key]} : {};
            let id = elementId || uuid();
            let element = new (elementType)(id, opts || {});
            nextElements[id] = element;
            next[key] = nextElements;
            return [ next, id ];
        }
        case 'delete':
        {
            const { elementType, elementId } = action;

            let next = { ...prev };
            let key = computeElementsKey(elementType);
            if (key in next)
            {
                let nextElements = {...next[key]};
                let element = nextElements[elementId];
                delete nextElements[elementId];
                next[key] = nextElements;
                element.onDestroy();
            }
            return next;
        }
        case 'clear':
        {
            const { elementType } = action;
            
            let next = { ...prev };
            let key = computeElementsKey(elementType);
            if (key in next)
            {
                next[key] = {};
            }
            return next;
        }
        case 'clearAll':
        {
            return {};
        }
        case 'update':
        {
            // Do nothing. It's a forceUpdate().
            return prev;
        }
        case 'resetState':
        {
            const { state } = action;
            return state;
        }
        case 'swapProperty':
        {
            let element = UNSAFE_getGraphElement(prev, action.elementType, action.elementId);
            let other = UNSAFE_getGraphElement(prev, action.targetType || action.elementType, action.targetId);
            let value = element[action.property];
            element[action.property] = other[action.property];
            other[action.property] = value;
            return prev;
        }
    }
}
