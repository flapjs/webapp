import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';
import ImportButton from './ImportButton.jsx';
import ExportButton from './ExportButton.jsx';
import Button from '@flapjs/components/lib/Button.jsx';

export default function StringTester(props)
{
    // const [ isAccepted, setAccepted ] = useState(null);
    const isAccepted = false;
    const [tests, updateTests] = useState([]);
    //const FSA = useMachine(props.machineBuilderType, props.machineName);

    let testStringsArr = [];

    return (
        <Options title="String Tester">
            <div>
                <FieldButton id="testStringButton" onClick={() => createNewTest(tests, updateTests)}>
                    Test String
                </FieldButton>
                <ImportButton />
                <ExportButton testStrings={testStringsArr}/>

                {tests.length > 0 && <Button>Run All</Button>}
                {tests.map((value, key) => (
                    <p key={key}>
                        <Button>
                            Run
                        </Button>
                        <input type="text"
                            id={'testString' + key}
                            value={value}
                            onChange={e =>
                            {
                                const newTests = [...tests];
                                newTests[key] = e.target.value;
                                updateTests(newTests);
                            }} />
                    </p>
                ))}

                <output>
                    <p>
                        {isAccepted === null
                            ? '-- ??? --'
                            : isAccepted
                                ? '-- Accepted --'
                                : '-- Rejected --'}
                    </p>
                </output>
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


function createNewTest(tests, updateTests)
{
    updateTests([...tests, '']);
}



