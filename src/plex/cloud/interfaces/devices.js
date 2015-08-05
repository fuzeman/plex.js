define([
    'plex/cloud/interfaces/registry'
], function(registry) {
    function Devices($c) {
        this.$c = $c;
    }

    Devices.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Devices.__path__ + '/' + path, config);
    };

    Devices.prototype.delete = function(id) {
        return this.$r('DELETE', id + '.xml');
    };

    // Register interface
    Devices.__path__ = '/devices';

    registry.set(Devices);
});