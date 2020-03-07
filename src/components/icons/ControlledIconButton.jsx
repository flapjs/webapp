import React from 'react';
import PropTypes from 'prop-types';
import Style from './IconButton.module.css';

class ControlledIconButton extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    /** @override */
    render()
    {
        const {elementRef, className, iconClass, ...otherProps} = this.props;

        // NOTE: React doesn't like instantiating classes with lower-case, so here is to override that.
        const IconClass = iconClass;

        return (
            <button
                ref={elementRef}
                className={Style.container + ' ' + (className || '')}
                {...otherProps}>
                <IconClass className={Style.icon}/>
            </button>
        );
    }
}
ControlledIconButton.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    elementRef: PropTypes.object,
    // TODO: Should be ...isRequired, but PropTypes in production doesn't recognize it.
    iconClass: PropTypes.elementType,
};

export default ControlledIconButton;
