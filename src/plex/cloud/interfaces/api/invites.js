define([
    'plex/cloud/interfaces/registry'
], function(registry) {
    function Invites($c) {
        this.$c = $c;
    }

    Invites.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Invites.__path__ + '/' + path, config);
    };

    Invites.prototype.requested = function() {
        return this.$r('GET', 'requested');
    };

    Invites.prototype.requests = function() {
        return this.$r('GET', 'requests');
    };

    // Register interface
    Invites.__path__ = '/api/invites';

    registry.set(Invites);
});