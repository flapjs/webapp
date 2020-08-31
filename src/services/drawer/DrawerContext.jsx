import React, { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const DrawerContext = React.createContext(null);

export const DrawerConsumer = DrawerContext.Consumer;

export function DrawerProvider(props)
{
    const { children } = props;
    const [state, setState] = useState({ open: true, tabIndex: 0 });

    const drawerTabIndex = state.tabIndex;
    const drawerOpen = state.open;

    const openDrawer = useCallback(function openDrawer()
    {
        state.open = true;
        setState({ ...state });
    },
    [state]);

    const closeDrawer = useCallback(function closeDrawer()
    {
        state.open = false;
        setState({ ...state });
    },
    [state]);

    const toggleDrawer = useCallback(function toggleDrawer(force = !state.open)
    {
        state.open = force;
        setState({ ...state });
    },
    [state]);

    const changeDrawerTab = useCallback(function changeDrawerTab(tabIndex)
    {
        if (state.open && state.tabIndex === tabIndex)
        {
            state.open = false;
        }
        else
        {
            state.open = true;
            state.tabIndex = tabIndex;
        }
        setState({ ...state });
    },
    [state]);

    const drawerProviderValues = {
        openDrawer,
        closeDrawer,
        toggleDrawer,
        changeDrawerTab,
        drawerTabIndex,
        drawerOpen,
    };
    return (
        <DrawerContext.Provider value={drawerProviderValues}>
            {children}
        </DrawerContext.Provider>
    );
}
DrawerProvider.propTypes = {
    children: PropTypes.node,
};

export function useDrawer()
{
    const ctx = useContext(DrawerContext);

    if (!ctx)
    {
        throw Error('useDrawer() must be called from a descendent of "DrawerProvider"');
    }

    return ctx;
}
