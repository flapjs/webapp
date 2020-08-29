export { useAutoSave } from './AutoSaveContext.jsx';

/**
 * @module AutoSaveService
 * 
 * ## Setup
 * None needed.
 * 
 * ## Usage
 * - Use the hook useAutoSave() with the required parameters to enable auto saving/loading.
 * - To properly auto save continuously for any change, the state of the hook must
 * change in order to perform another save. Otherwise, it assumes no differences
 * and will not save.
 */
