import React from 'react';
import PropTypes from 'prop-types';

import Style from './FieldButton.module.css';

export default function FieldButton(props)
{
    const { id, className, style, placeholder, disabled, value, onChange } = props;

    return (
        <div className={`${Style.element} ${className}`}>
            <button
                id={id}
                style={style}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}>
                {props.children}
            </button>
        </div>
    );
}
FieldButton.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
};
FieldButton.defaultProps = {
    value: ''
};
