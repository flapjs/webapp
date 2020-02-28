import React from 'react';
import PropTypes from 'prop-types';
import Style from './AppBar.module.css';

export default function AppBar(props)
{
    return (
        <nav className={Style.container}>
            {props.children}
        </nav>
    );
}
AppBar.propTypes = {
    children: PropTypes.node,
};
