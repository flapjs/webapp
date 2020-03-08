import React from 'react';

import TooltipRenderer from '@flapjs/renderers/decors/TooltipRenderer.jsx';
import { useGraphElementIds } from '@flapjs/services/graph/elements/GraphElementHooks.jsx';
import NodeElement from '../elements/node/NodeElement.js';

export default function FiniteAutomataTooltip(props)
{
    const nodes = useGraphElementIds(NodeElement);

    return (
        <TooltipRenderer hidden={nodes.length > 0}/>
    );
}
