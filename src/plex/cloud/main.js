define([
    'plex/core/headers',
    'plex/core/http',
    'plex/cloud/interfaces/registry',

    // cloud interfaces
    'plex/cloud/interfaces/api/home/root',
    'plex/cloud/interfaces/api/home/users',
    'plex/cloud/interfaces/api/invites',
    'plex/cloud/interfaces/api/root',

    'plex/cloud/interfaces/pms/main',
    'plex/cloud/interfaces/pms/playlists',
    'plex/cloud/interfaces/pms/social',

    'plex/cloud/interfaces/devices',
    'plex/cloud/interfaces/main',
    'plex/cloud/interfaces/pins',
    'plex/cloud/interfaces/root',
    'plex/cloud/interfaces/users'
], function(Headers, Http, registry) {
    function Cloud() {
        this.http = new Http.Client(this, 'https://plex.tv');
        this.headers = new Headers();

        this.client_identifier = null;
        this.token = null;

        // Expose interfaces
        registry.expose(this);
        registry.exposeRoot(this);
    }

    Cloud.prototype.request = function(method, path, config) {
        return this.http.request(method, path, config);
    };

    return Cloud;
});