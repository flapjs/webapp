import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ModuleStateContext = React.createContext();
export const ModuleDispatchContext = React.createContext();

export function ModuleSessionReducer(prev, action)
{
    let nextState;
    let result;
    switch(action.type)
    {
        case 'set':
            nextState = { ...prev };
            nextState[action.key] = action.value;
            break;
        case 'get':
            nextState = prev;
            result = nextState[action.key];
            break;
        default:
            throw new Error(`Unknown reducer action type '${action.type}'`);
    }
    return [nextState, result];
}

export function ModuleSessionProvider(props)
{
    const { moduleId, currentModule, loader } = props;
    const [state, setState] = useState({});
    async function dispatch(action)
    {
        const [nextState, result] = ModuleSessionReducer(state, action);
        setState(nextState);
        return result;
    }

    return (
        <ModuleStateContext.Provider value={{ ...state, moduleId, currentModule, loader }}>
            <ModuleDispatchContext.Provider value={dispatch}>
                {props.children}
            </ModuleDispatchContext.Provider>
        </ModuleStateContext.Provider>
    );
}
ModuleSessionProvider.propTypes = {
    children: PropTypes.node,
    moduleId: PropTypes.string,
    currentModule: PropTypes.object,
    loader: PropTypes.object,
};

export function ModuleSessionConsumer(props)
{
    return (
        <ModuleStateContext.Consumer>
            {state => (
                <ModuleDispatchContext.Consumer>
                    {dispatch => (
                        props.children.call(undefined, state, dispatch)
                    )}
                </ModuleDispatchContext.Consumer>
            )}
        </ModuleStateContext.Consumer>
    );
}
ModuleSessionConsumer.propTypes = {
    children: PropTypes.func.isRequired,
};
