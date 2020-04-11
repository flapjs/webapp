import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Options from '@flapjs/components/options/Options.jsx';

import FieldButton from '@flapjs/components/lib/FieldButton.jsx';
import Button from '@flapjs/components/lib/Button.jsx';

/*
class Parent
{
    render()
    {
        const componnetInstance;//...


        componnetInstance.state.asdf
        return (
            <Component asdf="hello">

            </Component>
        );
    }
}

class Component extends React.Component {

    constructor(props)
    {
        super(props);

        props.asdf // hello

        this.state = {
            asdf: props.asdf
        };

        this.onClick = this.onClick.bind('ghello');
    }

    onClick()
    {
        this.state.asdf
    }

    render()
    {
        this.state.dfasdfasdf
        this.setState({ stadfaf: 'hello' });

        function onClick()
        {
            this.skldfjlaskdf
        }
        ionClikc.bind(this);

        const onclick = () => {
            this.sdhfhd
        }

        return (
            <div className="hello" onClick={onClick}>
            </div>
        );
    }
}

function Component(props)
{
    const [asdf, setAsdf] = useState('hello');

    function onClick()
    {

    }

    return (
        <div>

        </div>
    );
}
*/

export default function StringTester(props)
{
    // const [ isAccepted, setAccepted ] = useState(null);
    const isAccepted = false;
    const [ tests, updateTests ] = useState([]);
    
    return (
        <Options title="String Tester">
            <div>
                <FieldButton onClick={() => createNewTest(tests, updateTests)}>
                    Test String
                </FieldButton>

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
                            }}/>
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
};
StringTester.defaultProps = {
};

function createNewTest(tests, updateTests)
{
    updateTests([...tests, '']);
}



