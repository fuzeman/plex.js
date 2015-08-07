define([
    'plex/core/http',
    'plex/server/interfaces/registry',

    // server interfaces
    'plex/server/interfaces/plugins/messaging',

    'plex/server/interfaces/root'
], function(Http, registry) {
    function Server(baseUrl) {
        this.http = new Http.Client(this, baseUrl);

        this.client_identifier = null;
        this.token = null;

        // Expose interfaces
        registry.expose(this);
        registry.exposeRoot(this);
    }

    Server.prototype.request = function(method, path, config) {
        return this.http.request(method, path, config);
    };

    return Server;
});