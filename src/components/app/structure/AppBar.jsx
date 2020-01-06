import React from 'react';
import PropTypes from 'prop-types';
import Style from './AppBar.module.css';

import SessionTitle from '@flapjs/components/topbar/title/SessionTitle.jsx';
import Logo from '@flapjs/components/topbar/logo/Logo.jsx';
import { SessionStateConsumer } from '@flapjs/session/context/SessionContext.jsx';
import LocaleString from '@flapjs/util/localization/LocaleString.jsx';

import LanguageSelector from '@flapjs/util/localization/components/LanguageSelector.jsx';
import * as FlapJSLanguages from '@flapjs/FlapJSLanguages.js';

function AppBar(props)
{
    return (
        <nav className={Style.container + ' ' + (props.className || '')}>
            <Logo/>
            <SessionTitle changeModule={props.changeModule}/>
            {
                <SessionStateConsumer>
                    {
                        session =>
                        {
                            let children = [];

                            // TODO: When there's a modular way for services to inject renderers like modules...
                            if (session.undoManager)
                            {
                                children.push(
                                    <button onClick={() => session.undoManager.undo()}>
                                        <LocaleString entity="action.toolbar.undo"/>
                                    </button>
                                );
                                children.push(
                                    <button onClick={() => session.undoManager.redo()}>
                                        <LocaleString entity="action.toolbar.redo"/>
                                    </button>
                                );
                            }

                            // TODO: When there's a modular way for services to inject renderers like modules...
                            if (session.importManager)
                            {
                                children.push(
                                    <input type="file" name="import"
                                        onChange={e =>
                                        {
                                            const files = e.target.files;
                                            if (files.length > 0)
                                            {
                                                session.importManager.tryImportFile(files[0], session);
                                    
                                                //Makes sure you can upload the same file again.
                                                e.target.value = '';
                                            }
                                        }}/>
                                );
                            }

                            return children;
                        }
                    }
                </SessionStateConsumer>
            }
            <LanguageSelector languages={FlapJSLanguages} />
            {props.children}
        </nav>
    );
}
AppBar.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    changeModule: PropTypes.func.isRequired,
};

export default AppBar;
