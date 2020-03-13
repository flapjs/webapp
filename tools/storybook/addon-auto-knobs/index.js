import { cloneElement } from 'react';
import { makeDecorator } from '@storybook/addons';
import { text, boolean, number, object } from '@storybook/addon-knobs';

export const withAutoKnobs = makeDecorator({
    name: 'withAutoKnobs',
    parameterName: 'autoKnobs',
    wrapper: (getStory, context, { options, parameters }) =>
    {
        const targetComponent = context.parameters.component;
        const story = getStory(context);
        
        if (targetComponent !== story.type) return story;

        const docGenInfo = targetComponent.__docgenInfo;
        if (!docGenInfo) return story;

        const { children, ...storyProps } = story.props;

        const newProps = {};
        for(let [propName, propInfo] of Object.entries(docGenInfo.props))
        {
            let defaultValue;
            if (propName in storyProps)
            {
                defaultValue = storyProps[propName];
                delete storyProps[propName];
            }
            else
            {
                defaultValue = getDefaultPropValue(propInfo);
            }

            let newPropValue = transformPropToKnob(propName, propInfo, defaultValue);
            if (typeof newPropValue !== 'undefined')
            {
                newProps[propName] = newPropValue;
            }
            else
            {
                // eslint-disable-next-line no-console
                console.warn(`Missing default prop value '${propName}' for '${context.kind}' at '${context.name}'.`);
            }
        }
        
        return cloneElement(story, {
            ...storyProps,
            ...newProps,
        }, children);
    }
});

function transformPropToKnob(propName, propInfo, propValue)
{
    switch(propInfo.type.name)
    {
        case 'string':
            return text(propName, propValue);
        case 'bool':
            return boolean(propName, propValue);
        case 'number':
            return number(propName, propValue);
        case 'object':
            return object(propName, propValue);
    }
}

function getDefaultPropValue(propInfo)
{
    switch(propInfo.type.name)
    {
        case 'string':
            return '';
        case 'bool':
            return false;
        case 'number':
            return 0;
        case 'object':
            return {};
    }
}
