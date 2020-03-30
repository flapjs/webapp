import React from 'react';
import PropTypes from 'prop-types';

import { useGraphForMachine } from './GraphMachineHooks.jsx';

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
