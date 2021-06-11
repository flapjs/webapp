import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import EdgeQuadraticRenderer from '@flapjs/renderers/edges/EdgeQuadraticRenderer.jsx';
import NodeCircleRenderer from '@flapjs/renderers/nodes/NodeCircleRenderer.jsx';

const GraphContext = React.createContext(null);
export function GraphProvider({ children })
{
    const api = {

    };
    return (
        <GraphContext.Provider value={api}>
            {children}
        </GraphContext.Provider>
    );
}
GraphProvider.propTypes = {
    children: PropTypes.node,
};

export function useGraphAPI()
{
    return useContext(GraphContext);
}

export function ExampleGraph(props = { graph: { nodes: [], edges: [] } })
{
    const nodes = useGraphNodes();
    const edges = useGraphEdges();

    return (
        <>
            {nodes.map((node) => <ExampleNode key={node.id}/>)}
            {edges.map((edge) => <ExampleEdge key={edge.id}/>)}
        </>
    );
}
ExampleGraph.propTypes = {
    graph: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.object),
        edges: PropTypes.arrayOf(PropTypes.object),
    }),
};

function ExampleNode()
{
    return <NodeCircleRenderer/>;
}

function ExampleEdge()
{
    return <EdgeQuadraticRenderer/>;
}
