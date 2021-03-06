import React from 'react';

import * as Downloader from '@flapjs/util/Downloader.js';
import { transformFileBlobToText } from '@flapjs/util/UploadHelper.js';
import Upload from '@flapjs/components/upload/Upload.jsx';

import { useView } from '@flapjs/services/view/ViewContext.jsx';
import { useAutoSave } from '@flapjs/services/autosave/AutoSaveService.js';
import { useHistory, UndoButton, RedoButton } from '@flapjs/services2/history/HistoryService.js';
import { useGraph } from '@flapjs/services/graph2/GraphService.js';

import { useTreeDeserializer, useTreeSerializer } from './TreeSerializer.jsx';
import { useLocale } from '@flapjs/services2/i18n/I18NService.js';

export function TreeToolbar()
{
    const autoSaveKey = 'treeGraph.autosave';
    const historyKey = 'treeGraph.history';
    
    const exportedImageFileName = 'Untitled.png';
    const savedFileName = 'Untitled.tree.json';

    const { getLocaleString } = useLocale();
    const { svgRef } = useView();

    const graph = useGraph();
    const serializer = useTreeSerializer();
    const deserializer = useTreeDeserializer();

    useAutoSave(autoSaveKey, serializer, deserializer);

    const {
        doUndoHistory,
        canUndoHistory,
        doRedoHistory,
        canRedoHistory,
        clearHistory,
    } = useHistory(historyKey, serializer, deserializer);

    return (
        <>
            <UndoButton onClick={doUndoHistory} canClick={canUndoHistory}/>
            <RedoButton onClick={doRedoHistory} canClick={canRedoHistory}/>
            <button onClick={() =>
            {
                graph.clearGraph();
                clearHistory();
            }}>
                {getLocaleString('action.workspace.new')}
            </button>
            <button onClick={() =>
            {
                Downloader.downloadImageFromSVG(exportedImageFileName, Downloader.FILE_TYPE_PNG, svgRef.current, 640, 480);
            }}>
                {getLocaleString('action.workspace.export')}
            </button>
            <button onClick={() =>
            {
                let graphData = serializer({});
                Downloader.downloadText(savedFileName, JSON.stringify(graphData));
            }}>
                {getLocaleString('action.workspace.save')}
            </button>
            <Upload title={getLocaleString('action.workspace.upload')} onUpload={fileBlob =>
            {
                transformFileBlobToText(fileBlob)
                    .then(data => deserializer(JSON.parse(data)));
            }}/>
        </>
    );
}
