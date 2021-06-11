import React from 'react';
import { useView } from '@flapjs/services/view/ViewContext.jsx';
import * as Downloader from '@flapjs/util/Downloader.js';

import { DownloadIcon } from '@flapjs/components/icons/Icons.js';
import { useGraphSerializer } from '@flapjs/services3/graph/GraphContext.jsx';

export default function ExportPanel(props)
{
    const { svgRef } = useView();
    const serializer = useGraphSerializer();

    return (
        <>
            <header>
                <h2>Export</h2>
            </header>
            <section>
                <ul>
                    <li><button onClick={() => exportTo('graph', { serializer })}>Save to File</button></li>
                    <li><button onClick={() => exportTo('image', { svgRef })}>Export to Image</button></li>
                    <li><button onClick={() => exportTo('svg', { svgRef })}>Export to SVG</button></li>
                </ul>
            </section>
        </>
    );
}
ExportPanel.tabIcon = DownloadIcon;

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
            Downloader.downloadText('Untitled.node.json', JSON.stringify(opts.serializer()));
            break;
    }
}
