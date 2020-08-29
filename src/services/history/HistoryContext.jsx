import React from 'react';
import PropTypes from 'prop-types';

import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';
import { stringHash } from '@flapjs/util/MathHelper.js';

import { getSourceName } from './HistoryHelper.js';

const MAX_HISTORY_LENGTH = 1000;

export const HistoryStateContext = React.createContext(null);
export const HistoryDispatchContext = React.createContext(null);

export function HistoryProvider(props)
{
    const [ historyState, historyDispatch ] = useAsyncReducer(HistoryReducer, props.historyState, true);

    return (
        <HistoryStateContext.Provider value={historyState}>
            <HistoryDispatchContext.Provider value={historyDispatch}>
                {props.children}
            </HistoryDispatchContext.Provider>
        </HistoryStateContext.Provider>
    );
}
HistoryProvider.propTypes = {
    children: PropTypes.node,
    historyState: PropTypes.object,
};
HistoryProvider.defaultProps = {
    historyState: {}
};

function HistoryReducer(state, action)
{
    switch(action.type)
    {
        case 'undo':
        {
            const { source, update } = action;

            const sourceName = getSourceName(source);
            if (!(sourceName in state)) return;
            const sourceState = state[sourceName];
            
            if (sourceState.historyIndex <= 0) return;
            if (sourceState.historyIndex <= 1)
            {
                sourceState.historyIndex = 0;
            }
            else
            {
                sourceState.historyIndex -= 1;
            }

            const { data, hash } = sourceState.history[sourceState.historyIndex];
            update(data, hash);

            return { ...state };
        }
        case 'redo':
        {
            const { source, update } = action;

            const sourceName = getSourceName(source);
            if (!(sourceName in state)) return;
            const sourceState = state[sourceName];
            
            if (sourceState.historyIndex >= sourceState.history.length - 1) return;
            if (sourceState.historyIndex >= sourceState.history.length - 2)
            {
                sourceState.historyIndex = sourceState.history.length - 1;
            }
            else
            {
                sourceState.historyIndex += 1;
            }

            const { data, hash } = sourceState.history[sourceState.historyIndex];
            update(data, hash);

            return { ...state };
        }
        case 'commit':
        {
            const { source, data, hash } = action;

            const sourceHash = hash || stringHash(data);
            const sourceName = getSourceName(source);
            if (!(sourceName in state)) state[sourceName] = { history: [], historyIndex: 0 };
            const sourceState = state[sourceName];

            if (sourceState.history.length > 0
                && sourceState.history[sourceState.historyIndex].hash === sourceHash) return;
            
            let { historyIndex, history } = sourceState;
            let historyLength = history.length;

            // Cycle it.
            if (historyLength >= MAX_HISTORY_LENGTH)
            {
                if (historyIndex >= MAX_HISTORY_LENGTH - 1) historyIndex = MAX_HISTORY_LENGTH - 2;
                history.shift();
            }
            // Push it at current index.
            else
            {
                if (historyIndex >= historyLength - 1)
                {
                    historyIndex = historyLength;
                }
                else
                {
                    history.length = historyIndex + 1;
                    historyIndex += 1;
                }
            }

            history.push({ data, hash: sourceHash });
            sourceState.historyIndex = historyIndex;
            
            return { ...state };
        }
        case 'clear':
        {
            const { source } = action;

            const sourceName = getSourceName(source);
            if (!(sourceName in state)) return;
            const sourceState = state[sourceName];
            if (sourceState.history.length <= 0) return;

            sourceState.history.length = 0;
            sourceState.historyIndex = -1;

            return { ...state };
        }
        case 'resetState':
        {
            const { state } = action;
            return state;
        }
    }
}
