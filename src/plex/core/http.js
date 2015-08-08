define([
    'plex/core/headers',
    'plex/core/utils',
    'httpinvoke',
    'when'
], function(Headers, utils, httpinvoke, when) {
    var corsExposedHeaders = ['Cache-Control', 'Content-Language', 'Content-Type', 'Expires', 'Last-Modified', 'Pragma'];

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

    HttpClient.prototype.getSettings = function(config) {
        var settings = {};

        if(utils.isDefined(config.plex)) {
            settings = config.plex;

            // Remove `plex` from request configuration
            delete config.plex;
        }

        // Set defaults
        settings.useToken = utils.isDefined(settings.useToken) ? settings.useToken : true;

        return settings;
    };

    HttpClient.prototype.request = function(method, path, config) {
        var url = this.baseUrl + path,
            deferred = when.defer();

        // Retrieve plex settings
        var settings = this.getSettings(config);

        // Build request
        config = typeof config !== 'undefined' ? config : {};
        config.converters = this.converters;
        config.corsExposedHeaders = corsExposedHeaders;
        config.corsExposedHeadersDefaults = false;
        config.headers = this.headers.get(config.headers);

        // Set extra headers
        if(this.owner.client_identifier !== null) {
            config.headers['X-Plex-Client-Identifier'] = this.owner.client_identifier;
        }

        if(this.owner.token !== null && settings.useToken) {
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