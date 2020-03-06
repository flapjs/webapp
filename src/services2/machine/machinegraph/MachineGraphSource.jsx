import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { GraphStateContext, GraphDispatchContext } from '@flapjs/services2/graph/GraphContext.jsx';

import { useSourceForMachine } from '@flapjs/services2/machine/MachineHooks.jsx';

export default function MachineGraphSource(props)
{
    const { machineBuilderType, machineName } = props;
    const graphState = useContext(GraphStateContext);
    const graphDispatch = useContext(GraphDispatchContext);
    useSourceForMachine(
        machineBuilderType,
        machineName,
        GraphStateContext,
        machine => machineBuilderType.updateGraphFromMachine(graphState, graphDispatch, machine)
    );
    return (<></>);
}
MachineGraphSource.propTypes = {
    machineBuilderType: PropTypes.elementType.isRequired,
    machineName: PropTypes.string.isRequired,
};
