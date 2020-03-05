import React from 'react';

import { createTabWithIcon } from './DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

export default function OverviewPanel(props)
{
    return (
        <>
        <header>
            <h2>Overview</h2>
        </header>
        </>
    );
}

OverviewPanel.Tab = createTabWithIcon(DownloadIcon);
