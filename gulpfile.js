'use strict';

const gulp = require('gulp');

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require("babelify");
const rename = require("gulp-rename");
const fs = require("fs");
const uglify = require('gulp-uglify');

gulp.task("default", function(){
	const bundleOptions = {
		debug: true,
		entries: ["./src/UrlTokenizer.js"],
		standalone: 'SMART_OUT'
	};
	return browserify(bundleOptions)
		.transform(babelify.configure({
			presets: ["es2017", "es2015"],
		}))
        .bundle()
        .pipe(source("url-tokenizer.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify({mangle: true, mangleProperties: false}))
        .pipe(rename("url-tokenizer.min.js"))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'))
	;
});
