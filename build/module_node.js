(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{442:function(e,t,n){e.exports={container:"src-modules-node-graph-widgets-editor-__NodeGraphLabelEditor-module__container--fOtae"}},458:function(e,t,n){"use strict";n.r(t);var r=n(396),a=n(398),o=n(399),l=n(397),c=n(0),u=n.n(c),i=n(392),f=n(404),s=n(90),d=n(49),m=n(387),b=n(386);function y(e){var t=Object(c.useContext)(i.a).svgRef,n=Object(c.useContext)(m.d),r=Object(b.b)();return u.a.createElement(u.a.Fragment,null,u.a.createElement("header",null,u.a.createElement("h2",null,"Export")),u.a.createElement("section",null,u.a.createElement("ul",null,u.a.createElement("li",null,u.a.createElement("button",{onClick:function(){return p("graph",{graphState:r,graphType:n})}},"Save to File")),u.a.createElement("li",null,u.a.createElement("button",{onClick:function(){return p("image",{svgRef:t})}},"Export to Image")),u.a.createElement("li",null,u.a.createElement("button",{onClick:function(){return p("svg",{svgRef:t})}},"Export to SVG")))))}function p(e,t){switch(e){case"image":f.c("Untitled.png",f.a,t.svgRef.current,640,480);break;case"svg":f.c("Untitled.svg",f.b,t.svgRef.current,640,480);break;case"graph":f.d("Untitled.node.json",(n=t.graphType,r=t.graphState,n.serialize(r,{})))}var n,r}y.Tab=Object(s.a)(d.d);var v=n(424),g=n(2),h=n.n(g),O=n(437),j=n(426),E=n(393),w=n(384);function S(e){var t=Object(E.b)(w.a);return u.a.createElement(j.a,{hidden:t.length>0})}var x=n(385),I=n(427),C=n(115),k=n(414);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){R(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function R(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var D=u.a.createContext(null),_=u.a.createContext(null),N=Object(k.a)((function(e,t,n){return e&&u.a.createElement("rect",{x:Math.min(e.x,n.x),y:Math.min(e.y,n.y),width:Math.abs(n.x-e.x),height:Math.abs(n.y-e.y),fill:"rgba(0, 0, 0, 0.5)",stroke:"black"})})),F=N.ConnectorProvider,J=N.useConnectorFromBehavior;function z(e){return u.a.createElement(F,{onConnect:function(){}},u.a.createElement(M,null,e.children))}function M(e){var t=A(Object(C.a)(U,{elementIds:new Set}),2),n=t[0],r=t[1],a=Object(b.c)(),o=Object(b.b)(),l=Object(c.useContext)(i.a),f=l.svgRef,s=l.pos,d=Object(c.useRef)({x:0,y:0});return J(f,d.current,{useButton:2,onDragBegin:function(e,t){return d.current.x=e-s.x,d.current.y=t-s.y,!0},onDragMove:function(e,t){var n=e-s.x,l=t-s.y,c=a.findElementsWithinBox(o,w.a,d.current.x,d.current.y,n,l);return r({type:"only",elementIds:c.map((function(e){return e.id}))}),[n,l]}}),u.a.createElement(D.Provider,{value:n},u.a.createElement(_.Provider,{value:r},e.children))}function U(e,t){switch(t.type){case"only":var n=T({},e);n.elementIds.clear();var r=!0,a=!1,o=void 0;try{for(var l,c=t.elementIds[Symbol.iterator]();!(r=(l=c.next()).done);r=!0){var u=l.value;n.elementIds.add(u)}}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n;case"add":var i=T({},e);return i.elementIds.add(t.elementId),i;case"addAll":var f=T({},e),s=!0,d=!1,m=void 0;try{for(var b,y=t.elementIds[Symbol.iterator]();!(s=(b=y.next()).done);s=!0){var p=b.value;f.elementIds.add(p)}}catch(e){d=!0,m=e}finally{try{s||null==y.return||y.return()}finally{if(d)throw m}}return f;case"remove":var v=T({},e);return v.elementIds.delete(t.elementId),v;case"removeAll":var g=T({},e),h=!0,O=!1,j=void 0;try{for(var E,w=t.elementIds[Symbol.iterator]();!(h=(E=w.next()).done);h=!0){var S=E.value;g.elementIds.delete(S)}}catch(e){O=!0,j=e}finally{try{h||null==w.return||w.return()}finally{if(O)throw j}}return g;case"toggle":var x=T({},e);return x.elementIds.has(t.elementId)?x.elementIds.delete(t.elementId):x.elementIds.add(t.elementId),x;case"clear":var I=T({},e);return I.elementIds.clear(),I}}z.propTypes={children:h.a.node},M.propTypes={children:h.a.node};var B=n(415);var G=n(428);function q(e){var t=e.element,n=Object(c.useRef)(null);Object(G.a)(n,t);var r=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=Object(c.useContext)(D),a=Object(c.useContext)(_);return Object(B.a)(e,!1,(function(){a({type:"toggle",elementId:t})}),n),r.elementIds.has(t)}(n,t.id,{useButton:0});return u.a.createElement(u.a.Fragment,null,u.a.createElement(I.a,{x:t.x,y:t.y,label:t.label,childProps:{style:{outline:r?"0.1rem dashed gray":"none"}},maskProps:{ref:n}}),e.children)}q.propTypes={children:h.a.node,element:h.a.object.isRequired};var V=n(394),W=n(417),K=n(408),L=n(407),H=n(402),Q=n(430);function X(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function Y(e){var t=e.element,n=Object(c.useRef)(null),r=Object(c.useRef)(null),a=Object(c.useRef)(null),o=Object(V.a)(),l=Object(E.a)(w.a,t.fromId,o),i=Object(E.a)(w.a,t.toId,o),f=H.f(l,i,t),s=H.d(l,i,t),d=H.c(l,i,t),m=H.e(l,i,t),b=X(Object(Q.a)(n,r,a,t,l,i,f,d,s),2)[1];return u.a.createElement(u.a.Fragment,null,u.a.createElement(W.a,{start:f,end:s,center:d,label:t.label,labelDirection:m,labelKeepUp:!0,maskProps:{ref:n},labelProps:{ref:r},hidden:b,renderEndpoint:function(e,t,n){return"forward"===n?u.a.createElement(K.a,{x:e.x,y:e.y,angle:t,maskProps:{ref:a}}):u.a.createElement(L.a,{x:e.x,y:e.y,angle:t,maskProps:{style:{pointerEvents:"none"}}})}}),e.children)}Y.propTypes={children:h.a.node,element:h.a.object.isRequired};var Z=n(410),$=n(436),ee=n(431);function te(e){var t=Object(ee.a)(),n=t.createNode,r=t.createEdge;return Object($.b)({useButton:0}),Object($.a)((function(e,t){return n({x:e,y:t})})),u.a.createElement(u.a.Fragment,null,u.a.createElement(z,null,u.a.createElement(Z.a,{onConnect:function(e,t,n,a){if(a.prevEdge){var o=a.prevEdge;o.fromId=e.id,o.toId=t.id,o.markDirty()}else r(e,t)},onCancel:function(e,t,n,r){if(r.prevEdge){var a=r.prevEdge;a.toId=0,H.b(null,e,n,a),a.markDirty()}}},u.a.createElement(S,null),u.a.createElement(O.a,{elementType:w.a},(function(e){return u.a.createElement(q,{element:e})})),u.a.createElement(O.a,{elementType:x.a},(function(e){return u.a.createElement(Y,{element:e})})),e.children)))}te.propTypes={children:h.a.node};var ne=n(442),re=n.n(ne),ae=n(400),oe=n(416),le=n(395);function ce(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function ue(e){var t=Object(c.useContext)(ae.a),n=t.elementType,r=t.elementId,a=t.closeEditor,o=Object(c.useContext)(m.a),l=Object(V.a)(),i=Object(E.a)(n,r,l),f=Object(c.useRef)(null),s=ce(Object(c.useState)(""),2),d=s[0],b=s[1];return u.a.createElement(oe.a,{className:re.a.container,onOpen:function(){f.current.focus(),b(i.label||"")}},u.a.createElement("textarea",{ref:f,value:d,onChange:function(e){return b(e.target.value)}}),u.a.createElement(le.a,{onClick:function(){i.label=d,i.markDirty(),a()}},"Submit"),u.a.createElement(le.a,{onClick:function(){o({type:"delete",elementType:n,elementId:r}),a()}},"Delete This"))}var ie=n(409),fe=n(432),se=n(433),de=n(434),me=n(12);function be(e){var t=Object(b.c)(),n=Object(b.a)(),r=Object(c.useContext)(i.a).svgRef,a=Object(b.b)();Object(de.a)(t,(function(){return JSON.stringify(t.serialize(a,{}))}));var o=Object(c.useCallback)((function(e){var r=JSON.parse(e),a=t.deserialize(r,{});n({type:"resetState",state:a})}),[n,t]);return Object(c.useEffect)((function(){me.a.debug("Toolbar","Performing autosave...");var e=JSON.stringify(t.serialize(a,{}));localStorage.setItem(t.name+".graphData",e)})),u.a.createElement(u.a.Fragment,null,u.a.createElement("fieldset",null,u.a.createElement(se.b,{source:t,update:o}),u.a.createElement(se.a,{source:t,update:o})),u.a.createElement("fieldset",null,u.a.createElement("button",{onClick:function(){return n("clearAll")}},"Clear Graph"),u.a.createElement("button",{onClick:function(){f.c("Untitled.png",f.a,r.current,640,480)}},"Export Image")),u.a.createElement("fieldset",null,u.a.createElement("button",{onClick:function(){var e=t.serialize(a,{});f.d("Untitled.node.json",JSON.stringify(e))}},"Save To File"),u.a.createElement(ie.a,{onUpload:function(e){var r=Object(fe.a)(e).then((function(e){return t.deserialize(JSON.parse(e))}));n({type:"resetState",state:r})}})))}function ye(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],r=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function pe(){var e=Object(c.useContext)(m.d),t=Object(c.useContext)(m.a),n=ye(Object(c.useState)(!1),2),r=n[0],a=n[1];return Object(c.useEffect)((function(){if(!r){var n=JSON.parse(localStorage.getItem(e.name+".graphData")),o=e.deserialize(n,{});t({type:"resetState",state:o}),a(!0)}}),[r,e,t]),u.a.createElement(u.a.Fragment,null)}function ve(){var e=Object(b.c)(),t=Object(b.b)();return Object(c.useEffect)((function(){var n=!0,r=e.name+".graphData",a=setInterval((function(){if(n){var a=e.serialize(t,{});localStorage.setItem(r,JSON.stringify(a))}}),3e3);return function(){n=!1,clearInterval(a)}})),u.a.createElement(u.a.Fragment,null)}function ge(e){return(ge="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function he(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Oe(e,t){return!t||"object"!==ge(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function je(e){return(je=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Ee(e,t){return(Ee=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.d(t,"default",(function(){return we}));var we=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),Oe(this,je(t).apply(this,arguments))}var n,r,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Ee(e,t)}(t,e),n=t,c=[{key:"moduleId",get:function(){return"node"}},{key:"moduleVersion",get:function(){return"2.0.0"}},{key:"services",get:function(){return[l.a,o.a.withInitialMessages(["Welcome to Node Module!","I hope you have a wonderful time.","I really do.","Seriously."]),a.a.withGraphType(v.a,te,ue)]}},{key:"renders",get:function(){return{header:[pe,ve],appbar:[be],drawer:[y]}}}],(r=null)&&he(n.prototype,r),c&&he(n,c),t}(r.a)}}]);