var gulp = require('gulp');

var del = require('del');
var rjs = require('requirejs');

gulp.task('cleanup', function(callback) {
  // Delete /dist folder
  del(['./dist/*'], function() {
    callback();
  });
});

//
// AMD
//

gulp.task('amd-plex', ['cleanup'], function(callback) {
  rjs.optimize({
    appDir: 'src/',
    baseUrl: './',
    dir: 'dist/amd/_temp/plex',

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
      { name: 'when', location: '../../../../bower_components/when', main: 'when' }
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

gulp.task('amd-when', ['cleanup'], function(callback) {
  rjs.optimize({
    appDir: 'bower_components/when/',
    baseUrl: './',
    dir: 'dist/amd/_temp/when/',

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

gulp.task('amd-dist', ['amd-when', 'amd-plex'], function() {
  // Copy files to /dist
  gulp.src('./dist/amd/_temp/plex/plex.*')
      .pipe(gulp.dest('./dist/amd/'));

  gulp.src('./dist/amd/_temp/when/when.*')
      .pipe(gulp.dest('./dist/amd/'));

  // Delete temporary folder
  del(['./dist/amd/_temp']);
});

gulp.task('amd', [
  'cleanup',
  'amd-plex',
  'amd-when',
  'amd-dist'
]);

gulp.task('amd-watch', function() {
  gulp.watch('src/**/*.js', [
    'amd'
  ]);
});

//
// Global
//

gulp.task('global-plex', ['cleanup'], function(callback) {
  rjs.optimize({
    appDir: 'src/',
    baseUrl: './',
    dir: 'dist/global/_temp/plex',

    keepBuildDir: true,

    modules: [
      {
        name: 'plex',

        include: [
          '../../../../bower_components/almond/almond.js',
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

    wrap: {
      startFile: './wrappers/plex-start.frag',
      endFile: './wrappers/plex-end.frag'
    },

    packages: [
      { name: 'when', location: '../../../../bower_components/when', main: 'when' }
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

gulp.task('global-when', ['cleanup'], function(callback) {
  rjs.optimize({
    appDir: 'bower_components/when/',
    baseUrl: './',
    dir: 'dist/global/_temp/when/',

    modules: [
      {
        name: 'when',

        include: [
          '../../../../bower_components/almond/almond.js'
        ]
      }
    ],

    //namespace: 'when_rjs',

    wrap: {
      startFile: './wrappers/when-start.frag',
      endFile: './wrappers/when-end.frag'
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

gulp.task('global-dist', ['global-when', 'global-plex'], function() {
  // Copy files to /dist
  gulp.src('./dist/global/_temp/plex/plex.*')
      .pipe(gulp.dest('./dist/global/'));

  gulp.src('./dist/global/_temp/when/when.*')
      .pipe(gulp.dest('./dist/global/'));

  // Delete temporary folder
  del(['./dist/global/_temp']);
});

gulp.task('global', [
    'cleanup',
    'global-plex',
    'global-when',
    'global-dist'
]);

gulp.task('global-watch', function() {
  gulp.watch('src/**/*.js', [
    'global'
  ]);
});

//
// Commands
//

gulp.task('default', [
  'amd',
  'global'
]);

gulp.task('watch', ['amd', 'global'], function() {
  gulp.watch('src/**/*.js', [
    'amd',
    'global'
  ]);
});
