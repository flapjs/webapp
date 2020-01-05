import React from 'react';
import PropTypes from 'prop-types';
import Style from './AppBar.module.css';

// import LocaleString from '@flapjs/util/localization/LocaleString.jsx';
import SessionTitle from '@flapjs/components/topbar/title/SessionTitle.jsx';
import Logo from '@flapjs/components/topbar/logo/Logo.jsx';

function AppBar(props)
{
    return (
        <nav className={Style.container + ' ' + (props.className || '')}>
            <Logo/>
            <SessionTitle changeModule={props.changeModule}></SessionTitle>
            {props.children}
        </nav>
    );
}
AppBar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    changeModule: PropTypes.func.isRequired,
};

export default AppBar;
