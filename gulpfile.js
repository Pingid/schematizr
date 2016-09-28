var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var rename = require("gulp-rename");
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');

gulp.task('clean', function() {
  return del(['lib']);
});

gulp.task('script', ['clean'], function() {
  var bundler = browserify({
    entries: ['./src/index.js'],
    noParse: ['./lib/myLib.js'],
    standalone: 'deepj'
  });
  bundler.transform(babelify);

  bundler.bundle()
      .on('error', function (err) { console.error(err); })
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(rename('deepj.js'))
      .pipe(gulp.dest('lib'))
      .pipe(rename('deepj.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('lib'));
  return bundler;
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('src/*.js', ['script']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'script']);
