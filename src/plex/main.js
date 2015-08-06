define([
    'plex/cloud/main',
    'plex/server/main'
], function(Cloud, Server) {
    return {
        Cloud: Cloud,
        Server: Server,

        cloud: new Cloud()
    };
});