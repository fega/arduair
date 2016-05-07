'use strict';
var gulp = require('gulp');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var csslint = require('gulp-csslint');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

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
/*///////////////////////////////////////
JS linter
///////////////////////////////////////*/
gulp.task('jslint', function() {
  return gulp.src('**/*.js','!./node_modules/*')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('csslint', function() {
  gulp.src(['./public/css/style.css','./public/css/plataforma.css'])
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync({
    proxy: 'http://localhost:3000',
    port: 4000,
   });
});

gulp.task('js',  function () {
  return gulp.src(['./public/js/jquery.js','./public/js/materialize.min.js','./public/js/jqueryform.js','./public/js/init.js','./public/js/page.js','!./public/js/js.min.js'])
    .pipe(concat('js.min.js'))
    .pipe(uglify({preserveComments:"license"}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('css', function () {
  return gulp.src(['./public/css/materialize.css','./public/css/*.css','!./public/css/*.min.css'])
        .pipe(csso())
        .pipe(concat('css.min.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch('public/**/*.js',   ['js', 'jslint']);
  gulp.watch('public/**/*.css',  ['css']);
  gulp.watch('public/**/*.html', ['bs-reload']);
  gulp.watch('views/**/*.handlebars', ['bs-reload']);
});