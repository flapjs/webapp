!function(e){var n={};function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)r.d(t,a,function(n){return e[n]}.bind(null,a));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/",r(r.s=3)}([function(e,n){e.exports=React},function(e,n,r){e.exports={appContainer:"src-components-app-__App.module__appContainer--3mRLq",toolbar:"src-components-app-__App.module__toolbar--2R2v5",appContent:"src-components-app-__App.module__appContent--ryHu5",appViewport:"src-components-app-__App.module__appViewport--15HNr",appDrawer:"src-components-app-__App.module__appDrawer--7ro73",drawerHandle:"src-components-app-__App.module__drawerHandle--1THpa",drawerContent:"src-components-app-__App.module__drawerContent--3TP8d"}},function(e,n){e.exports=ReactDOM},function(e,n,r){"use strict";r.r(n);var t=r(0),a=r.n(t),o=r(2),p=r.n(o);function c(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}var l="flapjs",u={debug:"#7F8C8D",log:"#2ECC71",warn:"#f39c12",error:"#c0392b"};function i(e){return["background: ".concat(u[e]),"border-radius: 0.5em","color: white","font-weight: bold","padding: 2px 0.5em"]}function s(e){for(var n,r=["%c".concat(l),i(e).join(";")],t=arguments.length,a=new Array(t>1?t-1:0),o=1;o<t;o++)a[o-1]=arguments[o];(n=console)[e].apply(n,r.concat(a))}var d=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,r,t;return n=e,t=[{key:"out",value:function(e,n){s("log","["+e+"] "+n)}},{key:"error",value:function(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;s("error","["+e+"] "+(r?r.message+" : ":"")+n)}}],(r=null)&&c(n.prototype,r),t&&c(n,t),e}(),f=r(1),m=r.n(f);var _,v=function(e){return a.a.createElement("div",{className:m.a.appContainer},a.a.createElement("div",{className:m.a.appContent},a.a.createElement("div",{className:m.a.appViewport}),a.a.createElement("div",{className:m.a.appDrawer},a.a.createElement("div",{className:m.a.drawerHandle},a.a.createElement("span",null,"||")),a.a.createElement("div",{className:m.a.drawerContent}))))};d.out("Main","Loading app in ".concat(NODE_ENV," environment...")),_=v,p.a.render(a.a.createElement(_),document.getElementById("root"))}]);