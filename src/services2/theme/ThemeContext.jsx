import React, { useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext(null);

export const ThemeConsumer = ThemeContext.Consumer;
export function ThemeProvider(props)
{
    const { children } = props;

    const [state, setState] = useState({ theme: null });

    const theme = state.theme;
    const setTheme = useCallback(
        function setTheme(themeName)
        {
            // Verify the theme is correct.
            // Load the theme.
            // Try to apply the theme.
            // Profit.
            setState({ theme: themeName });
        },
        []);

    const themeAPI = {
        theme,
        setTheme,
    };
    return (
        <ThemeContext.Provider value={themeAPI}>
            {children}
        </ThemeContext.Provider>
    );
}
ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export function useTheme()
{
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('Missing ThemeProvider.');
    return ctx;
}
