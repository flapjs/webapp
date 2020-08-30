import { useCallback } from 'react';
import { uuid } from '@flapjs/util/MathHelper.js';

export function useAddCallback(name, state, setState, createElementObject)
{
    return useCallback(function addElement(elementProps = {})
    {
        const elements = state[name];
        const elementId = elementProps.id || uuid();
        if (elementId in elements) return;

        const element = createElementObject(elementId, elementProps);

        const nextNodes = {
            ...elements,
            [elementId]: element,
        };
        
        state[name] = nextNodes;
        setState({ ...state });
    },
    [createElementObject, name, setState, state]);
}

export function useRemoveCallback(name, state, setState)
{
    return useCallback(function removeElement(elementId)
    {
        const elements = state[name];
        if (elementId in elements)
        {
            const {
                // eslint-disable-next-line no-unused-vars
                [elementId]: deletedElement,
                ...nextElements
            } = elements;

            state[name] = nextElements;
            setState({ ...state });
        }
    },
    [name, setState, state]);
}

export function useUpdateCallback(name, state, setState, updateElementObject)
{
    return useCallback(function updateElement(elementId, elementProps)
    {
        const elements = state[name];
        if (elementId in elements)
        {
            const element = elements[elementId];
            const nextElement = updateElementObject(element, elementProps);

            const nextElements = {
                ...elements,
                [elementId]: nextElement,
            };
            
            state[name] = nextElements;
            setState({ ...state });
        }
    },
    [name, setState, state, updateElementObject]);
}

export function useGetCallback(name, state)
{
    return useCallback(function getElement(elementId)
    {
        const elements = state[name];
        if (elementId in elements)
        {
            return elements[elementId];
        }
        else
        {
            return null;
        }
    },
    [name, state]);
}
