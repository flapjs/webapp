(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{29:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(77),i=n(31);class o extends r.a{constructor(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};super(e,t),this.x=t.x||0,this.y=t.y||0,this.label=t.label||"",this.radius=t.radius||o.RADIUS}onDestroy(e,t){var n=e.getElements(t,i.a);for(var r of n)r.fromId===this.id?(delete t[e.getElementTypeKeyForElementType(i.a)][r.id],r.onDestroy(e,t),r.markDead()):r.toId===this.id&&(r.toId=0)}}o.RADIUS=15},31:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(77);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=Symbol("x"),s=Symbol("y");class u extends r.a{constructor(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};super(e,t),this.fromId=t.fromId,this.toId=t.toId||0,this.label=t.label||"",this[c]=0,this[s]=0,this.placeholderLength=15,this.forceLine=!1,this.margin=0,this.quad={radians:0,length:0,coords:{x:0,y:0}}}get x(){return this[c]}get y(){return this[s]}static updatePosition(e,t,n){return e[c]=t,e[s]=n,e}static serialize(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e.quad&&(t.quad=o({},e.quad),t.quad.coords=o({},e.quad.coords)),super.serialize(e,t)}}},33:function(e,t,n){"use strict";n.d(t,"c",(function(){return b})),n.d(t,"d",(function(){return y})),n.d(t,"b",(function(){return _})),n.d(t,"a",(function(){return j}));var r=n(0),i=n.n(r),o=n(1),a=n.n(o),c=n(28);function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function u(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){d(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=i.a.createContext(null);p.Consumer;function b(e){var{children:t}=e,[n,o]=Object(r.useState)({notifications:{}}),a=Object.freeze(Object.values(n.notifications)),l={addNotification:Object(r.useCallback)((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.id||Object(c.g)();if(!(r in n.notifications)){var i=t.tags||[],a=m(r,i,e,t),s=f(f({},n.notifications),{},{[r]:a});n.notifications=s,o({notifications:s})}}),[n]),removeNotification:Object(r.useCallback)((function(e){if(e in n.notifications){var t=n.notifications,{[e]:r}=t,i=s(t,[e].map(u));n.notifications=i,o({notifications:i})}}),[n]),clearNotifications:Object(r.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;if(e){var t=Object.values(n.notifications).filter(t=>!t.tags.includes(e)),r=t.reduce((e,t)=>{e[t.id]=t},{});n.notifications=r,o({notifications:r})}else{var i={};n.notifications=i,o({notifications:i})}}),[n]),updateNotification:Object(r.useCallback)((function(e,t){if(e in n.notifications){var r=function(e,t){return f(f({},e),t)}(n.notifications[e],t),i=f(f({},n.notifications),{},{[e]:r});n.notifications=i,o({notifications:i})}}),[n]),notificationList:a};return i.a.createElement(p.Provider,{value:l},t)}function y(){var e=Object(r.useContext)(p);if(!e)throw Error('useNotifications() must be called from a descendent of "NotificationProvider"');return e}function m(e,t,n,r){return f({id:e,tags:t,message:n},r)}b.propTypes={children:a.a.node};var O=n(89),v=n.n(O),g=n(90),h=n.n(g);function j(e){var{id:t,message:n,controls:o,children:a}=e,c=function(e){if("string"!=typeof e)return"info";if(e.length<4)return"info";switch(e.substring(0,4).toLowerCase()){case"info":return"info";case"erro":return"error";case"warn":return"warning";case"succ":return"success";default:return"info"}}(n),{removeNotification:s}=y(),u=Object(r.useCallback)((function(){s(t)}),[t,s]);return i.a.createElement("section",{className:"".concat(h.a.container," ").concat(c)},function(e){return"string"==typeof e?e.split("\n").map((e,t)=>i.a.createElement("p",{key:e+"#"+t},e)):i.a.createElement("p",null,JSON.stringify(e))}(n),a,i.a.createElement("fieldset",null,i.a.createElement("legend",null,"How Do You Want To Do This?"),o(u),i.a.createElement("button",{onClick:u},"Dismiss")))}j.propTypes={children:a.a.node,id:a.a.string.isRequired,message:a.a.any.isRequired,controls:a.a.func},j.defaultProps={controls:function(e){return null}};var w=n(6);function P(){return(P=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function _(){var{notificationList:e}=y(),[t,n]=Object(r.useState)(!0),o=function(e){var t=e.reduce((function(e,t){if(t.tags.length>0){var n=t.tags[0];n in e?e[n].push(t):e[n]=[t]}else e.none.push(t);return e}),{none:[]});return Object.values(t).reduce((function(e,t){return e.push(...t),e}),[])}(e),a=o.length,c=a<=0;return i.a.createElement("div",{className:"".concat(v.a.container," ").concat(c?"empty":"")},i.a.createElement("button",{className:v.a.toggle,onClick:()=>n(!t)},i.a.createElement("span",{className:v.a.toggleLabel},"Issues (",a,")"),i.a.createElement(w.e,{className:v.a.toggleIcon})),t&&o.map(e=>{var{id:t,message:n}=e;if("function"==typeof n){var r=n;return i.a.createElement(r,P({key:t},e))}return i.a.createElement(j,{key:t,id:t,message:n})}))}},76:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(75),i=n(29),o=n(31);class a extends r.a{static get version(){return"1.0.0"}static get elementTypes(){return{nodes:i.a,edges:o.a}}}},77:function(e,t,n){"use strict";function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return u}));var a=Symbol("elementId"),c=Symbol("dead"),s=Symbol("dirty");class u{constructor(e){this[a]=e,this[s]=!0,this[c]=!1}get type(){return this.constructor}get id(){return this[a]}onUpdate(){}onDestroy(e,t){}markDirty(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this[s]=e}isDirty(){return this[s]}markDead(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this[c]=e}isDead(){return this[c]}static serialize(e,t){var n=[];for(var r of Object.keys(e))if(!(r in t)){var i=e[r];"function"!=typeof i&&("object"==typeof i&&(n.push(r),i="__OBJECT__"+JSON.stringify(i)),t[r]=i)}return n.length>0&&console.warn("Be careful trying to serialize a graph element with nested objects! You should perhaps implement your own serializer to handle these properties: "+"".concat(n.join(", "),".")),t}static deserialize(e,t){for(var n of Object.keys(t)){var r=t[n];"string"==typeof r&&r.startsWith("__OBJECT__")?r=JSON.parse(r.substring("__OBJECT__".length)):"object"==typeof r&&(r=i({},r)),e[n]=r}return e}}},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var r=n(0),i=n.n(r),o=n(1),a=n.n(o),c=n(91),s=n.n(c),u=["Hooray!","Good Job!","Welcome!","👍"],l=u[Math.floor(Math.random()*u.length)];function f(e){var{hidden:t}=e;return i.a.createElement("text",{className:s.a.container+" "+(t?"hidden":"")},t?l:"Double-tap to create a node!")}f.propTypes={hidden:a.a.bool}},79:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(51),i=n(50),o=n(80);function a(e,t){Object(o.a)(e,t,!1,{useButton:2});var n=Object(r.a)(e,t,e=>{var{x:n,y:r}=e;t.x=n,t.y=r,t.markDirty()},{useButton:0}),a=Object(i.b)(e,t,{useButton:2});return Object(i.c)(e,t),[n,a]}},80:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(0),i=n(64),o=n(44);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{openEditor:s}=Object(r.useContext)(o.a);Object(i.a)(e,n,()=>{s(t.type,t.id)},c({},a))}},81:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var r=n(51),i=n(50),o=n(80),a=n(42),c=n(31);function s(e,t,n,s,u,l,f,d,p){return s.x===d.x&&s.y===d.y||(c.a.updatePosition(s,d.x,d.y),s.markDirty()),Object(o.a)(e,s,!1,{useButton:2}),Object(o.a)(t,s),[Object(r.a)(e,d,e=>{Object(a.a)(e,u,l,s),s.markDirty()}),Object(i.b)(n,u,{prevEdge:s,onDragBegin:()=>(Object(a.g)(s.fromId,s.toId,s),s.markDirty(),!0)})]}},82:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var r=n(0),i=n(34),o=n(29),a=n(31);function c(e,t,n,r,i,o,a){try{var c=e[o](a),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(r,i)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function a(e){c(o,r,i,a,s,"next",e)}function s(e){c(o,r,i,a,s,"throw",e)}a(void 0)}))}}function u(){var e=Object(r.useContext)(i.a);return{createNode:Object(r.useCallback)(function(){var t=s((function*(t){return yield e({type:"add",elementType:o.a,opts:{x:t.x,y:t.y}})}));return function(e){return t.apply(this,arguments)}}(),[e]),createEdge:Object(r.useCallback)(function(){var t=s((function*(t,n){return yield e({type:"add",elementType:a.a,opts:{fromId:t.id,toId:n.id}})}));return function(e,n){return t.apply(this,arguments)}}(),[e]),swapInitial:Object(r.useCallback)(function(){var t=s((function*(t,n){return yield e({type:"swapProperty",elementType:o.a,elementId:t.id,targetId:n.id,property:"initial"})}));return function(e,n){return t.apply(this,arguments)}}(),[e])}}},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(0),i=n.n(r),o=n(1),a=n.n(o),c=n(37),s=n(36);function u(e){var{elementType:t,elementIds:n}=e;return i.a.createElement(i.a.Fragment,null,n.map(n=>e.children(t,n)))}function l(e){var{elementType:t}=e,n=Object(s.b)(t);return i.a.createElement(u,{elementType:t,elementIds:n},(t,n)=>i.a.createElement(f,{key:n,elementType:t,elementId:n},e.children))}function f(e){var{elementType:t,elementId:n}=e,r=Object(c.a)(),o=Object(s.a)(t,n,r);return i.a.createElement(i.a.Fragment,null,e.children(o))}u.propTypes={children:a.a.func.isRequired,elementType:a.a.elementType.isRequired,elementIds:a.a.array},u.defaultProps={elementIds:[]},l.propTypes={children:a.a.func.isRequired,elementType:a.a.elementType.isRequired},f.propTypes={children:a.a.func.isRequired,elementType:a.a.elementType.isRequired,elementId:a.a.string.isRequired}},89:function(e,t,n){e.exports={container:"src-services-notification-__NotificationList-module__container--1mdhD",toggle:"src-services-notification-__NotificationList-module__toggle--FVKWN",toggleLabel:"src-services-notification-__NotificationList-module__toggleLabel--2btBI",toggleIcon:"src-services-notification-__NotificationList-module__toggleIcon--21Qa6"}},90:function(e,t,n){e.exports={container:"src-services-notification-__NotificationElementContainer-module__container--2YHYR"}},91:function(e,t,n){e.exports={container:"src-renderers-decors-__TooltipRenderer-module__container--3L51T",fadein:"src-renderers-decors-__TooltipRenderer-module__fadein--2OfCn",fadeout:"src-renderers-decors-__TooltipRenderer-module__fadeout--2iAmh"}}}]);