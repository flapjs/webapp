/* global __NODE_ENV__ */

// NOTE: __NODE_ENV__ is defined in `template.html` as a global.
if (__NODE_ENV__ === 'production' && 'serviceWorker' in navigator)
{
    window.addEventListener('load', function() 
    {
        navigator.serviceWorker.register('/webapp/build/service-worker.js').then(registration =>
        {
            // https://redfin.engineering/service-workers-break-the-browsers-refresh-button-by-default-here-s-why-56f9417694
            // https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68

            function listenForWaitingServiceWorker(reg, callback)
            {
                function awaitStateChange()
                {
                    reg.installing.addEventListener('statechange', function()
                    {
                        if (this.state === 'installed') callback(reg);
                    });
                }
                if (!reg) return;
                if (reg.waiting) return callback(reg);
                if (reg.installing) awaitStateChange();
                reg.addEventListener('updatefound', awaitStateChange);
            }

            // Reload once when the new service worker starts activating...
            var refreshing;
            navigator.serviceWorker.addEventListener('controllerchange', function()
            {
                if (refreshing) return;
                refreshing = true;
                window.location.reload();
            });

            function promptUserToRefresh(reg)
            {
                const UNRELEASED_HEADER = '## [Unreleased]';
                const VERSION_HEADER_PREFIX = '##';

                function parseChangelog(changelogText)
                {
                    let i = changelogText.indexOf(UNRELEASED_HEADER) + UNRELEASED_HEADER.length;
                    let j = changelogText.indexOf(VERSION_HEADER_PREFIX, i);
                    let k = changelogText.indexOf(VERSION_HEADER_PREFIX, j + VERSION_HEADER_PREFIX.length);

                    return changelogText.substring(j, k);
                }

                fetch('../CHANGELOG.md').then(async response =>
                {
                    let changelog = parseChangelog(await response.text());
                    let header = 'New version available! Ready to refresh?';

                    if (window.confirm(header + '\n\n' + changelog))
                    {
                        reg.waiting.postMessage('skipWaiting');
                    }
                }).catch(e =>
                {
                    if (window.confirm('New version available! Ready to refresh?'))
                    {
                        reg.waiting.postMessage('skipWaiting');
                    }
                });
            }

            listenForWaitingServiceWorker(registration, promptUserToRefresh);
        });
    });
}
