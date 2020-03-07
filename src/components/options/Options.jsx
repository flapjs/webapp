import React from 'react';
import PropTypes from 'prop-types';
import Style from './Options.module.css';

export default function Options(props)
{
    const { title, disabled } = props;

    return (
        <fieldset className={Style.container}
            disabled={disabled}>
            <legend>{title}</legend>
            {props.children}
        </fieldset>
    );
}
Options.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    disabled: PropTypes.bool,
};
Options.defaultProps = {
    title: '',
    disabled: false,
};
