define([
    'plex/core/headers',
    'plex/server/interfaces/registry',
    'httpinvoke',
    'when',

    // server interfaces
    'plex/server/interfaces/root'
], function(Headers, registry, httpinvoke, when) {
    function Server(baseUrl) {
        this.baseUrl = baseUrl;
        this.headers = new Headers();

        this.client_identifier = null;
        this.token = null;

        // Expose interfaces
        registry.expose(this);
        registry.exposeRoot(this);
    }

    Server.prototype.request = function(method, path, config) {
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

        // Set extra headers
        if(this.client_identifier !== null) {
            config.headers['X-Plex-Client-Identifier'] = this.client_identifier;
        }

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

    return Server;
});