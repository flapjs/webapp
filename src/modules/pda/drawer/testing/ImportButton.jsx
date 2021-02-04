import React from 'react';
import PropTypes from 'prop-types';
import Upload from '@flapjs/components/upload/Upload.jsx';
import { UploadIcon } from '@flapjs/components/icons/Icons.js';

const ACCEPTED_FILE_TYPES = '.txt'; // '.txt, .jpg, .png, etc.' for accepting multiple file types

export default function ImportButton(props) 
{ 
    const { onClick } = props;
    
    function handleImportChange(files) 
    {
        let fileBlobs = [];
        for(let fileBlob of files)
        {
            fileBlobs.push(fileBlob);
        }

        let result = [];
        let promise = fileBlobs.reduce((prev, fileBlob) =>
        {
            return prev.then(() => fileBlob.text())
                .then(textData => textData.split('\n'))
                .then(lines =>
                {
                    for(let line of lines)
                    {
                        result.push(line);
                    }
                });
        },
        Promise.resolve());

        promise.then(() => onClick(result));
    }

    return (
        <Upload accept={ACCEPTED_FILE_TYPES}
            onUpload={handleImportChange}
            multiple={true}/>
    );
}

ImportButton.propTypes = {
    onClick: PropTypes.func
};
