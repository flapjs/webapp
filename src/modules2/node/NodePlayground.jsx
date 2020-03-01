import React from 'react';

import { GraphProvider } from '@flapjs/services2/graph2/GraphContext.jsx';
import GraphArea from '@flapjs/services2/graph2/GraphArea.jsx';
import FAGraphReducer from '@flapjs/services2/faGraph/FAGraphReducer.js';

export default function NodePlayground()
{
    return (
        <GraphProvider reducer={FAGraphReducer}>
            <GraphArea></GraphArea>
        </GraphProvider>
    );
}
