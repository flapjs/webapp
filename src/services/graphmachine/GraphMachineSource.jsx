import React from 'react';
import PropTypes from 'prop-types';

import { useGraphForMachine } from './GraphMachineHooks.jsx';

/** Helps GraphMachineBuilder to identify the source of the graph to use for machine transformations. */
export default function GraphMachineSource(props)
{
    const { machineBuilderType } = props;

    useGraphForMachine(machineBuilderType);

    return (<></>);
}
GraphMachineSource.propTypes = {
    // Should be a descendent of GraphMachineBuilder.
    machineBuilderType: PropTypes.elementType.isRequired,
};
