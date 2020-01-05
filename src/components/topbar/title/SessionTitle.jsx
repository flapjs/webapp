import React from 'react';
import PropTypes from 'prop-types';
import Style from './SessionTitle.module.css';

import * as FlapJSModules from '@flapjs/FlapJSModules.js';
import { SessionConsumer } from '@flapjs/session/context/SessionContext.jsx';

/**
 * A React component that can do anything you want.
 */
class SessionTitle extends React.Component
{
    constructor(props)
    {
        super(props);

        this.onModuleChange = this.onModuleChange.bind(this);
    }

    onModuleChange(e, changeModuleCallback)
    {
        const nextModuleID = e.target.value;
        changeModuleCallback(nextModuleID);
    }

    renderTitleInput(title, changeTitle)
    {
        return (
            <input type="text" value={title} onChange={e => changeTitle(e.target.value)}/>
        );
    } 

    renderModuleOptions(modules, currentModuleID, changeModuleCallback)
    {
        const result = [];
        for(const moduleID of Object.keys(modules))
        {
            if (modules[moduleID].disabled) continue;

            result.push(
                <option key={moduleID} value={moduleID}>
                    {modules[moduleID].name}
                </option>
            );
        }
        return (
            <select defaultValue={currentModuleID} onBlur={e => changeModuleCallback(e.target.value)}>
                {result}
            </select>
        );
    }

    /** @override */
    render()
    {
        const props = this.props;

        return (
            <div className={Style.container
                + (props.className ? ' ' + props.className : '')}>
                <SessionConsumer>
                    {
                        (session, dispatch) => (
                            <>
                                {this.renderModuleOptions(
                                    FlapJSModules,
                                    session.moduleID,
                                    nextModuleID => props.changeModule(nextModuleID)
                                )}
                                {this.renderTitleInput(
                                    session.sessionName,
                                    newTitle => dispatch({ type: 'changeSessionName', value: newTitle })
                                )}
                            </>
                        )
                    }
                </SessionConsumer>
            </div>
        );
    }
}

SessionTitle.propTypes = {
    className: PropTypes.string,
    changeModule: PropTypes.func,
};
SessionTitle.defaultProps = {
};

export default SessionTitle;
