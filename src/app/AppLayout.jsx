import React from 'react';
import PropTypes from 'prop-types';

import Slot from '@flapjs/util/slot/Slot.jsx';

import AppBar from './AppBar.jsx';
import Logo from './Logo.jsx';

import Workspace from './Workspace.jsx';
import Viewport from './Viewport.jsx';

export default function AppLayout(props)
{
    const { app } = props;

    return (
        <>
        <header>
            <AppBar>
                <Logo title="Flap.js" version={app.version}/>
                <Slot name="appbar"></Slot>
            </AppBar>
        </header>
        <main>
            <Slot mode="consumer" name="drawer">
                {slots => (
                    <Workspace
                        renderPlayground={() => (
                            <Viewport>
                                <Slot name="playground"></Slot>
                            </Viewport>
                        )}
                        renderViewport={() => (
                            <Viewport>
                                <Slot name="viewport"></Slot>
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
            <Slot.Fill slot="drawer" component={Panel}/>
        </footer>
        </>
    );
}
AppLayout.propTypes = {
    app: PropTypes.object,
};

function Panel(props)
{
    return (
        <>
        hi
        </>
    );
}
