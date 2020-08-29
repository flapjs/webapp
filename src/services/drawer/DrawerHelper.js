import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@flapjs/components/icons/IconButton.jsx';

const PANEL_TAB = Symbol('panelTab');

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

export function transformPanelToDrawerPanel(panel)
{
    return panel;
}

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
