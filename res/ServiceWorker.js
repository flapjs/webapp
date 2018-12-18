//IMPORTANT: First line of file must NEVER contain code.
//IMPORTANT: Must NEVER rename this file.
//IMPORTANT: Must be at the root of all intercepted fetches.
//IMPORTANT: To trigger an update, this file must change. (hopefully this will be automated)

//Be careful about hosting services, they sometimes cache service workers, which
//would stop them from automatically updating...

class ServiceCache
{
  constructor(name) { this._name = name; this._assets = []; this._handlers = [] }
  register(asset) { this._assets.push(asset); return this; }
  addCacheStrategyHandler(handler) { this._handlers.push(handler.bind(this)); return this; }
  getAssets() { return this._assets; }
  getName() { return this._name; }
  getCacheStrategy(request, url)
  {
    //console.log("[ServiceWorker] Getting cache strategy for \'" + url.pathname + "\'...");
    let result;
    //Gettin cache strategies...
    for(const handler of this._handlers) if (result = handler(request, url)) return result;
    //Could not find valid strategy for request...
    return null;
  }
}

/* * * * * * * * * * * * * * * * * * * * * * */
/********** CONFIGURATIONS **********/
/* * * * * * * * * * * * * * * * * * * * * * */

//For debuggin' purposes, since this will turn off offline caching
const FORCE_NETWORK_ONLY = false;
//If you can guarantee to NEVER do lazy-loading pre-cached assets,
//then this will allow users to get the new ServiceWorker immediately,
//rather than wait for a redirect (must close browser, then re-enter)
//before it updates / gets new changes.
const FORCE_IMMEDIATE_CLAIM = true;
//Will invalidate user's cache every build, regardless of version.
//NOTE: Turn this on for aggressive updates.
const USE_CACHE_BUILD_HASH = false;

//Array of assets and a build hash generated by webpack,
//through the courtesy of ServiceWorkerWebpackPlugin.
const GENERATED_ASSETS = global.serviceWorkerOption.assets;
const GENERATED_HASH = global.serviceWorkerOption.hash;

//NOTE: If you are debugging service worker (for I will salute you and wish you
//good luck), here are some ways to make it easier for you:
//- You should remove 'host' in the 'devServer' in 'webpack.config.js', this
//will enable you to test it with hmr (start the test server by 'npm start').
//- You will also need to copy this file out to the base directory and
//replace 'serviceWorker.js' (needs to be the same name). Just edit that copy
//until all the bugs are fixed and then copy back. (Make sure not to run a
//production build, since that will 'clean' your edited files...)
//- Also, since optimizations are not computed during development mode, you need
//to uncomment 'app.bundle.js' below (don't need runtime, vendors, etc.).
//- Finally, change the cache name to something static like 'app-test', because
//'global.' and 'process.env.' are no longer available. You'll need to comment
//them out.

//NOTE: Another tip, any time you are debugging a new feature, be sure to try
//it with 'offline' mode and 'disable cache' mode on/off. Sometimes, the
//service worker will cache things that the browser already cached, making
//your updates futile. So watch out. Until we get a proper server with
//HTTP headers, we can't tell the browser to not cache stuff.

/* * * * * * * * * * * * * * * * * * * * * * */
/********** CACHES **********/
/* * * * * * * * * * * * * * * * * * * * * * */

//List your caches here!

//Inactive caches...(be sure to add them here for future reference)
//...apparently there are none yet...

//Active caches...(be sure to append them to ACTIVE_CACHES)
//- unique cache name (must ALWAYS be different from any prior versions)
//- assets to cache (every asset list must be disjoint from one another)
const APP_CACHE = new ServiceCache(process.env.TITLE + '-' + process.env.VERSION + (USE_CACHE_BUILD_HASH ? '_' + GENERATED_HASH : ''))
  //Essential app files
  .register('./') //Always include the root
  //.register('./index.html')
  .register('./404.html')
  //.register('./dist/app.bundle.js')
  /*
  .register('./dist/runtime~app.bundle.js')
  .register('./dist/vendors.bundle.js')
  .register('./dist/styles.bundle.js')
  */
  //Any other output files
  .addCacheStrategyHandler((request, url) => {
    //Should accept 'index.html'...
    if (/\/$/.test(url.pathname)) return cacheStrategyNetworkFirst;

    //Check if is fetch for general destination type of file asset...
    const dest = request.destination;
    switch(dest)
    {
      case 'style':
      case 'script':
      case 'document':
      case 'image': return cacheStrategyCacheFirst;
      default: return null;
    }
  });
GENERATED_ASSETS.forEach(asset => APP_CACHE.register(asset));

//Include active caches here...
const ACTIVE_CACHES = [APP_CACHE];
const ACTIVE_CACHE_NAMES = ACTIVE_CACHES.map(e => e.getName());

/* * * * * * * * * * * * * * * * * * * * * * */
/********** EVENT HANDLERS **********/
/* * * * * * * * * * * * * * * * * * * * * * */

function onServiceWorkerInstall(event)
{
  //Create all active caches...
  const results = [];
  for(const cache of ACTIVE_CACHES)
  {
    const cacheName = cache.getName();
    const cacheAssets = cache.getAssets();
    //Create and load all assets for each active cache...
    results.push(createCache(cacheName, cacheAssets));
  }

  if (FORCE_IMMEDIATE_CLAIM) self.skipWaiting();

  //Wait for install to finish...
  event.waitUntil(Promise.all(results));
}

