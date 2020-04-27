import React from 'react';
import PropTypes from 'prop-types';

const ACCEPTED_FILE_TYPES = '.txt'; // '.txt, .jpg, .png, etc.' for accepting multiple file types

export default function ImportButton(props) 
{ 
    let testStrings = [];

    function handleImportChange(event) 
    {
        const files = event.target.files;

        for(let i = 0; i < files.length; i++) 
        {
            const reader = new FileReader();
            reader.onload = (event) => 
            {
                try 
                {
                    const allTestStrings = event.target.result.split('\n');

                    for (let testString of allTestStrings) 
                    {
                        testString = testString.trim();
                        if (testString.length > 0) 
                        {
                            testStrings.push(testString);
                        }
                    }
                }
                catch(err) 
                {
                    reader.abort();
                    alert(err + '\nError occurred while loading in file ' + files[i]);
                }

                props.onClick(testStrings);
            };

            reader.readAsText(files[i]);
        }
    }

    return (
        <div>
            <input type="file" 
                name="import_button"
                accept={ACCEPTED_FILE_TYPES}
                onChange={handleImportChange}
                multiple
            />
        </div>
    );
}

ImportButton.propTypes = {
    onClick: PropTypes.func
};