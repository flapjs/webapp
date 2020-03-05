import React from 'react';

import { createTabWithIcon } from '@flapjs/components2/drawer/DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

export default function OverviewPanel(props)
{
    return (
        <>
        <header>
            <h2>Overview</h2>
        </header>
        <section>
            Hello
        </section>
        </>
    );
}

OverviewPanel.Tab = createTabWithIcon(DownloadIcon);
