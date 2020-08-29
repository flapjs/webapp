import AbstractAutoSaveHandler from '@flapjs/deprecated/services/autosave/AbstractAutoSaveHandler.js';

import { Logger } from '@flapjs/util/Logger.js';

const LOGGER = new Logger('SessionSaver');

class SessionSaver extends AbstractAutoSaveHandler
{
    constructor(session)
    {
        super();

        this._session = session;
    }

    onSessionLoad(session, dataStorage) {}
    onSessionSave(session, dataStorage) {}

    /** @override */
    onAutoSaveLoad(dataStorage)
    {
        try
        {
            this.onSessionLoad(this._session, dataStorage);
        }
        catch(e)
        {
            // Ignore error
            LOGGER.error('Unable to autoload session', e);
        }
    }

    /** @override */
    onAutoSaveUpdate(dataStorage)
    {
        try
        {
            this.onSessionSave(this._session, dataStorage);
        }
        catch(e)
        {
            // Ignore error
            LOGGER.error('Unable to autosave session', e);
        }
    }

    /** @override */
    onAutoSaveUnload(dataStorage)
    {
        //Don't do anything...
    }
}

export default SessionSaver;
