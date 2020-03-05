import React from 'react';

import { createTabWithIcon } from '@flapjs/components2/drawer/DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

export default function TestingPanel(props)
{
    return (
        <>
        <header>
            <h2>Testing</h2>
        </header>
        <section>
            Hello
        </section>
        </>
    );
}

TestingPanel.Tab = createTabWithIcon(DownloadIcon);
