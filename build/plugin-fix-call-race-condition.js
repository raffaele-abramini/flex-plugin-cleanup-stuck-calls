!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=5)}([function(t,e){t.exports=window.Twilio.Flex},function(t,e){t.exports=React},function(t,e,n){"use strict";var r,o,i,u=n(10),a="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function c(){i=!1}function l(t){if(t){if(t!==r){if(t.length!==a.length)throw new Error("Custom alphabet for shortid must be "+a.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,n){return e!==n.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+a.length+" unique characters. These characters were not unique: "+e.join(", "));r=t,c()}}else r!==a&&(r=a,c())}function s(){return i||(i=function(){r||l(a);for(var t,e=r.split(""),n=[],o=u.nextValue();e.length>0;)o=u.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}t.exports={get:function(){return r||a},characters:function(t){return l(t),r},seed:function(t){u.seed(t),o!==t&&(c(),o=t)},lookup:function(t){return s()[t]},shuffled:s}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(6);e.loadPlugin=r.loadPlugin,e.FlexPlugin=r.FlexPlugin;var o=n(7);e.getAssetsUrl=o.getAssetsUrl,e.getRuntimeUrl=o.getRuntimeUrl;var i=n(8);e.loadJS=i.loadJS;var u=n(17);e.loadCSS=u.loadCSS},function(t,e,n){"use strict";t.exports=n(9)},function(t,e,n){t.exports=n(18)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){return function(t){this.name=t,console.log("loading "+this.name+" plugin")}}();e.FlexPlugin=r,e.loadPlugin=function(t){Twilio&&Twilio.Flex&&Twilio.Flex.Plugins?Twilio.Flex.Plugins.init(t):console.warn("This version of Flex does not appear to support plugins.")}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRuntimeUrl=function(){if(document&&document.currentScript){var t=document.currentScript;if("string"===typeof t.src){var e=t.src;return e.substr(0,e.lastIndexOf("/"))}}return""},e.getAssetsUrl=function(){return e.getRuntimeUrl()+"/assets"}},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(4));e.loadJS=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];t.forEach((function(t){var e=document.createElement("script");e.id="external-js-"+o.default.generate(),e.type="text/javascript",e.src=t,document.body.appendChild(e)}))}},function(t,e,n){"use strict";var r=n(2),o=n(11),i=n(15),u=n(16)||0;function a(){return o(u)}t.exports=a,t.exports.generate=a,t.exports.seed=function(e){return r.seed(e),t.exports},t.exports.worker=function(e){return u=e,t.exports},t.exports.characters=function(t){return void 0!==t&&r.characters(t),r.shuffled()},t.exports.isValid=i},function(t,e,n){"use strict";var r=1;t.exports={nextValue:function(){return(r=(9301*r+49297)%233280)/233280},seed:function(t){r=t}}},function(t,e,n){"use strict";var r,o,i=n(12),u=(n(2),1567752802062),a=7;t.exports=function(t){var e="",n=Math.floor(.001*(Date.now()-u));return n===o?r++:(r=0,o=n),e+=i(a),e+=i(t),r>0&&(e+=i(r)),e+=i(n)}},function(t,e,n){"use strict";var r=n(2),o=n(13),i=n(14);t.exports=function(t){for(var e,n=0,u="";!e;)u+=i(o,r.get(),1),e=t<Math.pow(16,n+1),n++;return u}},function(t,e,n){"use strict";var r,o="object"===typeof window&&(window.crypto||window.msCrypto);r=o&&o.getRandomValues?function(t){return o.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},t.exports=r},function(t,e){t.exports=function(t,e,n){var r=(2<<Math.log(e.length-1)/Math.LN2)-1,o=Math.ceil(1.6*r*n/e.length);n=+n;for(var i="";;)for(var u=t(o),a=0;a<o;a++){var c=u[a]&r;if(e[c]&&(i+=e[c]).length===n)return i}}},function(t,e,n){"use strict";var r=n(2);t.exports=function(t){return!(!t||"string"!==typeof t||t.length<6)&&!new RegExp("[^"+r.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)}},function(t,e,n){"use strict";t.exports=0},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(4));e.loadCSS=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];t.forEach((function(t){var e=document.createElement("link");e.id="external-css-"+o.default.generate(),e.rel="stylesheet",e.type="text/css",e.media="all",e.href=t,document.head.appendChild(e)}))}},function(t,e,n){"use strict";n.r(e);var r=n(3);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function a(t){return(a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t){return(c="function"===typeof Symbol&&"symbol"===a(Symbol.iterator)?function(t){return a(t)}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":a(t)})(t)}function l(t,e){return!e||"object"!==c(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function p(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}var d=n(1),h=n.n(d),g=n(0);function v(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function y(){var t=v(["\n    font-weight: bold;\n"]);return y=function(){return t},t}function b(){var t=v(["\n    display: flex;\n    align-items: center;\n"]);return b=function(){return t},t}var m=Object(g.styled)("div")(b()),x=Object(g.styled)("span")(y());function w(){var t=v(["\n    background: none;\n    font-size: 12px;\n    letter-spacing: 0;\n    height: auto;\n    padding: 0;\n    text-transform: uppercase;\n\n    &:hover {\n        background: none;\n        text-decoration: underline;\n    }\n"]);return w=function(){return t},t}function O(){var t=v(['\n    display: flex;\n    align-items: center;\n    padding: 0 12px;\n    position: relative;\n    &:before,\n    &:after {\n        height: 16px;\n        width: 1px;\n        position: absolute;\n        left: 0;\n        background: #000; // hardcoded the color here as we don\'t have notfication theme object. Will need to update it once we have it.\n        opacity: 0.2;\n    }\n    &:after {\n        left: auto;\n        right: 0;\n    }\n    & + &:before {\n        content: "";\n    }\n']);return O=function(){return t},t}function _(){var t=v(["\n    margin-left: auto;\n    display: flex;\n"]);return _=function(){return t},t}var j=Object(g.styled)("div")(_()),S=Object(g.styled)("div")(O()),P=Object(g.styled)(g.Button)(w()),C=function(t){function e(){var t,n;o(this,e);for(var r=arguments.length,i=new Array(r),u=0;u<r;u++)i[u]=arguments[u];return(n=l(this,(t=s(e)).call.apply(t,[this].concat(i)))).handleHangupClick=function(){var t=n.props.onHangup;g.Notifications.dismissNotificationById(n.props.notificationId),t()},n}return p(e,t),u(e,[{key:"render",value:function(){return d.createElement(j,null,d.createElement(S,null,d.createElement(P,{type:"button",onClick:this.handleHangupClick},"Cancel task")))}}]),e}(d.PureComponent),k=function(t){function e(){return o(this,e),l(this,s(e).apply(this,arguments))}return p(e,t),u(e,[{key:"render",value:function(){var t=this.props.notificationContext.onHangup;return h.a.createElement(m,null,h.a.createElement("span",null,"Sorry, the system isn\u2019t responding. It looks like the caller has already hung up."," ",h.a.createElement(x,null,"To continue, cancel the pending task.")),h.a.createElement(C,{notificationId:this.props.notificationId,onHangup:t}))}}]),e}(h.a.PureComponent);k.defaultProps={notificationContext:{}};var M="FixCallRaceConditionPlugin",T=function(t){function e(){var t;return o(this,e),(t=l(this,s(e).call(this,M))).manager=void 0,t.notificationID="HANGUP_STUCK_CALL_NOTIFICATION",t.handleMonitorCall=function(){var e=t.getPhoneConnectionFromState(),n=t.manager.store.getState().flex.worker.tasks,r=Array.from(n.values());t.ifFlavorTwo(e)&&!r.find((function(t){return g.TaskHelper.isCallTask(t)&&"accepted"===t.status}))&&t.hangupCallAndLog(2,"before monitor call")},t.hangupCallAndLog=function(t,e){g.Actions.invokeAction("HangupCall",{task:{}}),console.error("Voice call race condition detected - Scenario 1, flavour ".concat(t,". Hanging an invalid call down on ").concat(e,"."))},t}return p(e,t),u(e,[{key:"init",value:function(t,e){this.manager=e,this.registerNotification(),t.Actions.addListener("beforeMonitorCall",this.handleMonitorCall)}},{key:"registerNotification",value:function(){g.Notifications.registerNotification({type:g.NotificationType.warning,id:this.notificationID,content:h.a.createElement(k,{notificationId:this.notificationID}),timeout:0})}},{key:"getPhoneConnectionFromState",value:function(){return this.manager.store.getState().flex.phone.connection}},{key:"ifFlavorOne",value:function(t,e){return t&&e&&"pending"===e.sourceObject.status}},{key:"ifFlavorTwo",value:function(t){return t}}]),e}(r.FlexPlugin);r.loadPlugin(T)}]);
//# sourceMappingURL=plugin-fix-call-race-condition.js.map