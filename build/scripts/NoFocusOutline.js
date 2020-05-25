/* SOURCE: https://jmperezperez.com/outline-focus-ring-a11y/ */
document.addEventListener('DOMContentLoaded', () =>
{
    document.body.classList.add('no-focus-outline');
    window.addEventListener('keyup', onFirstTabUp);
});

function onFirstTabUp(e)
{
    if (e.which === 9 /* The tab key */)
    {
        document.body.classList.remove('no-focus-outline');
        window.removeEventListener('keyup', onFirstTabUp);
    }
}

// KeepItSimpleSilly. Seriously, we could add back in the class to stop tabbing focus
// but, honestly, if you are tabbing, you will tab again.
