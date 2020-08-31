import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { LocalStorage } from '@flapjs/util/storage/LocalStorage';

const WelcomeContext = React.createContext(null);

export const WelcomeConsumer = WelcomeContext.Consumer;

export function WelcomeProvider(props)
{
    const { children } = props;

    const [state, setState] = useState({ open: LocalStorage.getItem('welcome', 'true') === 'true' });

    const showWelcome = useCallback(function showWelcome()
    {
        setState({ open: true });
        LocalStorage.setItem('welcome', 'true');
    },
    []);

    const hideWelcome = useCallback(function hideWelcome()
    {
        setState({ open: false });
        LocalStorage.setItem('welcome', 'false');
    },
    []);

    const toggleWelcome = useCallback(function toggleWelcome()
    {
        setState(state => ({ open: !state.open }));
    },
    []);

    const welcomeProviderValue = {
        open: state.open,
        showWelcome,
        hideWelcome,
        toggleWelcome,
    };
    return (
        <WelcomeContext.Provider value={welcomeProviderValue}>
            {children}
        </WelcomeContext.Provider>
    );
}
WelcomeProvider.propTypes = {
    children: PropTypes.node,
};

export function useWelcome()
{
    const ctx = useContext(WelcomeContext);
    if (!ctx)
    {
        throw new Error('Missing WelcomeProvider.');
    }
    return ctx;
}
