'use strict';

/**
 * Module Dependencies
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
 var app = require('./app.js');

/**
 * Config
 */

var PUBLIC = __dirname + '/public';
var ASSETS = PUBLIC + '/assets';



/**
 * Compiling
 */
gulp.task('sass', function(){
  gulp.src(ASSETS + '/styles/sass/app.scss')
    .pipe(sass())
    .pipe(gulp.dest(ASSETS + '/styles/css'));
});

// lol
gulp.task('piss', ['sass'], function() {
  app.init();
});

// Default
gulp.task('default', ['piss']);