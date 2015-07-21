'use strict';
var gulp = require('gulp'),
  clean = require('gulp-clean'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  browserify = require('gulp-browserify'),
  markdox = require('gulp-markdox'),
  pkg = require('./package.json'),
  template = require('lodash.template');

gulp.task('default', ['clean', 'compile']);
gulp.task('compile', ['compile:lib', 'doc']);
gulp.task('compile:lib', ['browserify:lib']);


gulp.task('watch', function() {
  gulp.watch(['lib/*','config.j*'], ['compile:lib']);
  gulp.watch('dist/src/*.html', ['browserify']);
  // gulp.watch('*.md',['doc']);
});

gulp.task('watch:lib', function() {
  gulp.watch('lib/*', ['compile:lib']);
});

gulp.task('clean', ['clean:browserify']);
gulp.task('clean:browserify', ['clean:browserify:lib']);

gulp.task('clean:browserify:lib', function() {
  return gulp.src(['dist/trelloWebComponent*'], { read: false })
    .pipe(clean());
});

gulp.task('clean:jade:lib', function() {
  return gulp.src(['dist/src/*.html'], { read: false })
    .pipe(clean({force:true}));
});

gulp.task('browserify', ['browserify:lib']);

gulp.task('browserify:lib', ['clean:browserify:lib', 'jade:lib'], function() {
  return gulp.src('lib/trelloWebComponent.js')
    .pipe(browserify({ transform: ['brfs'], standalone: 'trelloWebComponent'  }))
    // .pipe(header(template([
    //   '/*!',
    //   ' * <%= name %> v<%= version %>',
    //   ' *',
    //   ' * Copyright <%= new Date().getFullYear() %>, <%= author.name %>',
    //   ' * This content is released under the <%= licenses[0].type %> license',
    //   ' * <%= licenses[0].url %>',
    //   ' */\n\n'
    // ].join('\n'), pkg)))
    .pipe(gulp.dest('dist'))
    .pipe(rename('trelloWebComponent.min.js'))
    .pipe(uglify())
    // .pipe(header(template([
    //   '/*! <%= name %> v<%= version %> ',
    //   '© <%= new Date().getFullYear() %> <%= author.name %>, ',
    //   '<%= licenses[0].type %> License */\n'
    // ].join(''), pkg)))
    .pipe(gulp.dest('dist'));
});

gulp.task('jade:lib', ['clean:jade:lib'], function() {
  return gulp.src('lib/src/*.jade')
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('dist/src'))
    ;
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
