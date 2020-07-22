import React, { useContext } from 'react';
import { ViewContext } from '@flapjs/services/view/ViewContext.jsx';
import * as Downloader from '@flapjs/util/Downloader.js';

import { createTabWithIcon } from '@flapjs/components/drawer/DrawerHelper.js';
import { DownloadIcon } from '@flapjs/components/icons/Icons.js';
import { GraphTypeContext } from '@flapjs/services/graph/GraphContext.jsx';
import { useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';
import NodeGraphExporter from '../../exporters/NodeGraphExporter.js';

export default function ExportPanel(props)
{
    const { svgRef } = useContext(ViewContext);

    const graphType = useContext(GraphTypeContext);
    const graphState = useGraphState();

    return (
        <>
            <header>
                <h2>Export</h2>
            </header>
            <section>
                <ul>
                    <li><button onClick={() => exportTo('graph', { graphState, graphType })}>Save to File</button></li>
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
            Downloader.downloadText('Untitled.node.json', NodeGraphExporter(opts.graphType, opts.graphState));
            break;
    }
}
