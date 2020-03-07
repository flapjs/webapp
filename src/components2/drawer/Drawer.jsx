import React from 'react';
import PropTypes from 'prop-types';

import SideBarLayout from '@flapjs/components2/sidebar/SideBarLayout.jsx';
import DrawerLayout from '@flapjs/components2/drawer/layout/DrawerLayout.jsx';
import { DrawerConsumer } from './DrawerContext.jsx';
import DrawerSideBar from './DrawerSideBar.jsx';
import { transformPanelToDrawerPanel, transformPanelToDrawerTab, } from './DrawerHelper.js';

import IconButton from '@flapjs/components2/icons/IconButton.jsx';
import { BoxEmptyIcon } from '@flapjs/components2/icons/Icons.js';

export default function Drawer(props)
{
    const { side, direction, panels } = props;
    const panelEntries = panels.map(panel => transformPanelToDrawerPanel(panel));
    const tabEntries = panels.map(panel => transformPanelToDrawerTab(panel));
    return (
        <DrawerConsumer>
            {
                (state, dispatch) =>
                {
                    const tabIndex = state.tabIndex;
                    return (
                        <SideBarLayout
                            side={side}
                            renderSideBar = {() => (
                                <DrawerSideBar direction={direction}>
                                    {renderTabs(tabEntries, tabIndex => dispatch({ type: 'change-tab', value: tabIndex }), tabIndex)}
                                </DrawerSideBar>
                            )}>
                            <DrawerLayout
                                side={side}
                                open={state.open}
                                renderDrawer = {() => (
                                    renderPanels(panelEntries, tabIndex)
                                )}>
                                {props.children}
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
    renderViewport: () => '==View.______==',
};

function renderPanels(panels, tabIndex = 0)
{
    return panels.map((panel, index) =>
    {
        let key;
        let component;
        let props;

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
                <div key={index + ':' + key} style={{ display: tabIndex === index ? 'unset' : 'none'}}>
                    {panel}
                </div>
            );
        }
        
        if (!component) return null;
        return (
            <div key={index + ':' + key} style={{ display: tabIndex === index ? 'unset' : 'none'}}>
                {React.createElement(component, props)}
            </div>
        );
    });
}

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
