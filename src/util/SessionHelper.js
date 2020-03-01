import { uuid } from '@flapjs/util/MathHelper.js';

export function createSession()
{
    let sessionKey = uuid();
    sessionStorage.setItem('sessionKey', sessionKey);
    localStorage.setItem('session#' + sessionKey + '.active', 'true');
    return sessionKey;
}

export function releaseSession(sessionKey)
{
    localStorage.setItem('session#' + sessionKey + '.active', 'false');
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
            let value = localStorage.getItem(key);
            if (value === 'false')
            {
                localStorage.setItem(key, 'true');
                sessionKey = key.substring('session#'.length, key.length - '.active'.length);
                return sessionKey;
            }
        }
    }
    return null;
}
