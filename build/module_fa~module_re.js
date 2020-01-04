(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{426:function(t,e,r){"use strict";var n=r(38),a=r(139);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function h(t,e,r){return e&&s(t.prototype,e),r&&s(t,r),t}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var c=function(t){function e(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(t=o(this,l(e).call(this))).machineControllerClass=null,t.machineController=null,t.machineValidatorClass=null,t.machineValidator=null,t._graphService=null,t._onGraphControllerChange=null,t._onInputControllerChange=null,t._onViewControllerChange=null,t._onMachineControllerChange=null,t}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(e,t),h(e,null,[{key:"SERVICE_KEY",get:function(){return"machineService"}}]),h(e,[{key:"setMachineControllerClass",value:function(t){return this.machineControllerClass=t,this}},{key:"setMachineValidatorClass",value:function(t){return this.machineValidatorClass=t,this}},{key:"enableGraphServiceFeatures",value:function(t){return this._graphService=t,this}},{key:"onServiceLoad",value:function(t){t.machineController=this.machineController,t.machineValidator=this.machineValidator}},{key:"onServiceMount",value:function(t){this._onMachineControllerChange=this.onMachineControllerChange.bind(this,t),this.machineController&&t.state.machineController.getChangeHandler().addChangeListener(this._onMachineControllerChange)}},{key:"onServiceUnmount",value:function(t){this.machineController&&t.state.machineController.getChangeHandler().removeChangeListener(this._onMachineControllerChange),this._onMachineControllerChange=null}},{key:"onServiceUnload",value:function(t){delete t.machineController,delete t.machineValidator}},{key:"onSessionLoad",value:function(t){this.machineControllerClass&&(this.machineController=new this.machineControllerClass,this.machineController.setSession(t),this._graphService&&this.machineController.setGraphController(this._graphService.graphController)),this.machineValidatorClass&&(this.machineValidator=new this.machineValidatorClass,this.machineValidator.setGraphController(this._graphService.graphController),this.machineValidator.setMachineController(this.machineController),this.machineValidator.setSession(t)),this.machineController&&this.machineController.initialize(),t.machineController=this.machineController,t.machineValidator=this.machineValidator}},{key:"onSessionUnload",value:function(t){this.machineController&&this.machineController.terminate(),delete t.machineController,delete t.machineValidator}},{key:"onMachineControllerChange",value:function(t,e,r){t.setState({machineHash:r}),this.machineValidator&&this.machineValidator.validate(e)}}]),e}(n.a);c.INSTANCE=new c,c.CONTEXT=Object(a.a)("MachineService",c.INSTANCE),e.a=c},427:function(t,e,r){"use strict";r.d(e,"a",(function(){return h})),r.d(e,"b",(function(){return u}));var n=r(9);function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var r=[],n=!0,a=!1,i=void 0;try{for(var o,l=t[Symbol.iterator]();!(n=(o=l.next()).done)&&(r.push(o.value),!e||r.length!==e);n=!0);}catch(t){a=!0,i=t}finally{try{n||null==l.return||l.return()}finally{if(a)throw i}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e,r){return e&&l(t.prototype,e),r&&l(t,r),t}var h="&empty",u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;o(this,t),this._label=e,this._src=r,this._id=r&&"function"==typeof r.getGraphElementID?r.getGraphElementID():Object(n.c)()}return s(t,[{key:"copy",value:function(){var e=new t;return e._label=this._label,e._src=this._src,e._id=this._id,e}},{key:"getStateLabel",value:function(){return this._label}},{key:"getStateID",value:function(){return this._id}},{key:"getSource",value:function(){return this._src}},{key:"getHashString",value:function(){return this._id}}]),t}(),c=function(){function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];o(this,t),this._from=e,this._to=r,this._symbols=n}return s(t,[{key:"copy",value:function(){var e=new t;return e._from=this._from,e._to=this._to,e._symbols=this._symbols.slice(),e}},{key:"getSourceState",value:function(){return this._from}},{key:"getDestinationState",value:function(){return this._to}},{key:"addSymbol",value:function(t){this._symbols.push(t)}},{key:"hasSymbol",value:function(t){return this._symbols.includes(t)}},{key:"getSymbols",value:function(){return this._symbols}},{key:"getHashString",value:function(){return this._from.getHashString()+":"+this._symbols.join(",")+":"+this._to.getHashString()}}]),t}(),f=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];o(this,t),this._states=new Map,this._alphabet=new Map,this._transitions=new Map,this._finalStates=new Set,this._customSymbols=new Set,this._startState=null,this._deterministic=e,this._errors=[]}return s(t,[{key:"copy",value:function(t){if(t!==this){this.clear();var e=!0,r=!1,n=void 0;try{for(var a,o=t._states.entries()[Symbol.iterator]();!(e=(a=o.next()).done);e=!0){var l=i(a.value,2),s=l[0],h=l[1],u=h.copy();this._states.set(s,u),t.isStartState(h)&&(this._startState=u),t.isFinalState(h)&&this._finalStates.add(u)}}catch(t){r=!0,n=t}finally{try{e||null==o.return||o.return()}finally{if(r)throw n}}var c=!0,f=!1,y=void 0;try{for(var v,m=t._alphabet.entries()[Symbol.iterator]();!(c=(v=m.next()).done);c=!0){var _=i(v.value,2),d=_[0],g=_[1];this._alphabet.set(d,g)}}catch(t){f=!0,y=t}finally{try{c||null==m.return||m.return()}finally{if(f)throw y}}var b=!0,S=!1,p=void 0;try{for(var C,w=t._transitions.entries()[Symbol.iterator]();!(b=(C=w.next()).done);b=!0){var k=i(C.value,2),D=k[0],O=k[1],I=O.copy();I._from=this._states.get(O.getSourceState().getStateID()),I._to=this._states.get(O.getDestinationState().getStateID()),this._transitions.set(D,I)}}catch(t){S=!0,p=t}finally{try{b||null==w.return||w.return()}finally{if(S)throw p}}var E=!0,x=!1,T=void 0;try{for(var j,M=t._customSymbols[Symbol.iterator]();!(E=(j=M.next()).done);E=!0){var V=j.value;this._customSymbols.add(V)}}catch(t){x=!0,T=t}finally{try{E||null==M.return||M.return()}finally{if(x)throw T}}this._deterministic=t._deterministic;var H=!0,G=!1,L=void 0;try{for(var P,A=t._errors[Symbol.iterator]();!(H=(P=A.next()).done);H=!0){var B=P.value;this._errors.push(B)}}catch(t){G=!0,L=t}finally{try{H||null==A.return||A.return()}finally{if(G)throw L}}}}},{key:"clear",value:function(){this._states.clear(),this._alphabet.clear(),this._transitions.clear(),this._finalStates.clear(),this._customSymbols.clear(),this._startState=null,this._errors.length=0}},{key:"setDeterministic",value:function(t){this._deterministic=t}},{key:"isDeterministic",value:function(){return this._deterministic}},{key:"validate",value:function(){if(this._errors.length=0,this._deterministic){var t=new Map,e=!0,r=!1,n=void 0;try{for(var a,i=this._alphabet.keys()[Symbol.iterator]();!(e=(a=i.next()).done);e=!0){var o=a.value;t.set(o,!1)}}catch(t){r=!0,n=t}finally{try{e||null==i.return||i.return()}finally{if(r)throw n}}var l=!0,s=!1,h=void 0;try{for(var u,c=this._states.values()[Symbol.iterator]();!(l=(u=c.next()).done);l=!0){var f=u.value,y=this.getOutgoingTransitions(f),v=!0,m=!1,_=void 0;try{for(var d,g=y[Symbol.iterator]();!(v=(d=g.next()).done);v=!0){var b=d.value[1];if(t.get(b))return this._errors.push("duplicate symbol: "+b),!1;t.set(b,!0)}}catch(t){m=!0,_=t}finally{try{v||null==g.return||g.return()}finally{if(m)throw _}}var S=!0,p=!1,C=void 0;try{for(var w,k=t.keys()[Symbol.iterator]();!(S=(w=k.next()).done);S=!0){var D=w.value;if(!t.get(D))return this._errors.push("missing symbol: "+D),!1;t.set(D,!1)}}catch(t){p=!0,C=t}finally{try{S||null==k.return||k.return()}finally{if(p)throw C}}}}catch(t){s=!0,h=t}finally{try{l||null==c.return||c.return()}finally{if(s)throw h}}return this._errors.length=0,!0}return this._errors.length=0,!0}},{key:"isValid",value:function(){return 0==this._errors.length}},{key:"getErrors",value:function(){return this._errors}},{key:"createState",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return this.addState(new u(t))}},{key:"addState",value:function(t){var e=t.getStateID();if(this._states.has(e))throw new Error("Already added state with id '"+e+"'");return this._states.size<=0&&(this._startState=t),this._states.set(e,t),t}},{key:"removeState",value:function(t){var e=t.getStateID();return!!this._states.has(e)&&(this._states.delete(e),this._startState===t&&(this._states.size<=0?this._startState=null:this._startState=this._states.values().next().value),!0)}},{key:"hasStateWithLabel",value:function(t){var e=!0,r=!1,n=void 0;try{for(var a,i=this._states.values()[Symbol.iterator]();!(e=(a=i.next()).done);e=!0){if(a.value.getStateLabel()==t)return!0}}catch(t){r=!0,n=t}finally{try{e||null==i.return||i.return()}finally{if(r)throw n}}return!1}},{key:"getStatesByLabel",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=!0,n=!1,a=void 0;try{for(var i,o=this._states.values()[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var l=i.value;l.getStateLabel()==t&&e.push(l)}}catch(t){n=!0,a=t}finally{try{r||null==o.return||o.return()}finally{if(n)throw a}}return e}},{key:"getStateByID",value:function(t){return this._states.get(t)}},{key:"hasState",value:function(t){return this._states.has(t.getStateID())}},{key:"getStates",value:function(){return this._states.values()}},{key:"getStateCount",value:function(){return this._states.size}},{key:"addTransition",value:function(t,e,r){if(!this.hasState(t))throw new Error("Trying to add a transition to unknown state with label '"+t.getStateLabel()+"'");if(!this.hasState(e))throw new Error("Trying to add a transition to unknown state with label '"+e.getStateLabel()+"'");if(!r)throw new Error("Cannot add transition for null symbol - use the empty symbol instead");var n=t.getStateID()+"->"+e.getStateID();if(this._transitions.has(n)){var a=this._transitions.get(n);if(a.hasSymbol(r))return!1;a.addSymbol(r)}else this._transitions.set(n,new c(t,e,[r]));return this._incrSymbolCount(r),!0}},{key:"removeTransition",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=t.getStateID()+"->"+e.getStateID();if(!this._transitions.has(n))return!1;var a=this._transitions.get(n),i=a.getSymbols();if(r){var o=i.indexOf(r);return o>=0&&(this._decrSymbolCount(r),i.splice(o,1),i.length<=0&&this._transitions.delete(n),!0)}var l=!0,s=!1,h=void 0;try{for(var u,c=i[Symbol.iterator]();!(l=(u=c.next()).done);l=!0){var f=u.value;this._decrSymbolCount(f)}}catch(t){s=!0,h=t}finally{try{l||null==c.return||c.return()}finally{if(s)throw h}}return this._transitions.delete(n),!0}},{key:"hasTransition",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=t.getStateID()+"->"+e.getStateID();return!!this._transitions.has(n)&&(!r||this._transitions.get(n).hasSymbol(r))}},{key:"getTransitionSymbols",value:function(t,e){var r=t.getStateID()+"->"+e.getStateID();return this._transitions.has(r)?this._transitions.get(r).getSymbols():null}},{key:"getTransitions",value:function(){return this._transitions.values()}},{key:"_incrSymbolCount",value:function(t){if(t!==h){var e=this._alphabet.get(t)||0;this._alphabet.set(t,e+1)}}},{key:"_decrSymbolCount",value:function(t){if(!this._alphabet.has(t))throw new Error("Unable to find valid transition symbol in alphabet");if(t!==h){var e=this._alphabet.get(t);e<=1?this.isCustomSymbol(t)?this._alphabet.set(t,0):this._alphabet.delete(t):this._alphabet.set(t,e-1)}}},{key:"changeSymbol",value:function(t,e){if(t===h)throw new Error("Cannot change the empty symbol");if(e===h)throw new Error("Cannot change to the empty symbol");if(this._alphabet.has(e))throw new Error("Cannot change symbol to another existing symbol");var r=!0,n=!1,a=void 0;try{for(var i,o=this._transitions.values()[Symbol.iterator]();!(r=(i=o.next()).done);r=!0){var l=i.value.getSymbols(),s=l.indexOf(t);s>=0&&(l[s]=e)}}catch(t){n=!0,a=t}finally{try{r||null==o.return||o.return()}finally{if(n)throw a}}var u=this._alphabet.get(t);this._alphabet.set(e,u),this._alphabet.delete(t),this._customSymbols.has(t)&&(this._customSymbols.delete(t),this._customSymbols.add(e))}},{key:"removeSymbol",value:function(t){var e=[],r=!0,n=!1,a=void 0;try{for(var o,l=this._transitions.entries()[Symbol.iterator]();!(r=(o=l.next()).done);r=!0){var s=i(o.value,2),u=s[0],c=s[1].getSymbols(),f=c.indexOf(t);f>=0&&(c.splice(f,1),c.length<=0&&e.push(u))}}catch(t){n=!0,a=t}finally{try{r||null==l.return||l.return()}finally{if(n)throw a}}for(var y=0,v=e;y<v.length;y++){var m=v[y];this._transitions.delete(m)}t!==h&&(this._customSymbols.has(t)?this._alphabet.set(t,0):this._alphabet.delete(t))}},{key:"setCustomSymbol",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(t===h)throw new Error("Cannot change the empty symbol as a custom symbol");e?this._customSymbols.has(t)||(this._customSymbols.add(t),this._alphabet.has(t)||this._alphabet.set(t,0)):this._customSymbols.has(t)&&(this._customSymbols.delete(t),this._alphabet.has(t)&&this._alphabet.get(t)<=0&&this._alphabet.delete(t))}},{key:"isCustomSymbol",value:function(t){return this._customSymbols.has(t)}},{key:"getCustomSymbols",value:function(){return this._customSymbols}},{key:"clearCustomSymbols",value:function(){this._customSymbols.clear()}},{key:"isUsedSymbol",value:function(t){return this._alphabet.has(t)&&this._alphabet.get(t)>0}},{key:"isSymbol",value:function(t){return this._alphabet.has(t)}},{key:"getAlphabet",value:function(){return Array.from(this._alphabet.keys())}},{key:"UNSAFE_getAlphabet",value:function(){return this._alphabet.keys()}},{key:"setStartState",value:function(t){var e=t.getStateID();this._states.has(e)||this._states.set(e,t),this._startState=t}},{key:"isStartState",value:function(t){return this._startState===t}},{key:"getStartState",value:function(){return this._startState}},{key:"setFinalState",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(e)this._states.has(t.getStateID())||this.addState(t),this._finalStates.add(t);else{if(!this._states.has(t.getStateID()))throw new Error("Trying to change final for missing state '"+t.getStateLabel()+"'");this._finalStates.delete(t)}}},{key:"isFinalState",value:function(t){return this._finalStates.has(t)}},{key:"getFinalStates",value:function(){return this._finalStates}},{key:"doTransition",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];if(!t)return n;if(!(t instanceof u))throw new Error("Invalid state instance type '"+a(t)+"'");if(!this._states.has(t.getStateID()))throw new Error("Unable to find source state with id '"+t.getStateID()+"'");e||(e=h);var i=t.getStateID()+"->",o=!0,l=!1,s=void 0;try{for(var c,f=this._transitions.keys()[Symbol.iterator]();!(o=(c=f.next()).done);o=!0){var y=c.value;if(y.startsWith(i)){var v=this._transitions.get(y);if(v.hasSymbol(e)&&(n.push(v.getDestinationState()),!r&&this._deterministic))return n}}}catch(t){l=!0,s=t}finally{try{o||null==f.return||f.return()}finally{if(l)throw s}}return n}},{key:"doTerminalTransition",value:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(!t)return r;if(!this._states.has(t.getStateID()))throw new Error("Unable to find source state with id '"+t.getStateID()+"'");e||(e=h);var n=t.getStateID()+"->",a=!0,i=!1,o=void 0;try{for(var l,s=this._transitions.keys()[Symbol.iterator]();!(a=(l=s.next()).done);a=!0){var u=l.value;if(u.startsWith(n)){var c=this._transitions.get(u);if(c.hasSymbol(e)){var f=c.getDestinationState(),y=this.doClosureTransition(f),v=!0,m=!1,_=void 0;try{for(var d,g=y[Symbol.iterator]();!(v=(d=g.next()).done);v=!0){var b=d.value;r.includes(b)||r.push(b)}}catch(t){m=!0,_=t}finally{try{v||null==g.return||g.return()}finally{if(m)throw _}}}}}}catch(t){i=!0,o=t}finally{try{a||null==s.return||s.return()}finally{if(i)throw o}}return r}},{key:"doClosureTransition",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!t)return e;e.push(t);for(var r=0;r<e.length;++r){var n=this.getOutgoingTransitions(e[r]),a=!0,i=!1,o=void 0;try{for(var l,s=n[Symbol.iterator]();!(a=(l=s.next()).done);a=!0){var u=l.value;if(u[1]===h){var c=u[2];e.includes(c)||e.push(c)}}}catch(t){i=!0,o=t}finally{try{a||null==s.return||s.return()}finally{if(i)throw o}}}return e}},{key:"getOutgoingTransitions",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(!t)return e;if(!this._states.has(t.getStateID()))throw new Error("Unable to find source state with id '"+t.getStateID()+"'");var r=t.getStateID()+"->",n=!0,a=!1,i=void 0;try{for(var o,l=this._transitions.keys()[Symbol.iterator]();!(n=(o=l.next()).done);n=!0){var s=o.value;if(s.startsWith(r)){var h=this._transitions.get(s),u=h.getSymbols(),c=!0,f=!1,y=void 0;try{for(var v,m=u[Symbol.iterator]();!(c=(v=m.next()).done);c=!0){var _=v.value;e.push([t,_,h.getDestinationState()])}}catch(t){f=!0,y=t}finally{try{c||null==m.return||m.return()}finally{if(f)throw y}}}}}catch(t){a=!0,i=t}finally{try{n||null==l.return||l.return()}finally{if(a)throw i}}return e}},{key:"getHashCode",value:function(){var t="",e=!0,r=!1,a=void 0;try{for(var i,o=this._states.values()[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){t+=i.value.getHashString()+","}}catch(t){r=!0,a=t}finally{try{e||null==o.return||o.return()}finally{if(r)throw a}}t+="|";var l=!0,s=!1,h=void 0;try{for(var u,c=this._transitions.values()[Symbol.iterator]();!(l=(u=c.next()).done);l=!0){t+=u.value.getHashString()+","}}catch(t){s=!0,h=t}finally{try{l||null==c.return||c.return()}finally{if(s)throw h}}t+="|";var f=!0,y=!1,v=void 0;try{for(var m,_=this._finalStates[Symbol.iterator]();!(f=(m=_.next()).done);f=!0){t+=m.value.getHashString()}}catch(t){y=!0,v=t}finally{try{f||null==_.return||_.return()}finally{if(y)throw v}}return t+="|",t+=this._startState?this._startState.getHashString():"",t+="|",t+=this._deterministic?"d":"n",Object(n.e)(t)}}]),t}();e.c=f},438:function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function o(t,e,r){return(o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=l(t)););return t}(t,e);if(n){var a=Object.getOwnPropertyDescriptor(n,e);return a.get?a.get.call(r):a.value}})(t,e,r||t)}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var h=function(t){function e(t){var r,a,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),a=this,(r=!(o=l(e).call(this))||"object"!==n(o)&&"function"!=typeof o?i(a):o)._machineBuilder=t,r._graphController=null,r.onGraphControllerChange=r.onGraphControllerChange.bind(i(r)),r}var r,h,u;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(e,t),r=e,(h=[{key:"setGraphController",value:function(t){return this._graphController=t,this}},{key:"initialize",value:function(){o(l(e.prototype),"initialize",this).call(this),this._graphController&&this._graphController.getChangeHandler().addChangeListener(this.onGraphControllerChange)}},{key:"terminate",value:function(){o(l(e.prototype),"terminate",this).call(this),this._graphController&&this._graphController.getChangeHandler().removeChangeListener(this.onGraphControllerChange)}},{key:"getControlledHashCode",value:function(t){return t.getMachineBuilder().getMachineHashCode()}},{key:"onGraphControllerChange",value:function(t){this._machineBuilder.attemptBuildMachine(t.getGraph(),this._machineBuilder.getMachine()),this._changeHandler.update(this)}},{key:"getGraphController",value:function(){return this._graphController}},{key:"getMachineBuilder",value:function(){return this._machineBuilder}},{key:"getMachine",value:function(){return this._machineBuilder.getMachine()}}])&&a(r.prototype,h),u&&a(r,u),e}(r(63).a);e.a=h}}]);