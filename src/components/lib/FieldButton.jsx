import React from 'react';
import PropTypes from 'prop-types';
import Style from './FieldButton.module.css';

import Button from './Button.jsx';

export default function FieldButton(props)
{
    const { id, className, style, disabled, onClick } = props;

    return (
        <div className={`${Style.element} ${className}`}>
            <Button id={id}
                style={style}
                disabled={disabled}
                onClick={onClick}>
                {props.children}
            </Button>
        </div>
    );
}
FieldButton.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};
