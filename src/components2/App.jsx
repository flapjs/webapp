import React from 'react';
import PropTypes from 'prop-types';
import Style from './App.module.css';

import { SlotProvider } from '@flapjs/util/slot/SlotContext.jsx';
import { DrawerProvider } from './drawer/DrawerContext.jsx';

import AppLayout from './AppLayout.jsx';

import { ModuleProvider } from '@flapjs/modules2/ModuleContext.jsx';

export default function App(props)
{
    const { app } = props;

    return (
        <div className={Style.container}>
            <ModuleProvider>
                <SlotProvider name="app">
                    <DrawerProvider>
                        <AppLayout app={app}/>
                    </DrawerProvider>
                </SlotProvider>
            </ModuleProvider>
        </div>
    );
}
App.propTypes = {
    app: PropTypes.object,
};
