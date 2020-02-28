import React from 'react';
import PropTypes from 'prop-types';
import Style from './App.module.css';

import { DrawerProvider } from '@flapjs/components/drawer/context/DrawerContext.jsx';

import AppBar from './AppBar.jsx';
import Logo from './Logo.jsx';

import Workspace from './Workspace.jsx';
import Viewport from './Viewport.jsx';

export default function App(props)
{
    const { app } = props;

    return (
        <div className={Style.container}>
            <DrawerProvider>
                <header>
                    <AppBar>
                        <Logo title="Flap.js" version={app.version}/>
                    </AppBar>
                </header>
                <main>
                    <Workspace
                        renderPlayground={() => <Viewport></Viewport>}
                        renderViewport={() => <Viewport></Viewport>}>
                    </Workspace>
                </main>
                <footer>
                    {/* Nothing yet. Perhaps credits? */}
                </footer>
            </DrawerProvider>
        </div>
    );
}
App.propTypes = {
    app: PropTypes.object,
};
