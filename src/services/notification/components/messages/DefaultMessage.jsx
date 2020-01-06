import React from 'react';
import PropTypes from 'prop-types';
import Style from './DefaultMessage.module.css';

import LocaleString from '@flapjs/util/localization/LocaleString.jsx';
import LocaleContent from '@flapjs/util/localization/LocaleContent.jsx';

class DefaultMessage extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    /** @override */
    render()
    {
        const props = this.props;
        const content = props.content;

        return (
            <section className={Style.container
                + (props.className ? ' ' + props.className : '')}>
                {content && <LocaleContent content={content} />}
                {props.children}
                {props.notification &&
                    <button onClick={e => props.onClose && props.onClose(props.notification)}>
                        <LocaleString entity="message.action.close" />
                    </button>}
            </section>
        );
    }
}
DefaultMessage.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    notification: PropTypes.object.isRequired,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    onClose: PropTypes.func,
};

export default DefaultMessage;
