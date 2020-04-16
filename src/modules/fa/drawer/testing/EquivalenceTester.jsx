import React, { useState } from 'react';

import { useMachine } from '@flapjs/services/machine/MachineHooks.jsx';

import Options from '@flapjs/components/options/Options.jsx';

import FiniteAutomataBuilder from '@flapjs/modules/fa/graphmachine/FiniteAutomataBuilder.js';
import { isEquivalentFSAWithWitness } from '@flapjs/modules/fa/machine/FSAUtils.js';
import { createMachineFromFileBlob } from '@flapjs/deprecated/modules/fa/machine/FSAMachineLoader.js';
import Upload from '@flapjs/components/upload/Upload.jsx';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';

export default function EquivalenceTester(props)
{
    const machine = useMachine(FiniteAutomataBuilder, 'graph');

    const [ targetMachine, setTargetMachine ] = useState(null);
    const [ isEqual, setEqual ] = useState(null);
    const [ witnessString, setWitnessString ] = useState('');

    return (
        <Options title={'Equivalence Tester'}>
            <div>
                <Upload onUpload={e =>
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

            <FieldButton id="testEquivalenceTargetFile" onClick={() =>
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
                Test Machine
            </FieldButton>
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
        </Options>
    );
}
