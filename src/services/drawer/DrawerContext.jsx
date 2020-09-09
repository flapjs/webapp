import React, { useContext, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * @typedef DrawerContextAPI
 * @property {Function} openDrawer
 * @property {Function} closeDrawer
 * @property {Function} toggleDrawer
 * @property {Function} changeDrawerTab
 * @property {Number} drawerTabIndex
 * @property {Boolean} drawerOpen
 * @property {import('react').MutableRefObject} drawerRef
 */

const DrawerContext = React.createContext(null);

export const DrawerConsumer = DrawerContext.Consumer;

export function DrawerProvider(props)
{
    const { children } = props;
    const [state, setState] = useState({ open: true, tabIndex: 0 });
    const drawerRef = useRef();

    const drawerTabIndex = state.tabIndex;
    const drawerOpen = state.open;

    /**
     * Opens the drawer and keeps it opened. That's pretty much it.
     */
    const openDrawer = useCallback(
        function openDrawer()
        {
            setState(state =>
            {
                state.open = true;
                return { ...state };
            });
        },
        []);

    /**
     * Closes the drawer and keeps it closed. That's pretty much it.
     */
    const closeDrawer = useCallback(
        function closeDrawer()
        {
            setState(state =>
            {
                state.open = false;
                return { ...state };
            });
        },
        []);

    /**
     * Toggles the drawer to open if closed and vice versa.
     * 
     * @param {Boolean} [force] Whether to force it to open/close, instead of toggle.
     */
    const toggleDrawer = useCallback(
        function toggleDrawer(force = undefined)
        {
            setState(state =>
            {
                if (typeof force === 'undefined')
                {
                    state.open = !state.open;
                }
                else
                {
                    state.open = Boolean(force);
                }
                return { ...state };
            });
        },
        []);

    /**
     * Changes the tab index for the drawer.
     * 
     * @param {Number} tabIndex The new tab index to change to.
     */
    const changeDrawerTab = useCallback(
        function changeDrawerTab(tabIndex)
        {
            setState(state =>
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
                return { ...state };
            });
        },
        []);

    const drawerContextAPI = {
        openDrawer,
        closeDrawer,
        toggleDrawer,
        changeDrawerTab,
        drawerTabIndex,
        drawerOpen,
        drawerRef,
    };
    return (
        <DrawerContext.Provider value={drawerContextAPI}>
            {children}
        </DrawerContext.Provider>
    );
}
DrawerProvider.propTypes = {
    children: PropTypes.node,
};

/** @returns {DrawerContextAPI} The provided drawer context. */
export function useDrawer()
{
    const ctx = useContext(DrawerContext);
    if (!ctx)
    {
        throw Error('useDrawer() must be called from a descendent of "DrawerProvider"');
    }
    return ctx;
}
