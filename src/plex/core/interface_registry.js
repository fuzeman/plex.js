define([
    'plex/core/utils'
], function(utils) {
    function InterfaceRegistry() {
        this.interfaces = {};
    }

    InterfaceRegistry.prototype.set = function(cls) {
        var path = cls.__path__;

        if(typeof path === 'undefined' || path === null) {
            throw new Error('Interface is missing a "__path__" attribute', cls);
        }

        if(utils.isDefined(this.interfaces[path])) {
            throw new Error('Interface "' + path + '" already registered');
        }

        // Register interface
        this.interfaces[path] = cls;

        console.debug('Registered interface "%s"', path);
    };

    InterfaceRegistry.prototype.expose = function(target) {
        for(var key in this.interfaces) {
            if(!this.interfaces.hasOwnProperty(key)) {
                continue;
            }

            target[key] = new this.interfaces[key](target);

            console.debug('Exposed interface "%s"', key);
        }
    };

    InterfaceRegistry.prototype.exposeRoot = function(target) {
        var cls = target[''];

        if(!utils.isDefined(cls)) {
            return;
        }

        // Apply root method proxies to `target`
        for(var key in cls) {
            // Ignore class attributes, and attributes starting with '$'
            if(key.indexOf('$') === 0 || cls.hasOwnProperty(key)) {
                continue;
            }

            // Ensure `target` proxy doesn't already exist
            if(utils.isDefined(target[key])) {
                throw new Error('Method proxy "' + key + '" already exists');
            }

            // Create method proxy
            target[key] = (function(method) {
                return function() {
                    return method.apply(cls, arguments);
                };
            })(cls[key]);

            console.debug('Exposed root method "%s"', key);
        }
    };

    return InterfaceRegistry;
});