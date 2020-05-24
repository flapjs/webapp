import React, { useContext, useCallback, useEffect } from 'react';
// import Style from './FiniteAutomataToolbar.module.css';

import { GraphTypeContext, GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';

import Upload from '@flapjs/components/upload/Upload.jsx';

import { Undo, Redo } from '@flapjs/services/history/HistoryButtons.jsx';
import { useHistory } from '@flapjs/services/history/HistoryHook.jsx';

import { useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';

import FiniteAutomataImporter from '@flapjs/modules/fa/exporters/FiniteAutomataImporter.js';

import { DrawerDispatchContext } from '@flapjs/components/drawer/DrawerContext.jsx';
import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { PageEmptyIcon, DownloadIcon, UploadIcon } from '@flapjs/components/icons/Icons.js';
import Logger from '@flapjs/util/Logger';

export default function FiniteAutomataToolbar(props)
{
    const graphType = useContext(GraphTypeContext);
    const graphState = useGraphState();
    const graphDispatch = useContext(GraphDispatchContext);
    const drawerDispatch = useContext(DrawerDispatchContext);

    // History setup...
    const graphUpdateCallback = useCallback(data =>
    {
        let graphData = JSON.parse(data);
        let graphState = graphType.deserialize(graphData, {});
        graphDispatch({ type: 'resetState', state: graphState });
    }, [graphDispatch, graphType]);
    useHistory(graphType, () => JSON.stringify(graphType.serialize(graphState, {})));

    // Auto save...
    useEffect(() =>
    {
        Logger.debug('Toolbar', 'Performing autosave...');
        let graphData = graphType.serialize(graphState, {});
        localStorage.setItem(graphType.name + '.graphData', JSON.stringify(graphData));
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton
                iconClass={PageEmptyIcon}
                onClick={() => graphDispatch('clearAll')}
                title="New" />
            <Undo source={graphType} update={graphUpdateCallback} />
            <Redo source={graphType} update={graphUpdateCallback} />
            <IconButton
                iconClass={DownloadIcon}
                onClick={() => drawerDispatch({ type: 'change-tab', value: 3 })}
                title="Save" />
            <Upload iconClass={UploadIcon} onUpload={fileBlob =>
                FiniteAutomataImporter(fileBlob)
                    .then(graphState => graphDispatch({ type: 'resetState', state: graphState }))} />
        </div>
    );
}
