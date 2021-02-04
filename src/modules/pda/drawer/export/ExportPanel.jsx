import React, { useState } from 'react';

import Pane from '@flapjs/components/pane/Pane.jsx';

import * as Downloader from '@flapjs/util/Downloader.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

import { useView } from '@flapjs/services/view/ViewService.js';
import { useGraphType, useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';

import FiniteAutomataGraphExporter from '@flapjs/modules/fa/exporters/FiniteAutomataGraphExporter.js';
import FiniteAutomataJFLAP7Exporter from '@flapjs/modules/fa/exporters/FiniteAutomataJFLAP7Exporter.js';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';
import FieldInput from '@flapjs/components/lib/FieldInput.jsx';

const UNTITLED_FILENAME = 'Untitled';

export default function ExportPanel(props)
{
    const { svgRef } = useView();
    const graphType = useGraphType();
    const graphState = useGraphState();
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
                        <li><FieldButton id="exportGraph" onClick={() => exportTo(fileName, 'graph', { graphType, graphState })}>Save to File</FieldButton></li>
                        <li><FieldButton id="exportJFLAP" onClick={() => exportTo(fileName, 'jflap', { graphType, graphState })}>Export to JFF</FieldButton></li>
                        <li><FieldButton id="exportToImage" onClick={() => exportTo(fileName, 'image', { svgRef })}>Export to Image</FieldButton></li>
                        <li><FieldButton id="exportToSVG" onClick={() => exportTo(fileName, 'svg', { svgRef })}>Export to SVG</FieldButton></li>
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
        case 'image':
            Downloader.downloadImageFromSVG(fileName + '.png', Downloader.FILE_TYPE_PNG, opts.svgRef.current, 640, 480);
            break;
        case 'svg':
            Downloader.downloadImageFromSVG(fileName + '.svg', Downloader.FILE_TYPE_SVG, opts.svgRef.current, 640, 480);
            break;
        case 'graph':
            Downloader.downloadText(fileName + '.fa.json', FiniteAutomataGraphExporter(opts.graphType, opts.graphState));
            break;
        case 'jflap':
            Downloader.downloadText(fileName + '.jff', FiniteAutomataJFLAP7Exporter(opts.graphType, opts.graphState));
            break;
    }
}
