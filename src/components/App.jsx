import React from 'react';
import PropTypes from 'prop-types';
import Style from './App.module.css';

import { SlotProvider } from '@flapjs/util/slot/SlotContext.jsx';

import { ModuleProvider } from '@flapjs/modules/ModuleContext.jsx';
import { DrawerProvider } from '@flapjs/services/drawer/DrawerService.js';

import AppLayout from './AppLayout.jsx';
import { WelcomeProvider } from './welcome/WelcomeContext.jsx';

export default function App(props)
{
    return (
        <div className={`${Style.container} ${Style.theme}`}>
            <ModuleProvider>
                <SlotProvider name="app">
                    <DrawerProvider>
                        <WelcomeProvider>
                            <AppLayout app={props}/>
                        </WelcomeProvider>
                    </DrawerProvider>
                </SlotProvider>
            </ModuleProvider>
        </div>
    );
}
App.propTypes = {
    env: PropTypes.oneOf([
        'development',
        'production'
    ]),
    version: PropTypes.string,
};
