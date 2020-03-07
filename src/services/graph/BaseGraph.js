export default class BaseGraph
{
    /**
     * @abstract
     * @returns {Array<Class<GraphElement>>} An array of element types.
     */
    static get elementTypes() { return []; }

    /**
     * @abstract
     * @param {object} state The previous graph state.
     * @param {object} action The object containing action type and options.
     * @param {string} action.type The type of action to be performed.
     * @returns {object} The new graph state. If it is falsey, it is assumed to be the previous state.
     */
    static reducer(state, action) { throw new Error('No reducer implemented.'); }
}
