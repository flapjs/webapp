(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{383:function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,n)}function o(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}function a(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=0,r=0,n=e.length;r<n;r++)t=Math.imul(31,t)+e.charCodeAt(r)|0;return t}function i(e,t,r,n){var o=r-e,a=n-t;return Math.sqrt(o*o+a*a)}function u(e,t,r,n){var o=r-e,a=n-t;return o*o+a*a}function c(e,t,r,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,i=arguments.length>6&&void 0!==arguments[6]?arguments[6]:{x:0,y:0},u=r-e,c=n-t,s=Math.atan2(c,u)+a;return i.x=Math.cos(s)*o,i.y=Math.sin(s)*o,i}function s(e,t,r,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{x:0,y:0};return o.x=e+(r-e)/2,o.y=t+(n-t)/2,o}r.d(t,"g",(function(){return n})),r.d(t,"e",(function(){return o})),r.d(t,"f",(function(){return a})),r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return u})),r.d(t,"c",(function(){return c})),r.d(t,"d",(function(){return s}))},386:function(e,t,r){"use strict";r.d(t,"c",(function(){return u})),r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return s}));var n=r(0),o=r(394),a=r(387),i=r(420);function u(){return Object(n.useContext)(a.d)}function c(){return Object(n.useContext)(a.a)}function s(){var e=Object(a.e)(),t=Object(o.a)(),r=Object(n.useCallback)((function(e){return t()}),[t]);return Object(n.useEffect)((function(){return e&&Object(i.a)(e,r),function(){e&&Object(i.c)(e,r)}}),[e,r]),e}},387:function(e,t,r){"use strict";r.d(t,"d",(function(){return m})),r.d(t,"a",(function(){return g})),r.d(t,"b",(function(){return j})),r.d(t,"e",(function(){return S})),r.d(t,"c",(function(){return E}));var n=r(0),o=r.n(n),a=r(2),i=r.n(a),u=r(383),c=r(418),s=r(115),l=r(419),f=r(420),y=r(421),p=r(12);function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var m=o.a.createContext(null),g=o.a.createContext(null),O=o.a.createContext(null);function j(e){var t=e.graphType,r=e.graphState;return o.a.createElement(m.Provider,{value:t},o.a.createElement(w,{graphState:r},e.children))}function w(e){var t,r,a=Object(n.useContext)(m),i=h(Object(s.a)((function(e,t){var r=a.reducer&&a.reducer(e,t);return r||(r=E(a,e,t)),r}),e.graphState,!0),2),u=i[0],p=i[1];return t=u,r=Object(n.useCallback)((function(){for(var e=!1,r=0,n=Object.values(t);r<n.length;r++){for(var o=n[r],a=!1,i=Object.values(o),u=0,c=i;u<c.length;u++){var s=c[u];if(s.isDirty()){a=!0,s.markDirty(!1),s.onUpdate();var p=!0,v=!1,d=void 0;try{for(var b,h=Object(l.b)(s)[Symbol.iterator]();!(p=(b=h.next()).done);p=!0)b.value.call(void 0,s)}catch(e){v=!0,d=e}finally{try{p||null==h.return||h.return()}finally{if(v)throw d}}}}if(a){e=!0;var m=!0,g=!1,O=void 0;try{for(var j,w=Object(y.b)(o)[Symbol.iterator]();!(m=(j=w.next()).done);m=!0)j.value.call(void 0,i)}catch(e){g=!0,O=e}finally{try{m||null==w.return||w.return()}finally{if(g)throw O}}}}if(e){var S=!0,E=!1,x=void 0;try{for(var P,T=Object(f.b)(t)[Symbol.iterator]();!(S=(P=T.next()).done);S=!0)P.value.call(void 0,t)}catch(e){E=!0,x=e}finally{try{S||null==T.return||T.return()}finally{if(E)throw x}}}}),[t]),Object(c.a)(r),o.a.createElement(O.Provider,{value:u},o.a.createElement(g.Provider,{value:p},e.children))}function S(){return Object(n.useContext)(O)}function E(e,t,r){switch(r.type){case"add":var n=r.elementType,o=r.elementId,a=r.opts,i=d({},t),c=e.getElementTypeKeyForElementType(n),s=c in i?d({},i[c]):{},l=o||Object(u.g)(),f=new n(l,a||{});return s[l]=f,i[c]=s,[i,f];case"delete":var y=r.elementType,v=r.elementId,b=d({},t),h=e.getElementTypeKeyForElementType(y);if(h in b){var m=d({},b[h]),g=m[v];delete m[v],b[h]=m,g.onDestroy(e,b),g.markDead()}return b;case"deleteAll":var O=r.elementType,j=r.elementIds,w=d({},t),S=e.getElementTypeKeyForElementType(O);if(S in w){var E=d({},w[S]),x=!0,P=!1,T=void 0;try{for(var k,_=j[Symbol.iterator]();!(x=(k=_.next()).done);x=!0){var I=k.value,C=E[I];delete E[I],w[S]=E,C.onDestroy(e,w),C.markDead()}}catch(e){P=!0,T=e}finally{try{x||null==_.return||_.return()}finally{if(P)throw T}}}return w;case"clear":var A=r.elementType,D=d({},t),M=e.getElementTypeKeyForElementType(A);if(M in D){for(var R=0,N=Object.values(D[M]);R<N.length;R++){var F=N[R];F.onDestroy(e,D),F.markDead()}D[M]={}}return D;case"clearAll":for(var V={},L=0,G=Object.keys(t);L<G.length;L++)for(var K=G[L],X=0,q=Object.values(t[K]);X<q.length;X++){var Y=q[X];Y.onDestroy(e,V),Y.markDead()}return V;case"forceUpdate":return d({},t);case"resetState":var W=r.state;if(W){for(var z=0,B=Object.keys(t);z<B.length;z++)for(var H=B[z],J=0,U=Object.values(t[H]);J<U.length;J++){var Z=U[J];Z.onDestroy(e,t),Z.markDead()}return W}return void p.a.warn("GraphContext","Trying to resetState to null - skipping...");case"swapProperty":var Q=e.getElement(t,r.elementType,r.elementId),$=e.getElement(t,r.targetType||r.elementType,r.targetId),ee=Q[r.property];return Q[r.property]=$[r.property],$[r.property]=ee,t}}j.propTypes={children:i.a.node,graphType:i.a.elementType.isRequired,graphState:i.a.object},j.defaultProps={graphState:{}},w.propTypes={children:i.a.node,graphState:i.a.object},w.defaultProps={graphState:{}}},390:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}r.d(t,"a",(function(){return a}));var a=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.loader=t}return o(e,null,[{key:"serviceVersion",get:function(){return"0.0.0"}},{key:"services",get:function(){return[]}},{key:"providers",get:function(){return[]}},{key:"renders",get:function(){return{}}},{key:"slots",get:function(){return{}}}]),o(e,[{key:"destroy",value:function(){}},{key:"mount",value:function(){}},{key:"unmount",value:function(){}}]),e}()},391:function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var n=r(0),o=r.n(n),a=r(2),i=r.n(a),u=r(440),c=r.n(u),s=r(403);function l(e){var t=e.message,r=e.messageId,a=e.mode,i=e.renderMessages,u=e.renderControls,l=Object(n.useContext)(s.a),f=Object(n.useCallback)((function(){return l({type:"dismiss",messageId:r})}),[r,l]);return o.a.createElement("section",{className:c.a.container+" "+(a||"")},i(t),e.children,o.a.createElement("fieldset",null,o.a.createElement("legend",null,"How Do You Want To Do This?"),u(f),o.a.createElement("button",{onClick:f},"Dismiss")))}l.propTypes={children:i.a.node,messageId:i.a.string.isRequired,message:i.a.string,renderMessages:i.a.func,renderControls:i.a.func,mode:i.a.oneOf(["error","warning","success","info"])},l.defaultProps={message:"",renderMessages:function(e){var t;t="string"==typeof e?e.split("\n").map((function(e,t){return o.a.createElement("p",{key:e+"."+t},e)})):o.a.createElement("p",null,JSON.stringify(e));return t},renderControls:function(e){return null},mode:"info"}},392:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return s}));var n=r(0),o=r.n(n),a=r(2),i=r.n(a);function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c=o.a.createContext(null);function s(e){var t=Object(n.useRef)(null),r=u(Object(n.useState)({x:0,y:0}),2),a=r[0],i=r[1],s=u(Object(n.useState)(1),2),l=s[0],f=s[1],y=Object(n.useCallback)((function(e,t){i({x:-e,y:-t})}),[i]);return o.a.createElement(c.Provider,{value:{svgRef:t,pos:a,setPos:i,scale:l,setScale:f,setLookAt:y}},e.children)}s.propTypes={children:i.a.node}},393:function(e,t,r){"use strict";r.d(t,"b",(function(){return c})),r.d(t,"c",(function(){return s})),r.d(t,"a",(function(){return l}));var n=r(0),o=r(419),a=r(421),i=r(387),u=r(386);function c(e){var t=Object(u.c)(),r=Object(i.e)();return t.getElementIds(r,e)}function s(e,t){var r=Object(u.c)(),o=Object(i.e)(),c=r.getElements(o,e);return Object(n.useEffect)((function(){return c&&Object(a.a)(e,t),function(){c&&Object(a.c)(e,t)}}),[o,c,e,t]),c}function l(e,t,r){var a=Object(u.c)(),c=Object(i.e)(),s=a.getElement(c,e,t);return Object(n.useEffect)((function(){return s&&Object(o.a)(s,r),function(){s&&Object(o.c)(s,r)}}),[c,s,t,r]),s}},394:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(0);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(){var e=o(Object(n.useState)(!1),2)[1];return Object(n.useCallback)((function(){return e((function(e){return!e}))}),[])}},396:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}r.d(t,"a",(function(){return a}));var a=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return o(e,null,[{key:"services",get:function(){return[]}},{key:"providers",get:function(){return[]}},{key:"renders",get:function(){return{}}},{key:"moduleId",get:function(){throw new Error("Must be overriden.")}},{key:"moduleVersion",get:function(){return"0.0.0"}}]),o(e,[{key:"destroy",value:function(e){}},{key:"mount",value:function(e){}},{key:"unmount",value:function(e){}}]),e}()},397:function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var n=r(390),o=r(412);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e,t){return!t||"object"!==a(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var l=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,c(t).apply(this,arguments))}var r,n,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(t,e),r=t,a=[{key:"providers",get:function(){return[o.b]}},{key:"serviceVersion",get:function(){return"1.0.0"}}],(n=null)&&i(r.prototype,n),a&&i(r,a),t}(n.a)},398:function(e,t,r){"use strict";var n=r(390),o=r(0),a=r.n(o),i=r(21);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return function(n){return a.a.createElement(t,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},n,{},r),a.a.createElement(i.a,{name:e}),n.children)}}var l=r(392),f=r(2),y=r.n(f);function p(e){return a.a.createElement(a.a.Fragment,null,e.children)}p.propTypes={children:y.a.node};var v=r(438),d=r.n(v);function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var h=300;function m(e){var t=e.offsetX,r=e.offsetY,n=e.scale,o=e.childProps,i=h*Math.min(Number.MAX_SAFE_INTEGER,Math.max(Number.EPSILON,n)),u=i/2,c="".concat(-u," ").concat(-u," ").concat(i," ").concat(i);return a.a.createElement("svg",b({className:d.a.view+" viewarea "+e.className,viewBox:c},o),a.a.createElement("g",{transform:"translate(".concat(t," ").concat(r,")")},e.children))}function g(e){var t=Object(o.useContext)(l.a),r=t.svgRef,n=t.pos,i=t.scale;return a.a.createElement(m,{className:"viewport",offsetX:n.x,offsetY:n.y,scale:i,childProps:{ref:r}},e.children)}function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function w(e,t){return!t||"object"!==O(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}m.propTypes={children:y.a.node,className:y.a.string,offsetX:y.a.number,offsetY:y.a.number,scale:y.a.number,childProps:y.a.object},m.defaultProps={offsetX:0,offsetY:0,scale:1,childProps:{}},g.propTypes={children:y.a.node};var x=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),w(this,S(t).apply(this,arguments))}var r,n,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}(t,e),r=t,o=[{key:"providers",get:function(){return[l.b]}},{key:"renders",get:function(){return{background:[s("playarea",g)],foreground:[s("viewarea",p)]}}},{key:"serviceVersion",get:function(){return"1.0.0"}}],(n=null)&&j(r.prototype,n),o&&j(r,o),t}(n.a),P=r(387),T=r(400),k=r(422),_=r(416);function I(e){return(I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function A(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function D(e,t){return!t||"object"!==I(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function M(e){return(M=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function R(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&N(e,t)}function N(e,t){return(N=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}r.d(t,"a",(function(){return F}));var F=function(e){function t(){return C(this,t),D(this,M(t).apply(this,arguments))}var r,n,o;return R(t,e),r=t,o=[{key:"services",get:function(){return[x]}},{key:"providers",get:function(){return[{component:P.b,props:{graphType:k.a}},T.b]}},{key:"renders",get:function(){return{playarea:[],viewarea:[_.a]}}},{key:"serviceVersion",get:function(){return"1.0.0"}}],(n=null)&&A(r.prototype,n),o&&A(r,o),t}(n.a);F.withGraphType=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return function(n){function o(n,a){var i;return C(this,o),i=D(this,M(o).call(this,n,a)),a.providers[0].props.graphType=e,t&&a.playarea.unshift({component:t}),r&&(a.viewarea[0].component=r),i}return R(o,n),o}(F)}},399:function(e,t,r){"use strict";var n=r(390),o=r(403),a=r(423),i=r(0),u=r.n(i),c=r(2),s=r.n(c),l=r(391);function f(e){var t=e.message,r=e.messageId;return u.a.createElement(l.a,{message:t,messageId:r})}function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function v(e){var t=e.defaultComponent,r=Object(i.useContext)(o.c),n=new Set,a=[];if(r.messages){var c=!0,s=!1,l=void 0;try{for(var f,v=Object.keys(r.tags).sort()[Symbol.iterator]();!(c=(f=v.next()).done);c=!0)for(var d=f.value,b=0,h=Object.entries(r.tags[d].messages);b<h.length;b++){var m=p(h[b],2),g=m[0],O=m[1];n.has(g)||(n.add(g),a.push(O))}}catch(e){s=!0,l=e}finally{try{c||null==v.return||v.return()}finally{if(s)throw l}}}return u.a.createElement("div",{style:{maxWidth:"22rem",maxHeight:"100%",overflowY:"auto"}},a.map((function(e){var r=e.component,n=e.props,o=e.message,a=e.messageId,i=e.messageType,c=r||t;return u.a.createElement(c,y({key:a},n,{message:o,messageId:a,messageType:i}))})))}function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function m(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&j(e,t)}function j(e,t){return(j=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}f.propTypes={messageId:s.a.string.isRequired,message:s.a.string},f.defaultProps={message:""},v.propTypes={defaultComponent:s.a.elementType},v.defaultProps={defaultComponent:f},r.d(t,"a",(function(){return w}));var w=function(e){function t(){return b(this,t),m(this,g(t).apply(this,arguments))}var r,n,a;return O(t,e),r=t,a=[{key:"providers",get:function(){return[o.b]}},{key:"renders",get:function(){return{foreground:[v]}}},{key:"serviceVersion",get:function(){return"1.0.0"}}],(n=null)&&h(r.prototype,n),a&&h(r,a),t}(n.a);w.withInitialMessages=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return(function(r){function n(r,o){var i;b(this,n),i=m(this,g(n).call(this,r,o));var u=Object(a.d)(e);return o.providers[0].props={notifyState:u},t&&(o.foreground[0].props={defaultMessageComponent:t}),i}return O(n,r),n}(w))}},400:function(e,t,r){"use strict";r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return s}));var n=r(0),o=r.n(n),a=r(2),i=r.n(a);function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c=o.a.createContext();function s(e){var t=u(Object(n.useState)(null),2),r=t[0],a=t[1],i=null,s=null,l=!1;r&&(i=r[0],s=r[1],l=!0);var f=Object(n.useCallback)((function(e,t){a([e,t])}),[a]),y=Object(n.useCallback)((function(){a(null)}),[a]);return o.a.createElement(c.Provider,{value:{elementType:i,elementId:s,isOpen:l,openEditor:f,closeEditor:y,toggleEditor:function(e,t){r?close():open(e,t)}}},e.children)}s.propTypes={children:i.a.node}},403:function(e,t,r){"use strict";r.d(t,"c",(function(){return p})),r.d(t,"a",(function(){return v})),r.d(t,"b",(function(){return d}));var n=r(0),o=r.n(n),a=r(2),i=r.n(a),u=r(115),c=r(423);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){f(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var p=o.a.createContext(null),v=o.a.createContext(null);function d(e){var t=y(Object(u.a)(b,e.notifyState,!0),2),r=t[0],n=t[1];return o.a.createElement(p.Provider,{value:r},o.a.createElement(v.Provider,{value:n},e.children))}function b(e,t){switch(t.type){case"send":var r=t.message,n=t.component,o=t.props,a=t.tags,i=t.replace,u=l({},e);u.messages||(u.messages={},u.tags={});var s=Object(c.b)(r,n,o,a,i);return Object(c.a)(s,u),u;case"dismiss":var f=t.messageId,y=t.tags,p=l({},e);if(!p.messages)return p;if(f){if(f in p.messages){var v=!0,d=!1,b=void 0;try{for(var h,m=p.messages[f].messageTags[Symbol.iterator]();!(v=(h=m.next()).done);v=!0){var g=h.value;delete p.tags[g].messages[f]}}catch(e){d=!0,b=e}finally{try{v||null==m.return||m.return()}finally{if(d)throw b}}delete p.messages[f]}}else if(y){var O=Object(c.c)(p,y),j=!0,w=!1,S=void 0;try{for(var E,x=O[Symbol.iterator]();!(j=(E=x.next()).done);j=!0){var P=E.value,T=!0,k=!1,_=void 0;try{for(var I,C=p.messages[P].messageTags[Symbol.iterator]();!(T=(I=C.next()).done);T=!0){var A=I.value;delete p.tags[A].messages[P]}}catch(e){k=!0,_=e}finally{try{T||null==C.return||C.return()}finally{if(k)throw _}}delete p.messages[P]}}catch(e){w=!0,S=e}finally{try{j||null==x.return||x.return()}finally{if(w)throw S}}}return p;case"clear":return{messages:{},tags:{}}}}d.propTypes={children:i.a.node,notifyState:i.a.object},d.defaultProps={notifyState:{messages:{},tags:{}}}},411:function(e,t,r){"use strict";function n(e,t,r){if(!(e instanceof SVGGraphicsElement))return[t,r];var n=e.getScreenCTM();return[(t-n.e)/n.a,(r-n.f)/n.d]}function o(e,t,r){var n=e.getScreenCTM();return[t*n.a+n.e,r*n.d+n.f]}r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return o}))},412:function(e,t,r){"use strict";r.d(t,"c",(function(){return d})),r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return h}));var n=r(0),o=r.n(n),a=r(2),i=r.n(a),u=r(115),c=r(413),s=r(383);function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){y(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function y(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var v=1e3,d=o.a.createContext(null),b=o.a.createContext(null);function h(e){var t=p(Object(u.a)(m,e.historyState,!0),2),r=t[0],n=t[1];return o.a.createElement(d.Provider,{value:r},o.a.createElement(b.Provider,{value:n},e.children))}function m(e,t){switch(t.type){case"undo":var r=t.source,n=t.update,o=Object(c.c)(r);if(!(o in e))return;var a=e[o];if(a.historyIndex<=0)return;a.historyIndex<=1?a.historyIndex=0:a.historyIndex-=1;var i=a.history[a.historyIndex];return n(i.data,i.hash),f({},e);case"redo":var u=t.source,l=t.update,y=Object(c.c)(u);if(!(y in e))return;var p=e[y];if(p.historyIndex>=p.history.length-1)return;p.historyIndex>=p.history.length-2?p.historyIndex=p.history.length-1:p.historyIndex+=1;var d=p.history[p.historyIndex];return l(d.data,d.hash),f({},e);case"commit":var b=t.source,h=t.data,m=t.hash||Object(s.f)(h),g=Object(c.c)(b);g in e||(e[g]={history:[],historyIndex:0});var O=e[g];if(O.history.length>0&&O.history[O.historyIndex].hash===m)return;var j=O.historyIndex,w=O.history,S=w.length;return S>=v?(j>=v-1&&(j=v-2),w.shift()):j>=S-1?j=S:(w.length=j+1,j+=1),w.push({data:h,hash:m}),O.historyIndex=j,f({},e);case"clear":var E=t.source,x=Object(c.c)(E);if(!(x in e))return;var P=e[x];if(P.history.length<=0)return;return P.history.length=0,P.historyIndex=0,f({},e);case"resetState":return t.state}}h.propTypes={children:i.a.node,historyState:i.a.object},h.defaultProps={historyState:{}}},413:function(e,t,r){"use strict";r.d(t,"b",(function(){return o})),r.d(t,"a",(function(){return a})),r.d(t,"c",(function(){return i})),r.d(t,"d",(function(){return u}));var n=r(383);function o(e,t){var r=i(t);return r in e&&e[r].historyIndex>0}function a(e,t){var r=i(t);return r in e&&e[r].historyIndex<e[r].history.length-1}function i(e){return"string"==typeof e?e:e.name}function u(e,t,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Object(n.f)(r),a=i(t);if(a in e){var u=e[a];return u.history[u.historyIndex].hash==o}return!1}},416:function(e,t,r){"use strict";var n=r(0),o=r.n(n),a=r(2),i=r.n(a),u=r(439),c=r.n(u),s=r(392),l=r(400),f=r(393),y=r(394),p=r(411),v=r(37),d=r(49);function b(e){return e.preventDefault(),e.stopPropagation(),!1}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function m(e){var t=e.className,r=e.offset,a=e.onOpen,i=Object(n.useContext)(l.a),u=i.elementType,m=i.elementId,g=i.isOpen,O=i.closeEditor,j=Object(y.a)(),w=Object(f.a)(u,m,j),S=Object(n.useRef)(null),E=Object(n.useContext)(s.a),x=E.svgRef,P=E.pos;Object(n.useEffect)((function(){if(w&&x.current){var e,t=x.current,n=t.getBoundingClientRect(),o=P.x,a=P.y;e="function"==typeof r?r(w):r?{x:w.x+r.x,y:w.y+r.y}:w;var i=Object(p.b)(t,e.x+o,e.y+a),u=-n.left,c=-n.top;S.current&&(u-=S.current.offsetWidth/2,c-=S.current.offsetHeight/2,S.current.style.left="".concat(i[0]+u,"px"),S.current.style.top="".concat(i[1]+c,"px"))}}));var T=Object(n.useCallback)((function(e){S.current&&S.current.contains(e.target)||O(e)}),[O]),k=h(Object(n.useState)(!1),2),_=k[0],I=k[1];return Object(n.useLayoutEffect)((function(){return g!==_&&(I(g),g&&(document.addEventListener("mousedown",T,!0),a())),function(){g!==_&&(g||document.removeEventListener("mousedown",T,!0))}}),[g,_]),o.a.createElement("dialog",{ref:S,className:"".concat(c.a.container," ").concat(t),open:g,onContextMenu:b},o.a.createElement(v.a,{className:c.a.cancel,iconClass:d.c,onClick:O}),e.children)}r.d(t,"a",(function(){return m})),m.propTypes={children:i.a.node,className:i.a.string,offset:i.a.oneOfType([i.a.shape({x:i.a.number,y:i.a.number}),i.a.func]),onOpen:i.a.func},m.defaultProps={onOpen:function(){}}},418:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(0);function o(e){Object(n.useEffect)((function(){var t=requestAnimationFrame((function r(n){t=requestAnimationFrame(r);e(n)}));return function(){cancelAnimationFrame(t)}}),[e])}},419:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"b",(function(){return i}));var n=Symbol("elementListeners");function o(e,t){n in e||(e[n]=[]),e[n].push(t)}function a(e,t){n in e&&e[n].splice(e[n].indexOf(t),1)}function i(e){return e[n]||[]}},420:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"b",(function(){return i}));var n=Symbol("stateListeners");function o(e,t){n in e||(e[n]=[]),e[n].push(t)}function a(e,t){n in e&&e[n].splice(e[n].indexOf(t),1)}function i(e){return e[n]||[]}},421:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"b",(function(){return i}));var n=Symbol("elementTypeListeners");function o(e,t){n in e||(e[n]=[]),e[n].push(t)}function a(e,t){n in e&&e[n].splice(e[n].indexOf(t),1)}function i(e){return e[n]||[]}},422:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n=r(383),o=r(116);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=function(){function e(){throw function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),new Error("A graph type cannot be instantiated.")}var t,r,u;return t=e,u=[{key:"reducer",value:function(e,t){}},{key:"serialize",value:function(e,t){arguments.length>2&&void 0!==arguments[2]&&arguments[2];for(var r=0,n=Object.entries(this.elementTypes);r<n.length;r++){var o=a(n[r],2),i=o[0],u=o[1];if(!(i in t)&&i in e){for(var c={},s=0,l=Object.entries(e[i]);s<l.length;s++){var f=a(l[s],2),y=f[0],p=f[1];c[y]=u.serialize(p,{})}t[i]=c}}return t.__metadata__={graphType:this.name,version:this.version},t}},{key:"deserialize",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!r.forceIgnoreVersion){if(!(e&&"__metadata__"in e))throw new Error("Missing metadata.");if(this.name!==e.__metadata__.graphType)throw new Error("Mismatched metadata graph type.");if(!o.a.parse(this.version).canSupportVersion(e.__metadata__.version))throw new Error("Unsupported graph parser version - ".concat(this.version," cannot support ")+e.__metadata__.version)}for(var n=0,i=Object.entries(this.elementTypes);n<i.length;n++){var u=a(i[n],2),c=u[0],s=u[1];if(c in e){for(var l={},f=0,y=Object.entries(e[c]);f<y.length;f++){var p=a(y[f],2),v=p[0],d=p[1],b=new s(v);l[v]=s.deserialize(b,d)}t[c]=l}}return t}},{key:"hashCode",value:function(e,t){return 0}},{key:"getElementTypeKeyForElementType",value:function(e){for(var t=0,r=Object.entries(this.elementTypes);t<r.length;t++){var n=a(r[t],2),o=n[0];if(e===n[1])return o}return"unknown"}},{key:"getElementIds",value:function(e,t){return Object.keys(e[this.getElementTypeKeyForElementType(t)]||{})}},{key:"getElements",value:function(e,t){return Object.values(e[this.getElementTypeKeyForElementType(t)]||{})}},{key:"getElement",value:function(e,t,r){var n=e[this.getElementTypeKeyForElementType(t)];return n&&r in n?n[r]:null}},{key:"findElementWithinRadius",value:function(e,t,r,o,a){var i=this.getElements(e,t);if(i){var u=a*a,c=!0,s=!1,l=void 0;try{for(var f,y=i[Symbol.iterator]();!(c=(f=y.next()).done);c=!0){var p=f.value;if(Object(n.b)(r,o,p.x,p.y)<=u)return p}}catch(e){s=!0,l=e}finally{try{c||null==y.return||y.return()}finally{if(s)throw l}}}return null}},{key:"findElementsWithinBox",value:function(e,t,r,n,o,a){if(r>o){var i=o;o=r,r=i}if(n>a){var u=a;a=n,n=u}var c=[],s=this.getElements(e,t);if(s){var l=!0,f=!1,y=void 0;try{for(var p,v=s[Symbol.iterator]();!(l=(p=v.next()).done);l=!0){var d=p.value,b=d.x,h=d.y;r<=b&&b<=o&&n<=h&&h<=a&&c.push(d)}}catch(e){f=!0,y=e}finally{try{l||null==v.return||v.return()}finally{if(f)throw y}}}return c}},{key:"elementTypes",get:function(){return{}}},{key:"version",get:function(){return"0.0.0"}}],(r=null)&&i(t.prototype,r),u&&i(t,u),e}()},423:function(e,t,r){"use strict";r.d(t,"d",(function(){return u})),r.d(t,"a",(function(){return c})),r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return l}));var n=r(383);function o(e){return function(e){if(Array.isArray(e))return e}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i="all";function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t={messages:{},tags:{}},r=!0,n=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done);r=!0){var l=i.value,f=void 0;if("object"===a(l))f=s(l.message,l.component,l.props,l.tags,l.reflect);else f=s(l);c(f,t)}}catch(e){n=!0,o=e}finally{try{r||null==u.return||u.return()}finally{if(n)throw o}}return t}function c(e,t){var r=!0,n=!1,o=void 0;try{for(var a,i=e.messageTags[Symbol.iterator]();!(r=(a=i.next()).done);r=!0){var u=a.value;u in t.tags||(t.tags[u]={messages:{}}),t.tags[u].messages[e.messageId]=e}}catch(e){n=!0,o=e}finally{try{r||null==i.return||i.return()}finally{if(n)throw o}}return t.messages[e.messageId]=e,t}function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0,a=arguments.length>4&&void 0!==arguments[4]&&arguments[4],u=o||[i];return{component:t||null,props:r||{},message:e||"",messageId:a?String(Object(n.f)(u.sort().join("."))):Object(n.g)(),messageTags:u}}function l(e,t){if(t.length<=0)return[];var r=o(t),n=r[0],a=r.slice(1);if(!(n in e.tags))return[];var i=new Set(Object.keys(e.tags[n].messages)),u=!0,c=!1,s=void 0;try{for(var l,f=a[Symbol.iterator]();!(u=(l=f.next()).done);u=!0){var y=l.value;if(!(y in e.tags))return[];for(var p=0,v=Object.keys(e.tags[y]);p<v.length;p++){var d=v[p];i.has(d)||i.delete(d)}}}catch(e){c=!0,s=e}finally{try{u||null==f.return||f.return()}finally{if(c)throw s}}return Array.from(i)}},438:function(e,t,r){e.exports={view:"src-services-view-svg-__SVGPlayground-module__view--XnIZZ"}},439:function(e,t,r){e.exports={container:"src-services-graph-widgets-editor-__GraphElementEditor-module__container--3Xf7_",cancel:"src-services-graph-widgets-editor-__GraphElementEditor-module__cancel--3DvDL"}},440:function(e,t,r){e.exports={container:"src-services-notify-components-__MessageContainer-module__container--3uQ0R"}}}]);