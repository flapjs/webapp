import React from 'react';
import PropTypes from 'prop-types';

import Slot from '@flapjs/util/slot/Slot.jsx';

import AppBar from './appbar/AppBar.jsx';
import Workspace from './workspace/Workspace.jsx';
import Viewport from './viewport/Viewport.jsx';

import Logo from './logo/Logo.jsx';
import ModuleSelector from './ModuleSelector.jsx';
import { useWelcome, WelcomeScreen } from './welcome/WelcomeService.js';

import DebugToggle from './DebugToggle.jsx';

import IconButton from './icons/IconButton.jsx';
import { BugIcon } from './icons/Icons.js';
import LogoImage from '../assets/images/logo-192.png';
import { LocaleSelector } from '@flapjs/services2/i18n/LocaleSelector.jsx';

const HOME_URL = 'https://github.com/flapjs/webapp';
const BUGREPORT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfqBFiGFGnxPI7QIWscv8jsIr5bj4LA3CS-is__2-YvJ_kTjQ/viewform';

/**
 * Defines these slots:
 * - header
 * - - appbar
 * - drawer
 * - footer
 * - splash
 * - workspace
 * - - background
 * - - foreground
 */
export default function AppLayout(props)
{
    const { app } = props;

    const { showWelcome } = useWelcome();

    return (
        <>
            <Slot mode="wrapped" name="providers">
                <header>
                    <WelcomeScreen footer={(<>Made with ❤️ by the <a href={HOME_URL} target="_blank" rel="noopener noreferrer">Flap.js Team</a>.</>)}>
                        <Logo title="Flap.js" version={app.version} onClick={() => window.open(HOME_URL, '_blank')}/>
                        <ModuleSelector/>
                    </WelcomeScreen>
                    <Slot name="header"></Slot>
                    <AppBar>
                        <DebugToggle/>
                        <img src={LogoImage} alt="Flap.js Logo" style={{ flex: 0, height: '70%', borderRadius: '0.5em' }} onClick={() => showWelcome()}/>
                        <Logo title="Flap.js" version={app.version} onClick={() => showWelcome()}/>
                        <Slot name="appbar"></Slot>
                        <div style={{flex: 1}}></div>
                        <ModuleSelector/>
                        <LocaleSelector/>
                        <IconButton iconClass= { BugIcon } onClick={() => window.open(BUGREPORT_URL, '_blank')}/>
                    </AppBar>
                </header>
                <main>
                    <Slot mode="consumer" name="drawer">
                        {slots => (
                            <Workspace
                                renderBackground={() => (
                                    <Viewport>
                                        <Slot name="background"></Slot>
                                    </Viewport>
                                )}
                                renderForeground={() => (
                                    <Viewport>
                                        <Slot name="foreground"></Slot>
                                    </Viewport>
                                )}
                                panels={slots}>
                                <Slot name="workspace"></Slot>
                            </Workspace>
                        )}
                    </Slot>
                </main>
                <footer>
                    {/* Nothing yet. Perhaps ice cream? */}
                    <Slot name="footer"></Slot>
                </footer>
                <Slot name="splash"></Slot>
            </Slot>
        </>
    );
}
AppLayout.propTypes = {
    app: PropTypes.object,
};
