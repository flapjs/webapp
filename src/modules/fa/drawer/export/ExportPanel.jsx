import React, { useContext } from 'react';

import * as Downloader from '@flapjs/util/Downloader.js';
import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';

import { ViewContext } from '@flapjs/services/view/ViewContext.jsx';
import { useGraphType, useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';

import FiniteAutomataGraphExporter from '@flapjs/modules/fa/exporters/FiniteAutomataGraphExporter.js';
import FiniteAutomataJFLAP7Exporter from '@flapjs/modules/fa/exporters/FiniteAutomataJFLAP7Exporter.js';

export default function ExportPanel(props)
{
    const { svgRef } = useContext(ViewContext);
    const graphType = useGraphType();
    const graphState = useGraphState();

    return (
        <>
        <header>
            <h2>Export</h2>
        </header>
        <section>
            <ul>
                <li><button onClick={() => exportTo('graph', { graphType, graphState })}>Save to File</button></li>
                <li><button onClick={() => exportTo('jflap', { graphType, graphState })}>Export to JFF</button></li>
                <li><button onClick={() => exportTo('image', { svgRef })}>Export to Image</button></li>
                <li><button onClick={() => exportTo('svg', { svgRef })}>Export to SVG</button></li>
            </ul>
        </section>
        </>
    );
}

ExportPanel.Tab = createTabWithIcon(DownloadIcon);

function exportTo(exportType, opts)
{
    switch(exportType)
    {
        case 'image':
            Downloader.downloadImageFromSVG('Untitled.png', Downloader.FILE_TYPE_PNG, opts.svgRef.current, 640, 480);
            break;
        case 'svg':
            Downloader.downloadImageFromSVG('Untitled.svg', Downloader.FILE_TYPE_SVG, opts.svgRef.current, 640, 480);
            break;
        case 'graph':
            Downloader.downloadText('Untitled.fa.json', FiniteAutomataGraphExporter(opts.graphType, opts.graphState));
            break;
        case 'jflap':
            Downloader.downloadText('Untitled.jff', FiniteAutomataJFLAP7Exporter(opts.graphType, opts.graphState));
            break;
    }
}
