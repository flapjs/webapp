import React from 'react';
import PropTypes from 'prop-types';
import Style from './App.module.css';

import { DrawerProvider } from '@flapjs/components/drawer/context/DrawerContext.jsx';

import AppBar from './AppBar.jsx';
import Logo from './Logo.jsx';

import Workspace from './Workspace.jsx';
import Viewport from './Viewport.jsx';

import Slot from '@flapjs/util/slot/Slot.jsx';

export default function App(props)
{
    const { app } = props;

    return (
        <div className={Style.container}>
            <DrawerProvider>
                <Slot.Provider name='app'>
                    <header>
                        <AppBar>
                            <Logo title="Flap.js" version={app.version}/>
                            <Slot name="appbar"/>
                        </AppBar>
                    </header>
                    <main>
                        <Workspace
                            renderPlayground={() => (
                                <Viewport>
                                    <Slot name="playground"/>
                                </Viewport>
                            )}
                            renderViewport={() => (
                                <Viewport>
                                    <Slot name="viewport"/>
                                </Viewport>
                            )}>
                        </Workspace>
                    </main>
                    <footer>
                        {/* Nothing yet. Perhaps ice cream? */}
                    </footer>
                </Slot.Provider>
            </DrawerProvider>
        </div>
    );
}
App.propTypes = {
    app: PropTypes.object,
};
