'use strict';
var gulp = require('gulp'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  brfs = require('brfs'),

  transform = require('vinyl-transform'),
  markdox = require('gulp-markdox');
  // pkg = require('./package.json'),
  // template = require('lodash.template');

gulp.task('default', ['clean', 'compile']);
gulp.task('compile', ['compile:lib', 'doc']);


gulp.task('watch', function() {
  gulp.watch('lib/*', ['compile']);
});

gulp.task('clean', ['clean:js', 'clean:jade']);
gulp.task('compile', ['compile:js', 'compile:jade']);


gulp.task('clean:js', function() {
  return gulp.src(['dist/trelloWebComponent*'], { read: false })
    .pipe(clean());
});

gulp.task('clean:jade', function() {
  return gulp.src(['dist/src/*.html'], { read: false })
    .pipe(clean({force:true}));
});


gulp.task('compile:js', ['clean:js', 'compile:jade'], function() {
  return gulp.src('lib/trelloWebComponent.js')
    .pipe(transform(brfs))
    .pipe(rename('trelloWebComponent.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('brfs',function(){
  return gulp.src('lib/trelloWebComponent.js')
    .pipe(transform(brfs))
    .pipe(gulp.dest('dist'));

});


gulp.task('compile:jade', ['clean:jade'], function() {
  return gulp.src('lib/src/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('dist/src'));
});

gulp.task('clean:doc', function() {
  return gulp.src(['doc/*'], { read: false })
    .pipe(clean());
});

gulp.task('doc', ['clean:doc'], function(){
  gulp.src('./lib/trelloWebComponent.js')
    .pipe(markdox())
    .pipe(rename('api.md'))
    .pipe(gulp.dest('./doc'));
});
