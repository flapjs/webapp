import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Style from './SplashDialog.module.css';

export const SplashContext = React.createContext();

export function SplashProvider(props)
{
    const [ prevSplashComponent, setPrevSplashComponent ] = useState(null);
    const [ splashComponent, setSplashComponent ] = useState(() => props.splashComponent);

    const open = (nextSplashComponent = splashComponent) => setSplashComponent(nextSplashComponent);
    const close = () => setSplashComponent(null);
    const toggle = (nextSplashComponent = prevSplashComponent) =>
    {
        setPrevSplashComponent(nextSplashComponent);
        setSplashComponent(splashComponent ? null : nextSplashComponent);
    };

    const isOpen = Boolean(splashComponent);

    let SplashComponent;
    let splashProps;

    if (splashComponent)
    {
        if (typeof splashComponent === 'object')
        {
            SplashComponent = splashComponent.component;
            splashProps = splashComponent.props || {};
        }
        else
        {
            SplashComponent = splashComponent;
            splashProps = {};
        }
    }

    return (
        <SplashContext.Provider value={{ isOpen, open, close, toggle }}>
            {props.children}
            <div className={Style.background + ' ' + (isOpen ? '': 'hidden')}></div>
            <dialog className={Style.container} open={isOpen}>
                {splashComponent && <SplashComponent {...splashProps}/>}
            </dialog>
        </SplashContext.Provider>
    );
}
SplashProvider.propTypes = {
    children: PropTypes.node,
    splashComponent: PropTypes.oneOfType([
        PropTypes.elementType,
        PropTypes.shape({
            component: PropTypes.elementType,
            props: PropTypes.object,
        }),
    ]),
};
