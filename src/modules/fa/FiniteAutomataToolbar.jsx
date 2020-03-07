import React, { useContext, useCallback, useEffect } from 'react';
import { GraphTypeContext, GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';

import * as Downloader from '@flapjs/util/Downloader.js';
import Upload from '@flapjs/components/upload/Upload.jsx';
import { ViewContext } from '@flapjs/services/view/ViewContext.jsx';

import { Undo, Redo } from '@flapjs/services/history/HistoryButtons.jsx';
import { useHistory } from '@flapjs/services/history/HistoryHook.jsx';

import GraphStateDeserializer from '@flapjs/services/graph/GraphStateDeserializer.js';
import GraphStateSerializer from '@flapjs/services/graph/GraphStateSerializer';
import { useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';

import FiniteAutomataImporter from '@flapjs/modules/fa/FiniteAutomataImporter.js';
import FiniteAutomataExporter from '@flapjs/modules/fa/FiniteAutomataExporter.js';

export default function FiniteAutomataToolbar(props)
{
    const graphType = useContext(GraphTypeContext);
    const graphState = useGraphState();
    const graphDispatch = useContext(GraphDispatchContext);
    const { svgRef } = useContext(ViewContext);

    // History setup...
    const graphUpdateCallback = useCallback(data =>
    {
        graphDispatch({ type: 'resetState', state: GraphStateDeserializer(graphType, data) });
    },
    [ graphDispatch, graphType ]);
    useHistory(graphType, () => GraphStateSerializer(graphType, graphState));

    // Auto save...
    useEffect(() =>
    {
        let data = GraphStateSerializer(graphType, graphState);
        localStorage.setItem(graphType.name + '.graphData', data);
    });

    return (
        <>
        <fieldset>
            <Undo source={graphType} update={graphUpdateCallback}/>
            <Redo source={graphType} update={graphUpdateCallback}/>
        </fieldset>
        <fieldset>
            <button onClick={() => graphDispatch('clearAll')}>
                Clear Graph
            </button>
            <button onClick={() =>
            {
                Downloader.downloadImageFromSVG('Untitled.png', Downloader.FILE_TYPE_PNG, svgRef.current, 640, 480);
            }}>
                Export Image
            </button>
        </fieldset>
        <fieldset>
            <button onClick={() => Downloader.downloadText('Untitled.fa.json', FiniteAutomataExporter(graphState))}>
                Save To File
            </button>
            <Upload onUpload={fileBlob => graphDispatch({ type: 'resetState', state: FiniteAutomataImporter(fileBlob) })}/>
        </fieldset>
        </>
    );
}
