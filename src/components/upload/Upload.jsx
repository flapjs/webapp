import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export default function Upload(props)
{
    const { onUpload, title } = props;

    const inputRef = useRef(null);

    return (
        <>
        <button title={title} onClick={() => inputRef.current.click()}>{title}</button>
        <input ref={inputRef} type="file" name="import" hidden={true} onChange={e =>
        {
            const files = e.target.files;
            if (files.length > 0)
            {
                if (onUpload) onUpload(files[0]);

                //Makes sure you can upload the same file again.
                e.target.value = '';
            }
        }}/>
        </>
    );
}
Upload.propTypes = {
    onUpload: PropTypes.func,
    title: PropTypes.string,
};
Upload.defaultProps = {
    title: 'Upload',
};
