import React from 'react';
import PropTypes from 'prop-types';

import Style from './TextArea.module.css';

export default function TextArea(props)
{
    const { className, style, placeholder, disabled, value, onChange } = props;

    return (
        <div className={`${Style.element} ${className}`}>
            <span>(</span>
            <textarea
                style={style}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange} />
            <span>)</span>
        </div>
    );
}
TextArea.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
};
TextArea.defaultProps = {
    value: ''
};
