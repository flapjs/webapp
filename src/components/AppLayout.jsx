import React from 'react';
import PropTypes from 'prop-types';

import Slot from '@flapjs/util/slot/Slot.jsx';

import AppBar from './appbar/AppBar.jsx';
import Workspace from './workspace/Workspace.jsx';
import Viewport from './viewport/Viewport.jsx';

import Logo from './logo/Logo.jsx';
import ModuleSelector from './ModuleSelector.jsx';

import DebugToggle from './DebugToggle.jsx';

import IconButton from './icons/IconButton.jsx';
import { BugIcon } from './icons/Icons.js';

import { ToastProvider, useToasts } from '@flapjs/services/toast/ToastProvider.jsx';

const BUGREPORT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfqBFiGFGnxPI7QIWscv8jsIr5bj4LA3CS-is__2-YvJ_kTjQ/viewform';

function Toaster()
{
    const { add } = useToasts();
    return (
        <button onClick={() =>
        {
            add('Woot!');
        }}>
            AddToast
        </button>
    );
}

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

    return (
        <>
            <Slot mode="wrapped" name="providers">
                <ToastProvider>
                    <header>
                        <Slot name="header"></Slot>
                        <AppBar>
                            <Toaster></Toaster>
                            <Logo title="Flap.js" version={app.version}/>
                            <DebugToggle/>
                            <ModuleSelector/>
                            <Slot name="appbar"></Slot>                    
                            <IconButton iconClass= { BugIcon } onClick={() => window.open(BUGREPORT_URL, '_blank')}> </IconButton>
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
                </ToastProvider>
            </Slot>
        </>
    );
}
AppLayout.propTypes = {
    app: PropTypes.object,
};
