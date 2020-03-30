import React from 'react';
import Slot from './Slot.jsx';

export function withProps(componentClass, componentProps = {})
{
    return { component: componentClass, props: componentProps };
}

export function withChildSlot(slotName, componentClass, componentProps = {})
{
    return function SlotContainer(props)
    {
        return React.createElement(componentClass,
            { ...props, ...componentProps },
            React.createElement(Slot, { name: slotName }),
            // eslint-disable-next-line react/prop-types
            props.children);
    };
}
