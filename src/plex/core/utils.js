define([], function() {
    var utils = {
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
        }
    };

    return utils;
});