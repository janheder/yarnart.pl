'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer= require('autoprefixer');
var changed = require('gulp-changed');
var sassGlob = require('gulp-sass-glob');


// COMPILE SASS
gulp.task('sass', function () {
  var processors = [ autoprefixer()];
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});


// COMPILE PUG
gulp.task('pug', function buildHTML() {
  return gulp.src('./src/pug/**/*.pug')
    .pipe(changed('./dist'))
    .pipe(pug({pretty: 1}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('pug:watch', function () {
  gulp.watch('./src/pug/**/*.pug', ['pug']);
});


// MINIFY JS
gulp.task('minifyjs', function (cb) {
  pump([
        gulp.src(['./src/js/partials/**/*.js', './src/js/functions.js']),
        sourcemaps.init(),
        concat('scripts.min.js'),
        uglify(),
        sourcemaps.write('./maps'),
        gulp.dest('./dist/js')
    ],
    cb
  );
});

gulp.task('minifyjs:watch', function () {
  gulp.watch('./src/js/**/*.js', ['minifyjs']);
});


// SERVE
gulp.task('serve', function(){

	browserSync.init({
		server: {
			baseDir: "./dist/"
		}
	});

	gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/css/**/*.css').on('change', browserSync.reload);
  gulp.watch('./dist/js/**/*.js').on('change', browserSync.reload);
});


//DEFAULT
gulp.task('default', ['sass:watch', 'pug:watch', 'minifyjs:watch', 'serve']);

