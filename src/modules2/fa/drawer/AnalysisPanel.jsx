import React from 'react';

import { createTabWithIcon } from './DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

export default function AnalysisPanel(props)
{
    return (
        <>
        <header>
            <h2>Analysis</h2>
        </header>
        </>
    );
}

AnalysisPanel.Tab = createTabWithIcon(DownloadIcon);
