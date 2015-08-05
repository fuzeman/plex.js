define([
    'plex/cloud/interfaces/registry',
    'plex/core/utils'
], function(registry, utils) {
    function Root($c) {
        this.$c = $c;
    }

    Root.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Root.__path__ + '/' + path, config);
    };

    Root.prototype.home = function() {
        return this.$r('GET', 'home');
    };

    Root.prototype.resources = function(includeHttps) {
        // Build query
        var parameters = {};

        if(utils.isDefined(includeHttps)) {
            // Convert boolean to integer
            if(typeof includeHttps === 'boolean') {
                includeHttps = includeHttps ? 1 : 0;
            }

            parameters['includeHttps'] = includeHttps;
        }

        // Send request
        return this.$r('GET', utils.url.encode('resources', parameters));
    };

    Root.prototype.users = function() {
        return this.$r('GET', 'users');
    };

    // Register interface
    Root.__path__ = '/api';

    registry.set(Root);
});