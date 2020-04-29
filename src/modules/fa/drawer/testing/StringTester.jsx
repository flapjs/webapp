import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { uuid } from '@flapjs/util/MathHelper.js';

import Options from '@flapjs/components/options/Options.jsx';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';
import ImportButton from './ImportButton.jsx';
import ExportButton from './ExportButton.jsx';
import Button from '@flapjs/components/lib/Button.jsx';
import { solveFSA } from '@flapjs/modules/fa/machine/FSAUtils.js';
import { useMachine } from '@flapjs/services/machine/MachineHooks.jsx';
import IconButton from '@flapjs/components/icons/IconButton.jsx';
import { PlayIcon, TrashCanIcon /* CircleCheckIcon, CircleCrossIcon */ } from '@flapjs/components/icons/Icons.js';
import { EMPTY_SYMBOL } from '@flapjs/modules/fa/machine/Symbols.js';

export default function StringTester(props)
{
    // NOTE: These strings MUST NEVER LEAVE THIS FUNCTION. Otherwise, bad things will happen... (desync)
    const [testStrings, setTestStrings] = useState([]);
    const fsa = useMachine(props.machineBuilderType, props.machineName);

    const onNewTestString = useCallback(() =>
    {
        let testString = createTestStringObject();
        setTestStrings([...testStrings, testString]);
    },
    [testStrings, setTestStrings]);

    let isEmpty = testStrings.length <= 0;

    function testStringsCallback(testStringsArr) 
    {
        let newTestStrings = [];
        for(let str of testStringsArr) 
        {
            newTestStrings.push(createTestStringObject(str));
        }
        // for now this overwrites the current test strings
        setTestStrings(newTestStrings);
    }

    return (
        <Options title="String Tester">
            <div>
                <FieldButton id="testStringButton"
                    onClick={onNewTestString}>
                    Add Test String
                </FieldButton>
                <ImportButton onClick={testStringsCallback} />
                <ExportButton testStrings={testStrings} />

                <Button disabled={isEmpty}
                    onClick={() =>
                    {
                        let newTestStrings = [...testStrings];
                        for(let testStringObject of newTestStrings)
                        {
                            let solved = solveFSA(fsa, testStringObject.value);
                            testStringObject.result = solved ? 'pass' : 'fail';
                        }
                        setTestStrings(newTestStrings);
                    }}>
                    Run All
                </Button>
                <Button disabled={isEmpty}
                    onClick={() =>
                    {
                        setTestStrings([]);
                    }}>
                    Remove All Tests
                </Button>
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
            </div>
        </Options>
    );
}
StringTester.propTypes = {
    machineBuilderType: PropTypes.elementType.isRequired,
    machineName: PropTypes.string,
};
StringTester.defaultProps = {
};

function createTestStringObject(value='',result='none')
{
    return {
        id: uuid(),
        value,
        result,
    };
}

function TestString(props)
{
    const { value, result, onClick, onChange, onRemove } = props;
     
    let renderedStatus;
    switch(result)
    {
        case 'pass':
            renderedStatus = '\u2611';
            break;
        case 'fail':
            renderedStatus = '\u2612';
            break;
        case 'none':
            renderedStatus = '\u2610';
            break;
        default:
            throw new Error(`Unknown status '${result}'.`);
    }

    return (
        <p>
            <IconButton
                title="Run"
                style={{ fill: 'white' }}
                iconClass={PlayIcon}
                onClick={onClick}/>
            <input type="text"
                value={value}
                placeholder={EMPTY_SYMBOL}
                onChange={onChange} />
            <label style={{ fontSize: '1.5rem' }}>
                {renderedStatus}
            </label>
            <IconButton
                title="Remove"
                iconClass={TrashCanIcon}
                onClick={onRemove}/>
        </p>
    );
}
TestString.propTypes = {
    value: PropTypes.string.isRequired,
    result: PropTypes.oneOf([
        'pass',
        'fail',
        'none',
    ]),
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
};
TestString.defaultProps = {
    result: null,
};
