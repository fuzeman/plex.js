var gulp = require('gulp');
var rjs = require('requirejs');

gulp.task('requirejs', function() {
  rjs.optimize({
    baseUrl: '',
    dir: 'dist',

    modules: [
      {
        name: 'src/plex',

        // Exclude shared libraries
        exclude: [
            'httpinvoke',
            'ua-parser',
            'when'
        ]
      }
    ],

    packages: [
      { name: 'when', location: '../bower_components/when', main: 'when' }
    ],

    paths: {
      "httpinvoke": "bower_components/httpinvoke/httpinvoke-browser",
      "ua-parser": "bower_components/ua-parser-js/dist/ua-parser.min"
    },

    // Wrapper for AMD, CommonJS and Browser compatibility.
    //wrap: {
    //  startFile: 'src/_start.js',
    //  endFile: 'src/_end.js'
    //},
    // Minify the file.
    optimize: 'uglify2',

    skipDirOptimize: true,
    findNestedDependencies: true,
    // Strip comments.
    preserveLicenseComments: false,
    // Add source maps for the original modules.
    generateSourceMaps: true
  });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['requirejs']);
});

gulp.task('default', ['requirejs', 'watch']);
