import React from 'react';
import PropTypes from 'prop-types';
import Style from './IconButton.module.css';

/**
 * A component that serves as a icon button that YOU control. It does not
 * handle any logic besides setting up the components, which means you 
 * must set the click listeners, hovers, etc. yourself.
 */
export default function ControlledIconButton(props)
{
    const {elementRef, className, iconClass: IconClass, ...otherProps} = props;

    return (
        <button
            ref={elementRef}
            className={Style.container + ' ' + (className || '')}
            {...otherProps}>
            <IconClass className={Style.icon}/>
        </button>
    );
}
ControlledIconButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    elementRef: PropTypes.object,
    // TODO: Should be ...isRequired, but PropTypes in production doesn't recognize it.
    iconClass: PropTypes.elementType,
};
