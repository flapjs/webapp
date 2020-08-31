import React from 'react';
import PropTypes from 'prop-types';

import Style from './WelcomeScreen.module.css';
import { CrossIcon } from '@flapjs/components/icons/Icons.js';
import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { useWelcome } from './WelcomeContext.jsx';

export function WelcomeScreen(props)
{
    const { children } = props;
    const { open, hideWelcome } = useWelcome();

    return (
        <div className={Style.container + ' ' + (!open ? 'hidden' : '')}>
            <dialog open={open} className={Style.dialog}>
                <IconButton
                    // @ts-ignore
                    width="1rem"
                    className={Style.close}
                    iconClass={CrossIcon}
                    onClick={hideWelcome}/>
                <div className={Style.content}>
                    {children}
                    <button className={Style.button} onClick={hideWelcome}>
                        Continue to Workspace
                    </button>
                </div>
            </dialog>
        </div>
    );
}
WelcomeScreen.propTypes = {
    children: PropTypes.node,
};
