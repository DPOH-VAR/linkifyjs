'use strict';

const gulp = require('gulp');

const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require("babelify");
const stringify = require("stringify");
const fs = require("fs");
const uglify = require('gulp-uglify');

gulp.task("build-tokenizer-js", function(){
	const bundleOptions = {
		debug: true,
		entries: ["./src/UrlTokenizer.js"],
		standalone: 'SMART_OUT'
	};
	return browserify(bundleOptions)
		.transform(babelify.configure({
			presets: ["es2017", "es2015", "stage-0" , "stage-1" , "stage-2" , "stage-3"],
			ignore: ['**/node_modules/**','*.min.js']
		}))
		.transform(stringify, {
			minify: true
		})
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify({mangle: true, mangleProperties: false}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js'))
	;
});
