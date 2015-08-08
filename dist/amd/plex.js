define("plex/core/utils",[],function(){var e={random:{string:function(t,n){t=e.isDefined(t)?t:16,n=e.isDefined(n)?n:"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(var r="",i=t;i>0;--i)r+=n[Math.round(Math.random()*(n.length-1))];return r}},url:{query:{encode:function(t){if(!e.isDefined(t))return"";var n=[];for(var r in t)t.hasOwnProperty(r)&&n.push(encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return n.join("&")}},encode:function(t,n){var r=e.url.query.encode(n);return 0===r.length?t:t+"?"+r}},clone:function(t){if(null===t||"object"!=typeof t)return t;var n=t.constructor();for(var r in t)t.hasOwnProperty(r)&&(n[r]=e.clone(t[r]));return n},isDefined:function(e){return!("undefined"==typeof e||null===e)}};return e}),define("plex/core/headers",["plex/core/utils","ua-parser"],function(e,t){function n(){var e=new t,n=e.getBrowser(),r=e.getOS();return{"X-Plex-Device":r.name,"X-Plex-Device-Name":null,"X-Plex-Platform":n.name,"X-Plex-Platform-Version":n.version.substr(0,n.version.indexOf(".",3)),"X-Plex-Product":"plex.js","X-Plex-Version":"1.0.0"}}function r(){this["default"]=n(),this.current=e.clone(this["default"])}return r.prototype.get=function(t){t="undefined"!=typeof t?t:{};var n=e.clone(this.current);null===n["X-Plex-Device-Name"]&&(null!==n["X-Plex-Product"]&&null!==n["X-Plex-Platform"]?n["X-Plex-Device-Name"]=n["X-Plex-Product"]+" ("+n["X-Plex-Platform"]+")":null!==n["X-Plex-Product"]?n["X-Plex-Device-Name"]=n["X-Plex-Product"]:n["X-Plex-Device-Name"]="plex.js");for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);return n},r.prototype.update=function(e){for(var t in e)e.hasOwnProperty(t)&&(this.current[t]=e[t])},r.prototype.reset=function(){this.current=e.clone(this["default"])},r.prototype.setDevice=function(e,t){this.update({"X-Plex-Device":t,"X-Plex-Device-Name":e})},r.prototype.setPlatform=function(e,t){this.update({"X-Plex-Platform":e,"X-Plex-Platform-Version":t})},r.prototype.setProduct=function(e,t){this.update({"X-Plex-Product":e,"X-Plex-Version":t})},r}),define("plex/core/http",["plex/core/headers","plex/core/utils","httpinvoke","when"],function(e,t,n,r){function i(t,n){this.owner=t,this.baseUrl=n,this.converters=this.buildConverters(),this.headers=new e,this.xmlParser="dom",this._x2js=null}var o=["Cache-Control","Content-Language","Content-Type","Expires","Last-Modified","Pragma"];return i.prototype.buildConverters=function(){var e=this;return{"xml text":function(e){return(new XMLSerializer).serializeToString(e)},"text xml":function(t){if("dom"===e.xmlParser)return(new DOMParser).parseFromString(t,"text/xml");if("x2js"===e.xmlParser){if(!X2JS)throw new Error("Missing X2JS library");return null===e._x2js&&(e._x2js=new X2JS),e._x2js.xml_str2json(t)}throw new Error('Unknown "responseType": '+e.xmlParser)}}},i.prototype.getSettings=function(e){var n={};return t.isDefined(e.plex)&&(n=e.plex,delete e.plex),n.useToken=t.isDefined(n.useToken)?n.useToken:!0,n},i.prototype.request=function(e,t,i){var s=this.baseUrl+t,u=r.defer(),c=this.getSettings(i);return i="undefined"!=typeof i?i:{},i.converters=this.converters,i.corsExposedHeaders=o,i.corsExposedHeadersDefaults=!1,i.headers=this.headers.get(i.headers),null!==this.owner.client_identifier&&(i.headers["X-Plex-Client-Identifier"]=this.owner.client_identifier),null!==this.owner.token&&c.useToken&&(i.headers["X-Plex-Token"]=this.owner.token),n(s,e,i).then(function(e){e.statusCode>=200&&e.statusCode<=299?u.resolve(e.body):u.reject(e.body,e.statusCode,e.headers,null,e.statusText)},function(e){u.reject(null,null,null,null,e)}),u.promise},{Client:i}}),define("plex/core/interface_registry",["plex/core/utils"],function(e){function t(){this.interfaces={}}return t.prototype.set=function(t){var n=t.__path__;if("undefined"==typeof n||null===n)throw new Error('Interface is missing a "__path__" attribute',t);if(e.isDefined(this.interfaces[n]))throw new Error('Interface "'+n+'" already registered');this.interfaces[n]=t,console.debug('Registered interface "%s"',n)},t.prototype.expose=function(e){for(var t in this.interfaces)this.interfaces.hasOwnProperty(t)&&(e[t]=new this.interfaces[t](e),console.debug('Exposed interface "%s"',t))},t.prototype.exposeRoot=function(t){var n=t[""];if(e.isDefined(n))for(var r in n)if(0!==r.indexOf("$")&&!n.hasOwnProperty(r)){if(e.isDefined(t[r]))throw new Error('Method proxy "'+r+'" already exists');t[r]=function(e){return function(){return e.apply(n,arguments)}}(n[r]),console.debug('Exposed root method "%s"',r)}},t}),define("plex/cloud/interfaces/registry",["plex/core/interface_registry"],function(e){return new e}),define("plex/cloud/interfaces/api/home/root",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.users=function(){return this.$r("GET","users")},t.__path__="/api/home",e.set(t)}),define("plex/cloud/interfaces/api/home/users",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function n(e){this.$c=e}n.prototype.$r=function(e,t,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,n.__path__+"/"+t,r)},n.prototype["switch"]=function(e,n){if(!t.isDefined(e))throw new Error;var r={};return t.isDefined(n)&&(r.pin=n),this.$r("POST",t.url.encode(e+"/switch",r))},n.__path__="/api/home/users",e.set(n)}),define("plex/cloud/interfaces/api/invites",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.requested=function(){return this.$r("GET","requested")},t.prototype.requests=function(){return this.$r("GET","requests")},t.__path__="/api/invites",e.set(t)}),define("plex/cloud/interfaces/api/root",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function n(e){this.$c=e}n.prototype.$r=function(e,t,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,n.__path__+"/"+t,r)},n.prototype.home=function(){return this.$r("GET","home")},n.prototype.resources=function(e){var n={};return t.isDefined(e)&&("boolean"==typeof e&&(e=e?1:0),n.includeHttps=e),this.$r("GET",t.url.encode("resources",n))},n.prototype.users=function(){return this.$r("GET","users")},n.__path__="/api",e.set(n)}),define("plex/cloud/interfaces/pms/main",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.ip=function(){return this.$r("GET","ip")},t.__path__="/pms/:",e.set(t)}),define("plex/cloud/interfaces/pms/playlists",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.all=function(e){return this.$r("GET",e+"/all")},t.prototype.unwatched=function(e){return this.$r("GET",e+"/unwatched")},t.prototype.deleteItem=function(e,t){return this.$r("DELETE",e+"/items/"+t)},t.__path__="/pms/playlists",e.set(t)}),define("plex/cloud/interfaces/pms/social",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.networks=function(){return this.$r("GET","networks")},t.__path__="/pms/social",e.set(t)}),define("plex/cloud/interfaces/devices",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype["delete"]=function(e){return this.$r("DELETE",e+".xml")},t.__path__="/devices",e.set(t)}),define("plex/cloud/interfaces/main",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function n(e){this.$c=e}n.prototype.$r=function(e,t,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,n.__path__+"/"+t,r)},n.prototype.scrobble=function(e,n){if(!t.isDefined(e)||!t.isDefined(n))throw new Error;return this.$r("GET",t.url.encode("scrobble",{key:e,identifier:n}))},n.prototype.unscrobble=function(e,n){if(!t.isDefined(e)||!t.isDefined(n))throw new Error;return this.$r("GET",t.url.encode("unscrobble",{key:e,identifier:n}))},n.__path__="/:",e.set(n)}),define("plex/cloud/interfaces/pins",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.get=function(e){return this.$r("GET",e+".xml",{plex:{useToken:!1}})},t.__path__="/pins",e.set(t)}),define("plex/cloud/interfaces/root",["plex/cloud/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.devices=function(){return this.$r("GET","devices.xml")},t.prototype.pins=function(){return this.$r("POST","pins.xml",{plex:{useToken:!1}})},t.__path__="",e.set(t)}),define("plex/cloud/interfaces/users",["plex/cloud/interfaces/registry","plex/core/utils"],function(e,t){function n(e){this.$c=e}n.prototype.$r=function(e,t,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,n.__path__+"/"+t,r)},n.prototype.account=function(e,n){return n=t.isDefined(n)?n:{},n.headers={},t.isDefined(e)&&(n.headers["X-Plex-Token"]=e),this.$r("GET","account",n)},n.prototype.login=function(e,n){if(!t.isDefined(e)||!t.isDefined(n))throw new Error;return this.$r("POST","sign_in.xml",{headers:{Authorization:"Basic "+btoa(e+":"+n)},plex:{useToken:!1}})},n.__path__="/users",e.set(n)}),define("plex/cloud/main",["plex/core/http","plex/cloud/interfaces/registry","plex/cloud/interfaces/api/home/root","plex/cloud/interfaces/api/home/users","plex/cloud/interfaces/api/invites","plex/cloud/interfaces/api/root","plex/cloud/interfaces/pms/main","plex/cloud/interfaces/pms/playlists","plex/cloud/interfaces/pms/social","plex/cloud/interfaces/devices","plex/cloud/interfaces/main","plex/cloud/interfaces/pins","plex/cloud/interfaces/root","plex/cloud/interfaces/users"],function(e,t){function n(){this.http=new e.Client(this,"https://plex.tv"),this.client_identifier=null,this.token=null,t.expose(this),t.exposeRoot(this)}return n.prototype.request=function(e,t,n){return this.http.request(e,t,n)},n}),define("plex/server/interfaces/registry",["plex/core/interface_registry"],function(e){return new e}),define("plex/server/interfaces/plugins/messaging",["plex/server/interfaces/registry","when"],function(e,t){function n(e){var t;return t=cerealizer.dumps(e),t=i(t),t=encodeURIComponent(t)}function r(e){var t;return t=decodeURIComponent(e),t=o(t),cerealizer.loads(t)}function i(e){return btoa(e).replace(/\//g,"@").replace(/\+/g,"*").replace(/\=/g,"_")}function o(e){e=e.replace(/\@/g,"/").replace(/\*/g,"+").replace(/\_/g,"=");var t=e.length%4;return t>0&&(e+=s("=",4-t)),atob(e)}function s(e,t){for(var n="";t-->0;)n+=e;return n}function u(e){this.$c=e}u.prototype.$r=function(e,t,n){return n="undefined"!=typeof n?n:{},0!==t.indexOf("/")&&(t=u.__path__+t),this.$c.request(e,t,n)},u.prototype.call=function(e,t,n,r){var i="/:/plugins/"+e+"/messaging/"+t;return n.length>0&&(i+="/"+n.join("/")),this.$r("GET",i,r)},u.prototype.callFunction=function(e,o,s,u,c){var p=t.defer();return s="undefined"!=typeof s?s:[],u="undefined"!=typeof u?u:{},this.call(e,"function",[i(o),n(s),n(u)],c).then(function(e){try{p.resolve(r(e))}catch(t){p.reject(null)}},function(e,t){p.reject(e,t)}),p.promise},u.__path__="/:/plugins/*/messaging",e.set(u)}),define("plex/server/interfaces/root",["plex/server/interfaces/registry"],function(e){function t(e){this.$c=e}t.prototype.$r=function(e,n,r){return r="undefined"!=typeof r?r:{},r.outputType="xml",this.$c.request(e,t.__path__+"/"+n,r)},t.prototype.details=function(){return this.$r("GET","")},t.prototype.identity=function(){return this.$r("GET","identity")},t.__path__="",e.set(t)}),define("plex/server/main",["plex/core/http","plex/server/interfaces/registry","plex/server/interfaces/plugins/messaging","plex/server/interfaces/root"],function(e,t){function n(n){this.http=new e.Client(this,n),this.client_identifier=null,this.token=null,t.expose(this),t.exposeRoot(this)}return n.prototype.request=function(e,t,n){return this.http.request(e,t,n)},n}),define("plex/main",["plex/cloud/main","plex/server/main","plex/core/utils"],function(e,t,n){return{Cloud:e,Server:t,cloud:new e,utils:n}}),define("plex",["plex/main"],function(e){return console.log("plex initialized"),e});
//# sourceMappingURL=plex.js.map