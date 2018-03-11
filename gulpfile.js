var gulp = require('gulp'),
  sass = require('gulp-sass'),
  runSequence = require('run-sequence'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync'),
  nodemon = require('gulp-nodemon')

gulp.task('concat', function() {
  return gulp
    .src(['public/javascripts/templating.js', 'public/javascripts/script.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('public/javascripts/rendered'))
})

gulp.task('sass', function() {
  return gulp
    .src('scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('public/stylesheets'))
})

gulp.task('watch', ['sass', 'concat'], function() {
  gulp.watch('scss/**/*.scss', ['sass'])
  gulp.watch('public/javascripts/**/*.js', ['concat'])
  // Other watchers
  // gulp.watch('app/js/**/*.js', browserSync.reload
})

gulp.task('default', function(callback) {
  runSequence(['concat', 'sass', 'watch'], callback)
})
