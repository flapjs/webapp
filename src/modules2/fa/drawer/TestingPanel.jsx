import React from 'react';

import { createTabWithIcon } from './DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

export default function TestingPanel(props)
{
    return (
        <>
        <header>
            <h2>Testing</h2>
        </header>
        </>
    );
}

TestingPanel.Tab = createTabWithIcon(DownloadIcon);
