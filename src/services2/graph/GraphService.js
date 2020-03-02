import BaseService from '../base/BaseService.js';
import { GraphProvider } from './GraphContext.jsx';
import ViewService from '../view/ViewService.js';
import { GraphElementEditorProvider } from './editor/GraphElementEditorContext.jsx';
import GraphElementEditor from './editor/GraphElementEditor.jsx';

import { deserialize } from './GraphLoader.js';

import NodeGraph from './nodegraph/NodeGraph.js';
import NodeGraphPlayground from './nodegraph/NodeGraphPlayground.jsx';

export default class GraphService extends BaseService
{
    /** @override */
    static get services() { return [ ViewService ]; }
    /** @override */
    static get providers()
    {
        return [
            { component: GraphProvider, props: { graphType: NodeGraph } },
            GraphElementEditorProvider
        ];
    }
    /** @override */
    static get renders()
    {
        return {
            playarea: [ NodeGraphPlayground ],
            viewarea: [ GraphElementEditor ]
        };
    }
    /** @override */
    static get serviceVersion() { return '1.0.0'; }

    constructor(loader, contribs)
    {
        super(loader, contribs);

        // Load from localStorage.
        let data = localStorage.getItem('graphData');
        let graphState = {};
        if (data)
        {
            graphState = deserialize(NodeGraph, JSON.parse(data));
        }

        // GraphProvider
        contribs.providers[0].props.graphState = graphState;
    }
}

/**
 * Creates another GraphService with the given graph type.
 *
 * @param {Class<NodeGraph>} graphType The chosen graph type.
 * @param {Class<NodeGraphPlayground>} [graphPlayground] The complementary playground.
 * @returns {Class<GraphService>} The new GraphService with reducer function.
 */
GraphService.withGraphType = (graphType, graphPlayground = undefined) =>
{
    return class extends GraphService
    {
        constructor(loader, contribs)
        {
            super(loader, contribs);

            // GraphProvider
            contribs.providers[0].props.graphType = graphType;

            // "playarea" render slot
            if (graphPlayground)
            {
                contribs.playarea[0] = { component: graphPlayground };
            }
        }
    };
};
