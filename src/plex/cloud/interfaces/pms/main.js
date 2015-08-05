define([
    'plex/cloud/interfaces/registry'
], function(registry) {
    function Main($c) {
        this.$c = $c;
    }

    Main.prototype.$r = function(method, path, config) {
        return this.$c.request(method, Main.__path__ + '/' + path, config);
    };

    Main.prototype.ip = function() {
        return this.$r('GET', 'ip');
    };

    // Register interface
    Main.__path__ = '/pms/:';

    registry.set(Main);
});