import React from 'react';
import PropTypes from 'prop-types';

import SideBarLayout from '@flapjs/components/sidebar/layout/SideBarLayout.jsx';
import DrawerLayout from '@flapjs/components/drawer/layout/DrawerLayout.jsx';
import { DrawerConsumer } from '@flapjs/components/drawer/context/DrawerContext.jsx';

import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { BoxEmptyIcon } from '@flapjs/components/icons/Icons.js';

import DrawerSideBar from './DrawerSideBar.jsx';

export default function Drawer(props)
{
    const { renderViewport, side, direction, children } = props;
    return (
        <DrawerConsumer>
            {
                (state, dispatch) =>
                {
                    const tabIndex = state.tabIndex;
                    const panels = renderPanels(children, tabIndex);
                    const tabs = renderTabs(children, tabIndex => dispatch({ type: 'change-tab', value: tabIndex }), tabIndex);
                    
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
    children: PropTypes.arrayOf(PropTypes.elementType),
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

function renderPanels(children, tabIndex = 0)
{
    if (!Array.isArray(children)) return 'No drawers found -- Sorry :(';
    return children.map((e, i) =>
    {
        if (typeof e === 'function')
        {
            return (
                <div key={i + ':' + (e.name)} style={{ display: tabIndex === i ? 'unset' : 'none'}}>
                    {React.createElement(e)}
                </div>
            );
        }
        else
        {
            return (
                <div key={i + ':' + e}>
                    {e}
                </div>
            );
        }
    });
}

function renderTabs(children, tabCallback, tabIndex = 0)
{
    if (!Array.isArray(children)) return null;
    return children.map((child, index) =>
    {
        // Use custom component...
        if (typeof child === 'function' && 'Tab' in child)
        {
            // Only if tab is not null...
            if (!child.Tab) return null;

            const callback = tabCallback.bind(undefined, index);
            return React.createElement(child.Tab, {
                key: index + ':' + child.name,
                onClick: callback
            });
        }
        // Use default tab renderer...
        else
        {
            const callback = tabCallback.bind(null, index);
            return React.createElement(IconButton, {
                key: index + ':' + child.name,
                onClick: callback,
                iconClass: BoxEmptyIcon,
            });
        }
    });
}
