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

    Users.prototype.account = function(token) {
        var headers = {};

        if(utils.isDefined(token)) {
            headers['X-Plex-Token'] = token;
        }

        return this.$r('GET', 'account', {
            headers: headers
        });
    };

    Users.prototype.login = function(username, password) {
        if(!utils.isDefined(username) || !utils.isDefined(password)) {
            throw new Error();
        }

        return this.$r('POST', 'sign_in.xml', {
            headers: {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
            }
        });
    };

    // Register interface
    Users.__path__ = '/users';

    registry.set(Users);
});