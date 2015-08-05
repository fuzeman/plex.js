define([
    'plex/cloud/interfaces/registry',
    'plex/core/utils'
], function(registry, utils) {
    function Users($c) {
        this.$c = $c;
    }

    Users.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Users.__path__ + '/' + path, config);
    };

    Users.prototype.switch = function(id, pin) {
        if(!utils.isDefined(id)) {
            throw new Error();
        }

        // Build query
        var parameters = {};

        if(utils.isDefined(pin)) {
            parameters['pin'] = pin;
        }

        // Send request
        return this.$r('POST', utils.url.encode(id + '/switch', parameters));
    };

    // Register interface
    Users.__path__ = '/api/home/users';

    registry.set(Users);
});