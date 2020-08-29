/* global __SERVICE_WORKER_ENV__ */

window.addEventListener('beforeunload', (event) => 
{
    // if (window.shouldExitWarning)
    // @ts-ignore
    if (__SERVICE_WORKER_ENV__ === 'production')
    {
        const message = 'alert.warning.exit';
        event = event || window.event;
        // For IE and Firefox
        if (event) event.returnValue = message;
        // For Safari
        return message;
    }
});
