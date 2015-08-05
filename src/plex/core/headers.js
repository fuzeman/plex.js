define([
    'plex/core/utils',
    'ua-parser'
], function(utils, UAParser) {
    function buildDefaultHeaders() {
        var parser = new UAParser(),
            browser = parser.getBrowser(),
            os = parser.getOS();

        return {
            'X-Plex-Device': os.name,
            'X-Plex-Device-Name': null,

            'X-Plex-Platform': browser.name,
            'X-Plex-Platform-Version': browser.version.substr(0, browser.version.indexOf('.', 3)),

            'X-Plex-Product': 'plex.js',
            'X-Plex-Version': '1.0.0'
        };
    }

    function Headers() {
        this.default = buildDefaultHeaders();
        this.current = utils.clone(this.default);
    }

    Headers.prototype.get = function(headers) {
        headers = typeof headers !== 'undefined' ? headers : {};

        // Merge headers
        var result = utils.clone(this.current);

        if(result['X-Plex-Device-Name'] === null) {
            // Automatically generate device name
            if(result['X-Plex-Product'] !== null && result['X-Plex-Platform'] !== null) {
                result['X-Plex-Device-Name'] = result['X-Plex-Product'] + ' (' + result['X-Plex-Platform'] + ')';
            } else if(result['X-Plex-Product'] !== null) {
                result['X-Plex-Device-Name'] = result['X-Plex-Product'];
            } else {
                result['X-Plex-Device-Name'] = 'plex.js';
            }
        }

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

            this.current[key] = headers[key];
        }
    };

    Headers.prototype.reset = function() {
        this.current = utils.clone(this.default);
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