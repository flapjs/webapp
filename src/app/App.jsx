import React from 'react';
import PropTypes from 'prop-types';
import Style from './App.module.css';

import { SlotProvider } from '@flapjs/util/slot/SlotContext.jsx';
import { DrawerProvider } from './drawer/DrawerContext.jsx';

import AppLayout from './AppLayout.jsx';

import { useManagers } from '@flapjs/managers/ManagerHooks.jsx';
import ModuleManager from '@flapjs/managers/module/ModuleManager.js';
import SessionManager from '@flapjs/managers/session/SessionManager';

export default function App(props)
{
    const { app } = props;

    useManagers([
        SessionManager,
        ModuleManager,
    ]);

    return (
        <div className={Style.container}>
            <SlotProvider name="app">
                <DrawerProvider>
                    <AppLayout app={app}/>
                </DrawerProvider>
            </SlotProvider>
        </div>
    );
}
App.propTypes = {
    app: PropTypes.object,
};
