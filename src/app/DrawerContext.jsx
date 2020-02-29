import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Behold...the drawer context.
export const DrawerStateContext = React.createContext();
export const DrawerDispatchContext = React.createContext();

// ...and it's reducer...
export function DrawerReducer(prev, action)
{
    let next;
    switch(action.type)
    {
        case 'open':
            next = { open: true };
            break;
        case 'close':
            next = { open: false };
            break;
        case 'toggle':
            next = { open: !prev.open };
            break;
        case 'change-tab':
            next = { open: true, tabIndex: action.value };
            break;
        default:
            throw new Error(`Unhandled reducer action '${action.type}'.`);
    }
    return [ next, undefined ];
}

// ...and it's provider...
export function DrawerProvider(props)
{
    // This should match the expected shape for the consumers.
    const [state, setState] = useState({ open: false, tabIndex: 0 });
    // This should match the expected interface for the consumers.
    async function dispatch(action)
    {
        let [nextState, result] = DrawerReducer(state, action);
        setState(nextState);
        return result;
    }

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
