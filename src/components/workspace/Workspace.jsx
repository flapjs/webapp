import React from 'react';
import PropTypes from 'prop-types';

import FlexibleOrientationLayout from '@flapjs/components/layout/FlexibleOrientationLayout.jsx';
import WorkspaceLayout from './WorkspaceLayout.jsx';

import { Drawer } from '@flapjs/services/drawer/DrawerService.js';

export default function Workspace(props)
{
    const { renderBackground, renderForeground, panels } = props;
    return (
        <FlexibleOrientationLayout>
            {orientation =>
            {
                const side = orientation === 'row' ? 'right' : 'bottom';
                const direction = orientation === 'row' ? 'horizontal' : 'vertical';

                return (
                    <WorkspaceLayout
                        renderBackground={renderBackground}
                        renderForeground={() => (
                            <Drawer side={side}
                                direction={direction}
                                panels={panels}>
                                {renderForeground()}
                            </Drawer>
                        )}>
                        {props.children}
                    </WorkspaceLayout>
                );
            }}
        </FlexibleOrientationLayout>
    );
}
Workspace.propTypes = {
    children: PropTypes.node,
    renderForeground: PropTypes.func,
    renderBackground: PropTypes.func,
    panels: PropTypes.array,
};
Workspace.defaultProps = {
    panels: ['Welcome to Flap.js'],
};
