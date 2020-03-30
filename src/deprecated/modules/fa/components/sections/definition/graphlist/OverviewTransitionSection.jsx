import React from 'react';
import * as GraphElementListStyle from './GraphElementList.module.css';

import TransitionChart from './TransitionChart.jsx';

class OverviewTransitionSection extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    /** @override */
    render()
    {
        return (
            <fieldset className={GraphElementListStyle.container}>
                <legend>
                    Transitions
                </legend>
                <TransitionChart></TransitionChart>
            </fieldset>
        );
    }
}

export default OverviewTransitionSection;
