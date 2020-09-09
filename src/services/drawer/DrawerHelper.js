import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@flapjs/components/icons/IconButton.jsx';

const PANEL_TAB = Symbol('panelTab');

/**
 * A helper function to get the drawer tab option for the panel option.
 * 
 * @param {Object} panel The panel option.
 * @returns {Object} The tab option derived from the given panel option.
 */
export function transformPanelToDrawerTab(panel)
{
    // May need to reach into the panel class slot object to find the tab...
    if (typeof panel === 'object' && 'component' in panel)
    {
        panel = panel.component;
    }
    
    if (typeof panel !== 'function') return '?';
    
    if (PANEL_TAB in panel)
    {
        return panel[PANEL_TAB];
    }
    else if ('tab' in panel)
    {
        return panel[PANEL_TAB] = panel.tab;
    }
    else if ('tabIcon' in panel)
    {
        const tab = createTabWithIcon(panel.tabIcon);
        panel[PANEL_TAB] = tab;
        return tab;
    }
    return '?';
}

/**
 * A helper function to get the drawer panel option for the panel option.
 * 
 * @param {Object} panel The panel option.
 * @returns {Object} The panel option.
 */
export function transformPanelToDrawerPanel(panel)
{
    // Although it just returns itself, it is here to complement transformPanelToDrawerTab().
    return panel;
}

/**
 * Creates a tab component for the given icon.
 * 
 * @param {typeof React.Component} iconClass The icon component.
 * @returns {import('react').ReactNode} The rendered content.
 */
export function createTabWithIcon(iconClass)
{
    function Tab(props)
    {
        const { onClick, ...otherProps } = props;
        return React.createElement(IconButton, {
            iconClass,
            onClick,
            ...otherProps,
        });
    }
    Tab.propTypes = {
        onClick: PropTypes.func,
    };
    return Tab;
}
