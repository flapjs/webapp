/* global __VERSION__ */
import React from 'react';
import Style from './Logo.module.css';

function Logo(props)
{
    return (
        <>
            <h2 className={Style.logo}>Flap.js</h2>
            <p className={Style.version}>{`v${__VERSION__}`}</p>
        </>
    );
}

export default Logo;
