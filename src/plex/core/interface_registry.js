define([], function() {
    function InterfaceRegistry() {
        this.interfaces = {};
    }

    InterfaceRegistry.prototype.set = function(cls) {
        var path = cls.__path__;

        if(typeof path === 'undefined' || path === null) {
            throw new Error('Interface is missing a "__path__" attribute', cls);
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
        }
    };

    return InterfaceRegistry;
});