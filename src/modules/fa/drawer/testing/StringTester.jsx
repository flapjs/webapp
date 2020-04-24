import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';
import Button from '@flapjs/components/lib/Button.jsx';
import { solveFSA } from '@flapjs/modules/fa/machine/FSAUtils.js';
import { useMachine } from '@flapjs/services/machine/MachineHooks.jsx';
//import { CircleCheckIcon, CircleCrossIcon } from '@flapjs/components/icons/Icons.js';
import { EMPTY_SYMBOL } from '@flapjs/modules/fa/machine/Symbols.js';

export default function StringTester(props)
{
    const [testStrings, setTestStrings] = useState([]);
    const [testResults, setTestResults] = useState([]);
    const fsa = useMachine(props.machineBuilderType, props.machineName);

    const onNewTestString = useCallback(() =>
    {
        setTestStrings([...testStrings, '']);
        setTestResults([...testResults, 'none']);
    },
    [testStrings, setTestStrings, testResults, setTestResults]);

    return (
        <Options title="String Tester">
            <div>
                <FieldButton id="testStringButton"
                    onClick={onNewTestString}>
                    Add Test String
                </FieldButton>

                <Button disabled={testStrings.length <= 0}
                    onClick={() =>
                    {
                        let results = [];
                        for(let i = 0; i < testStrings.length; i++)
                        {
                            let result = solveFSA(fsa, testStrings[i]);
                            results.push(result ? 'pass' : 'fail');
                        }
                        setTestResults(results);
                    }}>
                    Run All
                </Button>
                {testStrings.map((value, key) =>
                    <TestString
                        key={key}
                        value={value}
                        result={testResults[key]}
                        onClick={e =>
                        {
                            let newTestResults = [...testResults];
                            newTestResults[key] = solveFSA(fsa, value) ? 'pass' : 'fail';
                            setTestResults(newTestResults);
                        }}
                        onChange={e =>
                        {
                            const newTests = [...testStrings];
                            newTests[key] = e.target.value;
                            setTestStrings(newTests);
                        }}
                    />
                )}
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

function TestString(props)
{
    const { value, result, onClick, onChange } = props;
     
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
            <Button onClick={onClick}>
                Run
            </Button>
            <input type="text"
                value={value}
                placeholder={EMPTY_SYMBOL}
                onChange={onChange} />
            <label style={{ fontSize: '1.5rem' }}>
                {renderedStatus}
            </label>
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
};
TestString.defaultProps = {
    result: null,
};
