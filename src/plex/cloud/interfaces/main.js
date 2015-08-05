define([
    'plex/cloud/interfaces/registry',
    'plex/core/utils'
], function(registry, utils) {
    function Main($c) {
        this.$c = $c;
    }

    Main.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Main.__path__ + '/' + path, config);
    };

    Main.prototype.scrobble = function(key, identifier) {
        if(!utils.isDefined(key) || !utils.isDefined(identifier)) {
            throw new Error();
        }

        return this.$r('GET', utils.url.encode('scrobble', {
            key: key,
            identifier: identifier
        }));
    };

    Main.prototype.unscrobble = function(key, identifier) {
        if(!utils.isDefined(key) || !utils.isDefined(identifier)) {
            throw new Error();
        }

        return this.$r('GET', utils.url.encode('unscrobble', {
            key: key,
            identifier: identifier
        }));
    };

    // Register interface
    Main.__path__ = '/:';

    registry.set(Main);
});