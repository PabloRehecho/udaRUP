/* global require */

var gulp = require('gulp');
const runSequence = require('run-sequence');


// gulp.task('build:all', ['build:css', 'build:js']);
// gulp.task('build:dist', function(callback){
// 	runSequence('build:css', 'build:js', 'build:uglify', callback);
// });



gulp.task('build:css', function(callback){
	runSequence('build:sass', 'build:js', 'build:uglify', callback);
});

gulp.task('build:sass', function(callback){
	runSequence('sass:rup-base',
		'sass:rup-theme',
		'sass:rup-jqueryui-theme',
		'sass:main', callback);
	// 'minimize:css:rup-classic',
	// 'minimize:css:rup'
});


gulp.task('build:js', [
	'rup:build:table',
	'templates:demo',
	'templates:rup'
	// 'minimize:js:rup'
]);

gulp.task('build:uglify', function(callback){
	runSequence('uglify:css:rup-base',
		'uglify:css:rup-jqueryui-theme',
		'uglify:css:rup-theme', callback);
// 'minimize:css:rup-classic',
// 'minimize:css:rup'
});



gulp.task('build:resources', function (callback) {

	// Generamos la carpeta de distribuibles
	console.log('Generando la carpeta de distribuibles...');
	
	// dist/css/images
	console.log('dist/css/images');
	gulp.src(['./assets/images/**/*.*'])
		.pipe(gulp.dest('dist/css/images'));

	// dist/css/cursors
	console.log('dist/css/cursors');
	gulp.src(['./assets/cursors/**/*.*'])
		.pipe(gulp.dest('dist/css/cursors'));

	// resources
	console.log('dist/resources');
	gulp.src(['./i18n/*.json'])
		.pipe(gulp.dest('dist/resources'));

	// fonts
	console.log('dist/fonts');
	gulp.src('./node_modules/font-awesome/fonts/fontawesome-webfont*.*')
		.pipe(gulp.dest('dist/css/externals/fonts'));

	// externals
	console.log('externals ');
	
	// bootstrap
	console.log('bootstrap (v4.1.0)');
	gulp.src(['./assets/css/externals/**/*.*'])
		.pipe(gulp.dest('dist/css/externals/bootstrap'));

	gulp.src(['./assets/js/externals/**/*.*'])
		.pipe(gulp.dest('dist/js/externals/bootstrap'));
	
	// font-awesome
	console.log('font-awesome');
	gulp.src(['./node_modules/font-awesome/css/font-awesome.min.css', './node_modules/font-awesome/css/font-awesome.css.map'])
		.pipe(gulp.dest('./dist/css/externals/font-awesome'));
	
	// tether
	console.log('tether');
	gulp.src(['./node_modules/tether/dist/css/*min*.*'])
	.pipe(gulp.dest('./dist/css/externals/tether'));
	
	gulp.src(['./node_modules/tether/dist/js/*min*.*'])
		.pipe(gulp.dest('./dist/js/externals/tether'));
	
	callback();
});