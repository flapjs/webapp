import { uuid } from '@flapjs/util/MathHelper.js';
import { LocalStorage } from '@flapjs/util/storage/LocalStorage.js';

export function createSession()
{
    let sessionKey = uuid();
    sessionStorage.setItem('sessionKey', sessionKey);
    LocalStorage.setItem('session#' + sessionKey + '.active', 'true');
    return sessionKey;
}

export function releaseSession(sessionKey)
{
    LocalStorage.setItem('session#' + sessionKey + '.active', 'false');
    sessionStorage.removeItem('sessionKey');
}

export function adoptSession()
{
    let sessionKey;
    
    // Try to adopt an inactive session...
    const localStorageLength = localStorage.length;
    for(let i = 0; i < localStorageLength; ++i)
    {
        let key = localStorage.key(i);
        if (key.startsWith('session#') && key.endsWith('.active'))
        {
            let value = LocalStorage.getItem(key);
            if (value === 'false')
            {
                LocalStorage.setItem(key, 'true');
                sessionKey = key.substring('session#'.length, key.length - '.active'.length);
                return sessionKey;
            }
        }
    }
    return null;
}
