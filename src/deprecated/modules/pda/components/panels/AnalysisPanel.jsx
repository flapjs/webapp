import React from 'react';
import Pane from '@flapjs/components2/drawer/pane/Pane.jsx';

class AnalysisPanel extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    /** @override */
    render()
    {
        return (
            <Pane>
                Hello!
            </Pane>
        );
    }
}

export default AnalysisPanel;
