import React from 'react';
import PropTypes from 'prop-types';

import Style from './FieldButton.module.css';

export default function FieldButton(props)
{
    const { id, className, style, disabled, onClick } = props;

    return (
        <div className={`${Style.element} ${className}`}>
            <button
                id={id}
                style={style}
                disabled={disabled}
                onClick={onClick}>
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
    disabled: PropTypes.bool,
};
