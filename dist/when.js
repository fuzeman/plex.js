!function(e){"use strict";e("lib/env",["require"],function(e){function t(){return"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)}function n(){return"function"==typeof MutationObserver&&MutationObserver||"function"==typeof WebKitMutationObserver&&WebKitMutationObserver}function r(e){function t(){var e=n;n=void 0,e()}var n,r=document.createTextNode(""),o=new e(t);o.observe(r,{characterData:!0});var i=0;return function(e){n=e,r.data=i^=1}}var o,i="undefined"!=typeof setTimeout&&setTimeout,u=function(e,t){return setTimeout(e,t)},c=function(e){return clearTimeout(e)},f=function(e){return i(e,0)};if(t())f=function(e){return process.nextTick(e)};else if(o=n())f=r(o);else if(!i){var s=e,a=s("vertx");u=function(e,t){return a.setTimer(t,e)},c=a.cancelTimer,f=a.runOnLoop||a.runOnContext}return{setTimer:u,clearTimer:c,asap:f}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e(require)}),function(e){"use strict";e("lib/TimeoutError",[],function(){function e(t){Error.call(this),this.message=t,this.name=e.name,"function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,e)}return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/decorators/timed",["require","../env","../TimeoutError"],function(e){function t(e,t,r,o){return n.setTimer(function(){e(r,o,t)},t)}var n=e("../env"),r=e("../TimeoutError");return function(e){function o(e,n,r){t(i,e,n,r)}function i(e,t){t.resolve(e)}function u(e,t,n){var o="undefined"==typeof e?new r("timed out after "+n+"ms"):e;t.reject(o)}return e.prototype.delay=function(e){var t=this._beget();return this._handler.fold(o,e,void 0,t._handler),t},e.prototype.timeout=function(e,r){var o=this._beget(),i=o._handler,c=t(u,e,r,o._handler);return this._handler.visit(i,function(e){n.clearTimer(c),this.resolve(e)},function(e){n.clearTimer(c),this.reject(e)},i.notify),o},e}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e(require)}),function(e){"use strict";e("lib/state",[],function(){function e(){return{state:"pending"}}function t(e){return{state:"rejected",reason:e}}function n(e){return{state:"fulfilled",value:e}}function r(r){var o=r.state();return 0===o?e():o>0?n(r.value):t(r.value)}return{pending:e,fulfilled:n,rejected:t,inspect:r}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/apply",[],function(){function e(e,n){function r(t,r,i){var u=e._defer(),c=i.length,f=new Array(c);return o({f:t,thisArg:r,args:i,params:f,i:c-1,call:n},u._handler),u}function o(t,r){if(t.i<0)return n(t.f,t.thisArg,t.params,r);var o=e._handler(t.args[t.i]);o.fold(i,t,void 0,r)}function i(e,t,n){e.params[e.i]=t,e.i-=1,o(e,n)}return arguments.length<2&&(n=t),r}function t(e,t,n,r){try{r.resolve(e.apply(t,n))}catch(o){r.reject(o)}}return e.tryCatchResolve=t,e})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/decorators/array",["require","../state","../apply"],function(e){var t=e("../state"),n=e("../apply");return function(e){function r(t){function n(e){a=null,this.resolve(e)}function r(e){this.resolved||(a.push(e),0===--s&&this.reject(a))}for(var o,i,u=e._defer(),c=u._handler,f=t.length>>>0,s=f,a=[],l=0;f>l;++l)if(i=t[l],void 0!==i||l in t){if(o=e._handler(i),o.state()>0){c.become(o),e._visitRemaining(t,l,o);break}o.visit(c,n,r)}else--s;return 0===s&&c.reject(new RangeError("any(): array must not be empty")),u}function o(t,n){function r(e){this.resolved||(a.push(e),0===--d&&(l=null,this.resolve(a)))}function o(e){this.resolved||(l.push(e),0===--i&&(a=null,this.reject(l)))}var i,u,c,f=e._defer(),s=f._handler,a=[],l=[],h=t.length>>>0,d=0;for(c=0;h>c;++c)u=t[c],(void 0!==u||c in t)&&++d;for(n=Math.max(n,0),i=d-n+1,d=Math.min(n,d),n>d?s.reject(new RangeError("some(): array must contain at least "+n+" item(s), but had "+d)):0===d&&s.resolve(a),c=0;h>c;++c)u=t[c],(void 0!==u||c in t)&&e._handler(u).visit(s,r,o,s.notify);return f}function i(t,n){return e._traverse(n,t)}function u(t,n){var r=_.call(t);return e._traverse(n,r).then(function(e){return c(r,e)})}function c(t,n){for(var r=n.length,o=new Array(r),i=0,u=0;r>i;++i)n[i]&&(o[u++]=e._handler(t[i]).value);return o.length=u,o}function f(e){return y(e.map(s))}function s(n){var r=e._handler(n);return 0===r.state()?p(n).then(t.fulfilled,t.rejected):(r._unreport(),t.inspect(r))}function a(e,t){return arguments.length>2?v.call(e,h(t),arguments[2]):v.call(e,h(t))}function l(e,t){return arguments.length>2?m.call(e,h(t),arguments[2]):m.call(e,h(t))}function h(e){return function(t,n,r){return d(e,void 0,[t,n,r])}}var d=n(e),p=e.resolve,y=e.all,v=Array.prototype.reduce,m=Array.prototype.reduceRight,_=Array.prototype.slice;return e.any=r,e.some=o,e.settle=f,e.map=i,e.filter=u,e.reduce=a,e.reduceRight=l,e.prototype.spread=function(e){return this.then(y).then(function(t){return e.apply(this,t)})},e}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e(require)}),function(e){"use strict";e("lib/decorators/flow",[],function(){function e(){throw new TypeError("catch predicate must be a function")}function t(e,t){return n(t)?e instanceof t:t(e)}function n(e){return e===Error||null!=e&&e.prototype instanceof Error}function r(e){return("object"==typeof e||"function"==typeof e)&&null!==e}function o(e){return e}return function(n){function i(e,n){return function(r){return t(r,n)?e.call(this,r):s(r)}}function u(e,t,n,o){var i=e.call(t);return r(i)?c(i,n,o):n(o)}function c(e,t,n){return f(e).then(function(){return t(n)})}var f=n.resolve,s=n.reject,a=n.prototype["catch"];return n.prototype.done=function(e,t){this._handler.visit(this._handler.receiver,e,t)},n.prototype["catch"]=n.prototype.otherwise=function(t){return arguments.length<2?a.call(this,t):"function"!=typeof t?this.ensure(e):a.call(this,i(arguments[1],t))},n.prototype["finally"]=n.prototype.ensure=function(e){return"function"!=typeof e?this:this.then(function(t){return u(e,this,o,t)},function(t){return u(e,this,s,t)})},n.prototype["else"]=n.prototype.orElse=function(e){return this.then(void 0,function(){return e})},n.prototype["yield"]=function(e){return this.then(function(){return e})},n.prototype.tap=function(e){return this.then(e)["yield"](this)},n}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/decorators/fold",[],function(){return function(e){return e.prototype.fold=function(t,n){var r=this._beget();return this._handler.fold(function(n,r,o){e._handler(n).fold(function(e,n,r){r.resolve(t.call(this,n,e))},r,this,o)},n,r._handler.receiver,r._handler),r},e}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/decorators/inspect",["require","../state"],function(e){var t=e("../state").inspect;return function(e){return e.prototype.inspect=function(){return t(e._handler(this))},e}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e(require)}),function(e){"use strict";e("lib/decorators/iterate",[],function(){return function(e){function t(e,t,r,o){return n(function(t){return[t,e(t)]},t,r,o)}function n(e,t,o,i){function u(i,u){return r(o(i)).then(function(){return n(e,t,o,u)})}return r(i).then(function(n){return r(t(n)).then(function(t){return t?n:r(e(n)).spread(u)})})}var r=e.resolve;return e.iterate=t,e.unfold=n,e}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/decorators/progress",[],function(){return function(e){return e.prototype.progress=function(e){return this.then(void 0,void 0,e)},e}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/decorators/with",[],function(){return function(e){return e.prototype["with"]=e.prototype.withThis=function(e){var t=this._beget(),n=t._handler;return n.receiver=e,this._handler.chain(n,e),t},e}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/format",[],function(){function e(e){var n="object"==typeof e&&null!==e&&e.stack?e.stack:t(e);return e instanceof Error?n:n+" (WARNING: non-Error used)"}function t(e){var t=String(e);return"[object Object]"===t&&"undefined"!=typeof JSON&&(t=n(e,t)),t}function n(e,t){try{return JSON.stringify(e)}catch(n){return t}}return{formatError:e,formatObject:t,tryStringify:n}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/decorators/unhandledRejection",["require","../env","../format"],function(e){function t(e){throw e}function n(){}var r=e("../env").setTimer,o=e("../format");return function(e){function i(e){e.handled||(d.push(e),a("Potentially unhandled rejection ["+e.id+"] "+o.formatError(e.value)))}function u(e){var t=d.indexOf(e);t>=0&&(d.splice(t,1),l("Handled previous rejection ["+e.id+"] "+o.formatObject(e.value)))}function c(e,t){h.push(e,t),null===p&&(p=r(f,0))}function f(){for(p=null;h.length>0;)h.shift()(h.shift())}var s,a=n,l=n;"undefined"!=typeof console&&(s=console,a="undefined"!=typeof s.error?function(e){s.error(e)}:function(e){s.log(e)},l="undefined"!=typeof s.info?function(e){s.info(e)}:function(e){s.log(e)}),e.onPotentiallyUnhandledRejection=function(e){c(i,e)},e.onPotentiallyUnhandledRejectionHandled=function(e){c(u,e)},e.onFatalRejection=function(e){c(t,e.value)};var h=[],d=[],p=null;return e}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e(require)}),function(e){"use strict";e("lib/makePromise",[],function(){return function(e){function t(e,t){this._handler=e===b?t:n(e)}function n(e){function t(e){o.resolve(e)}function n(e){o.reject(e)}function r(e){o.notify(e)}var o=new w;try{e(t,n,r)}catch(i){n(i)}return o}function r(e){return L(e)?e:new t(b,new g(v(e)))}function o(e){return new t(b,new g(new R(e)))}function i(){return $}function u(){return new t(b,new w)}function c(e,t){var n=new w(e.receiver,e.join().context);return new t(b,n)}function f(e){return a(K,null,e)}function s(e,t){return a(N,e,t)}function a(e,n,r){function o(t,o,u){u.resolved||l(r,i,t,e(n,o,t),u)}function i(e,t,n){a[e]=t,0===--s&&n.become(new q(a))}for(var u,c="function"==typeof n?o:i,f=new w,s=r.length>>>0,a=new Array(s),h=0;h<r.length&&!f.resolved;++h)u=r[h],void 0!==u||h in r?l(r,c,h,u,f):--s;return 0===s&&f.become(new q(a)),new t(b,f)}function l(e,t,n,r,o){if(S(r)){var i=m(r),u=i.state();0===u?i.fold(t,n,void 0,o):u>0?t(n,i.value,o):(o.become(i),h(e,n+1,i))}else t(n,r,o)}function h(e,t,n){for(var r=t;r<e.length;++r)d(v(e[r]),n)}function d(e,t){if(e!==t){var n=e.state();0===n?e.visit(e,void 0,e._unreport):0>n&&e._unreport()}}function p(e){return"object"!=typeof e||null===e?o(new TypeError("non-iterable passed to race()")):0===e.length?i():1===e.length?r(e[0]):y(e)}function y(e){var n,r,o,i=new w;for(n=0;n<e.length;++n)if(r=e[n],void 0!==r||n in e){if(o=v(r),0!==o.state()){i.become(o),h(e,n+1,o);break}o.visit(i,i.resolve,i.reject)}return new t(b,i)}function v(e){return L(e)?e._handler.join():S(e)?_(e):new q(e)}function m(e){return L(e)?e._handler.join():_(e)}function _(e){try{var t=e.then;return"function"==typeof t?new x(t,e):new q(e)}catch(n){return new R(n)}}function b(){}function j(){}function w(e,n){t.createContext(this,n),this.consumers=void 0,this.receiver=e,this.handler=void 0,this.resolved=!1}function g(e){this.handler=e}function x(e,t){w.call(this),I.enqueue(new k(e,t,this))}function q(e){t.createContext(this),this.value=e}function R(e){t.createContext(this),this.id=++Y,this.value=e,this.handled=!1,this.reported=!1,this._report()}function T(e,t){this.rejection=e,this.context=t}function E(e){this.rejection=e}function C(){return new R(new TypeError("Promise cycle"))}function P(e,t){this.continuation=e,this.handler=t}function O(e,t){this.handler=t,this.value=e}function k(e,t,n){this._then=e,this.thenable=t,this.resolver=n}function A(e,t,n,r,o){try{e.call(t,n,r,o)}catch(i){r(i)}}function Q(e,t,n,r){this.f=e,this.z=t,this.c=n,this.to=r,this.resolver=X,this.receiver=this}function L(e){return e instanceof t}function S(e){return("object"==typeof e||"function"==typeof e)&&null!==e}function M(e,n,r,o){return"function"!=typeof e?o.become(n):(t.enterContext(n),F(e,n.value,r,o),void t.exitContext())}function U(e,n,r,o,i){return"function"!=typeof e?i.become(r):(t.enterContext(r),W(e,n,r.value,o,i),void t.exitContext())}function H(e,n,r,o,i){return"function"!=typeof e?i.notify(n):(t.enterContext(r),z(e,n,o,i),void t.exitContext())}function N(e,t,n){try{return e(t,n)}catch(r){return o(r)}}function F(e,t,n,r){try{r.become(v(e.call(n,t)))}catch(o){r.become(new R(o))}}function W(e,t,n,r,o){try{e.call(r,t,n,o)}catch(i){o.become(new R(i))}}function z(e,t,n,r){try{r.notify(e.call(n,t))}catch(o){r.notify(o)}}function J(e,t){t.prototype=V(e.prototype),t.prototype.constructor=t}function K(e,t){return t}function D(){}function G(){return"undefined"!=typeof process&&null!==process&&"function"==typeof process.emit?function(e,t){return"unhandledRejection"===e?process.emit(e,t.value,t):process.emit(e,t)}:"undefined"!=typeof self&&"function"==typeof CustomEvent?function(e,t,n){var r=!1;try{var o=new n("unhandledRejection");r=o instanceof n}catch(i){}return r?function(e,r){var o=new n(e,{detail:{reason:r.value,key:r},bubbles:!1,cancelable:!0});return!t.dispatchEvent(o)}:e}(D,self,CustomEvent):D}var I=e.scheduler,B=G(),V=Object.create||function(e){function t(){}return t.prototype=e,new t};t.resolve=r,t.reject=o,t.never=i,t._defer=u,t._handler=v,t.prototype.then=function(e,t,n){var r=this._handler,o=r.join().state();if("function"!=typeof e&&o>0||"function"!=typeof t&&0>o)return new this.constructor(b,r);var i=this._beget(),u=i._handler;return r.chain(u,r.receiver,e,t,n),i},t.prototype["catch"]=function(e){return this.then(void 0,e)},t.prototype._beget=function(){return c(this._handler,this.constructor)},t.all=f,t.race=p,t._traverse=s,t._visitRemaining=h,b.prototype.when=b.prototype.become=b.prototype.notify=b.prototype.fail=b.prototype._unreport=b.prototype._report=D,b.prototype._state=0,b.prototype.state=function(){return this._state},b.prototype.join=function(){for(var e=this;void 0!==e.handler;)e=e.handler;return e},b.prototype.chain=function(e,t,n,r,o){this.when({resolver:e,receiver:t,fulfilled:n,rejected:r,progress:o})},b.prototype.visit=function(e,t,n,r){this.chain(X,e,t,n,r)},b.prototype.fold=function(e,t,n,r){this.when(new Q(e,t,n,r))},J(b,j),j.prototype.become=function(e){e.fail()};var X=new j;J(b,w),w.prototype._state=0,w.prototype.resolve=function(e){this.become(v(e))},w.prototype.reject=function(e){this.resolved||this.become(new R(e))},w.prototype.join=function(){if(!this.resolved)return this;for(var e=this;void 0!==e.handler;)if(e=e.handler,e===this)return this.handler=C();return e},w.prototype.run=function(){var e=this.consumers,t=this.handler;this.handler=this.handler.join(),this.consumers=void 0;for(var n=0;n<e.length;++n)t.when(e[n])},w.prototype.become=function(e){this.resolved||(this.resolved=!0,this.handler=e,void 0!==this.consumers&&I.enqueue(this),void 0!==this.context&&e._report(this.context))},w.prototype.when=function(e){this.resolved?I.enqueue(new P(e,this.handler)):void 0===this.consumers?this.consumers=[e]:this.consumers.push(e)},w.prototype.notify=function(e){this.resolved||I.enqueue(new O(e,this))},w.prototype.fail=function(e){var t="undefined"==typeof e?this.context:e;this.resolved&&this.handler.join().fail(t)},w.prototype._report=function(e){this.resolved&&this.handler.join()._report(e)},w.prototype._unreport=function(){this.resolved&&this.handler.join()._unreport()},J(b,g),g.prototype.when=function(e){I.enqueue(new P(e,this))},g.prototype._report=function(e){this.join()._report(e)},g.prototype._unreport=function(){this.join()._unreport()},J(w,x),J(b,q),q.prototype._state=1,q.prototype.fold=function(e,t,n,r){U(e,t,this,n,r)},q.prototype.when=function(e){M(e.fulfilled,this,e.receiver,e.resolver)};var Y=0;J(b,R),R.prototype._state=-1,R.prototype.fold=function(e,t,n,r){r.become(this)},R.prototype.when=function(e){"function"==typeof e.rejected&&this._unreport(),M(e.rejected,this,e.receiver,e.resolver)},R.prototype._report=function(e){I.afterQueue(new T(this,e))},R.prototype._unreport=function(){this.handled||(this.handled=!0,I.afterQueue(new E(this)))},R.prototype.fail=function(e){this.reported=!0,B("unhandledRejection",this),t.onFatalRejection(this,void 0===e?this.context:e)},T.prototype.run=function(){this.rejection.handled||this.rejection.reported||(this.rejection.reported=!0,B("unhandledRejection",this.rejection)||t.onPotentiallyUnhandledRejection(this.rejection,this.context))},E.prototype.run=function(){this.rejection.reported&&(B("rejectionHandled",this.rejection)||t.onPotentiallyUnhandledRejectionHandled(this.rejection))},t.createContext=t.enterContext=t.exitContext=t.onPotentiallyUnhandledRejection=t.onPotentiallyUnhandledRejectionHandled=t.onFatalRejection=D;var Z=new b,$=new t(b,Z);return P.prototype.run=function(){this.handler.join().when(this.continuation)},O.prototype.run=function(){var e=this.handler.consumers;if(void 0!==e)for(var t,n=0;n<e.length;++n)t=e[n],H(t.progress,this.value,this.handler,t.receiver,t.resolver)},k.prototype.run=function(){function e(e){r.resolve(e)}function t(e){r.reject(e)}function n(e){r.notify(e)}var r=this.resolver;A(this._then,this.thenable,e,t,n)},Q.prototype.fulfilled=function(e){this.f.call(this.c,this.z,e,this.to)},Q.prototype.rejected=function(e){this.to.reject(e)},Q.prototype.progress=function(e){this.to.notify(e)},t}})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/Scheduler",[],function(){function e(e){this._async=e,this._running=!1,this._queue=this,this._queueLen=0,this._afterQueue={},this._afterQueueLen=0;var t=this;this.drain=function(){t._drain()}}return e.prototype.enqueue=function(e){this._queue[this._queueLen++]=e,this.run()},e.prototype.afterQueue=function(e){this._afterQueue[this._afterQueueLen++]=e,this.run()},e.prototype.run=function(){this._running||(this._running=!0,this._async(this.drain))},e.prototype._drain=function(){for(var e=0;e<this._queueLen;++e)this._queue[e].run(),this._queue[e]=void 0;for(this._queueLen=0,this._running=!1,e=0;e<this._afterQueueLen;++e)this._afterQueue[e].run(),this._afterQueue[e]=void 0;this._afterQueueLen=0},e})}("function"==typeof define&&define.amd?define:function(e){module.exports=e()}),function(e){"use strict";e("lib/Promise",["require","./makePromise","./Scheduler","./env"],function(e){var t=e("./makePromise"),n=e("./Scheduler"),r=e("./env").asap;return t({scheduler:new n(r)})})}("function"==typeof define&&define.amd?define:function(e){module.exports=e(require)}),function(e){"use strict";e("when",["require","./lib/decorators/timed","./lib/decorators/array","./lib/decorators/flow","./lib/decorators/fold","./lib/decorators/inspect","./lib/decorators/iterate","./lib/decorators/progress","./lib/decorators/with","./lib/decorators/unhandledRejection","./lib/TimeoutError","./lib/Promise","./lib/apply"],function(e){function t(e,t,n,r){var o=x.resolve(e);return arguments.length<2?o:o.then(t,n,r)}function n(e){return new x(e)}function r(e){return function(){for(var t=0,n=arguments.length,r=new Array(n);n>t;++t)r[t]=arguments[t];return q(e,this,r)}}function o(e){for(var t=0,n=arguments.length-1,r=new Array(n);n>t;++t)r[t]=arguments[t+1];return q(e,this,r)}function i(){return new u}function u(){function e(e){r._handler.resolve(e)}function t(e){r._handler.reject(e)}function n(e){r._handler.notify(e)}var r=x._defer();this.promise=r,this.resolve=e,this.reject=t,this.notify=n,this.resolver={resolve:e,reject:t,notify:n}}function c(e){return e&&"function"==typeof e.then}function f(){return x.all(arguments)}function s(e){return t(e,x.all)}function a(e){return t(e,x.settle)}function l(e,n){return t(e,function(e){return x.map(e,n)})}function h(e,n){return t(e,function(e){return x.filter(e,n)})}var d=e("./lib/decorators/timed"),p=e("./lib/decorators/array"),y=e("./lib/decorators/flow"),v=e("./lib/decorators/fold"),m=e("./lib/decorators/inspect"),_=e("./lib/decorators/iterate"),b=e("./lib/decorators/progress"),j=e("./lib/decorators/with"),w=e("./lib/decorators/unhandledRejection"),g=e("./lib/TimeoutError"),x=[p,y,v,_,b,m,j,d,w].reduce(function(e,t){return t(e)},e("./lib/Promise")),q=e("./lib/apply")(x);return t.promise=n,t.resolve=x.resolve,t.reject=x.reject,t.lift=r,t["try"]=o,t.attempt=o,t.iterate=x.iterate,t.unfold=x.unfold,t.join=f,t.all=s,t.settle=a,t.any=r(x.any),t.some=r(x.some),t.race=r(x.race),t.map=l,t.filter=h,t.reduce=r(x.reduce),t.reduceRight=r(x.reduceRight),t.isPromiseLike=c,t.Promise=x,t.defer=i,t.TimeoutError=g,t})}("function"==typeof define&&define.amd?define:function(e){module.exports=e(require)});
//# sourceMappingURL=when.js.map