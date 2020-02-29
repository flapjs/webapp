import React from 'react';
import PropTypes from 'prop-types';

import FlexibleOrientationLayout from '@flapjs/components/layout/FlexibleOrientationLayout.jsx';
import WorkspaceLayout from './WorkspaceLayout.jsx';

import Drawer from './Drawer.jsx';

export default function Workspace(props)
{
    const { renderPlayground, renderViewport, panels } = props;
    return (
        <FlexibleOrientationLayout>
            {orientation =>
            {
                const side = orientation === 'row' ? 'right' : 'bottom';
                const direction = orientation === 'row' ? 'horizontal' : 'vertical';

                return (
                    <WorkspaceLayout
                        renderBackground={renderPlayground}
                        renderForeground={() => (
                            <Drawer side={side}
                                direction={direction}
                                panels={panels}
                                renderViewport={renderViewport}/>
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
    renderViewport: PropTypes.func,
    renderPlayground: PropTypes.func,
    panels: PropTypes.array,
};
Workspace.defaultProps = {
    panels: ['Welcome to Flap.js'],
};
