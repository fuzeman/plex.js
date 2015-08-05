define([
    'plex/cloud/interfaces/registry',
    'when'
], function(registry, when) {
    function Users($c) {
        this.$c = $c;
    }

    Users.prototype.$r = function(method, path, config) {
        return this.$c.request(method, Users.__path__ + '/' + path, config);
    };

    Users.prototype.account = function() {
        return this.$r('GET', 'account');
    };

    // Register interface
    Users.__path__ = 'users';

    registry.set(Users);
});