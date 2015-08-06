!function(e,t){"function"==typeof define&&define.amd?define(["httpinvoke","ua-parser","when"],t):e.plex=t(e.httpinvoke,e.UAParser,e.when)}(this,function(e,t,n){var r,i,o;return function(e){function t(e,t){return $.call(e,t)}function n(e,t){var n,r,i,o,s,u,c,p,l,f,a,d=t&&t.split("/"),h=m.map,x=h&&h["*"]||{};if(e&&"."===e.charAt(0))if(t){for(d=d.slice(0,d.length-1),e=e.split("/"),s=e.length-1,m.nodeIdCompat&&w.test(e[s])&&(e[s]=e[s].replace(w,"")),e=d.concat(e),l=0;l<e.length;l+=1)if(a=e[l],"."===a)e.splice(l,1),l-=1;else if(".."===a){if(1===l&&(".."===e[2]||".."===e[0]))break;l>0&&(e.splice(l-1,2),l-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((d||x)&&h){for(n=e.split("/"),l=n.length;l>0;l-=1){if(r=n.slice(0,l).join("/"),d)for(f=d.length;f>0;f-=1)if(i=h[d.slice(0,f).join("/")],i&&(i=i[r])){o=i,u=l;break}if(o)break;!c&&x&&x[r]&&(c=x[r],p=l)}!o&&c&&(o=c,u=p),o&&(n.splice(0,u,o),e=n.join("/"))}return e}function s(t,n){return function(){return d.apply(e,g.call(arguments,0).concat([t,n]))}}function u(e){return function(t){return n(t,e)}}function c(e){return function(t){y[e]=t}}function p(n){if(t(_,n)){var r=_[n];delete _[n],v[n]=!0,a.apply(e,r)}if(!t(y,n)&&!t(v,n))throw new Error("No "+n);return y[n]}function l(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function f(e){return function(){return m&&m.config&&m.config[e]||{}}}var a,d,h,x,y={},_={},m={},v={},$=Object.prototype.hasOwnProperty,g=[].slice,w=/\.js$/;h=function(e,t){var r,i=l(e),o=i[0];return e=i[1],o&&(o=n(o,t),r=p(o)),o?e=r&&r.normalize?r.normalize(e,u(t)):n(e,t):(e=n(e,t),i=l(e),o=i[0],e=i[1],o&&(r=p(o))),{f:o?o+"!"+e:e,n:e,pr:o,p:r}},x={require:function(e){return s(e)},exports:function(e){var t=y[e];return"undefined"!=typeof t?t:y[e]={}},module:function(e){return{id:e,uri:"",exports:y[e],config:f(e)}}},a=function(n,r,i,o){var u,l,f,a,d,m,$=[],g=typeof i;if(o=o||n,"undefined"===g||"function"===g){for(r=!r.length&&i.length?["require","exports","module"]:r,d=0;d<r.length;d+=1)if(a=h(r[d],o),l=a.f,"require"===l)$[d]=x.require(n);else if("exports"===l)$[d]=x.exports(n),m=!0;else if("module"===l)u=$[d]=x.module(n);else if(t(y,l)||t(_,l)||t(v,l))$[d]=p(l);else{if(!a.p)throw new Error(n+" missing "+l);a.p.load(a.n,s(o,!0),c(l),{}),$[d]=y[l]}f=i?i.apply(y[n],$):void 0,n&&(u&&u.exports!==e&&u.exports!==y[n]?y[n]=u.exports:f===e&&m||(y[n]=f))}else n&&(y[n]=i)},r=i=d=function(t,n,r,i,o){if("string"==typeof t)return x[t]?x[t](n):p(h(t,n).f);if(!t.splice){if(m=t,m.deps&&d(m.deps,m.callback),!n)return;n.splice?(t=n,n=r,r=null):t=e}return n=n||function(){},"function"==typeof r&&(r=i,i=o),i?a(e,t,n,r):setTimeout(function(){a(e,t,n,r)},4),d},d.config=function(e){return d(e)},r._defined=y,o=function(e,n,r){n.splice||(r=n,n=[]),t(y,e)||t(_,e)||(_[e]=[e,n,r])},o.amd={jQuery:!0}}(),o("../../../../bower_components/almond/almond.js",function(){}),o("plex/core/utils",[],function(){var e={random:{string:function(t,n){t=e.isDefined(t)?t:16,n=e.isDefined(n)?n:"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(var r="",i=t;i>0;--i)r+=n[Math.round(Math.random()*(n.length-1))];return r}},url:{query:{encode:function(t){if(!e.isDefined(t))return"";var n=[];for(var r in t)t.hasOwnProperty(r)&&n.push(encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return n.join("&")}},encode:function(t,n){var r=e.url.query.encode(n);return 0===r.length?t:t+"?"+r}},clone:function(t){if(null===t||"object"!=typeof t)return t;var n=t.constructor();for(var r in t)t.hasOwnProperty(r)&&(n[r]=e.clone(t[r]));return n},isDefined:function(e){return!("undefined"==typeof e||null===e)}};return e}),o("plex/core/headers",["plex/core/utils","ua-parser"],function(e,t){function n(){var e=new t,n=e.getBrowser(),r=e.getOS();return{"X-Plex-Device":r.name,"X-Plex-Device-Name":null,"X-Plex-Platform":n.name,"X-Plex-Platform-Version":n.version.substr(0,n.version.indexOf(".",3)),"X-Plex-Product":"plex.js","X-Plex-Version":"1.0.0"}}function r(){this["default"]=n(),this.current=e.clone(this["default"])}return r.prototype.get=function(t){t="undefined"!=typeof t?t:{};var n=e.clone(this.current);null===n["X-Plex-Device-Name"]&&(null!==n["X-Plex-Product"]&&null!==n["X-Plex-Platform"]?n["X-Plex-Device-Name"]=n["X-Plex-Product"]+" ("+n["X-Plex-Platform"]+")":null!==n["X-Plex-Product"]?n["X-Plex-Device-Name"]=n["X-Plex-Product"]:n["X-Plex-Device-Name"]="plex.js");for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);return n},r.prototype.update=function(e){for(var t in e)e.hasOwnProperty(t)&&(this.current[t]=e[t])},r.prototype.reset=function(){this.current=e.clone(this["default"])},r.prototype.setDevice=function(e,t){this.update({"X-Plex-Device":t,"X-Plex-Device-Name":e})},r.prototype.setPlatform=function(e,t){this.update({"X-Plex-Platform":e,"X-Plex-Platform-Version":t})},r.prototype.setProduct=function(e,t){this.update({"X-Plex-Product":e,"X-Plex-Version":t})},r}),o("plex/core/http",["plex/core/headers","httpinvoke","when"],function(e,t,n){function r(t,n){this.owner=t,this.baseUrl=n,this.converters=this.buildConverters(),this.headers=new e,this.xmlParser="dom",this._x2js=null}return r.prototype.buildConverters=function(){var e=this;return{"xml text":function(e){return(new XMLSerializer).serializeToString(e)},"text xml":function(t){if("dom"===e.xmlParser)return(new DOMParser).parseFromString(t,"text/xml");if("x2js"===e.xmlParser){if(!X2JS)throw new Error("Missing X2JS library");return null===e._x2js&&(e._x2js=new X2JS),e._x2js.xml_str2json(t)}throw new Error('Unknown "responseType": '+e.xmlParser)}}},r.prototype.request=function(e,r,i){var o=this.baseUrl+r,s=n.defer();return i="undefined"!=typeof i?i:{},i.converters=this.converters,i.headers=this.headers.get(i.headers),null!==this.owner.client_identifier&&(i.headers["X-Plex-Client-Identifier"]=this.owner.client_identifier),null!==this.owner.token&&(i.headers["X-Plex-Token"]=this.owner.token),t(o,e,i).then(function(e){e.statusCode>=200&&e.statusCode<=299?s.resolve(e.body):s.reject(e.body,e.statusCode,e.headers,null,e.statusText)},function(e){s.reject(null,null,null,null,e)}),s.promise},{Client:r}}),o("plex/core/interface_registry",["plex/core/utils"],function(e){function t(){this.interfaces={}}return t.prototype.set=function(t){var n=t.__path__;if("undefined"==typeof n||null===n)throw new Error('Interface is missing a "__path__" attribute',t);if(e.isDefined(this.interfaces[n]))throw new Error('Interface "'+n+'" already registered');this.interfaces[n]=t,console.debug('Registered interface "%s"',n)},t.prototype.expose=function(e){for(var t in this.interfaces)this.interfaces.hasOwnProperty(t)&&(e[t]=new this.interfaces[t](e),console.debug('Exposed interface "%s"',t))},t.prototype.exposeRoot=function(t){var n=t[""];if(e.isDefined(n))for(var r in n)if(0!==r.indexOf("$")&&!n.hasOwnProperty(r)){if(e.isDefined(t[r]))throw new Error('Method proxy "'+r+'" already exists');t[r]=function(e){return function(){return e.apply(n,arguments)}}(n[r]),console.debug('Exposed root method "%s"',r)}},t}),o("plex/cloud/interfaces/registry",["plex/core/interface_registry"],function(e){return new e}),o("plex/cloud/interfaces/api/home/root",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.users=function(){return this.$r("GET","users")},t.__path__="/api/home",e.set(t)}),o("plex/cloud/interfaces/api/home/users",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function n(e){this.$c=e}n.prototype.$r=function(e,t,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,n.__path__+"/"+t,r)},n.prototype["switch"]=function(e,n){if(!t.isDefined(e))throw new Error;var r={};return t.isDefined(n)&&(r.pin=n),this.$r("POST",t.url.encode(e+"/switch",r))},n.__path__="/api/home/users",e.set(n)}),o("plex/cloud/interfaces/api/invites",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.requested=function(){return this.$r("GET","requested")},t.prototype.requests=function(){return this.$r("GET","requests")},t.__path__="/api/invites",e.set(t)}),o("plex/cloud/interfaces/api/root",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function n(e){this.$c=e}n.prototype.$r=function(e,t,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,n.__path__+"/"+t,r)},n.prototype.home=function(){return this.$r("GET","home")},n.prototype.resources=function(e){var n={};return t.isDefined(e)&&("boolean"==typeof e&&(e=e?1:0),n.includeHttps=e),this.$r("GET",t.url.encode("resources",n))},n.prototype.users=function(){return this.$r("GET","users")},n.__path__="/api",e.set(n)}),o("plex/cloud/interfaces/pms/main",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.ip=function(){return this.$r("GET","ip")},t.__path__="/pms/:",e.set(t)}),o("plex/cloud/interfaces/pms/playlists",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.all=function(e){return this.$r("GET",e+"/all")},t.prototype.unwatched=function(e){return this.$r("GET",e+"/unwatched")},t.prototype.deleteItem=function(e,t){return this.$r("DELETE",e+"/items/"+t)},t.__path__="/pms/playlists",e.set(t)}),o("plex/cloud/interfaces/pms/social",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.networks=function(){return this.$r("GET","networks")},t.__path__="/pms/social",e.set(t)}),o("plex/cloud/interfaces/devices",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype["delete"]=function(e){return this.$r("DELETE",e+".xml")},t.__path__="/devices",e.set(t)}),o("plex/cloud/interfaces/main",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function n(e){this.$c=e}n.prototype.$r=function(e,t,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,n.__path__+"/"+t,r)},n.prototype.scrobble=function(e,n){if(!t.isDefined(e)||!t.isDefined(n))throw new Error;return this.$r("GET",t.url.encode("scrobble",{key:e,identifier:n}))},n.prototype.unscrobble=function(e,n){if(!t.isDefined(e)||!t.isDefined(n))throw new Error;return this.$r("GET",t.url.encode("unscrobble",{key:e,identifier:n}))},n.__path__="/:",e.set(n)}),o("plex/cloud/interfaces/pins",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.get=function(e){return this.$r("GET",e+".xml")},t.__path__="/pins",e.set(t)}),o("plex/cloud/interfaces/root",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.devices=function(){return this.$r("GET","devices.xml")},t.prototype.pins=function(){return this.$r("POST","pins.xml")},t.__path__="",e.set(t)}),o("plex/cloud/interfaces/users",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function n(e){this.$c=e}n.prototype.$r=function(e,t,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,n.__path__+"/"+t,r)},n.prototype.account=function(e){var n={};return t.isDefined(e)&&(n["X-Plex-Token"]=e),this.$r("GET","account",{headers:n})},n.prototype.login=function(e,n){if(!t.isDefined(e)||!t.isDefined(n))throw new Error;return this.$r("POST","sign_in.xml",{headers:{Authorization:"Basic "+btoa(e+":"+n)}})},n.__path__="/users",e.set(n)}),o("plex/cloud/main",["plex/core/http","plex/cloud/interfaces/registry","plex/cloud/interfaces/api/home/root","plex/cloud/interfaces/api/home/users","plex/cloud/interfaces/api/invites","plex/cloud/interfaces/api/root","plex/cloud/interfaces/pms/main","plex/cloud/interfaces/pms/playlists","plex/cloud/interfaces/pms/social","plex/cloud/interfaces/devices","plex/cloud/interfaces/main","plex/cloud/interfaces/pins","plex/cloud/interfaces/root","plex/cloud/interfaces/users"],function(e,t){function n(){this.http=new e.Client(this,"https://plex.tv"),this.client_identifier=null,this.token=null,t.expose(this),t.exposeRoot(this)}return n.prototype.request=function(e,t,n){return this.http.request(e,t,n)},n}),o("plex/server/interfaces/registry",["plex/core/interface_registry"],function(e){return new e}),o("plex/server/interfaces/root",["plex/server/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.details=function(){return this.$r("GET","")},t.prototype.identity=function(){return this.$r("GET","identity")},t.__path__="",e.set(t)}),o("plex/server/main",["plex/core/http","plex/server/interfaces/registry","plex/server/interfaces/root"],function(e,t){function n(n){this.http=new e.Client(this,n),this.client_identifier=null,this.token=null,t.expose(this),t.exposeRoot(this)}return n.prototype.request=function(e,t,n){return this.http.request(e,t,n)},n}),o("plex/main",["plex/cloud/main","plex/server/main","plex/core/utils"],function(e,t,n){return{Cloud:e,Server:t,cloud:new e,utils:n}}),o("plex",["plex/main"],function(e){return console.log("plex initialized"),e}),o("httpinvoke",function(){return e}),o("ua-parser",function(){return t}),o("when",function(){return n}),i("plex")});
//# sourceMappingURL=plex.js.map