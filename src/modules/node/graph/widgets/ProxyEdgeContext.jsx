import React from 'react';

import { createConnector } from '@flapjs/behaviors/ConnectBehaviorFactory.jsx';

import ControlledEdgeElementComponent from '../components/ControlledEdgeElementComponent.jsx';

const { ConnectorProvider, useConnectorFromBehavior, useConnectorToBehavior } = createConnector((from, to, cursor, opts) =>
    <>
        {from &&
    <ControlledEdgeElementComponent
        from={from}
        to={to || cursor}
        label={opts && opts.prevEdge && opts.prevEdge.label}
        opts={{
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
