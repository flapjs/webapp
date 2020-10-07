import React from 'react';
import PropTypes from 'prop-types';
import Style from './Logo.module.css';

export default function Logo(props)
{
    const { title, version, style, onClick } = props;
    return (
        <div className={Style.container} style={style}>
            <span className={Style.logo} onClick={onClick}>
                <h1 className={Style.title}>
                    {title}
                </h1>
                <p className={Style.version}>{version}</p>
            </span>
        </div>
    );
}
Logo.propTypes = {
    title: PropTypes.string,
    version: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
};
Logo.defaultProps = {
    title: 'App',
    version: 'dev',
    onClick: () => {}
};
