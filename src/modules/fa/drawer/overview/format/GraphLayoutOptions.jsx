import React, { useRef } from 'react';
// import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';

import CircleLayout from './CircleLayout.js';
import { useGraphState, useGraphType } from '@flapjs/services/graph/GraphHooks.jsx';

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
                <button onClick={e => applyLayout(layoutSelectorRef.current.value, graphType, graphState)}>Apply</button>
            </div>
            <div>
                <input id=".autolayout"type="checkbox" disabled={true}/>
                <label htmlFor=".autolayout">Auto-Apply</label>
            </div>
            <hr/>
            <div>
                <input id=".snapgrid" type="checkbox" disabled={true}/>
                <label htmlFor=".snapgrid">Snap-to-Grid</label>
            </div>
        </Options>
    );
}
GraphLayoutOptions.propTypes = {
};
GraphLayoutOptions.defaultProps = {
};

function applyLayout(layoutId, graphType, graphState)
{
    switch(layoutId)
    {
        case 'circle':
            CircleLayout(graphType, graphState);
            break;
    }
}
