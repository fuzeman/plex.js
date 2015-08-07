!function(e,t){"function"==typeof define&&define.amd?define(["httpinvoke","ua-parser","when"],t):e.plex=t(e.httpinvoke,e.UAParser,e.when)}(this,function(e,t,r){var n,i,o;return function(e){function t(e,t){return v.call(e,t)}function r(e,t){var r,n,i,o,s,u,c,p,l,f,a,d=t&&t.split("/"),h=m.map,x=h&&h["*"]||{};if(e&&"."===e.charAt(0))if(t){for(d=d.slice(0,d.length-1),e=e.split("/"),s=e.length-1,m.nodeIdCompat&&w.test(e[s])&&(e[s]=e[s].replace(w,"")),e=d.concat(e),l=0;l<e.length;l+=1)if(a=e[l],"."===a)e.splice(l,1),l-=1;else if(".."===a){if(1===l&&(".."===e[2]||".."===e[0]))break;l>0&&(e.splice(l-1,2),l-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((d||x)&&h){for(r=e.split("/"),l=r.length;l>0;l-=1){if(n=r.slice(0,l).join("/"),d)for(f=d.length;f>0;f-=1)if(i=h[d.slice(0,f).join("/")],i&&(i=i[n])){o=i,u=l;break}if(o)break;!c&&x&&x[n]&&(c=x[n],p=l)}!o&&c&&(o=c,u=p),o&&(r.splice(0,u,o),e=r.join("/"))}return e}function s(t,r){return function(){return d.apply(e,$.call(arguments,0).concat([t,r]))}}function u(e){return function(t){return r(t,e)}}function c(e){return function(t){y[e]=t}}function p(r){if(t(_,r)){var n=_[r];delete _[r],g[r]=!0,a.apply(e,n)}if(!t(y,r)&&!t(g,r))throw new Error("No "+r);return y[r]}function l(e){var t,r=e?e.indexOf("!"):-1;return r>-1&&(t=e.substring(0,r),e=e.substring(r+1,e.length)),[t,e]}function f(e){return function(){return m&&m.config&&m.config[e]||{}}}var a,d,h,x,y={},_={},m={},g={},v=Object.prototype.hasOwnProperty,$=[].slice,w=/\.js$/;h=function(e,t){var n,i=l(e),o=i[0];return e=i[1],o&&(o=r(o,t),n=p(o)),o?e=n&&n.normalize?n.normalize(e,u(t)):r(e,t):(e=r(e,t),i=l(e),o=i[0],e=i[1],o&&(n=p(o))),{f:o?o+"!"+e:e,n:e,pr:o,p:n}},x={require:function(e){return s(e)},exports:function(e){var t=y[e];return"undefined"!=typeof t?t:y[e]={}},module:function(e){return{id:e,uri:"",exports:y[e],config:f(e)}}},a=function(r,n,i,o){var u,l,f,a,d,m,v=[],$=typeof i;if(o=o||r,"undefined"===$||"function"===$){for(n=!n.length&&i.length?["require","exports","module"]:n,d=0;d<n.length;d+=1)if(a=h(n[d],o),l=a.f,"require"===l)v[d]=x.require(r);else if("exports"===l)v[d]=x.exports(r),m=!0;else if("module"===l)u=v[d]=x.module(r);else if(t(y,l)||t(_,l)||t(g,l))v[d]=p(l);else{if(!a.p)throw new Error(r+" missing "+l);a.p.load(a.n,s(o,!0),c(l),{}),v[d]=y[l]}f=i?i.apply(y[r],v):void 0,r&&(u&&u.exports!==e&&u.exports!==y[r]?y[r]=u.exports:f===e&&m||(y[r]=f))}else r&&(y[r]=i)},n=i=d=function(t,r,n,i,o){if("string"==typeof t)return x[t]?x[t](r):p(h(t,r).f);if(!t.splice){if(m=t,m.deps&&d(m.deps,m.callback),!r)return;r.splice?(t=r,r=n,n=null):t=e}return r=r||function(){},"function"==typeof n&&(n=i,i=o),i?a(e,t,r,n):setTimeout(function(){a(e,t,r,n)},4),d},d.config=function(e){return d(e)},n._defined=y,o=function(e,r,n){r.splice||(n=r,r=[]),t(y,e)||t(_,e)||(_[e]=[e,r,n])},o.amd={jQuery:!0}}(),o("../../../../bower_components/almond/almond.js",function(){}),o("plex/core/utils",[],function(){var e={random:{string:function(t,r){t=e.isDefined(t)?t:16,r=e.isDefined(r)?r:"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(var n="",i=t;i>0;--i)n+=r[Math.round(Math.random()*(r.length-1))];return n}},url:{query:{encode:function(t){if(!e.isDefined(t))return"";var r=[];for(var n in t)t.hasOwnProperty(n)&&r.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return r.join("&")}},encode:function(t,r){var n=e.url.query.encode(r);return 0===n.length?t:t+"?"+n}},clone:function(t){if(null===t||"object"!=typeof t)return t;var r=t.constructor();for(var n in t)t.hasOwnProperty(n)&&(r[n]=e.clone(t[n]));return r},isDefined:function(e){return!("undefined"==typeof e||null===e)}};return e}),o("plex/core/headers",["plex/core/utils","ua-parser"],function(e,t){function r(){var e=new t,r=e.getBrowser(),n=e.getOS();return{"X-Plex-Device":n.name,"X-Plex-Device-Name":null,"X-Plex-Platform":r.name,"X-Plex-Platform-Version":r.version.substr(0,r.version.indexOf(".",3)),"X-Plex-Product":"plex.js","X-Plex-Version":"1.0.0"}}function n(){this["default"]=r(),this.current=e.clone(this["default"])}return n.prototype.get=function(t){t="undefined"!=typeof t?t:{};var r=e.clone(this.current);null===r["X-Plex-Device-Name"]&&(null!==r["X-Plex-Product"]&&null!==r["X-Plex-Platform"]?r["X-Plex-Device-Name"]=r["X-Plex-Product"]+" ("+r["X-Plex-Platform"]+")":null!==r["X-Plex-Product"]?r["X-Plex-Device-Name"]=r["X-Plex-Product"]:r["X-Plex-Device-Name"]="plex.js");for(var n in t)t.hasOwnProperty(n)&&(r[n]=t[n]);return r},n.prototype.update=function(e){for(var t in e)e.hasOwnProperty(t)&&(this.current[t]=e[t])},n.prototype.reset=function(){this.current=e.clone(this["default"])},n.prototype.setDevice=function(e,t){this.update({"X-Plex-Device":t,"X-Plex-Device-Name":e})},n.prototype.setPlatform=function(e,t){this.update({"X-Plex-Platform":e,"X-Plex-Platform-Version":t})},n.prototype.setProduct=function(e,t){this.update({"X-Plex-Product":e,"X-Plex-Version":t})},n}),o("plex/core/http",["plex/core/headers","httpinvoke","when"],function(e,t,r){function n(t,r){this.owner=t,this.baseUrl=r,this.converters=this.buildConverters(),this.headers=new e,this.xmlParser="dom",this._x2js=null}return n.prototype.buildConverters=function(){var e=this;return{"xml text":function(e){return(new XMLSerializer).serializeToString(e)},"text xml":function(t){if("dom"===e.xmlParser)return(new DOMParser).parseFromString(t,"text/xml");if("x2js"===e.xmlParser){if(!X2JS)throw new Error("Missing X2JS library");return null===e._x2js&&(e._x2js=new X2JS),e._x2js.xml_str2json(t)}throw new Error('Unknown "responseType": '+e.xmlParser)}}},n.prototype.request=function(e,n,i){var o=this.baseUrl+n,s=r.defer();return i="undefined"!=typeof i?i:{},i.converters=this.converters,i.headers=this.headers.get(i.headers),null!==this.owner.client_identifier&&(i.headers["X-Plex-Client-Identifier"]=this.owner.client_identifier),null!==this.owner.token&&(i.headers["X-Plex-Token"]=this.owner.token),t(o,e,i).then(function(e){e.statusCode>=200&&e.statusCode<=299?s.resolve(e.body):s.reject(e.body,e.statusCode,e.headers,null,e.statusText)},function(e){s.reject(null,null,null,null,e)}),s.promise},{Client:n}}),o("plex/core/interface_registry",["plex/core/utils"],function(e){function t(){this.interfaces={}}return t.prototype.set=function(t){var r=t.__path__;if("undefined"==typeof r||null===r)throw new Error('Interface is missing a "__path__" attribute',t);if(e.isDefined(this.interfaces[r]))throw new Error('Interface "'+r+'" already registered');this.interfaces[r]=t,console.debug('Registered interface "%s"',r)},t.prototype.expose=function(e){for(var t in this.interfaces)this.interfaces.hasOwnProperty(t)&&(e[t]=new this.interfaces[t](e),console.debug('Exposed interface "%s"',t))},t.prototype.exposeRoot=function(t){var r=t[""];if(e.isDefined(r))for(var n in r)if(0!==n.indexOf("$")&&!r.hasOwnProperty(n)){if(e.isDefined(t[n]))throw new Error('Method proxy "'+n+'" already exists');t[n]=function(e){return function(){return e.apply(r,arguments)}}(r[n]),console.debug('Exposed root method "%s"',n)}},t}),o("plex/cloud/interfaces/registry",["plex/core/interface_registry"],function(e){return new e}),o("plex/cloud/interfaces/api/home/root",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,r,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,t.__path__+"/"+r,n)},t.prototype.users=function(){return this.$r("GET","users")},t.__path__="/api/home",e.set(t)}),o("plex/cloud/interfaces/api/home/users",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function r(e){this.$c=e}r.prototype.$r=function(e,t,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,r.__path__+"/"+t,n)},r.prototype["switch"]=function(e,r){if(!t.isDefined(e))throw new Error;var n={};return t.isDefined(r)&&(n.pin=r),this.$r("POST",t.url.encode(e+"/switch",n))},r.__path__="/api/home/users",e.set(r)}),o("plex/cloud/interfaces/api/invites",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,r,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,t.__path__+"/"+r,n)},t.prototype.requested=function(){return this.$r("GET","requested")},t.prototype.requests=function(){return this.$r("GET","requests")},t.__path__="/api/invites",e.set(t)}),o("plex/cloud/interfaces/api/root",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function r(e){this.$c=e}r.prototype.$r=function(e,t,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,r.__path__+"/"+t,n)},r.prototype.home=function(){return this.$r("GET","home")},r.prototype.resources=function(e){var r={};return t.isDefined(e)&&("boolean"==typeof e&&(e=e?1:0),r.includeHttps=e),this.$r("GET",t.url.encode("resources",r))},r.prototype.users=function(){return this.$r("GET","users")},r.__path__="/api",e.set(r)}),o("plex/cloud/interfaces/pms/main",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,r,n){return this.$c.request(e,t.__path__+"/"+r,n)},t.prototype.ip=function(){return this.$r("GET","ip")},t.__path__="/pms/:",e.set(t)}),o("plex/cloud/interfaces/pms/playlists",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,r,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,t.__path__+"/"+r,n)},t.prototype.all=function(e){return this.$r("GET",e+"/all")},t.prototype.unwatched=function(e){return this.$r("GET",e+"/unwatched")},t.prototype.deleteItem=function(e,t){return this.$r("DELETE",e+"/items/"+t)},t.__path__="/pms/playlists",e.set(t)}),o("plex/cloud/interfaces/pms/social",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,r,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,t.__path__+"/"+r,n)},t.prototype.networks=function(){return this.$r("GET","networks")},t.__path__="/pms/social",e.set(t)}),o("plex/cloud/interfaces/devices",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,r,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,t.__path__+"/"+r,n)},t.prototype["delete"]=function(e){return this.$r("DELETE",e+".xml")},t.__path__="/devices",e.set(t)}),o("plex/cloud/interfaces/main",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function r(e){this.$c=e}r.prototype.$r=function(e,t,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,r.__path__+"/"+t,n)},r.prototype.scrobble=function(e,r){if(!t.isDefined(e)||!t.isDefined(r))throw new Error;return this.$r("GET",t.url.encode("scrobble",{key:e,identifier:r}))},r.prototype.unscrobble=function(e,r){if(!t.isDefined(e)||!t.isDefined(r))throw new Error;return this.$r("GET",t.url.encode("unscrobble",{key:e,identifier:r}))},r.__path__="/:",e.set(r)}),o("plex/cloud/interfaces/pins",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,r,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,t.__path__+"/"+r,n)},t.prototype.get=function(e){return this.$r("GET",e+".xml")},t.__path__="/pins",e.set(t)}),o("plex/cloud/interfaces/root",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,r,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,t.__path__+"/"+r,n)},t.prototype.devices=function(){return this.$r("GET","devices.xml")},t.prototype.pins=function(){return this.$r("POST","pins.xml")},t.__path__="",e.set(t)}),o("plex/cloud/interfaces/users",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function r(e){this.$c=e}r.prototype.$r=function(e,t,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,r.__path__+"/"+t,n)},r.prototype.account=function(e){var r={};return t.isDefined(e)&&(r["X-Plex-Token"]=e),this.$r("GET","account",{headers:r})},r.prototype.login=function(e,r){if(!t.isDefined(e)||!t.isDefined(r))throw new Error;return this.$r("POST","sign_in.xml",{headers:{Authorization:"Basic "+btoa(e+":"+r)}})},r.__path__="/users",e.set(r)}),o("plex/cloud/main",["plex/core/http","plex/cloud/interfaces/registry","plex/cloud/interfaces/api/home/root","plex/cloud/interfaces/api/home/users","plex/cloud/interfaces/api/invites","plex/cloud/interfaces/api/root","plex/cloud/interfaces/pms/main","plex/cloud/interfaces/pms/playlists","plex/cloud/interfaces/pms/social","plex/cloud/interfaces/devices","plex/cloud/interfaces/main","plex/cloud/interfaces/pins","plex/cloud/interfaces/root","plex/cloud/interfaces/users"],function(e,t){function r(){this.http=new e.Client(this,"https://plex.tv"),this.client_identifier=null,this.token=null,t.expose(this),t.exposeRoot(this)}return r.prototype.request=function(e,t,r){return this.http.request(e,t,r)},r}),o("plex/server/interfaces/registry",["plex/core/interface_registry"],function(e){return new e}),o("plex/server/interfaces/plugins/messaging",["plex/server/interfaces/registry","when"],function(e,t){function r(e){var t;return t=cerealizer.dumps(e),t=i(t),t=encodeURIComponent(t)}function n(e){var t;return t=decodeURIComponent(e),t=o(t),cerealizer.loads(t)}function i(e){return btoa(e).replace(/\//g,"@").replace(/\+/g,"*").replace(/\=/g,"_")}function o(e){e=e.replace(/\@/g,"/").replace(/\*/g,"+").replace(/\_/g,"=");var t=e.length%4;return t>0&&(e+=s("=",4-t)),atob(e)}function s(e,t){for(var r="";t-->0;)r+=e;return r}function u(e){this.$c=e}u.prototype.$r=function(e,t,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",0!==t.indexOf("/")&&(t=u.__path__+t),this.$c.request(e,t,r)},u.prototype.call=function(e,t,r,n){var i="/:/plugins/"+e+"/messaging/"+t;return r.length>0&&(i+="/"+r.join("/")),this.$r("GET",i,n)},u.prototype.callFunction=function(e,o,s,u,c){var p=t.defer();return this.call(e,"function",[i(o),r(s),r(u)],c).then(function(e){return e=n(e),"string"==typeof e?e=JSON.parse(e):"object"==typeof e&&console.warn("Legacy response format returned"),console.debug("Response",e),void 0!==e.result?void p.resolve(e.result):void(void 0!==e.error?p.reject(e.error):p.reject(null))},function(e,t){p.reject(e,t)}),p.promise},u.__path__="/:/plugins/*/messaging",e.set(u)}),o("plex/server/interfaces/root",["plex/server/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,r,n){return n="undefined"!=typeof n?n:{},n.outputType="xml",this.$c.request(e,t.__path__+"/"+r,n)},t.prototype.details=function(){return this.$r("GET","")},t.prototype.identity=function(){return this.$r("GET","identity")},t.__path__="",e.set(t)}),o("plex/server/main",["plex/core/http","plex/server/interfaces/registry","plex/server/interfaces/plugins/messaging","plex/server/interfaces/root"],function(e,t){function r(r){this.http=new e.Client(this,r),this.client_identifier=null,this.token=null,t.expose(this),t.exposeRoot(this)}return r.prototype.request=function(e,t,r){return this.http.request(e,t,r)},r}),o("plex/main",["plex/cloud/main","plex/server/main","plex/core/utils"],function(e,t,r){return{Cloud:e,Server:t,cloud:new e,utils:r}}),o("plex",["plex/main"],function(e){return console.log("plex initialized"),e}),o("httpinvoke",function(){return e}),o("ua-parser",function(){return t}),o("when",function(){return r}),i("plex")});
//# sourceMappingURL=plex.js.map