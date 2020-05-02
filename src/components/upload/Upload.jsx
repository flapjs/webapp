import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import IconButton from '../icons/IconButton.jsx';

export default function Upload(props)
{
    const { onUpload, title, iconClass, multiple, accept } = props;

    const inputRef = useRef(null);

    return (
        <>
        {iconClass
            ? <IconButton iconClass={iconClass} title={title} onClick={() => inputRef.current.click()}/>
            : <button title={title} onClick={() => inputRef.current.click()}>{title}</button>}
        <input ref={inputRef}
            type="file"
            name="import"
            hidden={true}
            accept={accept}
            multiple={multiple}
            onChange={e =>
            {
                const files = e.target.files;
                if (files.length > 0)
                {
                    if (onUpload)
                    {
                        if (multiple)
                        {
                            onUpload(files);
                        }
                        else
                        {
                            onUpload(files[0]);
                        }
                    }

                    // Makes sure you can upload the same file again.
                    e.target.value = '';
                }
            }}/>
        </>
    );
}
Upload.propTypes = {
    onUpload: PropTypes.func,
    title: PropTypes.string,
    iconClass: PropTypes.elementType,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
};
Upload.defaultProps = {
    title: 'Upload',
    accept: '',
    multiple: false,
};
