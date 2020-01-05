import React from 'react';

import TransitionTable from './TransitionTable.jsx';

class AnalysisTransitionSection extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    /** @override */
    render()
    {
        return (
            <fieldset>
                <legend>
                    Transitions Table
                </legend>
                <TransitionTable/>
            </fieldset>
        );
    }
}

export default AnalysisTransitionSection;
