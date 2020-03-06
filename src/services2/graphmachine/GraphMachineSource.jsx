import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { GraphStateContext, GraphDispatchContext } from '@flapjs/services2/graph/GraphContext.jsx';

import { useSourceForMachine } from '@flapjs/services2/machine/MachineHooks.jsx';

export default function GraphMachineSource(props)
{
    const { machineBuilderType } = props;
    const graphState = useContext(GraphStateContext);
    const graphDispatch = useContext(GraphDispatchContext);
    useSourceForMachine(
        machineBuilderType,
        'graph',
        GraphStateContext,
        machine => machineBuilderType.updateGraphFromMachine(graphState, graphDispatch, machine)
    );
    return (<></>);
}
GraphMachineSource.propTypes = {
    // Should be a descendent of GraphMachineBuilder.
    machineBuilderType: PropTypes.elementType.isRequired,
};
