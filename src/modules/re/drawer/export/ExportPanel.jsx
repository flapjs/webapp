import React, { useState } from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import * as Downloader from '@flapjs/util/Downloader.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';
import FieldInput from '@flapjs/components/lib/FieldInput.jsx';

const UNTITLED_FILENAME = 'Untitled';

export default function ExportPanel(props)
{
    const [fileName, setFileName] = useState(UNTITLED_FILENAME);

    return (
        <>
            <header>
                <h2 style={{ margin: '1rem' }}>Export</h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
                <Pane title="Export">
                    <FieldInput id="fileName"
                        value={fileName}
                        onChange={e => setFileName(e.target.value)}>
                        Enter filename
                    </FieldInput>
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                        <li><FieldButton id="exportMachine" onClick={() => exportTo(fileName, 'machine', { /* PUT MACHINE STATE HERE */})}>Save to File</FieldButton></li>
                    </ul>
                </Pane>
            </div>
        </>
    );
}
ExportPanel.tabIcon = DownloadIcon;

function exportTo(fileName, exportType, opts)
{
    if (!fileName)
    {
        fileName = UNTITLED_FILENAME;
    }

    switch (exportType)
    {
        case 'machine':
            Downloader.downloadText(fileName + '.re.json', ''/*RegularExpressionMachineExporter(opts)*/);
            break;
    }
}
