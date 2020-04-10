import React from 'react';
import PropTypes from 'prop-types';

import Style from './FieldSwitch.module.css';

export default function FieldSwitch(props)
{
    const { id, className, title, disabled, checked, on, off, inplace, onClick } = props;

    return (
        <div className={`${Style.element} ${inplace ? Style.inplace : ''} ${disabled ? Style.disabled : ''} ${className}`}>
            {props.children &&
                <label className={Style.label}
                    htmlFor={id}>
                    {props.children}
                </label>}
            <button id={id}
                role="switch"
                aria-checked={checked}
                aria-labelledby={id}
                title={title}
                disabled={disabled}
                onClick={() => onClick && onClick(!checked)}>
                <span className={checked ? Style.checked : ''}>
                    {on}
                </span>
                <span className={!checked ? Style.checked : ''}>
                    {off}
                </span>
            </button>
        </div>
    );
}
FieldSwitch.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    checked: PropTypes.bool,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    on: PropTypes.string,
    off: PropTypes.string,
    inplace: PropTypes.bool,
};
FieldSwitch.defaultProps = {
    on: 'On',
    off: 'Off',
};
