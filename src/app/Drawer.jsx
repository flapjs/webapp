import React from 'react';
import PropTypes from 'prop-types';

import SideBarLayout from '@flapjs/components/sidebar/layout/SideBarLayout.jsx';
import DrawerLayout from '@flapjs/components/drawer/layout/DrawerLayout.jsx';
import { DrawerConsumer } from '@flapjs/components/drawer/context/DrawerContext.jsx';

import DrawerSideBar from './DrawerSideBar.jsx';

export default function Drawer(props)
{
    const { renderViewport, side, direction } = props;
    const tabbedPanels = React.Children.toArray(props.children);

    return (
        <DrawerConsumer>
            {
                (state, dispatch) =>
                {
                    const tabIndex = state.tabIndex;
                    const panels = renderPanels(tabbedPanels, tabIndex);
                    const tabs = renderTabs(tabbedPanels, tabIndex => dispatch({ type: 'change-tab', value: tabIndex }), tabIndex);
                    
                    return (
                        <SideBarLayout
                            side={side}
                            renderSideBar = {() => (
                                <DrawerSideBar direction={direction}>
                                    {tabs}
                                </DrawerSideBar>
                            )}>
                            <DrawerLayout
                                side={side}
                                open={state.open}
                                renderDrawer = {() => panels}>
                                {renderViewport()}
                            </DrawerLayout>
                        </SideBarLayout>
                    );
                }
            }
        </DrawerConsumer>
    );
}
Drawer.propTypes = {
    children: PropTypes.node,
    renderViewport: PropTypes.func.isRequired,
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
    tabbedPanels: [],
    side: 'right',
    direction: 'horizontal',
    orientation: 'row',
    renderViewport: () => '==View.______==',
};

function renderPanels(tabbedPanels, tabIndex = 0)
{
    if (tabIndex >= 0 && tabIndex < tabbedPanels.length)
    {
        return tabbedPanels.map((e, i) => (
            <div
                key={i + ':' + e.type.name}
                style={{ display: tabIndex === i ? 'unset' : 'none' }}>
                {e}
            </div>
        ));
    }
    else
    {
        return null;
    }
}

function renderTabs(tabbedPanels, tabCallback, tabIndex = 0)
{
    return tabbedPanels.map((tabbedPanel, index) =>
    {
        // If not a custom element...
        if (!tabbedPanel.type || typeof tabbedPanel.type === 'string')
        {
            return tabbedPanel;
        }
        // Has a custom tab renderer...
        else if ('Tab' in tabbedPanel.type)
        {
            // Only if tab exists...
            if (!tabbedPanel.type.Tab) return null;
            const tabbedPanelCallback = tabCallback.bind(null, index);
            return React.createElement(tabbedPanel.type.Tab, {
                key: index + ':' + tabbedPanel.type.name,
                onClick: tabbedPanelCallback
            });
        }
        // Use default tab renderer...
        else
        {
            return tabbedPanel.type.name;
        }
    });
}
