import React from 'react';
import PropTypes from 'prop-types';

import { LocalizationConsumer } from '../LocalizationContext.jsx';
import * as LocalizationHandler from '../LocalizationHandler.js';

class LanguageSelector extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onLocaleChange = this.onLocaleChange.bind(this);
    }

    onLocaleChange(e, changeLocaleCallback)
    {
        const nextLocaleCode = e.target.value;
        changeLocaleCallback(nextLocaleCode);
    }

    renderLocaleOptions(locales, currentLocaleCode, changeLocaleCallback)
    {
        const result = [];
        for(const localeCode of Object.keys(locales))
        {
            if (locales[localeCode].disabled) continue;

            result.push(
                <option key={localeCode} value={localeCode}>
                    {locales[localeCode].name}
                </option>
            );
        }
        // HACK: When defaultValue changes, <select> does not update. Therefore, we must give it the correct defaultValue initially.
        return (
            <select defaultValue={currentLocaleCode || LocalizationHandler.getDefaultLocaleCode()} onBlur={e => changeLocaleCallback(e.target.value)}>
                {result}
            </select>
        );
    }

    /** @override */
    render()
    {
        const props = this.props;
        return (
            <LocalizationConsumer>
                {context =>
                {
                    return (
                        <>
                            {this.renderLocaleOptions(
                                props.languages,
                                context.localeCode,
                                nextLocaleCode => context.changeLocale(nextLocaleCode)
                            )}
                        </>
                    );
                }}
            </LocalizationConsumer>
        );
    }
}
LanguageSelector.propTypes = {
    languages: PropTypes.object.isRequired,
};

export default LanguageSelector;
