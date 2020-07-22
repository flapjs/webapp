/* global __NODE_ENV__ */

window.addEventListener('beforeunload', (event) => 
{
    // if (window.shouldExitWarning)
    if (__NODE_ENV__ === 'production')
    {
        const message = 'alert.warning.exit';
        event = event || window.event;
        // For IE and Firefox
        if (event) event.returnValue = message;
        // For Safari
        return message;
    }
});
