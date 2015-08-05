define([
    'plex/core/headers',
    'plex/cloud/interfaces/registry',
    'httpinvoke',
    'when',

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
], function(Headers, registry, httpinvoke, when) {
    function Cloud() {
        this.baseUrl = 'https://plex.tv';
        this.headers = new Headers();
        this.token = null;

        // Expose interfaces
        registry.expose(this);
        registry.exposeRoot(this);
    }

    Cloud.prototype.request = function(method, path, config) {
        var url = this.baseUrl + path,
            deferred = when.defer();

        // Build request
        config = typeof config !== 'undefined' ? config : {};
        config.converters = {
            'xml text': function(value) {
                var serializer = new XMLSerializer();

                return serializer.serializeToString(value);
            },
            'text xml': function(value) {
                var parser = new DOMParser();

                return parser.parseFromString(value, 'text/xml');
            }
        };
        config.headers = this.headers.get(config.headers);

        if(this.token !== null) {
            config.headers['X-Plex-Token'] = this.token;
        }

        // Send request
        httpinvoke(url, method, config).then(function(response) {
            // Handle response
            if(response.statusCode >= 200 && response.statusCode <= 299) {
                deferred.resolve(response.body);
            } else {
                deferred.reject(response.body, response.statusCode, response.headers, null, response.statusText);
            }
        }, function(statusText) {
            // Socket error
            deferred.reject(null, null, null, null, statusText);
        });

        return deferred.promise;
    };

    return Cloud;
});