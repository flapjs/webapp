import React from 'react';
import PropTypes from 'prop-types';

import Style from './FieldInput.module.css';

export default function FieldInput(props)
{
    const { id, className, style, placeholder, disabled, value, onChange } = props;

    return (
        <div className={`${Style.element} ${className}`}>
            <label htmlFor={id}>
                {props.children}
            </label>
            <span>(</span>
            <input type="text"
                id={id}
                style={style}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange} />
            <span>)</span>
        </div>
    );
}
FieldInput.propTypes = {
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
FieldInput.defaultProps = {
    value: ''
};
