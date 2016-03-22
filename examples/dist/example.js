!function e(t,o,n){function i(u,f){if(!o[u]){if(!t[u]){var s="function"==typeof require&&require;if(!f&&s)return s(u,!0);if(r)return r(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var l=o[u]={exports:{}};t[u][0].call(l.exports,function(e){var o=t[u][1][e];return i(o?o:e)},l,l.exports,e,t,o,n)}return o[u].exports}for(var r="function"==typeof require&&require,u=0;u<n.length;u++)i(n[u]);return i}({1:[function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var i=e("./web-sight"),r=n(i),u=document.querySelector("#target"),f=new r["default"](u,{partially:!0});f.on("come-out-from-top",function(){console.log("come out from top")}).on("come-out-from-bottom",function(){console.log("come out from bottom")}).on("visible",function(){console.log("visible")}).on("invisible",function(){console.log("invisible")})},{"./web-sight":2}],2:[function(e,t,o){(function(n){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function(e){if("object"==("undefined"==typeof o?"undefined":i(o))&&"undefined"!=typeof t)t.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof n?n:"undefined"!=typeof self?self:this,r.WebSight=e()}}(function(){return function t(o,n,i){function r(f,s){if(!n[f]){if(!o[f]){var c="function"==typeof e&&e;if(!s&&c)return c(f,!0);if(u)return u(f,!0);var l=new Error("Cannot find module '"+f+"'");throw l.code="MODULE_NOT_FOUND",l}var a=n[f]={exports:{}};o[f][0].call(a.exports,function(e){var t=o[f][1][e];return r(t?t:e)},a,a.exports,t,o,n,i)}return n[f].exports}for(var u="function"==typeof e&&e,f=0;f<i.length;f++)r(i[f]);return r}({1:[function(e,t,o){function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),f=e("./knot"),s=n(f),c={partially:!1},l=function(){function e(t){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];i(this,e),this.el=t,this.opts=r({},c,o),this.isScrolling=!1,this._updateGeo(),this._init()}return u(e,[{key:"_init",value:function(){var e=this;addEventListener("scroll",function(){e.isScrolling=!0}),setInterval(function(){e.isScrolling&&(e.isScrolling=!1,e._updateBrowserGeo(),e._updateGeo(),e._update())},100)}},{key:"_update",value:function(){this.checkVisible()?this.emit("visible"):this.emit("invisible"),this.checkComeOutFromTop()&&this.emit("come-out-from-top"),this.checkComeOutFromBottom()&&this.emit("come-out-from-bottom")}},{key:"_updateGeo",value:function(){var e=this.el.getBoundingClientRect(),t={x:pageXOffset,y:pageYOffset},o={viewPos:{x:e.left,y:e.top},pos:{x:e.left+t.x,y:e.top+t.y},size:{w:e.width,h:e.height}};this.prevGeo=this.geo||o,this.geo=o}},{key:"_updateBrowserGeo",value:function(){this.browserGeo={pos:{x:window.pageXOffset,y:window.pageYOffset},size:{w:document.body.clientWidth,h:document.body.clientHeight},viewSize:{w:window.innerWidth,h:window.innerHeight}}}},{key:"checkVisible",value:function(){var e=this.geo,t=(this.prevGeo,this.browserGeo);return this.opts.partially?e.viewPos.y+e.size.h>0&&e.viewPos.y<t.viewSize.h:e.viewPos.y>0&&e.viewPos.y+e.size.h<t.viewSize.h}},{key:"checkComeOutFromTop",value:function(){var e=this.geo,t=this.prevGeo;return this.opts.partially?e.viewPos.y+e.size.h>0&&t.viewPos.y+t.size.h<=0:e.viewPos.y>0&&t.viewPos.y<=0}},{key:"checkComeOutFromBottom",value:function(){var e=this.geo,t=this.prevGeo,o=this.browserGeo;return this.opts.partially?e.viewPos.y<o.viewSize.h&&t.viewPos.y>=o.viewSize.h:e.viewPos.y+e.size.h<o.viewSize.h&&t.viewPos.y+t.size.h>=o.viewSize.h}}]),e}(),a=(0,s["default"])(l);o["default"]=a,t.exports=o["default"]},{"./knot":2}],2:[function(e,t,o){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":i(t))&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":i(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function f(e){return e&&"function"==typeof e}Object.defineProperty(o,"__esModule",{value:!0}),o["default"]=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=void 0,o=void 0;if(f(e)){var i=function(e){function t(){var e;n(this,t);for(var o=arguments.length,i=Array(o),u=0;o>u;u++)i[u]=arguments[u];var f=r(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(i)));return f.events={},f}return u(t,e),t}(e);t=i.prototype,o=i}else t=e,t.events={},o=e;return t.on=function(e,t){return this.events[e]=this.events[e]||[],this.events[e].push(t),this},t.once=function(e,t){return t._once=!0,this.on(e,t),this},t.off=function(e,t){return 2===arguments.length?this.events[e].splice(this.events[e].indexOf(t),1):delete this.events[e],this},t.emit=function(e){for(var t=this,o=arguments.length,n=Array(o>1?o-1:0),i=1;o>i;i++)n[i-1]=arguments[i];var r=this.events[e]&&this.events[e].slice();return r&&r.forEach(function(o){o._once&&t.off(e,o),o.apply(t,n)}),this},o},t.exports=o["default"]},{}]},{},[1])(1)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);