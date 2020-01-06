import * as LocalizationHandler from './LocalizationHandler.js';

/**
 * Creates a context state. This helps maintain a consistant shape for all localization contexts.
 *
 * @param {object} provider The context provider.
 * @param {string} [defaultLocaleCode=''] The default locale code.
 * @returns {object} An object mapping of all public interface for the context.
 */
export function createContextState(provider, defaultLocaleCode = '')
{
    return {
        localeCode: defaultLocaleCode,
        getLocaleString: LocalizationHandler.getLocaleString.bind(null, provider),
        hasLocaleString: LocalizationHandler.hasLocaleString.bind(null, provider),
        changeLocale: LocalizationHandler.changeLocale.bind(null, provider),
    };
}
