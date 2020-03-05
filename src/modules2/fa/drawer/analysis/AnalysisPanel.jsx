import React from 'react';

import { createTabWithIcon } from '@flapjs/components2/drawer/DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

export default function AnalysisPanel(props)
{
    return (
        <>
        <header>
            <h2>Analysis</h2>
        </header>
        <section>
            Hello
        </section>
        </>
    );
}

AnalysisPanel.Tab = createTabWithIcon(DownloadIcon);
