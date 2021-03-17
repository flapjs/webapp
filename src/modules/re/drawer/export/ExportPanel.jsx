import React, { useState } from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import * as Downloader from '@flapjs/util/Downloader.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';
import FieldInput from '@flapjs/components/lib/FieldInput.jsx';
import { useMachine } from '../../machinebuilder/RegularExpressionContext.jsx';


const UNTITLED_FILENAME = 'Untitled';

export default function ExportPanel(props)
{
    const [fileName, setFileName] = useState(UNTITLED_FILENAME);
    const re = useMachine();

    return (
        <>
            <header>
                <h2 style={{ margin: '1rem' }}>Save</h2>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
                <Pane title="Save">
                    <FieldInput id="fileName"
                        value={fileName}
                        onChange={e => setFileName(e.target.value)}>
                        Enter filename
                    </FieldInput>
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                        <li><FieldButton id="exportMachine" onClick={() => exportTo(fileName, 'txt', re.string)}>Save as TXT</FieldButton></li>
                    </ul>
                </Pane>
            </div>
        </>
    );
}
ExportPanel.tabIcon = DownloadIcon;

function exportTo(fileName, exportType, str)
{
    if (!fileName)
    {
        fileName = UNTITLED_FILENAME;
    }

    switch (exportType)
    {
        case 'txt':
            Downloader.downloadText(fileName + '.txt', str);
            break;
    }
}
