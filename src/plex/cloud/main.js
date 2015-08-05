define([
    'plex/core/headers',
    'plex/cloud/interfaces/registry',
    'httpinvoke',
    'when',

    'plex/cloud/interfaces/pms/main',
    'plex/cloud/interfaces/users'
], function(Headers, registry, httpinvoke, when) {
    function Cloud() {
        this.baseUrl = 'https://plex.tv';
        this.headers = new Headers();
        this.token = null;

        // Expose interfaces
        registry.expose(this);
    }

    Cloud.prototype.request = function(method, path, config) {
        var url = this.baseUrl + '/' + path,
            deferred = when.defer();

        // Build request
        config = typeof config !== 'undefined' ? config : {};
        config.headers = this.headers.get(config.headers);

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