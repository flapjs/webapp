# ServiceWorker - INCOMPLETE

> NOTE: Unfortunately, Service Workers is a huge beast that cannot possibly be covered in a single document. So here's some tidbits to help you work with Service Workers in this project particularly. Please look online for actual full-length tutorials on this subject.

Hopefully this will help you figure out what the heck the service worker is doing.

The service worker file is in `./src/assets/scripts/ServiceWorker.js` and the installer at `./src/assets/scripts/ServiceWorkerInstall.js`.

Firstly, the service worker is, by default, turned off for development mode. This is achieved by declaring a global variable `__SERVICE_WORKER_ENV__`, which can be either 'development' or 'production' in `template.html`. Then the install script just checks that it is in the production environment. If you want to debug the service worker, you'll have to manually change the `__SERVICE_WORKER_ENV__` to production. BE CAREFUL! Once the service worker is enabled, it will install itself and create caches that will persist across reloads. So it WILL MESS UP YOUR DEV ENVIRONMENT IF YOU DON'T CLEAN UP AFTER! When you are done debugging, change the global variable back to what it was previously, unregister the service worker manually in your browser, and clear the service worker cache. Then reload and double check nothing re-attaches themselves.