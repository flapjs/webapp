import React from 'react';

import Pane from '@flapjs/components2/drawer/pane/Pane.jsx';

import AnalysisTransitionSection from './AnalysisTransitionSection.jsx';

function AnalysisPane(props)
{
    return (
        <Pane title="Analysis">
            <AnalysisTransitionSection />
        </Pane>
    );
}

export default AnalysisPane;
