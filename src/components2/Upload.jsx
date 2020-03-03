import React from 'react';
import PropTypes from 'prop-types';

export default function Upload(props)
{
    const { onUpload, ...otherProps } = props;

    return (
        <input type="file" name="import" onChange={e =>
        {
            const files = e.target.files;
            if (files.length > 0)
            {
                if (onUpload) onUpload(files[0]);

                //Makes sure you can upload the same file again.
                e.target.value = '';
            }
        }} {...otherProps}/>
    );
}
Upload.propTypes = {
    onUpload: PropTypes.func,
};
