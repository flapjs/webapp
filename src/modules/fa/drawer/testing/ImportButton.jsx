import React from 'react';

const ACCEPTED_FILE_TYPES = ['.txt'];

export default function ImportButton(props) 
{
    let testStrings = [];

    /**
     * When the user wants to import one or more files, window file selector
     * is displayed. After user chose the files, extract the text within those
     * files line by line, and add them to the list of imported test strings.
     * 
     * NOTE: The list of imported test strings resets everytime this function
     * is invoked so there can be no duplicates and the list does not grow too
     * big.
     * 
     * @param {ImportButton} e - The onChange event
     */
    function handleImportChange(e) 
    {
        const files = e.target.files;
        testStrings = [];

        for(let i = 0; i < files.length; i++) 
        {
            const reader = new FileReader();
            reader.onload = (e) => 
            {
                try 
                {
                    const allTestStrings = e.target.result.split('\n');

                    for (let testString of allTestStrings) 
                    {
                        testString = testString.trim();
                        if (testString.length > 0) 
                        {
                            testStrings.push(testString);
                            alert(testString);
                        }
                    }
                }
                catch(err) 
                {
                    reader.abort();
                    alert(err + '\nError occurred while loading in file ' + files[i]);
                }
            };
            reader.readAsText(files[i]);
        }

        return testStrings;
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
