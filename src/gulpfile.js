/*jslint node: true */
'use strict';
const gulp = require('gulp');
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fs = require('fs');
const jsdoc2md = require('jsdoc-to-markdown');
const deleteComments = require('gulp-decomment');

var BROWSER_SYNC_RELOAD_DELAY = 500;// we'd need a slight delay to reload browsers, connected to browser-sync after restarting nodemon
/*///////////////////////////////////////
Plumber and notification
///////////////////////////////////////*/
function plumberit(errTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errTitle || "Error running Gulp",
      message: "Error: <%= error.message %>"
    })
  });
}
/*///////////////////////////////////////
docs generation
///////////////////////////////////////*/
gulp.task('documentation', () => {
  return jsdoc2md.render({ files: './public/js/script.js' })
    .then(output => fs.writeFileSync('../docs/front.md', output));
});
/*///////////////////////////////////////
Nodemon
///////////////////////////////////////*/
gulp.task('nodemon',(cb) => {
  var called = false;
  return nodemon({
    script: 'bin/www',// nodemon our expressjs server
    //watch: [''] // watch core server file(s) that require server restart on change
    ignore:['public/*','gulpfile.js']
  })
    .on('start', () => {
      if (!called) { return cb(); }// ensure start only got called once
      called = true;
    })
    .on('restart', () => {
      setTimeout(() => {// reload connected browsers after a slight delay
        browserSync.reload({stream: false });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});
/*///////////////////////////////////////
Browser-Sync
///////////////////////////////////////*/
gulp.task('browser-sync', ['nodemon'],  () => {
  browserSync({
    proxy: 'http://localhost:3000',
    port: 4000
   });
});
gulp.task('bs-reload', () => {
  browserSync.reload();
});
/*///////////////////////////////////////
Build
///////////////////////////////////////*/
gulp.task('js',  () => {
  return gulp.src(
    ['./public/js/jquery.js',
    './public/js/materialize.min.js',
    './public/js/jqueryform.js',
    './public/js/moment.js',
    './public/js/chart.js',
    './public/js/init.js',
    './public/js/page.js',
    './public/js/script.js',
    './public/js/scriptChart.js'])
    .pipe(plumberit('JS build Error'))
    .pipe(deleteComments({trim: true}))
    //.pipe(uglify())
    .pipe(concat('js.min.js'))


    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('css', () => {
  return gulp.src(['./public/css/materialize.css','./public/css/*.css','!./public/css/*.min.css'])
        .pipe(plumberit('CSS build Error'))
        .pipe(csso())
        .pipe(concat('css.min.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('hbs-snippets',()=>{
  return gulp.src(['./node_modules/handlebars-materialize-snippets/**/*'])
          .pipe(gulp.dest('./views/partials/'));
});
/*///////////////////////////////////////
Browser-Sync
///////////////////////////////////////*/
gulp.task('default', ['browser-sync','css','js'], () => {
  gulp.watch('public/**/*.js',   ['js','documentation']);
  gulp.watch('public/**/*.css',  ['css']);
  gulp.watch('public/**/*.html', ['bs-reload']);
  gulp.watch('views/**/*.handlebars', ['bs-reload']);
});
