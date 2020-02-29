import React from 'react';

import { GraphProvider } from '@flapjs/services/graph2/GraphContext.jsx';
import GraphArea from '@flapjs/services/graph2/GraphArea.jsx';

export default function NodePlayground()
{
    return (
        <GraphProvider>
            <GraphArea></GraphArea>
        </GraphProvider>
    );
}
