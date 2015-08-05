define([
    'plex/cloud/main'
], function(Cloud) {
    return {
        Cloud: Cloud,

        cloud: new Cloud()
    };
});