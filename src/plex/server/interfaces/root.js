define([
    'plex/server/interfaces/registry'
], function(registry) {
    function Root($c) {
        this.$c = $c;
    }

    Root.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Root.__path__ + '/' + path, config);
    };

    Root.prototype.details = function(config) {
        return this.$r('GET', '', config);
    };

    Root.prototype.identity = function(config) {
        return this.$r('GET', 'identity', config);
    };

    // Register interface
    Root.__path__ = '';

    registry.set(Root);
});