import React from 'react';
import * as Style from './OverviewStateListSection.module.css';
import * as GraphElementListStyle from './GraphElementList.module.css';

import GraphService from '@flapjs/services/GraphService.js';

export const EMPTY_SET_CHAR = '\u2205';

class OverviewStateListSection extends React.Component
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
                    States
                </legend>
                <ul>
                    <GraphService.CONTEXT.StateConsumer>
                        {
                            graphService =>
                            {
                                let nodes = graphService.graphController.getGraph().getNodes();
                                if (nodes.length <= 0)
                                {
                                    return (
                                        <li className={Style.emptyLabel}>
                                            {EMPTY_SET_CHAR}
                                        </li>
                                    );
                                }
                                else
                                {
                                    return nodes.map(e => (
                                        <li key={e.getGraphElementID()}>
                                            <label className={`${Style.stateLabel} ${e.getNodeAccept() ? Style.stateAccept : ''}`}>
                                                {e.getNodeLabel()}
                                            </label>
                                        </li>
                                    ));
                                }
                            }
                        }
                    </GraphService.CONTEXT.StateConsumer>
                </ul>
            </fieldset>
        );
    }
}

export default OverviewStateListSection;
