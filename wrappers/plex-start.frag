(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['httpinvoke', 'ua-parser', 'when'], factory);
  } else {
    // Global
    root.plex = factory(root.httpinvoke, root.UAParser, root.when);
  }
}(this, function(httpinvoke, UAParser, when) {