import React, { useContext, useCallback, useEffect } from 'react';
import Style from './FiniteAutomataToolbar.module.css';

import { GraphTypeContext, GraphDispatchContext } from '@flapjs/services/graph/GraphContext.jsx';

import Upload from '@flapjs/components/upload/Upload.jsx';

import { Undo, Redo } from '@flapjs/services/history/HistoryButtons.jsx';
import { useHistory } from '@flapjs/services/history/HistoryHook.jsx';

import { useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';

import FiniteAutomataImporter from '@flapjs/modules/fa/exporters/FiniteAutomataImporter.js';

import { DrawerDispatchContext } from '@flapjs/components/drawer/DrawerContext.jsx';
import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { PageEmptyIcon } from '@flapjs/components/icons/Icons.js';

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
    },
    [ graphDispatch, graphType ]);
    useHistory(graphType, () => JSON.stringify(graphType.serialize(graphState, {})));

    // Auto save...
    useEffect(() =>
    {
        let graphData = graphType.serialize(graphState, {});
        localStorage.setItem(graphType.name + '.graphData', JSON.stringify(graphData));
    });

    return (
        <>
        <IconButton
            iconClass={PageEmptyIcon}
            onClick={() => graphDispatch('clearAll')}
            title="New"/>
        <fieldset className={Style.toolset}>
            <Undo source={graphType} update={graphUpdateCallback}/>
            <Redo source={graphType} update={graphUpdateCallback}/>
        </fieldset>
        <fieldset className={Style.toolset}>
            <button onClick={() => drawerDispatch({ type: 'change-tab', value: 3 })}>
                Save
            </button>
            <Upload onUpload={fileBlob => graphDispatch({ type: 'resetState', state: FiniteAutomataImporter(fileBlob) })}/>
        </fieldset>
        </>
    );
}
