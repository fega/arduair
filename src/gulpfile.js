'use strict';
var gulp = require('gulp');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var csslint = require('gulp-csslint');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('cssmin', function () {
    return gulp.src('./public/css/*.(!min|css)')
        .pipe(csso())
        .pipe(concat('css.min.css'))
        .pipe(gulp.dest('./public/css'));
});

var BROWSER_SYNC_RELOAD_DELAY = 500;// we'd need a slight delay to reload browsers, connected to browser-sync after restarting nodemon

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'bin/www',// nodemon our expressjs server
    //watch: [''] // watch core server file(s) that require server restart on change
    ignore:['public/*','gulpfile.js']
  })
    .on('start', function onStart() {
      if (!called) { cb(); }// ensure start only got called once
      called = true;
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {// reload connected browsers after a slight delay
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',
    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,
    // open the proxied app in chrome
    //browser: ['google-chrome']
  });
});

gulp.task('js',  function () {
  return gulp.src('public/**/*.js')
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('css', function () {
  return gulp.src('public/**/*.css')
    .pipe(browserSync.reload({ stream: true }));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('public/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('public/**/*.css',  ['cssmin',browserSync.reload]);
  gulp.watch('public/**/*.html', ['bs-reload']);
  gulp.watch('views/**/*.handlebars', ['bs-reload']);
});