import GraphElement from '@flapjs/services/graph/elements/GraphElement.js';

import EdgeElement from './EdgeElement.js';

export default class NodeElement extends GraphElement
{
    constructor(id, opts = {})
    {
        super(id, opts);

        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.label = opts.label || '';
        this.radius = opts.radius || NodeElement.RADIUS;
    }

    /** @override */
    onDestroy(graphType, graphState)
    {
        // Remove connected edges that start from this node.
        const elements = graphType.getElements(graphState, EdgeElement);
        for(let element of elements)
        {
            if (element.fromId === this.id)
            {
                delete graphState[graphType.getElementTypeKeyForElementType(EdgeElement)][element.id];
                element.onDestroy(graphType, graphState);
                element.markDead();
            }
            else if (element.toId === this.id)
            {
                element.toId = 0;
            }
        }
    }
}
NodeElement.RADIUS = 15;
