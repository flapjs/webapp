(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{109:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return Je}));var a=r(23),n=r(47),l=r(48),c=r(43),o=r(0),s=r.n(o),i=r(36),u=r(44),d=r(13),m=r(5),f=r(29),b=r(28);function g(e,t){return JSON.stringify(e.serialize(t,{}))}$RefreshReg$(g,"NodeGraphExporter");var p,v=$RefreshSig$();function h(e){v();var{svgRef:t}=Object(o.useContext)(i.a),r=Object(o.useContext)(f.d),a=Object(b.b)();return s.a.createElement(s.a.Fragment,null,s.a.createElement("header",null,s.a.createElement("h2",null,"Export")),s.a.createElement("section",null,s.a.createElement("ul",null,s.a.createElement("li",null,s.a.createElement("button",{onClick:()=>O("graph",{graphState:a,graphType:r})},"Save to File")),s.a.createElement("li",null,s.a.createElement("button",{onClick:()=>O("image",{svgRef:t})},"Export to Image")),s.a.createElement("li",null,s.a.createElement("button",{onClick:()=>O("svg",{svgRef:t})},"Export to SVG")))))}function O(e,t){switch(e){case"image":u.c("Untitled.png",u.a,t.svgRef.current,640,480);break;case"svg":u.c("Untitled.svg",u.b,t.svgRef.current,640,480);break;case"graph":u.d("Untitled.node.json",g(t.graphType,t.graphState))}}v(h,"vwMyWdYMJ3ZcPrMJumZ+tQ1P3p4=",!1,(function(){return[b.b]})),p=h,h.Tab=Object(d.a)(m.d),$RefreshReg$(p,"ExportPanel");var E=r(73),y=r(1),j=r.n(y),R=r(89),$=r(75),x=r(37),I=r(26),S=$RefreshSig$();function w(e){S();var t=Object(x.b)(I.a);return s.a.createElement($.a,{hidden:t.length>0})}S(w,"uWKL/aVDv80+fY1lq6chjuE0N4M=",!1,(function(){return[x.b]})),$RefreshReg$(w,"FiniteAutomataTooltip");var C=r(27),k=r(76),P=r(14),N=r(61),T=$RefreshSig$();function J(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?J(Object(r),!0).forEach((function(t){M(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):J(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function M(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var F,G,z,A=s.a.createContext(null),B=s.a.createContext(null),{ConnectorProvider:U,useConnectorFromBehavior:q}=Object(N.a)((e,t,r)=>e&&s.a.createElement("rect",{x:Math.min(e.x,r.x),y:Math.min(e.y,r.y),width:Math.abs(r.x-e.x),height:Math.abs(r.y-e.y),fill:"rgba(0, 0, 0, 0.5)",stroke:"black"}));function L(e){return s.a.createElement(U,{onConnect:()=>{}},s.a.createElement(K,null,e.children))}function K(e){T();var[t,r]=Object(P.a)(X,{elementIds:new Set}),a=Object(b.c)(),n=Object(b.b)(),{svgRef:l,pos:c}=Object(o.useContext)(i.a),u=Object(o.useRef)({x:0,y:0});return q(l,u.current,{useButton:2,onDragBegin:(e,t)=>(u.current.x=e-c.x,u.current.y=t-c.y,!0),onDragMove:(e,t)=>{var l=e-c.x,o=t-c.y,s=a.findElementsWithinBox(n,I.a,u.current.x,u.current.y,l,o);return r({type:"only",elementIds:s.map(e=>e.id)}),[l,o]}}),s.a.createElement(A.Provider,{value:t},s.a.createElement(B.Provider,{value:r},e.children))}function X(e,t){switch(t.type){case"only":var r=D({},e);for(var a of(r.elementIds.clear(),t.elementIds))r.elementIds.add(a);return r;case"add":var n=D({},e);return n.elementIds.add(t.elementId),n;case"addAll":var l=D({},e);for(var c of t.elementIds)l.elementIds.add(c);return l;case"remove":var o=D({},e);return o.elementIds.delete(t.elementId),o;case"removeAll":var s=D({},e);for(var i of t.elementIds)s.elementIds.delete(i);return s;case"toggle":var u=D({},e);return u.elementIds.has(t.elementId)?u.elementIds.delete(t.elementId):u.elementIds.add(t.elementId),u;case"clear":var d=D({},e);return d.elementIds.clear(),d}}F=L,L.propTypes={children:j.a.node},T(K,"GL9ZHKadho7uw1FOftvbTA+QEAo=",!1,(function(){return[P.a,b.c,b.b,q]})),G=K,K.propTypes={children:j.a.node},z=X,$RefreshReg$(F,"SelectionBoxProvider"),$RefreshReg$(G,"SelectionBoxStateProvider"),$RefreshReg$(z,"SelectionBoxReducer");var Y=r(62),W=$RefreshSig$();function Z(e,t){W();var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=Object(o.useContext)(A),n=Object(o.useContext)(B);return Object(Y.a)(e,!1,()=>{n({type:"toggle",elementId:t})},r),a.elementIds.has(t)}W(Z,"h69ZzS3wJe+iuwJq5siwnr8FCdw=",!1,(function(){return[Y.a]}));var H,V=r(77),_=$RefreshSig$();function Q(e){_();var{element:t}=e,r=Object(o.useRef)(null);Object(V.a)(r,t);var a=Z(r,t.id,{useButton:0});return s.a.createElement(s.a.Fragment,null,s.a.createElement(k.a,{x:t.x,y:t.y,label:t.label,childProps:{style:{outline:a?"0.1rem dashed gray":"none"}},maskProps:{ref:r}}),e.children)}_(Q,"vMYgJoblxD1X/zcNlGWIEwq+/rw=",!1,(function(){return[V.a,Z]})),H=Q,Q.propTypes={children:j.a.node,element:j.a.object.isRequired},$RefreshReg$(H,"NodeElementComponent");var ee,te=r(38),re=r(66),ae=r(56),ne=r(55),le=r(46),ce=r(79),oe=$RefreshSig$();function se(e){oe();var{element:t}=e,r=Object(o.useRef)(null),a=Object(o.useRef)(null),n=Object(o.useRef)(null),l=Object(te.a)(),c=Object(x.a)(I.a,t.fromId,l),i=Object(x.a)(I.a,t.toId,l),u=le.f(c,i,t),d=le.d(c,i,t),m=le.c(c,i,t),f=le.e(c,i,t),[,b]=Object(ce.a)(r,a,n,t,c,i,u,m,d);return s.a.createElement(s.a.Fragment,null,s.a.createElement(re.a,{start:u,end:d,center:m,label:t.label,labelDirection:f,labelKeepUp:!0,maskProps:{ref:r},labelProps:{ref:a},hidden:b,renderEndpoint:(e,t,r)=>"forward"===r?s.a.createElement(ae.a,{x:e.x,y:e.y,angle:t,maskProps:{ref:n}}):s.a.createElement(ne.a,{x:e.x,y:e.y,angle:t,maskProps:{style:{pointerEvents:"none"}}})}),e.children)}oe(se,"fBS/0Js8dP0HKVm21KJxRs9T4Ss=",!1,(function(){return[te.a,x.a,x.a,ce.a]})),ee=se,se.propTypes={children:j.a.node,element:j.a.object.isRequired},$RefreshReg$(ee,"EdgeElementComponent");var ie,ue=r(57),de=r(88),me=r(80),fe=$RefreshSig$();function be(e){fe();var{createNode:t,createEdge:r}=Object(me.a)();return Object(de.b)({useButton:0}),Object(de.a)((e,r)=>t({x:e,y:r})),s.a.createElement(s.a.Fragment,null,s.a.createElement(L,null,s.a.createElement(ue.a,{onConnect:(e,t,a,n)=>{if(n.prevEdge){var l=n.prevEdge;l.fromId=e.id,l.toId=t.id,l.markDirty()}else r(e,t)},onCancel:(e,t,r,a)=>{if(a.prevEdge){var n=a.prevEdge;n.toId=0,le.b(null,e,r,n),n.markDirty()}}},s.a.createElement(w,null),s.a.createElement(R.a,{elementType:I.a},e=>s.a.createElement(Q,{element:e})),s.a.createElement(R.a,{elementType:C.a},e=>s.a.createElement(se,{element:e})),e.children)))}fe(be,"+Zfl8pX+rYI/g1EH6Am6M4tMa58=",!1,(function(){return[me.a,de.b,de.a]})),ie=be,be.propTypes={children:j.a.node},$RefreshReg$(ie,"NodeGraphPlayground");var ge=r(94),pe=r.n(ge),ve=r(42),he=r(65),Oe=r(30),Ee=$RefreshSig$();function ye(e){Ee();var{elementType:t,elementId:r,closeEditor:a}=Object(o.useContext)(ve.a),n=Object(o.useContext)(f.a),l=Object(te.a)(),c=Object(x.a)(t,r,l),i=Object(o.useRef)(null),[u,d]=Object(o.useState)("");return s.a.createElement(he.a,{className:pe.a.container,onOpen:()=>{i.current.focus(),d(c.label||"")}},s.a.createElement("textarea",{ref:i,value:u,onChange:e=>d(e.target.value)}),s.a.createElement(Oe.a,{onClick:()=>{c.label=u,c.markDirty(),a()}},"Submit"),s.a.createElement(Oe.a,{onClick:()=>{n({type:"delete",elementType:t,elementId:r}),a()}},"Delete This"))}Ee(ye,"r6TygkkNJfJucbwL0ROpXpsXiGk=",!1,(function(){return[te.a,x.a]})),$RefreshReg$(ye,"NodeGraphLabelEditor");var je=r(50),Re=r(81),$e=r(82),xe=r(83),Ie=r(6),Se=$RefreshSig$(),we=new Ie.a("NodeToolbar");function Ce(e){Se();var t=Object(b.c)(),r=Object(b.a)(),{svgRef:a}=Object(o.useContext)(i.a),n=Object(b.b)();Object(xe.a)(t,()=>JSON.stringify(t.serialize(n,{})));var l=Object(o.useCallback)(e=>{var a=JSON.parse(e),n=t.deserialize(a,{});r({type:"resetState",state:n})},[r,t]);return Object(o.useEffect)(()=>{we.debug("Performing autosave...");var e=JSON.stringify(t.serialize(n,{}));localStorage.setItem(t.name+".graphData",e)}),s.a.createElement(s.a.Fragment,null,s.a.createElement("fieldset",null,s.a.createElement($e.b,{source:t,update:l}),s.a.createElement($e.a,{source:t,update:l})),s.a.createElement("fieldset",null,s.a.createElement("button",{onClick:()=>r("clearAll")},"Clear Graph"),s.a.createElement("button",{onClick:()=>{u.c("Untitled.png",u.a,a.current,640,480)}},"Export Image")),s.a.createElement("fieldset",null,s.a.createElement("button",{onClick:()=>{var e=t.serialize(n,{});u.d("Untitled.node.json",JSON.stringify(e))}},"Save To File"),s.a.createElement(je.a,{onUpload:e=>{var a=Object(Re.a)(e).then(e=>t.deserialize(JSON.parse(e)));r({type:"resetState",state:a})}})))}Se(Ce,"nK1f16j4jX8NMelSOiAN5MjytlQ=",!1,(function(){return[b.c,b.a,b.b,xe.a]})),$RefreshReg$(Ce,"NodeToolbar");var ke=$RefreshSig$();function Pe(){ke();var e=Object(o.useContext)(f.d),t=Object(o.useContext)(f.a),[r,a]=Object(o.useState)(!1);return Object(o.useEffect)(()=>{if(!r){var n=JSON.parse(localStorage.getItem(e.name+".graphData")),l=e.deserialize(n,{});t({type:"resetState",state:l}),a(!0)}},[r,e,t]),s.a.createElement(s.a.Fragment,null)}ke(Pe,"dCwIT+Yc0/7oJeh/Ffxmn1RfO1U="),$RefreshReg$(Pe,"AutoInit");var Ne=$RefreshSig$();function Te(){Ne();var e=Object(b.c)(),t=Object(b.b)();return Object(o.useEffect)(()=>{var r=!0,a=e.name+".graphData",n=setInterval(()=>{if(r){var n=e.serialize(t,{});localStorage.setItem(a,JSON.stringify(n))}},3e3);return()=>{r=!1,clearInterval(n)}}),s.a.createElement(s.a.Fragment,null)}Ne(Te,"JTnwXmsbl1HNL110q1qLulYGzGo=",!1,(function(){return[b.c,b.b]})),$RefreshReg$(Te,"AutoInit");class Je extends a.a{static get moduleId(){return"node"}static get moduleVersion(){return"2.0.0"}static get services(){return[c.a,l.a.withInitialMessages(["Welcome to Node Module!","I hope you have a wonderful time.","I really do.","Seriously."]),n.a.withGraphType(E.a,be,ye)]}static get renders(){return{header:[Pe,Te],appbar:[Ce],drawer:[h]}}}},94:function(e,t,r){e.exports={container:"src-modules-node-graph-widgets-editor-__NodeGraphLabelEditor-module__container--fOtae"}}}]);