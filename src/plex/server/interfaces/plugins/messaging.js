define([
    'plex/server/interfaces/registry',
    'when'
], function(registry, when) {
    // Private methods
    function pack(value) {
        var result;

        // dump value to string
        result = cerealizer.dumps(value);

        // encode value to a URL safe format
        result = safe_encode(result);
        result = encodeURIComponent(result);

        return result;
    }

    function unpack(value) {
        var result;

        // decode value from URL safe format
        result = decodeURIComponent(value);
        result = safe_decode(result);

        // load value from string
        return cerealizer.loads(result);
    }

    function safe_encode(value) {
        return btoa(value).replace(/\//g, '@').replace(/\+/g, '*').replace(/\=/g, '_');
    }

    function safe_decode(value) {
        value = value.replace(/\@/g, '/').replace(/\*/g, '+').replace(/\_/g, '=');

        var rem = value.length % 4;

        if(rem > 0) {
            value += _repeat('=', 4 - rem);
        }

        return atob(value);
    }

    function _repeat(x, n) {
        var s = '';
        while (n-- > 0) s += x;
        return s;
    }

    // Messaging interface
    function Messaging($c) {
        this.$c = $c;
    }

    Messaging.prototype.$r = function(method, path, config) {
        config = typeof config !== 'undefined' ? config : {};

        if(path.indexOf('/') !== 0) {
            // Append base interface path
            path = Messaging.__path__ + path;
        }

        // Send request
        return this.$c.request(method, path, config);
    };

    Messaging.prototype.call = function(identifier, key, args, config) {
        // Generate path
        var path = '/:/plugins/' + identifier + '/messaging/' + key;

        // Append arguments to path
        if(args.length > 0) {
            path += '/' + args.join('/');
        }

        return this.$r('GET', path, config);
    };

    Messaging.prototype.callFunction = function(identifier, name, args, kwargs, config) {
        var deferred = when.defer();

        // Set parameter defaults
        args = typeof args !== 'undefined' ? args : [];
        kwargs = typeof kwargs !== 'undefined' ? kwargs : {};

        // Call function
        this.call(identifier, 'function', [
            safe_encode(name),
            pack(args),
            pack(kwargs)
        ], config).then(function(data) {
            data = unpack(data);

            // Parse response
            if(typeof data === 'string') {
                data = JSON.parse(data);
            } else if(typeof data === 'object') {
                console.warn('Legacy response format returned');
            }

            // Return response
            console.debug('Response', data);

            if(data.result !== undefined) {
                deferred.resolve(data.result);
                return;
            }

            // Handle errors
            if(data.error !== undefined) {
                deferred.reject(data.error);
            } else {
                deferred.reject(null);
            }
        }, function(data, status) {
            deferred.reject(data, status);
        });

        return deferred.promise;
    };

    // Register interface
    Messaging.__path__ = '/:/plugins/*/messaging';

    registry.set(Messaging);
});