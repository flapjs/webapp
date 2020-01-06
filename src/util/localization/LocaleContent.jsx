import React from 'react';
import PropTypes from 'prop-types';

import LocaleString from './LocaleString.jsx';

function LocaleContent(props)
{
    let content = props.children || props.content;
    return (
        content &&
        Array.isArray(content) ?
            content.map((e, i) =>
                <p key={e + ':' + i}>
                    <LocaleString entity={e} />
                </p>
            ) :
            <p>
                <LocaleString entity={content} />
            </p>
    );
}
LocaleContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
};
LocaleContent.defaultProps = {
    content: ''
};
export default LocaleContent;
