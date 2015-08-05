define([
    'plex/cloud/interfaces/registry'
], function(registry) {
    function Playlists($c) {
        this.$c = $c;
    }

    Playlists.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};
        config.outputType = 'xml';

        return this.$c.request(method, Playlists.__path__ + '/' + path, config);
    };

    Playlists.prototype.all = function(playlist) {
        return this.$r('GET', playlist + '/all');
    };

    Playlists.prototype.unwatched = function(playlist) {
        return this.$r('GET', playlist + '/unwatched');
    };

    // Items
    Playlists.prototype.deleteItem = function(playlist, id) {
        return this.$r('DELETE', playlist + '/items/' + id);
    };

    // Register interface
    Playlists.__path__ = '/pms/playlists';

    registry.set(Playlists);
});