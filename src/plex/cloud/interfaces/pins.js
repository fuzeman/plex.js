define([
    'plex/cloud/interfaces/registry'
], function(registry) {
    function Pins($c) {
        this.$c = $c;
    }

    Pins.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Pins.__path__ + '/' + path, config);
    };

    Pins.prototype.get = function(id) {
        return this.$r('GET', id + '.xml', {
            plex: {
                useToken: false
            }
        });
    };

    // Register interface
    Pins.__path__ = '/pins';

    registry.set(Pins);
});