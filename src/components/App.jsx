import React from 'react';
import PropTypes from 'prop-types';
import Style from './App.module.css';

import { SlotProvider } from '@flapjs/util/slot/SlotContext.jsx';
import { DrawerProvider } from './drawer/DrawerContext.jsx';

import AppLayout from './AppLayout.jsx';

import { ModuleProvider } from '@flapjs/modules/ModuleContext.jsx';

export default function App(props)
{
    return (
        <div className={`${Style.container} ${Style.theme}`}>
            <ModuleProvider>
                <SlotProvider name="app">
                    <DrawerProvider>
                        <AppLayout app={props}/>
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
