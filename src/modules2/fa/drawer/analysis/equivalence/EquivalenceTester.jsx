import React, { useState } from 'react';

import { useMachine } from '@flapjs/services2/machine/MachineHooks.jsx';

import FSABuilder from '@flapjs/modules2/fa/machine/FSABuilder.js';
import { isEquivalentFSAWithWitness } from '@flapjs/deprecated/modules/fa/machine/FSAUtils.js';
import { createMachineFromFileBlob } from '@flapjs/deprecated/modules/fa/machine/FSAMachineLoader.js';

export default function EquivalenceTester(props)
{
    const machine = useMachine(FSABuilder, 'graph');

    const [ targetMachine, setTargetMachine ] = useState(null);
    const [ isEqual, setEqual ] = useState(null);
    const [ witnessString, setWitnessString ] = useState('');

    return (
        <fieldset>
            <legend>Test equivalence with machine</legend>
            <div>
                <input type="file" name="import" onChange={e =>
                {
                    const files = e.target.files;
                    if (files.length > 0)
                    {
                        createMachineFromFileBlob(files[0])
                            .then(result => setTargetMachine(result))
                            .catch(err => setTargetMachine(err.message));
                    }
                    else
                    {
                        setTargetMachine(null);
                    }
                    e.target.value = null;
                }}/>
            </div>

            <button id="testEquivalenceTargetFile" onClick={() =>
            {
                if (typeof targetMachine === 'object')
                {
                    const equivalenceResult = isEquivalentFSAWithWitness(targetMachine, machine);
                    if (equivalenceResult.value)
                    {
                        setEqual(true);
                        setWitnessString('');
                    }
                    else
                    {
                        if(!equivalenceResult.witnessString)
                        {
                            setEqual(false);
                            setWitnessString('Sorry, unable to evaluate because the machines have different alphabets.');
                        }
                        else
                        {
                            setEqual(false);
                            setWitnessString('Witness: ' + equivalenceResult.witnessString);
                        }
                    }
                }
                else if (targetMachine)
                {
                    setEqual(null);
                    setWitnessString(targetMachine);
                }
            }}>
                Test
            </button>
            <output htmlFor="testEquivalenceTargetFile">
                <p>
                    {isEqual === null
                        ? '-- ??? --'
                        : isEqual
                            ? '-- Equivalent --'
                            : '-- Not Equivalent --'}
                </p>
                <p>
                    {witnessString}
                </p>
            </output>
        </fieldset>
    );
}
