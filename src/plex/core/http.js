define([
    'plex/core/headers',
    'httpinvoke',
    'when'
], function(Headers, httpinvoke, when) {
    function HttpClient(owner, baseUrl) {
        this.owner = owner;
        this.baseUrl = baseUrl;

        this.converters = this.buildConverters();
        this.headers = new Headers();
        this.xmlParser = 'dom';

        this._x2js = null;
    }

    HttpClient.prototype.buildConverters = function() {
        var self = this;

        return {
            'xml text': function(value) {
                return (new XMLSerializer()).serializeToString(value);
            },
            'text xml': function(value) {
                if(self.xmlParser === 'dom') {
                    return (new DOMParser()).parseFromString(value, 'text/xml');
                }

                if(self.xmlParser === 'x2js') {
                    // Check if x2js is available
                    if (!X2JS) {
                        throw new Error("Missing X2JS library");
                    }

                    if(self._x2js === null) {
                        self._x2js = new X2JS();
                    }

                    // Parse response
                    return self._x2js.xml_str2json(value);
                }

                throw new Error('Unknown "responseType": ' + self.xmlParser);
            }
        };
    };

    HttpClient.prototype.request = function(method, path, config) {
        var url = this.baseUrl + path,
            deferred = when.defer();

        // Build request
        config = typeof config !== 'undefined' ? config : {};
        config.converters = this.converters;
        config.headers = this.headers.get(config.headers);

        // Set extra headers
        if(this.owner.client_identifier !== null) {
            config.headers['X-Plex-Client-Identifier'] = this.owner.client_identifier;
        }

        if(this.owner.token !== null) {
            config.headers['X-Plex-Token'] = this.owner.token;
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

    return {
        Client: HttpClient
    };
});