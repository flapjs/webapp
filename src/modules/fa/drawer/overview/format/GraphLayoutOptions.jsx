import React, { useRef } from 'react';
// import PropTypes from 'prop-types';

import Button from '@flapjs/components/lib/Button.jsx';

import Options from '@flapjs/components/options/Options.jsx';

import CircleLayout from './CircleLayout.js';
import { useGraphState, useGraphType } from '@flapjs/services/graph/GraphHooks.jsx';
/* import FieldSwitch from '@flapjs/components/lib/FieldSwitch.jsx'; */

export default function GraphLayoutOptions(props)
{
    const graphType = useGraphType();
    const graphState = useGraphState();
    const layoutSelectorRef = useRef(null);

    return (
        <Options title={'Layout'}>
            <div>
                <select ref={layoutSelectorRef}>
                    <option value={'circle'}>Circle</option>
                    <option value={'grid'} disabled={true}>Grid</option>
                </select>
                <Button onClick={e => applyLayout(layoutSelectorRef.current.value, graphType, graphState)}>
                    Apply
                </Button>
            </div>
            {/*             <div>
                <FieldSwitch id="autolayout" disabled={true}>
                    Auto-Apply
                </FieldSwitch>
            </div>
            <hr/>
            <div>
                <FieldSwitch id="snapgrid" disabled={true}>
                    Snap-to-Grid
                </FieldSwitch>
            </div> */}
        </Options>
    );
}
GraphLayoutOptions.propTypes = {
};
GraphLayoutOptions.defaultProps = {
};

function applyLayout(layoutId, graphType, graphState)
{
    switch (layoutId)
    {
        case 'circle':
            CircleLayout(graphType, graphState);
            break;
    }
}
