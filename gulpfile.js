var gulp = require('gulp');

var del = require('del');
var rjs = require('requirejs');

gulp.task('cleanup', function(callback) {
  // Delete /dist folder
  del(['./dist/*'], function() {
    callback();
  });
});

gulp.task('optimize-when', ['cleanup'], function(callback) {
  rjs.optimize({
    appDir: 'bower_components/when/',
    baseUrl: './',
    dir: 'dist/_temp/when/',

    modules: [
      {
        name: 'when'
      }
    ],

    // Minify the file.
    optimize: 'uglify2',

    // Don't optimize other files
    skipDirOptimize: true,

    // Remove combined modules from the /dist directory
    removeCombined: true,

    // Strip comments.
    preserveLicenseComments: false,

    // Add source maps for the original modules.
    generateSourceMaps: true,

    onModuleBundleComplete: function() {
      callback();
    }
  });
});

gulp.task('optimize-plex', ['cleanup'], function(callback) {
  rjs.optimize({
    appDir: 'src/',
    baseUrl: './',
    dir: 'dist/_temp/plex',

    keepBuildDir: true,

    modules: [
      {
        name: 'plex',

        include: [
            'plex/main'
        ],

        // Exclude shared libraries
        exclude: [
            'httpinvoke',
            'ua-parser',
            'when'
        ]
      }
    ],

    packages: [
      { name: 'when', location: '../../../bower_components/when', main: 'when' }
    ],

    paths: {
      "httpinvoke": "../bower_components/httpinvoke/httpinvoke-browser",
      "ua-parser": "../bower_components/ua-parser-js/dist/ua-parser.min"
    },

    // Minify the file.
    optimize: 'uglify2',

    // Don't optimize other files
    skipDirOptimize: true,

    // Remove combined modules from the /dist directory
    removeCombined: true,

    // Strip comments.
    preserveLicenseComments: false,

    // Add source maps for the original modules.
    generateSourceMaps: true,

    onModuleBundleComplete: function() {
      callback();
    }
  });
});

gulp.task('dist', ['optimize-when', 'optimize-plex'], function() {
  // Copy files to /dist
  gulp.src('./dist/_temp/plex/plex.*')
      .pipe(gulp.dest('./dist/'));

  gulp.src('./dist/_temp/when/when.*')
      .pipe(gulp.dest('./dist/'));

  // Delete temporary folder
  del(['./dist/_temp']);
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', [
    'cleanup',
    'optimize-when', 'optimize-plex',
    'dist'
  ]);
});

gulp.task('default', [
  'cleanup',
  'optimize-when', 'optimize-plex',
  'dist',
  'watch'
]);
