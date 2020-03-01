import React from 'react';

import { createConnector } from '@flapjs/hooks/behaviors/ConnectBehavior.jsx';

import ControlledEdgeElementComponent from '../elements/edge/ControlledEdgeElementComponent.jsx';

const { ConnectorProvider, useConnectorFromBehavior, useConnectorToBehavior } = createConnector(opts =>
    <>
    {opts.from &&
    <ControlledEdgeElementComponent from={opts.from} to={opts.to || opts.cursor} opts={{
        forceLine: false,
        placeholderLength: 15,
    }}/>}
    </>
);

export {
    ConnectorProvider as ProxyEdgeProvider,
    useConnectorFromBehavior as useProxyEdgeFromBehavior,
    useConnectorToBehavior as useProxyEdgeToBehavior,
};
