const TOO_LONG_RESTART_INTERVAL_TIME = 5000;
document.querySelector('#restartButton').addEventListener('click', onRestartButtonClick);
setInterval(onTooLongRestartIntervalUpdate, TOO_LONG_RESTART_INTERVAL_TIME);

function onTooLongRestartIntervalUpdate()
{
    let nonEmptyRoot = document.querySelector('#root:not(:empty)');
    if (nonEmptyRoot)
    {
        showPrompt(false);
        localStorage.removeItem('__restarted');
    }
    else
    {
        showPrompt(true);
    }
}

function showPrompt(value)
{
    let restartContainer = document.querySelector('#restart');
    restartContainer.toggleAttribute('disabled', !value);
    let restartButton = document.querySelector('#restartButton');
    restartButton.toggleAttribute('disabled', !value);
}

function onRestartButtonClick()
{
    if (localStorage.getItem('__restarted'))
    {
        // If this is the second restart, clear everything.
        localStorage.clear();
    }
    else
    {
        localStorage.setItem('__restarted', 'true');
    }
    window.location.reload();
}
