(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{40:function(e,t,n){e.exports={decorative:"src-renderers-__Renderer-module__decorative--1ezN7",mask:"src-renderers-__Renderer-module__mask--zinTz"}},43:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n(0),r=n(23),o=n(50);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l={startBufferRadius:10,preserveOffset:!1,useButton:void 0,onDragBegin:null,onDragMove:null,onDragEnd:null};function u(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(r=i(i({},l),r),!e)throw new Error("Requires ref of target element to drag.");var[c,s]=Object(a.useState)(!1),u=Object(a.useCallback)(a=>{if(!f&&(void 0===r.useButton||a.button===r.useButton)){var c=e.current;if(p(c,a.clientX,a.clientY,(e,t,a)=>{void 0===e&&void 0===t||n({x:e,y:t}),void 0!==a&&s(a)}),r.startBufferRadius&&(f.startRadius=r.startBufferRadius),r.preserveOffset){var i=Object(o.a)(c,a.clientX,a.clientY);f.initialOffsetX=i[0]-t.x,f.initialOffsetY=i[1]-t.y}r.onDragBegin&&(f.beginCallback=r.onDragBegin),r.onDragMove&&(f.moveCallback=r.onDragMove),r.onDragEnd&&(f.endCallback=r.onDragEnd)}},[e,r.onDragBegin,r.onDragMove,r.onDragEnd,r.preserveOffset,r.startBufferRadius,r.useButton,n,t.x,t.y]),v=Object(a.useCallback)(e=>(e.preventDefault(),e.stopPropagation(),!1),[]);return Object(a.useEffect)(()=>{if(!c){var t=e.current;return t.addEventListener("mousedown",u),t.addEventListener("contextmenu",v),()=>{t.removeEventListener("mousedown",u),t.removeEventListener("contextmenu",v)}}}),c}var f=null;function p(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:()=>{};return f&&(cancelAnimationFrame(f.animationFrameHandle),document.removeEventListener("mousemove",f.onMouseMove,!0),document.removeEventListener("mouseup",f.onMouseUp,!0),f=null),e&&((f={element:e,callback:a,initialOffsetX:0,initialOffsetY:0,prevX:t,prevY:n,nextX:t,nextY:n,started:!1,startRadius:0,animationFrameHandle:null,onAnimationFrame:null,onMouseMove:null,onMouseUp:null,beginCallback:null,moveCallback:null,endCallback:null}).onAnimationFrame=v.bind(f),f.onMouseMove=m.bind(f),f.onMouseUp=b.bind(f),document.addEventListener("mousemove",f.onMouseMove,!0),document.addEventListener("mouseup",f.onMouseUp,!0),f.animationFrameHandle=requestAnimationFrame(f.onAnimationFrame)),f}function v(e){if(this.animationFrameHandle=requestAnimationFrame(this.onAnimationFrame),this.started){this.prevX=this.nextX,this.prevY=this.nextY;var t=Object(o.a)(this.element,this.nextX,this.nextY),n=t[0]-this.initialOffsetX,a=t[1]-this.initialOffsetY;if(this.moveCallback){var c=this.moveCallback.call(void 0,n,a);Array.isArray(c)&&(n=c[0],a=c[1])}this.callback(n,a)}else if(Object(r.a)(this.prevX,this.prevY,this.nextX,this.nextY)>this.startRadius){if(this.beginCallback){var i=Object(o.a)(this.element,this.nextX,this.nextY),s=i[0]-this.initialOffsetX,l=i[1]-this.initialOffsetY;if(!this.beginCallback.call(void 0,s,l))return}this.started=!0,this.callback(void 0,void 0,!0)}}function m(e){this.nextX=e.clientX,this.nextY=e.clientY}function b(e){if(p(null),this.started){if(e.preventDefault(),e.stopPropagation(),this.callback(void 0,void 0,!1),this.endCallback){var t=Object(o.a)(this.element,this.nextX,this.nextY);this.endCallback.call(void 0,t[0]-this.initialOffsetX,t[1]-this.initialOffsetY)}return!1}}},51:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(0),r=new(n(6).a)("EventListenerHook");function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!e)throw new Error("Requires ref of target element to add event listeners to.");Object(a.useEffect)(()=>{var n=e.current;if(n){for(var[a,o]of Object.entries(t))n.addEventListener(a.substring(2).toLowerCase(),o);return()=>{for(var[e,a]of Object.entries(t))n.removeEventListener(e.substring(2).toLowerCase(),a)}}r.warn("Found null element from ref for listened events: "+Object.keys(t).join(", ")+". There must be some mistake with the ref setup.")},[e,t])}},52:function(e,t,n){"use strict";n.d(t,"a",(function(){return f}));var a=n(0),r=n.n(a),o=n(1),c=n.n(o),i=n(40),s=n.n(i);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var u=Math.PI/2;function f(e){var{x:t,y:n,angle:a,length:o,maskProps:c}=e;return r.a.createElement(r.a.Fragment,null,r.a.createElement("circle",l({className:s.a.mask,cx:t-o*Math.cos(-a+u)*.7,cy:n-o*Math.sin(-a+u)*.7,r:o},c)))}f.propTypes={x:c.a.number,y:c.a.number,angle:c.a.number,length:c.a.number,maskProps:c.a.object},f.defaultProps={x:0,y:0,angle:0,length:10,maskProps:{}}},53:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var a=n(0),r=n.n(a),o=n(1),c=n.n(o),i=n(40),s=n.n(i);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}var u=Math.PI/6,f=Math.PI/2;function p(e){var{x:t,y:n,angle:a,length:o,childProps:c,maskProps:i}=e;return r.a.createElement(r.a.Fragment,null,r.a.createElement("path",l({className:s.a.decorative,d:"M ".concat(t-o*Math.sin(a-u))+" ".concat(n-o*Math.cos(a-u))+" L ".concat(t," ").concat(n)+" L ".concat(t-o*Math.sin(a+u))+" ".concat(n-o*Math.cos(a+u)),fill:"none"},c)),r.a.createElement("circle",l({className:s.a.mask,cx:t-o*Math.cos(-a+f)*.7,cy:n-o*Math.sin(-a+f)*.7,r:o},i)))}p.propTypes={x:c.a.number,y:c.a.number,angle:c.a.number,length:c.a.number,childProps:c.a.object,maskProps:c.a.object},p.defaultProps={x:0,y:0,angle:0,length:10,childProps:{},maskProps:{}}},56:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a=n(0),r=n.n(a),o=n(1),c=n.n(o),i=n(40),s=n.n(i);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function u(e){var{x:t,y:n,textDirection:o,invertText:c,label:i,childrenProps:u,maskProps:f}=e,p=Object(a.useRef)(null),v=i&&i.split("\n").reverse(),m=180*o/Math.PI,b=8,d=15;if(p.current){var h=p.current.getBBox();b=h.width/p.current.textContent.length,d=.8*h.height}var g=function(){for(var e,t,n,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,s=a.length,l=0,u=[],f=[],p=0;p<s;++p)n=a[p],e=n.length/2*r,t=(l+1)*o,0===p&&(u.push("".concat(-e-c,",").concat(o/2-t+i)),f.push("".concat(e+c,",").concat(o/2-t+i))),u.push("".concat(-e-c,",").concat(-t)),f.push("".concat(e+c,",").concat(-t)),++l;s>0&&(u.push("".concat(-e-c,",").concat(-t-o/2-i)),f.push("".concat(e+c,",").concat(-t-o/2-i)));return f.reverse(),u.join(" ")+" "+f.join(" ")}(v,b,d);return r.a.createElement("g",{transform:"translate(".concat(t," ").concat(n,") rotate(").concat(m,")")},r.a.createElement("polygon",l({className:s.a.mask,points:g},f)),v&&v.length>0&&v.map((e,t)=>r.a.createElement("text",l({key:"".concat(e,":").concat(t),className:s.a.decorative,ref:p,transform:"translate(0 ".concat((t+1)*-d,")")+(c?" scale(-1,-1)":""),alignmentBaseline:"central",textAnchor:"middle",style:{userSelect:"none"}},u),e)))}u.propTypes={x:c.a.number,y:c.a.number,textDirection:c.a.number,invertText:c.a.bool,label:c.a.string,childrenProps:c.a.object,maskProps:c.a.object},u.defaultProps={x:0,y:0,textDirection:0,invertText:!1,childrenProps:{},maskProps:{}};var f=n(52),p=n(53);function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function m(e){var t,n,a,{start:o,end:c,center:i,label:l,labelDirection:m,labelKeepUp:b,childProps:d,maskProps:h,labelProps:g,renderEndpoint:y,hidden:O}=e,x=o,j=c,P=i,k=!1,M=x.x-j.x,E=x.y-j.y,w=x.x-P.x,D=x.y-P.y,Y=Math.atan2(E,M),C=Math.atan2(D,w);if(Math.abs(Y-C)<=.01)n=Math.atan2(P.x-j.x,P.y-j.y)+Math.PI,t=Math.atan2(P.x-x.x,P.y-x.y)+Math.PI,a="L ".concat(j.x," ").concat(j.y);else{var S=(4*P.x-x.x-j.x)/2,X=(4*P.y-x.y-j.y)/2;n=Math.atan2(S-j.x,X-j.y)+Math.PI,t=Math.atan2(S-x.x,X-x.y)+Math.PI,a="Q ".concat(S," ").concat(X," ").concat(j.x," ").concat(j.y),b&&(k=X>P.y+4)}var B="M ".concat(x.x," ").concat(x.y," ").concat(a);return r.a.createElement("g",{style:{opacity:O?.1:1}},r.a.createElement("path",v({className:s.a.decorative,d:B,fill:"none"},d)),r.a.createElement("path",v({className:s.a.mask,d:B,style:{fill:"none"},strokeWidth:"".concat(8,"px")},h)),y?y(j,n,"forward"):r.a.createElement(p.a,{x:j.x,y:j.y,angle:n}),y?y(x,t,"backward"):r.a.createElement(f.a,{x:x.x,y:x.y,angle:t}),r.a.createElement(u,{x:P.x,y:P.y,label:l,textDirection:m,invertText:k,maskProps:g}))}m.propTypes={start:c.a.shape({x:c.a.number,y:c.a.number}),end:c.a.shape({x:c.a.number,y:c.a.number}),center:c.a.shape({x:c.a.number,y:c.a.number}),label:c.a.string,labelDirection:c.a.number,labelKeepUp:c.a.bool,childProps:c.a.object,maskProps:c.a.object,labelProps:c.a.object,renderEndpoint:c.a.func,hidden:c.a.bool},m.defaultProps={start:{x:0,y:0},end:{x:0,y:0},center:{x:0,y:0},labelDirection:0,labelKeepUp:!1,childProps:{},maskProps:{},labelProps:{},hidden:!1}},59:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n(0),r=n.n(a),o=n(1),c=n.n(o),i=n(40),s=n.n(i);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function u(e){var{x:t,y:n,radius:a,inner:o,label:c,childProps:i,maskProps:u}=e,f=c&&c.split("\n");return r.a.createElement(r.a.Fragment,null,r.a.createElement("circle",l({className:s.a.decorative,cx:t,cy:n,r:a},i)),o&&r.a.createElement("circle",{className:s.a.decorative,cx:t,cy:n,r:o}),f&&f.length>0&&f.map((e,a)=>{return r.a.createElement("text",{className:s.a.decorative,key:"".concat(e,":").concat(a),x:t,y:n+3,transform:"translate(0 ".concat(-15*a,")"),style:{fontSize:"".concat((o=e.length,1-Math.min(Math.max(o,0)/6,.5)),"em")},textAnchor:"middle"},e);var o}),r.a.createElement("circle",l({className:s.a.mask,cx:t,cy:n,r:a+4},u)))}u.propTypes={x:c.a.number,y:c.a.number,radius:c.a.number,inner:c.a.number,label:c.a.string,childProps:c.a.object,maskProps:c.a.object},u.defaultProps={x:0,y:0,radius:15,childProps:{},maskProps:{}}},61:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(0),r=n(51);function o(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=Object(a.useCallback)(e=>!t&&(void 0===o.useButton||o.useButton===e.button)&&n(e),[n,t,o.useButton]);Object(r.a)(e,{onMouseUp:c})}},64:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return p}));var a=n(25),r=n(51),o=n(43);function c(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};if(!e)throw new Error("Requires ref of target element to zoom.");var o={onWheel(e){if(e.preventDefault(),e.stopPropagation(),e.deltaY){var r=Math.max(.1,(.1*e.deltaY+100)/100),o=t*r;n(Math.min(a.maxScale||10,Math.max(a.minScale||.1,o)))}return!1}};Object(r.a)(e,o)}n(61);var i=n(50);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e){var{svgRef:t,pos:n}=Object(a.b)();!function(e,t,n){var a={onDblClick:e=>!t&&n(e)};Object(r.a)(e,a)}(t,!1,a=>{var[r,o]=Object(i.a)(t.current,a.clientX,a.clientY);e(r-n.x,o-n.y)})}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{svgRef:t,pos:n,setPos:i,scale:s,setScale:u}=Object(a.b)();Object(r.a)(t,{onMouseDown(e){e.target.focus()}});var f=Object(o.a)(t,n,i,l(l({},e),{},{preserveOffset:!0}));return c(t,s,u),f}},66:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(0),r=new(n(6).a)("AutoSaveService");function o(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},{debounceMillis:c=1e3,autosave:i=!0,autoload:s=!0}=o,[l,u]=Object(a.useState)(!1);Object(a.useEffect)(()=>{if(!l&&s){r.debug("Auto loading '".concat(e,"' data from localStorage..."));var a=localStorage.getItem(e);if(a)try{var o=JSON.parse(a);n(o)}catch(e){r.error("Failed to deserialize save data.",e)}u(!0)}else if(i){var f=!0,p=setTimeout(()=>{if(f){r.debug("Auto saving '".concat(e,"' data to localStorage..."));try{var n={};t(n),localStorage.setItem(e,JSON.stringify(n))}catch(e){r.error("Failed to serialize save data.",e)}}},c);return()=>{f=!1,clearTimeout(p)}}},[s,i,c,n,l,e,t])}}}]);