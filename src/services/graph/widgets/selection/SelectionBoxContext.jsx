import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';
import { createConnector } from '@flapjs/behaviors/ConnectBehaviorFactory.jsx';
import { useView } from '@flapjs/services/view/ViewContext.jsx';

import NodeElement from '@flapjs/modules/node/graph/elements/NodeElement.js';
import { useGraphType, useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';

export const SelectionBoxStateContext = React.createContext(null);
export const SelectionBoxDispatchContext = React.createContext(null);

const { ConnectorProvider, useConnectorFromBehavior } = createConnector(
    (from, to, cursor) => (
        from && <rect
            x={Math.min(from.x, cursor.x)}
            y={Math.min(from.y, cursor.y)}
            width={Math.abs(cursor.x - from.x)}
            height={Math.abs(cursor.y - from.y)}
            fill="rgba(0, 0, 0, 0.5)"
            stroke="black"/>
    )
);

export function SelectionBoxProvider(props)
{
    return (
        <ConnectorProvider onConnect={() => {}}>
            <SelectionBoxStateProvider>
                {props.children}
            </SelectionBoxStateProvider>
        </ConnectorProvider>
    );
}
SelectionBoxProvider.propTypes = {
    children: PropTypes.node,
};

function SelectionBoxStateProvider(props)
{
    const [ state, dispatch ] = useAsyncReducer(SelectionBoxReducer, { elementIds: new Set() });

    // TODO: There's gotta be a better way than to just re-render everything.
    const graphType = useGraphType();
    const graphState = useGraphState();

    const { svgRef, pos } = useView();
    const fromRef = useRef({ x: 0, y: 0 });
    useConnectorFromBehavior(svgRef, fromRef.current, {
        useButton: 2,
        onDragBegin: (x, y) =>
        {
            fromRef.current.x = x - pos.x;
            fromRef.current.y = y - pos.y;
            return true;
        },
        onDragMove: (x, y) =>
        {
            let nextX = x - pos.x;
            let nextY = y - pos.y;
            let elements = graphType.findElementsWithinBox(
                graphState,
                NodeElement,
                fromRef.current.x,
                fromRef.current.y,
                nextX,
                nextY,
            );
            dispatch({ type: 'only', elementIds: elements.map(e => e.id) });
            return [ nextX, nextY ];
        },
    });

    return (
        <SelectionBoxStateContext.Provider value={state}>
            <SelectionBoxDispatchContext.Provider value={dispatch}>
                {props.children}
            </SelectionBoxDispatchContext.Provider>
        </SelectionBoxStateContext.Provider>
    );
}
SelectionBoxStateProvider.propTypes = {
    children: PropTypes.node,
};

function SelectionBoxReducer(state, action)
{
    switch(action.type)
    {
        case 'only':
        {
            let nextState = { ...state };
            nextState.elementIds.clear();
            for(let elementId of action.elementIds)
            {
                nextState.elementIds.add(elementId);
            }
            return nextState;
        }
        case 'add':
        {
            let nextState = { ...state };
            nextState.elementIds.add(action.elementId);
            return nextState;
        }
        case 'addAll':
        {
            let nextState = { ...state };
            for(let elementId of action.elementIds)
            {
                nextState.elementIds.add(elementId);
            }
            return nextState;
        }
        case 'remove':
        {
            let nextState = { ...state };
            nextState.elementIds.delete(action.elementId);
            return nextState;
        }
        case 'removeAll':
        {
            let nextState = { ...state };
            for(let elementId of action.elementIds)
            {
                nextState.elementIds.delete(elementId);
            }
            return nextState;
        }
        case 'toggle':
        {
            let nextState = { ...state };
            if (nextState.elementIds.has(action.elementId))
            {
                nextState.elementIds.delete(action.elementId);
            }
            else
            {
                nextState.elementIds.add(action.elementId);
            }
            return nextState;
        }
        case 'clear':
        {
            let nextState = { ...state };
            nextState.elementIds.clear();
            return nextState;
        }
    }
}
