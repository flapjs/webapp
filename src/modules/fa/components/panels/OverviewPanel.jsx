import React from 'react';
import PropTypes from 'prop-types';

import Pane from '@flapjs/components2/drawer/pane/Pane.jsx';

import IconButton from '@flapjs/components2/icons/IconButton.jsx';
import { PageContentIcon } from '@flapjs/components2/icons/Icons.js';

import DefinitionPane from '@flapjs/modules/fa/components/sections/definition/DefinitionPane.jsx';
import AnalysisPane from '@flapjs/modules/fa/components/sections/analysis/AnalysisPane.jsx';
import RenameAlphabetSymbolSection from '@flapjs/modules/fa/components/sections/RenameAlphabetSymbolSection.jsx';
import ApplyGraphLayoutSection from '@flapjs/modules/fa/components/sections/ApplyGraphLayoutSection.jsx';

class OverviewPanel extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    /** @override */
    render()
    {
        return (
            <>
            <header>
                <h1>Overview</h1>
            </header>
            <DefinitionPane editable={true}/>
            <AnalysisPane />
            <Pane title="Format">
                <RenameAlphabetSymbolSection/>
                <ApplyGraphLayoutSection/>
            </Pane>
            <Pane title="Automatic">
                <p>
                    <label htmlFor="overviewLabelPrefix">
                        Automatic node label prefix
                    </label>
                    <input id="overviewLabelPrefix"type="text"/>
                </p>
                <p>
                    <label htmlFor="overviewLabelAffix">
                        Automatic node index set
                    </label>
                    <input id="overviewLabelPrefix"type="text"/>
                </p>
                <p>
                    <input id="overviewAutoLabel" type="checkbox"/>
                    <label htmlFor="overviewAutoLabel">
                        Automatically assign node labels
                    </label>
                </p>
                <p>
                    <input id="overviewAutoPlace" type="checkbox"/>
                    <label htmlFor="overviewAutoPlace">
                        Automatically organize nodes
                    </label>
                </p>
                <p>
                    <input id="overviewSnapGrid" type="checkbox"/>
                    <label htmlFor="overviewSnapGrid">
                        Force snap to grid
                    </label>
                </p>
            </Pane>
            </>
        );
    }
}
OverviewPanel.Tab = Tab;

function Tab(props)
{
    const { onClick, ...otherProps } = props;
    return (
        <IconButton
            onClick={onClick}
            iconClass={PageContentIcon}
            {...otherProps}/>
    );
}
Tab.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default OverviewPanel;
