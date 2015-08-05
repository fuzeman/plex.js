define([
    'plex/cloud/interfaces/registry',
    'when'
], function(registry, when) {
    function PMS($c) {
        this.$c = $c;
    }

    PMS.prototype.$r = function(method, path, config) {
        return this.$c.request(method, PMS.__path__ + '/' + path, config);
    };

    PMS.prototype.ip = function() {
        return this.$r('GET', 'ip');
    };

    // Register interface
    PMS.__path__ = 'pms/:';

    registry.set(PMS);
});