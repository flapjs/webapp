import React from 'react';
import PropTypes from 'prop-types';
import Pane from '@flapjs/components/drawer/pane/Pane.jsx';
import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { PencilIcon } from '@flapjs/components/icons/Icons.js';
import { SessionConsumer } from '@flapjs/session/context/SessionContext.jsx';
import TestingEquivalenceSection from '../sections/TestingEquivalenceSection.jsx';

/* TODO : These messages definitely don't belong here but I'm not sure where
    they go.
*/
const MACHINE_TYPE_FA = 'fa';
const NFA_FLIP_STATE_MESSAGE = 'Warning: Flipping the states in an NFA does not'
+ ' produce a logically equivalent inverse.';

class AnalysisPanel extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            optimizeUnreachable: true,
            optimizeRedundant: false,
        };

        this.onChangeOptimizeUnreachable = this.onChangeOptimizeProperty.bind(this, 'optimizeUnreachable');
        this.onChangeOptimizeRedundant = this.onChangeOptimizeProperty.bind(this, 'optimizeRedundant');
        this.onPerformOptimization = this.onPerformOptimization.bind(this);
        this.onPerformDeterministicConversion = this.onPerformDeterministicConversion.bind(this);
        this.onPerformFlipAcceptStates = this.onPerformFlipAcceptStates.bind(this);
    }

    onChangeOptimizeProperty(key, e)
    {
        this.setState({ [key]: e.target.value });
    }

    onPerformOptimization()
    {

    }

    onPerformDeterministicConversion()
    {

    }

    onPerformFlipAcceptStates()
    {
        const session = this.session;
        const machineController = session.machineController;
        machineController.invertMachine();

        if (session.moduleID !== MACHINE_TYPE_FA)
        {
            //TODO : I'm not quite sure how to display this message here.
            //This has something to do with notifications
            alert(NFA_FLIP_STATE_MESSAGE);
        }
    }

    /** @override */
    render()
    {
        return (
            <SessionConsumer>
                {(session) =>
                {
                    this.session = session;
                    return (
                        <>
                            <header>
                                <h1>Analysis</h1>
                            </header>
                            <Pane title="Equivalent Conversions">
                                <ul>
                                    <li>
                                        <ul>
                                            <li>
                                                <input id="analysisOptimizationUnreachable"
                                                    type="checkbox"
                                                    value={this.state.optimizeUnreachable}
                                                    onChange={this.onChangeOptimizeUnreachable} />
                                                <label htmlFor="analysisOptimizationUnreachable">
                                                    Remove unreachable states
                                                </label>
                                            </li>
                                            <li>
                                                <input id="analysisOptimizationRedundant"
                                                    type="checkbox"
                                                    disabled={true}
                                                    value={this.state.optimizeRedundant}
                                                    onChange={this.onChangeOptimizeRedundant} />
                                                <label htmlFor="analysisOptimizationRedundant">
                                                    Remove redundant empty transitions
                                                </label>
                                            </li>
                                            <li>
                                                <button>
                                                    Perform selected optimizations
                                    </button>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button disabled={false} onClick={this.onPerformDeterministicConversion}>
                                            Convert to valid deterministic machine
                                        </button>
                                    </li>
                                </ul>
                            </Pane>
                            <Pane title="Related Converions">
                                <ul>
                                    <li>
                                        <button onClick={this.onPerformFlipAcceptStates}>
                                            Flip all accept states
                                        </button>
                                    </li>
                                </ul>
                            </Pane>
                            <Pane title="Equivalence Test">
                                <TestingEquivalenceSection />
                            </Pane>
                        </>
                    );
                }}

            </SessionConsumer>
        );

    }
}
AnalysisPanel.Tab = Tab;

function Tab(props)
{
    const { onClick, ...otherProps } = props;
    return (
        <IconButton
            onClick={onClick}
            iconClass={PencilIcon}
            {...otherProps} />
    );
}
Tab.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default AnalysisPanel;
