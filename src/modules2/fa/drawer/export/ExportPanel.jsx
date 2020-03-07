import React from 'react';

import { createTabWithIcon } from '@flapjs/components2/drawer/DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components2/icons/Icons.js';

export default function ExportPanel(props)
{
    return (
        <>
        <header>
            <h2>Export</h2>
        </header>
        <section>
            Hello
        </section>
        </>
    );
}

ExportPanel.Tab = createTabWithIcon(DownloadIcon);
