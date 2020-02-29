import React from 'react';
import PropTypes from 'prop-types';
import Style from './App.module.css';

import { SlotProvider } from '@flapjs/util/slot/SlotContext.jsx';
import { DrawerProvider } from '@flapjs/components/drawer/context/DrawerContext.jsx';

import AppLayout from './AppLayout.jsx';

export default function App(props)
{
    const { app } = props;

    return (
        <div className={Style.container}>
            <SlotProvider name="app">
                <DrawerProvider>
                    <AppLayout app={app}>
                    </AppLayout>
                </DrawerProvider>
            </SlotProvider>
        </div>
    );
}
App.propTypes = {
    app: PropTypes.object,
};
