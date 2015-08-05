define([
    'plex/cloud/interfaces/registry'
], function(registry) {
    function Users($c) {
        this.$c = $c;
    }

    Users.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Users.__path__ + '/' + path, config);
    };

    Users.prototype.account = function() {
        return this.$r('GET', 'account');
    };

    // Register interface
    Users.__path__ = '/users';

    registry.set(Users);
});