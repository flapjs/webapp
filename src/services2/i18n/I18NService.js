export { LocaleProvider, LocaleConsumer, useLocale, DEFAULT_LANGUAGE_CODE } from './LocaleContext.jsx';

/**
 * @module I18NService
 * 
 * ## Setup
 * - Requires LocaleProvider to be the top-level ancestor of all actions with this service.
 * - Any language files must be placed in '/langs' directory.
 * - The language file must be named by its language code, followed by the file extension '.lang'.
 * - The language code used must follow the standard for
 * [2-letter ISO language code](https://www.w3.org/International/articles/language-tags/).
 * 
 * ## Usage
 * - Use the hook useLocale() to gain access to the language dictionary for locale string
 * lookup by entity name and to the language modifiers.
 * 
 */
