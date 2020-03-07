import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@flapjs/components2/icons/IconButton.jsx';

export function transformPanelToDrawerTab(panel)
{
    // May need to reach into the panel class slot object to find the tab...
    if (typeof panel === 'object' && 'component' in panel)
    {
        panel = panel.component;
    }
    
    if (typeof panel !== 'function') return 'Tab?';
    return 'Tab' in panel ? panel.Tab : 'Tab?';
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
