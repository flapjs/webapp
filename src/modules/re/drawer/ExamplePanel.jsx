import React from 'react';

import { useMachine } from '../machinebuilder/RegularExpressionContext.jsx';

export default function ExamplePanel(props)
{
    const machine = useMachine();

    return (
        <div>
            {machine.string}
        </div>
    );
}
ExamplePanel.propTypes = {

};
