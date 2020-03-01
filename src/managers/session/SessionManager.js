import { uuid } from '@flapjs/util/MathHelper.js';

import { tryMount, tryStillMounted, tryUnmount } from '../ManagerLoader.js';

export default class SessionManager
{
    /** @override */
    static async mount(mounter)
    {
        // NOTE: Always call this at the top.
        if (!tryMount(mounter, SessionManager)) return;

        let sessionKey;

        // Try to adopt an inactive session...
        const localStorageLength = localStorage.length;
        for(let i = 0; i < localStorageLength; ++i)
        {
            let key = localStorage.key(i);
            if (key.startsWith('session#') && key.endsWith('.active'))
            {
                let value = localStorage.getItem(key);
                if (value === 'false')
                {
                    // NOTE: This needs to immediately happen so we can secure this session key before someone else takes it.
                    // Otherwise, it would be best to wait until the end to tryStillMounted().
                    if (!tryStillMounted(mounter, SessionManager)) return;

                    localStorage.setItem(key, 'true');
                    sessionKey = key.substring('session#'.length, key.length - '.active'.length);
                    return sessionKey;
                }
            }
        }

        // Get a new session...
        sessionKey = uuid();

        // NOTE: This should usually be called before you make any changes and generally at the bottom.
        if (!tryStillMounted(mounter, SessionManager)) return;

        sessionStorage.setItem('sessionKey', sessionKey);
        localStorage.setItem('session#' + sessionKey + '.active', 'true');
        return sessionKey;
    }

    /** @override */
    static unmount(mounter)
    {
        // NOTE: Always call this at the top. And feel free to do anything afterwards,
        // any unmount effort is appreciated but if unable to, errors will be ignored
        // and consided a success anyways. :P
        if (!tryUnmount(mounter, SessionManager)) return;

        const sessionKey = this.getCurrentSessionKey();
        localStorage.setItem('session#' + sessionKey + '.active', 'false');
        sessionStorage.removeItem('sessionKey');
    }

    static getCurrentSessionKey()
    {
        return sessionStorage.getItem('sessionKey') || 'OUT_OF_BOUNDS';
    }

    static setData(key, value)
    {
        localStorage.setItem('session#' + this.getCurrentSessionKey() + '.data[' + key + ']', value);
    }

    static getData(key)
    {
        localStorage.getItem('session#' + this.getCurrentSessionKey() + '.data[' + key + ']');
    }
}
