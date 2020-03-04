import React from 'react';
import PropTypes from 'prop-types';

import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';

const MAX_HISTORY_LENGTH = 1000;

export const HistoryStateContext = React.createContext();
export const HistoryDispatchContext = React.createContext();

export function HistoryProvider(props)
{
    const [ historyState, historyDispatch ] = useAsyncReducer(HistoryReducer, props.historyState);

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
    historyState: PropTypes.shape({
        history: PropTypes.arrayOf(
            PropTypes.shape({
                source: PropTypes.any,
                state: PropTypes.object,
            })),
        historyIndex: PropTypes.number,
    }),
};
HistoryProvider.defaultProps = {
    historyState: {
        history: [],
        historyIndex: 0,
    },
};

function HistoryReducer(state, action)
{
    switch(action.type)
    {
        case 'undo':
        {
            let nextState = { ...state };
            if (nextState.historyIndex <= 1)
            {
                nextState.historyIndex = 0;
            }
            else
            {
                nextState.historyIndex -= 1;
            }
            return nextState;
        }
        case 'redo':
        {
            let nextState = { ...state };
            if (nextState.historyIndex >= nextState.history.length - 2)
            {
                nextState.historyIndex = nextState.history.length - 1;
            }
            else
            {
                nextState.historyIndex += 1;
            }
            return nextState;
        }
        case 'commit':
        {
            let nextState = { ...state };

            // Cycle it.
            if (nextState.history.length >= MAX_HISTORY_LENGTH)
            {
                nextState.history.shift();
            }
            // Makes sure the historyIndex is updated.
            else if (nextState.historyIndex === nextState.history.length - 1)
            {
                nextState.historyIndex += 1;
            }
            nextState.history.push({ source: action.source, state: action.state });

            return nextState;
        }
        case 'clear':
        {
            let nextState = { ...state };
            nextState.history.length = 0;
            nextState.historyIndex = 0;
            return nextState;
        }
    }
}
