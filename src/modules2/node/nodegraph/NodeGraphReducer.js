import { uuid } from '@flapjs/util/MathHelper.js';
import { computeElementsKey, UNSAFE_getGraphElement } from '@flapjs/services2/graph/GraphHelper.js';

export default function GraphReducer(prev, action)
{
    switch(action.type)
    {
        case 'add':
        {
            let next = { ...prev };
            let key = computeElementsKey(action.elementType);
            let nextElements = key in next ? {...next[key]} : {};
            let id = action.elementId || uuid();
            let element = new (action.elementType)(id, action.opts || {});
            nextElements[id] = element;
            next[key] = nextElements;
            return [ next, id ];
        }
        case 'delete':
        {
            let next = { ...prev };
            let key = computeElementsKey(action.elementType);
            if (key in next)
            {
                let nextElements = {...next[key]};
                let element = nextElements[action.elementId];
                delete nextElements[action.elementId];
                next[key] = nextElements;
                element.onDestroy();
            }
            return next;
        }
        case 'clear':
        {
            let next = { ...prev };
            let key = computeElementsKey(action.elementType);
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
