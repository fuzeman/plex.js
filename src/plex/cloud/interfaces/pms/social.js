define([
    'plex/cloud/interfaces/registry'
], function(registry) {
    function Social($c) {
        this.$c = $c;
    }

    Social.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Social.__path__ + '/' + path, config);
    };

    Social.prototype.networks = function() {
        return this.$r('GET', 'networks');
    };

    // Register interface
    Social.__path__ = '/pms/social';

    registry.set(Social);
});