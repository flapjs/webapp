import React from 'react';
import PropTypes from 'prop-types';

import Pane from '@flapjs/components/pane/Pane.jsx';

import OverviewStateListSection from './graphlist/OverviewStateListSection.jsx';
import OverviewAlphabetListSection from './graphlist/OverviewAlphabetListSection.jsx';
import OverviewTransitionSection from './graphlist/OverviewTransitionSection.jsx';
import ChangeDeterminismSection from './ChangeDeterminismSection.jsx';

function DefinitionPane(props)
{
    return (
        <Pane title="Definition">
            {
                props.editable && <ChangeDeterminismSection />
            }
            <OverviewStateListSection />
            <OverviewAlphabetListSection />
            <OverviewTransitionSection />
        </Pane>
    );
}
DefinitionPane.propTypes = {
    editable: PropTypes.bool
};
DefinitionPane.defaultProps = {
    editable: false
};

export default DefinitionPane;
