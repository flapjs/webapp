import React, { useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_LANGUAGE_CODE, useLocale, DEFAULT_LANGUAGE_NAME } from './LocaleContext.jsx';

const OTHER_SUPPORTED_LANGUAGES = {
    'xx-pirate': 'Pirate Speak',
};

export function LocaleSelector(props)
{
    const { languages } = props;
    const { langCode, setLanguage } = useLocale();

    const onBlur = useCallback(
        function onBlur(e)
        {
            setLanguage(e.target.value);
        },
        [setLanguage]);

    useLayoutEffect(() =>
    {
        document.documentElement.lang = langCode;
    },
    [langCode]);

    return (
        <select defaultValue={DEFAULT_LANGUAGE_CODE} onBlur={onBlur}>
            <LanguageOption langCode={DEFAULT_LANGUAGE_CODE}>
                {DEFAULT_LANGUAGE_NAME}
            </LanguageOption>
            {Object.entries(languages).map(([key, value]) => (
                <LanguageOption key={key} langCode={key}>
                    {value}
                </LanguageOption>
            ))}
        </select>
    );
}
LocaleSelector.propTypes = {
    languages: PropTypes.object,
};
LocaleSelector.defaultProps = {
    languages: OTHER_SUPPORTED_LANGUAGES,
};

function LanguageOption(props)
{
    const { children, langCode } = props;
    return (
        <option value={langCode}>
            {children}
        </option>
    );
}
LanguageOption.propTypes = {
    children: PropTypes.node,
    langCode: PropTypes.string,
};
