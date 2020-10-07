/**
 * A wrapper for a more intuitive use of SessionStorage.
 */
export class SessionStorage
{
    static setItem(key, value)
    {
        if (typeof value !== 'string')
        {
            throw new Error('SessionStorage item value must be a string.');
        }
        if (!this.isSupported()) return;

        // Don't save anything if hidden...
        if (document.hidden) return;

        if (value)
        {
            sessionStorage.setItem(key, value);
        }
        else
        {
            sessionStorage.removeItem(key);
        }
    }

    static getItem(key, defaultValue = null)
    {
        if (!this.isSupported()) return defaultValue;
        return sessionStorage.getItem(key) || defaultValue;
    }

    static clear()
    {
        if (!this.isSupported()) return;
        sessionStorage.clear();
    }

    static isSupported()
    {
        return typeof sessionStorage !== 'undefined';
    }
}
