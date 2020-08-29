import React from 'react';
import Style from './FiniteAutomataToolbar.module.css';

import Upload from '@flapjs/components/upload/Upload.jsx';
import FiniteAutomataImporter from '@flapjs/modules/fa/exporters/FiniteAutomataImporter.js';

import { useFiniteAutomataSerializer, useFiniteAutomataDeserializer } from './FiniteAutomataSerializer.jsx';

import { useDrawer } from '@flapjs/services/drawer/DrawerService.js';
import { useHistory, UndoButton, RedoButton } from '@flapjs/services/history/HistoryService.js';
import { useAutoSave } from '@flapjs/services/autosave/AutoSaveService.js';

import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { PageEmptyIcon, DownloadIcon, UploadIcon } from '@flapjs/components/icons/Icons.js';
import { useGraphType, useGraphDispatch } from '@flapjs/services/graph/GraphHooks.jsx';

export default function FiniteAutomataToolbar()
{
    const graphType = useGraphType();
    const graphDispatch = useGraphDispatch();
    
    const graphAutoSaveKey = graphType.name + '.autoSave';
    const graphHistoryKey = graphType.name + '.history';

    const serializer = useFiniteAutomataSerializer();
    const deserializer = useFiniteAutomataDeserializer();

    useAutoSave(graphAutoSaveKey, serializer, deserializer);

    const {
        doUndoHistory,
        canUndoHistory,
        doRedoHistory,
        canRedoHistory,
        clearHistory,
    } = useHistory(graphHistoryKey, serializer, deserializer);

    const {
        changeDrawerTab,
    } = useDrawer();

    return (
        <div className={Style.container}>
            <IconButton
                iconClass={PageEmptyIcon}
                onClick={() =>
                {
                    clearHistory();
                    graphDispatch('clearAll');
                }}
                title="New" />
            <UndoButton onClick={doUndoHistory} canClick={canUndoHistory} />
            <RedoButton onClick={doRedoHistory} canClick={canRedoHistory} />
            <IconButton
                iconClass={DownloadIcon}
                onClick={() => changeDrawerTab(3)}
                title="Save" />
            <Upload iconClass={UploadIcon} onUpload={fileBlob =>
                FiniteAutomataImporter(fileBlob)
                    .then(graphState => graphDispatch({ type: 'resetState', state: graphState }))} />
        </div>
    );
}
