import React, { useEffect, useState } from 'react';

import { useView } from '@flapjs/services/view/ViewService.js';
import { useDrawer } from '@flapjs/services/drawer/DrawerService.js';

// TODO: Please do this properly. This is just a bandage on the real problem.
export function DrawerViewMover()
{
    const view = useView();
    const { drawerOpen, drawerRef } = useDrawer();

    const [opened, setOpened] = useState(null);

    useEffect(() =>
    {
        if (opened === null)
        {
            // HACK: This is also just to appease the state gods. Don't do this pls.
            const drawer = drawerRef.current.drawer.current;
            const rect = drawer.getBoundingClientRect();
            const viewWidth = ((window.innerWidth - rect.width) / 5);
            if (drawerOpen)
            {
                view.setPos({ x: view.pos.x - viewWidth, y: view.pos.y });
            }
            else
            {
                view.setPos({ x: view.pos.x + viewWidth, y: view.pos.y });
            }
            setOpened(drawerOpen);
        }
        else if (drawerOpen !== opened)
        {
            // HACK: This is just to appease the layout gods. These should be calculated better.
            const drawer = drawerRef.current.drawer.current;
            const rect = drawer.getBoundingClientRect();
            const viewWidth = ((window.innerWidth - rect.width) / 5);
            if (drawerOpen)
            {
                view.setPos({ x: view.pos.x - viewWidth, y: view.pos.y });
            }
            else
            {
                view.setPos({ x: view.pos.x + viewWidth, y: view.pos.y });
            }
            setOpened(drawerOpen);
        }
    },
    [drawerOpen, drawerRef, opened, view]);

    return (<></>);
}
