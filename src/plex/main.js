define([
    'plex/cloud/main',
    'plex/server/main',
    'plex/core/utils'
], function(Cloud, Server, utils) {
    return {
        Cloud: Cloud,
        Server: Server,

        cloud: new Cloud(),
        utils: utils
    };
});