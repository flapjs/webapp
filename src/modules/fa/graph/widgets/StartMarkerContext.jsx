import React from 'react';

import { createConnector } from '@flapjs/behaviors/ConnectBehaviorFactory.jsx';

import MarkerTriangleRenderer from '@flapjs/renderers/markers/MarkerTriangleRenderer.jsx';

const { ConnectorProvider, useConnectorFromBehavior, useConnectorToBehavior } = createConnector((from, to, cursor) =>
{
    const target = to || cursor || null;
    return (
        <>
            {target &&
            <MarkerTriangleRenderer
                x={target.x}
                y={target.y}
                offset={target.radius || 0}
                childProps={{pointerEvents: 'none'}}
                maskProps={{pointerEvents: 'none'}}/>}
        </>
    );
});

export {
    ConnectorProvider as StartMarkerProvider,
    useConnectorFromBehavior as useStartMarkerFromBehavior,
    useConnectorToBehavior as useStartMarkerToBehavior,
};
