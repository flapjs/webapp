import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ItemListStyle from './ItemList.module.css';

import { ViewContext } from '@flapjs/services/view/ViewContext.jsx';

import { useMachineBuilder } from '@flapjs/services/machine/MachineHooks.jsx';

import FSABuilder from '@flapjs/modules/fa/machine/FSABuilder.js';
import { EMPTY_SET } from '@flapjs/modules/fa/machine/Symbols.js';
import { useGraphState } from '@flapjs/services/graph/GraphHooks.jsx';
import { UNSAFE_getGraphElement } from '@flapjs/services/graph/GraphHelper.js';
import NodeElement from '@flapjs/modules/node/nodegraph/elements/node/NodeElement.js';

export default function StateList(props)
{
    const machineBuilder = useMachineBuilder(FSABuilder, props.machineName);
    const machine = machineBuilder.getMachine();
    const states = Array.from(machine.getStates());

    const { setLookAt } = useContext(ViewContext);
    const graphState = useGraphState();
    
    return (
        <fieldset>
            <legend>
                States
            </legend>
            <ul className={ItemListStyle.itemList}>
                {states.length <= 0
                    ? (
                        <li>
                            <label className={ItemListStyle.emptyLabel}>
                                {EMPTY_SET}
                            </label>
                        </li>
                    )
                    : (
                        states.map(state => (
                            <li key={state.getStateID()}>
                                <label
                                    className={ItemListStyle.itemLabel + ' '
                                        + (machine.isFinalState(state) ? ItemListStyle.markedLabel : '')}
                                    onClick={() => focusOnState(machineBuilder, state.getStateID(), graphState, setLookAt)}>
                                    {state.getStateLabel()}
                                </label>
                            </li>
                        ))
                    )}
            </ul>
        </fieldset>
    );
}
StateList.propTypes = {
    machineName: PropTypes.string.isRequired,
};

function focusOnState(machineBuilder, stateId, graphState, setLookAt)
{
    let nodeId = machineBuilder.sourceMap.get(stateId);
    let node = UNSAFE_getGraphElement(graphState, NodeElement, nodeId);
    setLookAt(node.x, node.y);
}
