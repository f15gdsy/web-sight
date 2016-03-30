!function e(t,o,i){function n(s,f){if(!o[s]){if(!t[s]){var a="function"==typeof require&&require;if(!f&&a)return a(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var p=o[s]={exports:{}};t[s][0].call(p.exports,function(e){var o=t[s][1][e];return n(o?o:e)},p,p.exports,e,t,o,i)}return o[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)n(i[s]);return n}({1:[function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}var n=e("./web-sight"),r=i(n),s=document.querySelector("#target"),f=new r["default"](s,{partially:!0});f.on("appear-from-top",function(){console.log("appear from top")}).on("appear-from-bottom",function(){console.log("appear from bottom")}).on("visible",function(){console.log("visible")}).on("invisible",function(){console.log("invisible")}).on("appear",function(){console.log("appear")}).on("disappear",function(){console.log("disappear")}).on("disappear-from-top",function(){console.log("disappear from top")}).on("disappear-from-bottom",function(){console.log("disappear from bottom")})},{"./web-sight":2}],2:[function(e,t,o){(function(i){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};!function(e){if("object"==("undefined"==typeof o?"undefined":n(o))&&"undefined"!=typeof t)t.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof i?i:"undefined"!=typeof self?self:this,r.WebSight=e()}}(function(){return function t(o,i,n){function r(f,a){if(!i[f]){if(!o[f]){var u="function"==typeof e&&e;if(!a&&u)return u(f,!0);if(s)return s(f,!0);var p=new Error("Cannot find module '"+f+"'");throw p.code="MODULE_NOT_FOUND",p}var c=i[f]={exports:{}};o[f][0].call(c.exports,function(e){var t=o[f][1][e];return r(t?t:e)},c,c.exports,t,o,i,n)}return i[f].exports}for(var s="function"==typeof e&&e,f=0;f<n.length;f++)r(n[f]);return r}({1:[function(e,t,o){function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(o,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},s=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),f=e("./knot"),a=i(f),u={partially:!1},p={APPEAR:"appear",APPEAR_FROM_TOP:"appear-from-top",APPEAR_FROM_BOTTOM:"appear-from-bottom",DISAPPEAR:"disappear",DISAPPEAR_FROM_TOP:"disappear-from-top",DISAPPEAR_FROM_BOTTOM:"disappear-from-bottom",VISIBLE:"visible",INVISIBLE:"invisible"},c=function(){function e(t){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];n(this,e),this.el=t,this.opts=r({},u,o),this.isScrolling=!1,this._updateGeo(),this._init()}return s(e,[{key:"_init",value:function(){var e=this;addEventListener("scroll",function(){e.isScrolling=!0}),setInterval(function(){e.isScrolling&&(e.isScrolling=!1,e._updateBrowserGeo(),e._updateGeo(),e._update())},100)}},{key:"_update",value:function(){var e=!1,t=!1;this.checkVisible()?this.emit(p.VISIBLE):this.emit(p.INVISIBLE),this.checkAppeaerFromTop()?(this.emit(p.APPEAR_FROM_TOP),e=!0):this.checkAppeaerFromBottom()?(this.emit(p.APPEAR_FROM_BOTTOM),e=!0):this.checkDisappearFromTop()?(this.emit(p.DISAPPEAR_FROM_TOP),t=!0):this.checkDisappearFromBottom()&&(this.emit(p.DISAPPEAR_FROM_BOTTOM),t=!0),e?this.emit(p.APPEAR):t&&this.emit(p.DISAPPEAR)}},{key:"_updateGeo",value:function(){var e=this.el.getBoundingClientRect(),t={x:pageXOffset,y:pageYOffset},o={viewPos:{x:e.left,y:e.top},pos:{x:e.left+t.x,y:e.top+t.y},size:{w:e.width,h:e.height}};this.prevGeo=this.geo||o,this.geo=o}},{key:"_updateBrowserGeo",value:function(){this.browserGeo={pos:{x:window.pageXOffset,y:window.pageYOffset},size:{w:document.body.clientWidth,h:document.body.clientHeight},viewSize:{w:window.innerWidth,h:window.innerHeight}}}},{key:"checkVisible",value:function(){var e=this.geo,t=(this.prevGeo,this.browserGeo);return this.opts.partially?e.viewPos.y+e.size.h>0&&e.viewPos.y<t.viewSize.h:e.viewPos.y>0&&e.viewPos.y+e.size.h<t.viewSize.h}},{key:"checkAppeaerFromTop",value:function(){var e=this.geo,t=this.prevGeo;return this.opts.partially?e.viewPos.y+e.size.h>0&&t.viewPos.y+t.size.h<=0:e.viewPos.y>0&&t.viewPos.y<=0}},{key:"checkAppeaerFromBottom",value:function(){var e=this.geo,t=this.prevGeo,o=this.browserGeo;return this.opts.partially?e.viewPos.y<o.viewSize.h&&t.viewPos.y>=o.viewSize.h:e.viewPos.y+e.size.h<o.viewSize.h&&t.viewPos.y+t.size.h>=o.viewSize.h}},{key:"checkDisappearFromTop",value:function(){var e=this.geo,t=this.prevGeo;return this.opts.partially?e.viewPos.y<0&&t.viewPos.y>=0:e.viewPos.y+e.size.h<0&&t.viewPos.y+t.size.h>=0}},{key:"checkDisappearFromBottom",value:function(){var e=this.geo,t=this.prevGeo,o=this.browserGeo;return this.opts.partially?e.viewPos.y+e.size.h>o.viewSize.h&&t.viewPos.y+t.size.h<=o.viewSize.h:e.viewPos.y>o.viewSize.h&&t.viewPos.y<=o.viewSize.h}}]),e}(),l=(0,a["default"])(c);o["default"]=l,t.exports=o["default"]},{"./knot":2}],2:[function(e,t,o){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=("undefined"==typeof t?"undefined":n(t))&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":n(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function f(e){return e&&"function"==typeof e}Object.defineProperty(o,"__esModule",{value:!0}),o["default"]=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=void 0,o=void 0;if(f(e)){var n=function(e){function t(){var e;i(this,t);for(var o=arguments.length,n=Array(o),s=0;o>s;s++)n[s]=arguments[s];var f=r(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(n)));return f.events={},f}return s(t,e),t}(e);t=n.prototype,o=n}else t=e,t.events={},o=e;return t.on=function(e,t){return this.events[e]=this.events[e]||[],this.events[e].push(t),this},t.once=function(e,t){return t._once=!0,this.on(e,t),this},t.off=function(e,t){return 2===arguments.length?this.events[e].splice(this.events[e].indexOf(t),1):delete this.events[e],this},t.emit=function(e){for(var t=this,o=arguments.length,i=Array(o>1?o-1:0),n=1;o>n;n++)i[n-1]=arguments[n];var r=this.events[e]&&this.events[e].slice();return r&&r.forEach(function(o){o._once&&t.off(e,o),o.apply(t,i)}),this},o},t.exports=o["default"]},{}]},{},[1])(1)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);