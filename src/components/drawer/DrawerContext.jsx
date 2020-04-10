import React from 'react';
import PropTypes from 'prop-types';
import { useAsyncReducer } from '@flapjs/hooks/AsyncReducerHook.jsx';

// Behold...the drawer context.
export const DrawerStateContext = React.createContext(null);
export const DrawerDispatchContext = React.createContext(null);

// ...and it's reducer...
export function DrawerReducer(prev, action)
{
    switch(action.type)
    {
        case 'open':
        {
            let nextState = { ...prev };
            nextState.open = true;
            return nextState;
        }
        case 'close':
        {
            let nextState = { ...prev };
            nextState.open = false;
            return nextState;
        }
        case 'toggle':
        {
            let nextState = { ...prev };
            nextState.open = !nextState.open;
            return nextState;
        }
        case 'change-tab':
        {
            let nextState = { ...prev };
            nextState.open = true;
            nextState.tabIndex = action.value;
            return nextState;
        }
        case 'toggle-tab':
        {
            let nextState = { ...prev };
            if (nextState.open && nextState.tabIndex === action.value)
            {
                nextState.open = false;
            }
            else
            {
                nextState.open = true;
                nextState.tabIndex = action.value;
            }
            return nextState;
        }
        default:
            throw new Error(`Unhandled reducer action '${action.type}'.`);
    }
}

// ...and it's provider...
export function DrawerProvider(props)
{
    const [ state, dispatch ] = useAsyncReducer(DrawerReducer, props.drawerState, true);

    return (
        <DrawerStateContext.Provider value={state}>
            <DrawerDispatchContext.Provider value={dispatch}>
                {props.children}
            </DrawerDispatchContext.Provider>
        </DrawerStateContext.Provider>
    );
}
DrawerProvider.propTypes = {
    children: PropTypes.node,
    drawerState: PropTypes.object,
};
DrawerProvider.defaultProps = {
    drawerState: { open: false, tabIndex: 0 },
};

// ...and it's consumers...
export function DrawerConsumer(props)
{
    return (
        <DrawerStateContext.Consumer>
            {
                stateContext =>
                    <DrawerDispatchContext.Consumer>
                        {
                            dispatchContext => props.children(stateContext, dispatchContext)
                        }
                    </DrawerDispatchContext.Consumer>
            }
        </DrawerStateContext.Consumer>
    );
}
DrawerConsumer.propTypes = {
    children: PropTypes.func.isRequired,
};

// ...together as a family at last. :)
