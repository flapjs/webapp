import React from 'react';
import PropTypes from 'prop-types';
import Style from './Logo.module.css';

export default function Logo(props)
{
    const { title, version } = props;
    return (
        <div className={Style.container}>
            <h2 className={Style.title}>{title}</h2>
            <p className={Style.version}>{version}</p>
        </div>
    );
}
Logo.propTypes = {
    title: PropTypes.string,
    version: PropTypes.string,
};
Logo.defaultProps = {
    title: 'App',
    version: 'dev',
};
