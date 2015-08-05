define([
    'plex/core/utils',
    'ua-parser'
], function(utils, UAParser) {
    var parser = new UAParser(),
        defaultHeaders = {
            'X-Plex-Device': null,
            'X-Plex-Device-Name': null,

            'X-Plex-Platform': null,
            'X-Plex-Platform-Version': null,

            'X-Plex-Product': 'plex.js',
            'X-Plex-Version': '1.0.0'
        };

    function Headers() {
        this.headers = {};

        console.log(parser);
        console.log(defaultHeaders);
    }

    Headers.prototype.get = function(headers) {
        headers = typeof headers !== 'undefined' ? headers : {};

        // Merge headers
        var result = utils.clone(this.headers);

        for(var key in headers) {
            if(!headers.hasOwnProperty(key)) {
                continue;
            }

            result[key] = headers[key];
        }

        return result;
    };

    Headers.prototype.update = function(headers) {
        for(var key in headers) {
            if(!headers.hasOwnProperty(key)) {
                continue;
            }

            this.headers[key] = headers[key];
        }
    };

    Headers.prototype.reset = function() {
        this.headers = utils.clone(defaultHeaders);
    };

    Headers.prototype.setDevice = function(name, device) {
        this.update({
            'X-Plex-Device': device,
            'X-Plex-Device-Name': name
        });
    };

    Headers.prototype.setPlatform = function(name, version) {
        this.update({
            'X-Plex-Platform': name,
            'X-Plex-Platform-Version': version
        });
    };

    Headers.prototype.setProduct = function(name, version) {
        this.update({
            'X-Plex-Product': name,
            'X-Plex-Version': version
        });
    };

    return Headers;
});