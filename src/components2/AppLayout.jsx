import React from 'react';
import PropTypes from 'prop-types';

import Slot from '@flapjs/util/slot/Slot.jsx';

import AppBar from './appbar/AppBar.jsx';
import Workspace from './workspace/Workspace.jsx';
import Viewport from './viewport/Viewport.jsx';

import Logo from './logo/Logo.jsx';
import ModuleSelector from './ModuleSelector.jsx';

export default function AppLayout(props)
{
    const { app } = props;

    return (
        <>
        <Slot mode="wrapped" name="providers">
            <header>
                <AppBar>
                    <Logo title="Flap.js" version={app.version}/>
                    <ModuleSelector/>
                    <Slot name="appbar"></Slot>
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
        </Slot>
        </>
    );
}
AppLayout.propTypes = {
    app: PropTypes.object,
};
