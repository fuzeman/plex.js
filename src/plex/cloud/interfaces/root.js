define([
    'plex/cloud/interfaces/registry'
], function(registry) {
    function Root($c) {
        this.$c = $c;
    }

    Root.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Root.__path__ + '/' + path, config);
    };

    Root.prototype.devices = function() {
        return this.$r('GET', 'devices.xml');
    };

    // Register interface
    Root.__path__ = '';

    registry.set(Root);
});