import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@flapjs/util/MathHelper.js';

import Options from '@flapjs/components/options/Options.jsx';
import FieldButton from '@flapjs/components/lib/FieldButton.jsx';
import { solveFSA } from '@flapjs/modules/fa/machine/FSAUtils.js';
import { useMachine } from '@flapjs/services/machine/MachineHooks.jsx';

import TestString from './TestString.jsx';
import ImportButton from './ImportButton.jsx';
import ExportButton from './ExportButton.jsx';

export default function StringTester(props)
{
    // NOTE: These strings MUST NEVER LEAVE THIS FUNCTION. Otherwise, bad things will happen... (desync)
    const [testStrings, setTestStrings] = useState([]);
    const fsa = useMachine(props.machineBuilderType, props.machineName);

    const onNewTestString = useCallback(() =>
    {
        let testString = createTestStringObject();
        setTestStrings([...testStrings, testString]);
    }, [testStrings, setTestStrings]);

    const onImportTestStrings = useCallback((testStrings) =>
    {
        let newTestStrings = [];
        for (let testString of testStrings) 
        {
            newTestStrings.push(createTestStringObject(testString));
        }

        // TODO: for now this overwrites the current test strings, but maybe append?
        setTestStrings(newTestStrings);
    }, [setTestStrings]);

    let isEmpty = testStrings.length <= 0;

    return (
        <Options title="String Tester">
            <ImportButton onClick={onImportTestStrings} />
            <ExportButton testStrings={testStrings.map(testStringObject => testStringObject.value)} />

            <button disabled={isEmpty}
                onClick={() =>
                {
                    let newTestStrings = [...testStrings];
                    for (let testStringObject of newTestStrings)
                    {
                        let solved = solveFSA(fsa, testStringObject.value);
                        testStringObject.result = solved ? 'pass' : 'fail';
                    }
                    setTestStrings(newTestStrings);
                }}>
                Run All
            </button>
            <button disabled={isEmpty}
                onClick={() => setTestStrings([])}>
                Remove All Tests
            </button>
            {testStrings.map((testStringObject, index) =>
                <TestString
                    key={testStringObject.id}
                    value={testStringObject.value}
                    result={testStringObject.result}
                    onClick={e =>
                    {
                        let newTestStrings = [...testStrings];
                        let testStringObject = newTestStrings[index];
                        testStringObject.result = solveFSA(fsa, testStringObject.value) ? 'pass' : 'fail';
                        setTestStrings(newTestStrings);
                    }}
                    onChange={e =>
                    {
                        let newTestStrings = [...testStrings];
                        newTestStrings[index].value = e.target.value;
                        setTestStrings(newTestStrings);
                    }}
                    onRemove={e =>
                    {
                        let newTestStrings = [...testStrings];
                        newTestStrings.splice(index, 1);
                        setTestStrings(newTestStrings);
                    }}
                />
            )}
            {/*
                DESIGN QUESTION: Why is it at the bottom of the list? And not at the top?
                ANSWER: Because usually the workflow is to edit a single test string, then make
                a new one; only when we are testing the ui functionality do we want to create
                multiple empty test fields at one time.
            */}
            <FieldButton id="testStringButton"
                onClick={onNewTestString}>
                Add Test String
            </FieldButton>
        </Options>
    );
}
StringTester.propTypes = {
    machineBuilderType: PropTypes.elementType.isRequired,
    machineName: PropTypes.string,
};
StringTester.defaultProps = {
};

function createTestStringObject(value = '', result = 'none')
{
    return {
        id: uuid(),
        value,
        result,
    };
}
