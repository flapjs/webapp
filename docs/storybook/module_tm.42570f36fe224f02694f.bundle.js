(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{1969:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"default",(function(){return TuringMachineModule}));__webpack_require__(4),__webpack_require__(6),__webpack_require__(10),__webpack_require__(7),__webpack_require__(30),__webpack_require__(12),__webpack_require__(24),__webpack_require__(31),__webpack_require__(5),__webpack_require__(8),__webpack_require__(9);var _base_BaseModule_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(1973),_flapjs_services_graph_GraphService_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(1976),_flapjs_services_notify_NotifyService_js__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(1974),_flapjs_services_history_HistoryService_js__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(1975),_flapjs_services_machine_MachineService_js__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(1977);function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _possibleConstructorReturn(self,call){return!call||"object"!==_typeof(call)&&"function"!=typeof call?function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}(self):call}function _getPrototypeOf(o){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}function _setPrototypeOf(o,p){return(_setPrototypeOf=Object.setPrototypeOf||function(o,p){return o.__proto__=p,o})(o,p)}var TuringMachineModule=function(_BaseModule){function TuringMachineModule(){return _classCallCheck(this,TuringMachineModule),_possibleConstructorReturn(this,_getPrototypeOf(TuringMachineModule).apply(this,arguments))}return function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&_setPrototypeOf(subClass,superClass)}(TuringMachineModule,_BaseModule),function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(TuringMachineModule,null,[{key:"moduleId",get:function get(){return"tm"}},{key:"moduleVersion",get:function get(){return"1.0.0"}},{key:"providers",get:function get(){return[]}},{key:"renders",get:function get(){return{header:[],appbar:[],playarea:[],viewarea:[],drawer:[]}}},{key:"services",get:function get(){return[_flapjs_services_history_HistoryService_js__WEBPACK_IMPORTED_MODULE_14__.a,_flapjs_services_notify_NotifyService_js__WEBPACK_IMPORTED_MODULE_13__.a.withInitialMessages(["Hello"]),_flapjs_services_graph_GraphService_js__WEBPACK_IMPORTED_MODULE_12__.a,_flapjs_services_machine_MachineService_js__WEBPACK_IMPORTED_MODULE_15__.a]}}]),TuringMachineModule}(_base_BaseModule_js__WEBPACK_IMPORTED_MODULE_11__.a)},1972:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return BaseService}));__webpack_require__(12);function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}var BaseService=function(){function BaseService(loader){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,BaseService),this.loader=loader}return _createClass(BaseService,null,[{key:"serviceVersion",get:function get(){return"0.0.0"}},{key:"services",get:function get(){return[]}},{key:"providers",get:function get(){return[]}},{key:"renders",get:function get(){return{}}},{key:"slots",get:function get(){return{}}}]),_createClass(BaseService,[{key:"destroy",value:function destroy(){}},{key:"mount",value:function mount(){}},{key:"unmount",value:function unmount(){}}]),BaseService}()},1973:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return BaseModule}));__webpack_require__(12);function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}var BaseModule=function(){function BaseModule(){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,BaseModule)}return _createClass(BaseModule,null,[{key:"services",get:function get(){return[]}},{key:"providers",get:function get(){return[]}},{key:"renders",get:function get(){return{}}},{key:"moduleId",get:function get(){throw new Error("Must be overriden.")}},{key:"moduleVersion",get:function get(){return"0.0.0"}}]),_createClass(BaseModule,[{key:"destroy",value:function destroy(){}},{key:"mount",value:function mount(){}},{key:"unmount",value:function unmount(){}}]),BaseModule}()},1974:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return NotifyService}));__webpack_require__(4),__webpack_require__(6),__webpack_require__(10),__webpack_require__(7),__webpack_require__(30),__webpack_require__(12),__webpack_require__(24),__webpack_require__(31),__webpack_require__(5),__webpack_require__(8),__webpack_require__(9);var _flapjs_services_base_BaseService_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(1972),_NotifyContext_jsx__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(124),_NotifyHelper_js__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(301),_NotifyStack_jsx__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(367);function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _possibleConstructorReturn(self,call){return!call||"object"!==_typeof(call)&&"function"!=typeof call?function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}(self):call}function _getPrototypeOf(o){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&_setPrototypeOf(subClass,superClass)}function _setPrototypeOf(o,p){return(_setPrototypeOf=Object.setPrototypeOf||function(o,p){return o.__proto__=p,o})(o,p)}var NotifyService=function(_BaseService){function NotifyService(){return _classCallCheck(this,NotifyService),_possibleConstructorReturn(this,_getPrototypeOf(NotifyService).apply(this,arguments))}return _inherits(NotifyService,_BaseService),function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(NotifyService,null,[{key:"providers",get:function get(){return[_NotifyContext_jsx__WEBPACK_IMPORTED_MODULE_12__.b]}},{key:"renders",get:function get(){return{foreground:[_NotifyStack_jsx__WEBPACK_IMPORTED_MODULE_14__.a]}}},{key:"serviceVersion",get:function get(){return"1.0.0"}}]),NotifyService}(_flapjs_services_base_BaseService_js__WEBPACK_IMPORTED_MODULE_11__.a);NotifyService.withInitialMessages=function(initialMessages){var defaultMessageComponent=1<arguments.length&&void 0!==arguments[1]?arguments[1]:void 0;return(function(_NotifyService){function _class(loader,contribs){var _this;_classCallCheck(this,_class),_this=_possibleConstructorReturn(this,_getPrototypeOf(_class).call(this,loader,contribs));var notifyState=Object(_NotifyHelper_js__WEBPACK_IMPORTED_MODULE_13__.d)(initialMessages);return contribs.providers[0].props={notifyState:notifyState},defaultMessageComponent&&(contribs.foreground[0].props={defaultMessageComponent:defaultMessageComponent}),_this}return _inherits(_class,_NotifyService),_class}(NotifyService))}},1975:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return NotifyService}));__webpack_require__(4),__webpack_require__(6),__webpack_require__(10),__webpack_require__(7),__webpack_require__(30),__webpack_require__(12),__webpack_require__(24),__webpack_require__(31),__webpack_require__(5),__webpack_require__(8),__webpack_require__(9);var _flapjs_services_base_BaseService_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(1972),_HistoryContext_jsx__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(107);function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _possibleConstructorReturn(self,call){return!call||"object"!==_typeof(call)&&"function"!=typeof call?function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}(self):call}function _getPrototypeOf(o){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}function _setPrototypeOf(o,p){return(_setPrototypeOf=Object.setPrototypeOf||function(o,p){return o.__proto__=p,o})(o,p)}var NotifyService=function(_BaseService){function NotifyService(){return _classCallCheck(this,NotifyService),_possibleConstructorReturn(this,_getPrototypeOf(NotifyService).apply(this,arguments))}return function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&_setPrototypeOf(subClass,superClass)}(NotifyService,_BaseService),function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(NotifyService,null,[{key:"providers",get:function get(){return[_HistoryContext_jsx__WEBPACK_IMPORTED_MODULE_12__.b]}},{key:"serviceVersion",get:function get(){return"1.0.0"}}]),NotifyService}(_flapjs_services_base_BaseService_js__WEBPACK_IMPORTED_MODULE_11__.a)},1976:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__(4),__webpack_require__(6),__webpack_require__(10),__webpack_require__(7),__webpack_require__(30),__webpack_require__(12),__webpack_require__(24),__webpack_require__(31),__webpack_require__(5),__webpack_require__(8),__webpack_require__(9);var BaseService=__webpack_require__(1972),react=(__webpack_require__(34),__webpack_require__(25),__webpack_require__(41),__webpack_require__(49),__webpack_require__(79),__webpack_require__(11),__webpack_require__(28),__webpack_require__(0)),react_default=__webpack_require__.n(react),Slot=__webpack_require__(76);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var source,i=1;i<arguments.length;i++)source=null!=arguments[i]?arguments[i]:{},i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}));return target}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function withChildSlot(slotName,componentClass){var componentProps=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};return function(props){return react_default.a.createElement(componentClass,_objectSpread({},props,{},componentProps),react_default.a.createElement(Slot.a,{name:slotName}),props.children)}}var ViewContext=__webpack_require__(67),ViewArea=__webpack_require__(369),PlayArea=__webpack_require__(368);function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _possibleConstructorReturn(self,call){return!call||"object"!==_typeof(call)&&"function"!=typeof call?function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}(self):call}function _getPrototypeOf(o){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}function _setPrototypeOf(o,p){return(_setPrototypeOf=Object.setPrototypeOf||function(o,p){return o.__proto__=p,o})(o,p)}var ViewService_ViewService=function(_BaseService){function ViewService(){return _classCallCheck(this,ViewService),_possibleConstructorReturn(this,_getPrototypeOf(ViewService).apply(this,arguments))}return function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&_setPrototypeOf(subClass,superClass)}(ViewService,_BaseService),function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(ViewService,null,[{key:"providers",get:function get(){return[ViewContext.b]}},{key:"renders",get:function get(){return{background:[withChildSlot("playarea",PlayArea.a)],foreground:[withChildSlot("viewarea",ViewArea.a)]}}},{key:"serviceVersion",get:function get(){return"1.0.0"}}]),ViewService}(BaseService.a),GraphContext=__webpack_require__(27),GraphElementEditorContext=__webpack_require__(92),BaseGraph=__webpack_require__(499),GraphElementEditor=__webpack_require__(164);function GraphService_typeof(obj){return(GraphService_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function GraphService_classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function GraphService_defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function GraphService_possibleConstructorReturn(self,call){return!call||"object"!==GraphService_typeof(call)&&"function"!=typeof call?function GraphService_assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}(self):call}function GraphService_getPrototypeOf(o){return(GraphService_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}function GraphService_inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&GraphService_setPrototypeOf(subClass,superClass)}function GraphService_setPrototypeOf(o,p){return(GraphService_setPrototypeOf=Object.setPrototypeOf||function(o,p){return o.__proto__=p,o})(o,p)}__webpack_require__.d(__webpack_exports__,"a",(function(){return GraphService_GraphService}));var GraphService_GraphService=function(_BaseService){function GraphService(){return GraphService_classCallCheck(this,GraphService),GraphService_possibleConstructorReturn(this,GraphService_getPrototypeOf(GraphService).apply(this,arguments))}return GraphService_inherits(GraphService,_BaseService),function GraphService_createClass(Constructor,protoProps,staticProps){return protoProps&&GraphService_defineProperties(Constructor.prototype,protoProps),staticProps&&GraphService_defineProperties(Constructor,staticProps),Constructor}(GraphService,null,[{key:"services",get:function get(){return[ViewService_ViewService]}},{key:"providers",get:function get(){return[{component:GraphContext.b,props:{graphType:BaseGraph.a}},GraphElementEditorContext.b]}},{key:"renders",get:function get(){return{playarea:[],viewarea:[GraphElementEditor.a]}}},{key:"serviceVersion",get:function get(){return"1.0.0"}}]),GraphService}(BaseService.a);GraphService_GraphService.withGraphType=function(graphType){var graphPlayground=1<arguments.length&&void 0!==arguments[1]?arguments[1]:void 0,graphEditor=2<arguments.length&&void 0!==arguments[2]?arguments[2]:void 0;return(function(_GraphService){function _class(loader,contribs){var _this;return GraphService_classCallCheck(this,_class),_this=GraphService_possibleConstructorReturn(this,GraphService_getPrototypeOf(_class).call(this,loader,contribs)),contribs.providers[0].props.graphType=graphType,graphPlayground&&contribs.playarea.unshift({component:graphPlayground}),graphEditor&&(contribs.viewarea[0].component=graphEditor),_this}return GraphService_inherits(_class,_GraphService),_class}(GraphService_GraphService))}},1977:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return MachineService}));__webpack_require__(4),__webpack_require__(6),__webpack_require__(10),__webpack_require__(7),__webpack_require__(30),__webpack_require__(12),__webpack_require__(24),__webpack_require__(31),__webpack_require__(5),__webpack_require__(8),__webpack_require__(9);var _base_BaseService_js__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(1972),_MachineContext_jsx__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(190);function _typeof(obj){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj})(obj)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)(descriptor=props[i]).enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}function _possibleConstructorReturn(self,call){return!call||"object"!==_typeof(call)&&"function"!=typeof call?function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}(self):call}function _getPrototypeOf(o){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)})(o)}function _setPrototypeOf(o,p){return(_setPrototypeOf=Object.setPrototypeOf||function(o,p){return o.__proto__=p,o})(o,p)}var MachineService=function(_BaseService){function MachineService(){return _classCallCheck(this,MachineService),_possibleConstructorReturn(this,_getPrototypeOf(MachineService).apply(this,arguments))}return function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&_setPrototypeOf(subClass,superClass)}(MachineService,_BaseService),function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(MachineService,null,[{key:"serviceVersion",get:function get(){return"1.0.0"}},{key:"providers",get:function get(){return[_MachineContext_jsx__WEBPACK_IMPORTED_MODULE_12__.b]}}]),MachineService}(_base_BaseService_js__WEBPACK_IMPORTED_MODULE_11__.a)}}]);
//# sourceMappingURL=module_tm.42570f36fe224f02694f.bundle.js.map