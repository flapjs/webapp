!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/webapp/dist/",r(r.s=0)}([function(e,t){function r(e,t,r,n,o,i,a){try{var s=e[i](a),u=s.value}catch(e){return void r(e)}s.done?t(u):Promise.resolve(u).then(n,o)}addEventListener("message",e=>{if("skipWaiting"===e.data)return skipWaiting()}),addEventListener("fetch",e=>{var t;(t=function*(){return"navigate"===e.request.mode&&"GET"===e.request.method&&registration.waiting&&(yield clients.matchAll()).length<2?(registration.waiting.postMessage("skipWaiting"),new Response("",{headers:{Refresh:"0"}})):(yield caches.match(e.request))||fetch(e.request)},function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function s(e){r(a,o,i,s,u,"next",e)}function u(e){r(a,o,i,s,u,"throw",e)}s(void 0)}))})().then(t=>e.respondWith(t)).catch(e=>{})}),workbox.core.setCacheNameDetails({prefix:"flapjs"}),[{'revision':'43669f453f217c4425a255e8b6a42666','url':'/webapp/dist/app.bundle.css'},{'revision':'2125740bf28bab9c08f27130f9faae4d','url':'/webapp/dist/app.bundle.js'},{'revision':'a14ac9bc6fb00ea074ebac466e08a287','url':'/webapp/dist/images/logo-192.png'},{'revision':'925be9eb90f4b53ae6ac306e226496f6','url':'/webapp/dist/images/logo-512.png'},{'revision':'75d7db19bfaebd61ba8dae6c5406babf','url':'/webapp/dist/images/logo.svg'},{'revision':'0cb98d99d5db06e3e049277f6806e45e','url':'/webapp/dist/index.html'},{'revision':'5df036b75b2fcb5adcd364dc87701d8b','url':'/webapp/dist/langs/en_us.lang'},{'revision':'5c874d5a978f368d7b44c57db8a9b80a','url':'/webapp/dist/langs/xx_pirate.lang'},{'revision':'e3053393609bd2744010498629a43597','url':'/webapp/dist/libs/prop-types.min.js'},{'revision':'dcf51763fb4a654e15a4e6e7754ca5d2','url':'/webapp/dist/libs/react-dom.production.min.js'},{'revision':'edf56a42bca6b565bf7dfcbd8ffc221a','url':'/webapp/dist/libs/react.production.min.js'},{'revision':'1b58ed10328cb54e17ed78cc84de3e45','url':'/webapp/dist/module_cfg.js'},{'revision':'09cf494a3e1364a767c12b370259b449','url':'/webapp/dist/module_cfg~module_fa~module_node~module_pda~module_tm~module_tree.css'},{'revision':'c5a77f61b41605ee4fff6d3931104d3a','url':'/webapp/dist/module_cfg~module_fa~module_node~module_pda~module_tm~module_tree.js'},{'revision':'41df925a8299898fe39739a7e29a62d7','url':'/webapp/dist/module_fa.css'},{'revision':'87b862c4117dbbf49c87d7db41fd7850','url':'/webapp/dist/module_fa.js'},{'revision':'5893d7203729d9a48d548b530a03e6a8','url':'/webapp/dist/module_fa~module_node.css'},{'revision':'43c4a59b0f95fbbe30cc2ef2c7beef12','url':'/webapp/dist/module_fa~module_node.js'},{'revision':'3eaaf9b843f4db6de2ac08ecd7b3f4d0','url':'/webapp/dist/module_fa~module_re.css'},{'revision':'e21123b9ded4539e00cd0e00abeedd4c','url':'/webapp/dist/module_fa~module_re.js'},{'revision':'60e52ff9247d40ef9721f264461d88e6','url':'/webapp/dist/module_node.css'},{'revision':'fd38f656ee839aaba5a87d4450140990','url':'/webapp/dist/module_node.js'},{'revision':'3208b96606e36b51cc62b587d814be17','url':'/webapp/dist/module_pda.js'},{'revision':'f4c844409f7a071c0f3db17e0e1406b7','url':'/webapp/dist/module_re.css'},{'revision':'52e22fd4f6db9c3a678a65c6a1e7664a','url':'/webapp/dist/module_re.js'},{'revision':'ca5b85bd6c72fc519ed3e7bbc8cbd639','url':'/webapp/dist/module_tm.js'},{'revision':'c82f642abd7afa063bc0500993f69c14','url':'/webapp/dist/module_tree.js'},{'revision':'973766fd977d147915f1da9f4d3e0eb4','url':'/webapp/dist/scripts/ExitWarning.js'},{'revision':'b3b6c20a4788987749085f3ca6af226f','url':'/webapp/dist/scripts/NoFocusOutline.js'},{'revision':'d47f129711ac53f891141b5513480dfd','url':'/webapp/dist/scripts/ServiceWorker.js'},{'revision':'3d4456fc3d7f17c4dbecfe360f5427d1','url':'/webapp/dist/scripts/ServiceWorkerInstall.js'},{'revision':'9265d06cef09203e40b906885eac606b','url':'/webapp/dist/scripts/TooLongRestartPrompt.js'},{'revision':'0bc8f137df0064e596b0631fcd798fd2','url':'/webapp/dist/styles/Default.css'},{'revision':'1ea3abdc3eaba13c640b5f66a9f0d30c','url':'/webapp/dist/styles/Error.css'},{'revision':'9ff658ad6cfd542d5265b9b2db8fb7b8','url':'/webapp/dist/styles/Loading.css'},{'revision':'d6769847ee643353f10e8c3bafe1ff8b','url':'/webapp/dist/styles/NoFocusOutline.css'}]=[].concat(self.__WB_MANIFEST||[]),workbox.precaching.precacheAndRoute(self.__WB_MANIFEST,{}),workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,new workbox.strategies.CacheFirst),workbox.routing.registerRoute(/.*/,new workbox.strategies.NetworkFirst)}]);