var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', function(){
	gulp.src('jsCopy/*.js')
	.pipe(uglify())
	.pipe(concat('game.min.js'))
	.pipe(gulp.dest('builds'))
});