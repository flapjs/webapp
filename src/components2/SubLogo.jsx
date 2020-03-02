import React from 'react';
import PropTypes from 'prop-types';
import Style from './Logo.module.css';

export default function SubLogo(props)
{
    const { title, version } = props;
    return (
        <div className={Style.container}>
            <span className={Style.sublogo}>
                <h3 className={Style.title}>{title}</h3>
                <p className={Style.version}>{version}</p>
            </span>
        </div>
    );
}
SubLogo.propTypes = {
    title: PropTypes.string,
    version: PropTypes.string,
};
SubLogo.defaultProps = {
    title: 'App',
    version: 'dev',
};
