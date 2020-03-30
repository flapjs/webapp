import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@flapjs/util/MathHelper.js';

export const MachineContext = React.createContext();

export function MachineProvider(props)
{
    const contextId = useRef(uuid());
    return (
        <MachineContext.Provider value={contextId.current}>
            {props.children}
        </MachineContext.Provider>
    );
}
MachineProvider.propTypes = {
    children: PropTypes.node,
};
