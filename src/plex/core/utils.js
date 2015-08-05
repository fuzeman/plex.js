define([], function() {
    var utils = {
        url: {
            query: {
                encode: function(parameters) {
                    // Check if the `parameters` are valid
                    if(!utils.isDefined(parameters)) {
                        return '';
                    }

                    // Build query string
                    var components = [];

                    for(var key in parameters) {
                        if(!parameters.hasOwnProperty(key)) {
                            continue;
                        }

                        components.push(encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key]));
                    }

                    return components.join('&');
                }
            },

            encode: function(path, parameters) {
                var query = utils.url.query.encode(parameters);

                if(query.length === 0) {
                    // No parameters provided
                    return path;
                }

                return path + '?' + query;
            }
        },

        clone: function(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }

            var temp = obj.constructor();

            for (var key in obj) {
                if(!obj.hasOwnProperty(key)) {
                    continue;
                }

                temp[key] = utils.clone(obj[key]);
            }

            return temp;
        },

        isDefined: function(value) {
            return !!(typeof value !== 'undefined' && value !== null);
        }
    };

    return utils;
});