function onServiceWorkerActivate(event)
{
  //Get the names of all current caches...
  const whitelist = ACTIVE_CACHE_NAMES;

  //Remove any cache not in the whitelist...
  const result = caches.keys().then(cacheNames => Promise.all(
    cacheNames.map(cacheName => {
      //If the whitelist is missing the cache name, delete it...
      if (!whitelist || !whitelist.includes(cacheName))
      {
        console.log("[ServiceWorker] Removing outdated cache \'" + cacheName + "\'...");
        return caches.delete(cacheName);
      }
      //Otherwise, keep the cache...
    })
  ));

  //Wait for activate to finish...
  event.waitUntil(result);

  return self.clients.claim();
}

function onServiceWorkerFetch(event)
{
  //IMPORTANT: Request objects are streams, therefore can only used once! Clone it!
  const request = event.request;
  const requestURL = new URL(request.url);

  if (!FORCE_NETWORK_ONLY &&
    request.method === 'GET' &&
    requestURL.origin === self.location.origin)
  {
    //Check for each cache, whether it accepts the request...
    for(const cache of ACTIVE_CACHES)
    {
      const cacheStrategy = cache.getCacheStrategy(request, requestURL);
      if (cacheStrategy)
      {
        //Change event's fetch result as resolved by strategy...
        event.respondWith(cacheStrategy(request, cache));
        return;
      }
    }
  }

  //Change event's fetch result...
  event.respondWith(cacheStrategyNetworkFirst(request, null));
}

/* * * * * * * * * * * * * * * * * * * * * * */
/********** CACHE STRATEGIES **********/
/* * * * * * * * * * * * * * * * * * * * * * */

//Only fetch from network
function cacheStrategyNetworkOnly(request, activeCache)
{
  return fetchFromNetwork(request, null);
}

//Only fetch from cache
function cacheStrategyCacheOnly(request, activeCache)
{
  return fetchFromCache(request);
}

//Always try to fetch network assets first (will fall back to cache if unable to)
function cacheStrategyNetworkFirst(request, activeCache)
{
  //Get the request from the network...
  return fetchFromNetwork(request, activeCache ? activeCache.getName() : null)
    .catch(e => console.error("[ServiceWorker]", e))
    //If unable to, try to get it from cache...
    .then(response => response || fetchFromCache(request));
}

//Always try to fetch cache assets first (will fall back to network if unable to)
function cacheStrategyCacheFirst(request, activeCache)
{
  //Get the request from the network...
  return fetchFromCache(request)
    .catch(e => console.error("[ServiceWorker]", e))
    //If unable to, try to get it from cache...
    .then(response => response || fetchFromNetwork(request, activeCache ? activeCache.getName() : null));
}

//Will fetch both simultaneously, and use which ever loads first
function cacheStrategyFastest(request, activeCache)
{
  console.error("[ServiceWorker] Trying to use cache strategy not yet implemented");
  return cacheStrategyCacheFirst(request, activeCache);
}

/* * * * * * * * * * * * * * * * * * * * * * */
/********** HELPER FUNCTIONS **********/
/* * * * * * * * * * * * * * * * * * * * * * */

function createCache(cacheName, assets=[])
{
  if (typeof cacheName !== 'string') throw new Error("Unable to create cache with unknown name");

  //DEBUG: should only be logged when installing new cached assets...
  console.log("[ServiceWorker] Creating cache \'" + cacheName + "\' with " + assets.length + " asset(s)...");

  return caches.open(cacheName).then(cache => cache.addAll(assets));
  //Don't catch the errors; let them be thrown :)
}

function addToCache(cacheName, request, response)
{
  if (typeof cacheName !== 'string') throw new Error("Unable to add to cache with unknown name");
  if (!request) throw new Error("Unable to add to cache for null request");

  //Make sure it's a valid response...
  if (!response || response.status !== 200 || response.type !== 'basic') return response;

  //IMPORTANT: Request objects are only used once!
  const cacheRequest = request.clone();
  const cacheResponse = response.clone();

  //Asynchronously add to cache
  caches.open(cacheName).then(cache => cache.put(cacheRequest, cacheResponse));
  //Any thrown errors would be handled automatically

  return response;
}

function fetchFromCache(request)
{
  if (!request) throw new Error("Unable to resolve fetch from cache for null request");

  return caches.match(request).then(response => {

    //DEBUG: should only be logged when missing cached assets...
    console.log("[ServiceWorker] Resolving fetch from cache for \'" + request.url + "\'...");

    return response;
  });
}

function fetchFromNetwork(request, ownedCacheName=null)
{
  if (!request) throw new Error("Unable to resolve fetch from network for null request");

  //Make sure to not alter passed-in request...
  const fetchRequest = request.clone();

  //DEBUG: should only be logged when missing cached assets...
  console.log("[ServiceWorker] Resolving fetch from network for \'" + request.url + "\'...");

  return fetch(fetchRequest).then(response => {
    //If not caching, just return the response...
    if (!ownedCacheName) return response;

    return addToCache(ownedCacheName, request, response);
  });
}

//Register event handlers
self.addEventListener('install', onServiceWorkerInstall);
self.addEventListener('activate', onServiceWorkerActivate);
self.addEventListener('fetch', onServiceWorkerFetch);
