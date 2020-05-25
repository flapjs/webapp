/* global __NODE_ENV__ */

// NOTE: __NODE_ENV__ is defined in `template.html` as a global.
if (__NODE_ENV__ === 'production' && 'serviceWorker' in navigator)
{
    window.addEventListener('load', function() 
    {
        let header = {
            message: 'New version available! Ready to refresh?',
            changelog: '',
        };
        
        const UNRELEASED_HEADER = '## [Unreleased]';
        const VERSION_HEADER_PREFIX = '##';
        fetch('../CHANGELOG.md')
            .then(response => response.text())
            .then(value =>
            {
                // eslint-disable-next-line no-console
                console.log('Changelog:', { text: value });

                let i = value.indexOf(UNRELEASED_HEADER) + UNRELEASED_HEADER.length;
                let j = value.indexOf(VERSION_HEADER_PREFIX, i);
                let k = value.indexOf(VERSION_HEADER_PREFIX, j + VERSION_HEADER_PREFIX.length);
    
                return value.substring(j, k);
            })
            .then(value =>
            {
                header.changelog = value;
            });

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
                if (header.changelog)
                {
                    if (window.confirm(header.message + '\n\n' + header.changelog))
                    {
                        reg.waiting.postMessage('skipWaiting');
                    }
                }
                else
                {
                    if (window.confirm(header.message))
                    {
                        reg.waiting.postMessage('skipWaiting');
                    }
                }
            }

            listenForWaitingServiceWorker(registration, promptUserToRefresh);
        });
    });
}
