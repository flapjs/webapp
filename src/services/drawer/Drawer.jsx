import React from 'react';
import PropTypes from 'prop-types';

import SideBarLayout from '@flapjs/components/sidebar/SideBarLayout.jsx';
import DrawerLayout from './layout/DrawerLayout.jsx';
import DrawerSideBar from './DrawerSideBar.jsx';
import { transformPanelToDrawerPanel, transformPanelToDrawerTab, } from './DrawerHelper.js';

import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { BoxEmptyIcon } from '@flapjs/components/icons/Icons.js';

import { useDrawer } from './DrawerService.js';

/**
 * @typedef {Function|Object} PanelOption
 * @property {Function} component The panel component.
 * @property {Object} props The props for the panel component.
 * @property {String} name The name of the panel.
 * 
 * @typedef {Function|Object} TabOption
 * @property {Function} component The tab component.
 * @property {Object} props The props for the tab component.
 * @property {String} name The name of the tab.
 */

/** A component to format and hold the drawer content. */
export function Drawer(props)
{
    const { children, side, direction, panels } = props;

    // A list of all panel components
    const panelEntries = panels.map(panel => transformPanelToDrawerPanel(panel));
    // A list of all tab components
    const tabEntries = panels.map(panel => transformPanelToDrawerTab(panel));

    const { changeDrawerTab, drawerTabIndex, drawerOpen, drawerRef } = useDrawer();

    return (
        <SideBarLayout
            side={side}
            sideBar={() => (
                <DrawerSideBar direction={direction}>
                    {renderTabs(tabEntries, changeDrawerTab)}
                </DrawerSideBar>
            )}>
            <DrawerLayout
                ref={drawerRef}
                side={side}
                open={drawerOpen}
                drawer = {() => renderPanels(panelEntries, drawerTabIndex)}>
                {children}
            </DrawerLayout>
        </SideBarLayout>
    );
}
Drawer.propTypes = {
    children: PropTypes.node,
    panels: PropTypes.array,
    side: PropTypes.oneOf([
        'top',
        'left',
        'right',
        'bottom'
    ]),
    direction: PropTypes.oneOf([
        'vertical',
        'horizontal'
    ]),
    orientation: PropTypes.oneOf([
        'row',
        'column'
    ]),
};
Drawer.defaultProps = {
    panels: [],
    side: 'right',
    direction: 'horizontal',
    orientation: 'row',
    // This is like this to complement the viewport's default content (which fills the empty space).
    renderViewport: () => '==View.______==',
};

/**
 * Renders the panels for the drawer. Only the panel that matches
 * the current tab index will be visible.
 * 
 * @param {Array<PanelOption>} panels 
 * @param {Number} [tabIndex=0]
 * @returns {import('react').ReactNode} The rendered content.
 */
function renderPanels(panels, tabIndex = 0)
{
    return panels.map((panel, index) =>
    {
        let key;
        let component;
        let props;

        const panelContainerStyle = {
            display: tabIndex === index ? 'unset' : 'none'
        };

        if (typeof panel === 'function')
        {
            component = panel;
            key = panel.name;
        }
        else if (typeof panel === 'object')
        {
            component = panel.component;
            key = panel.component.name;
            props = panel.props;
        }
        else
        {
            return (
                <div key={index + ':' + key} style={panelContainerStyle}>
                    {panel}
                </div>
            );
        }
        
        if (!component) return null;
        return (
            <div key={index + ':' + key} style={panelContainerStyle}>
                {React.createElement(component, props)}
            </div>
        );
    });
}

/**
 * Renders the tabs for the drawer.
 * 
 * @param {Array<TabOption>} tabs The list of tabs.
 * @param {Function} tabCallback The callback to handle tab selection.
 * @param {Number} tabIndex The current tab index.
 * @returns {import('react').ReactNode} The rendered content.
 */
function renderTabs(tabs, tabCallback, tabIndex = 0)
{
    return tabs.map((tab, index) =>
    {
        let key;
        let component;
        let props;

        if (typeof tab === 'function')
        {
            component = tab;
            key = tab.name;
            props = {};
        }
        else if (typeof tab === 'object')
        {
            component = tab.component;
            key = tab.component.name;
            props = tab.props;
        }
        else
        {
            const callback = tabCallback.bind(undefined, index);
            return (
                <IconButton key={index + ':' + tab}
                    onClick={callback}
                    iconClass={BoxEmptyIcon}/>
            );
        }

        if (!component) return null;
        const callback = tabCallback.bind(undefined, index);
        return React.createElement(component, {
            key: index + ':' + key,
            onClick: callback,
            ...props
        });
    });
}
