var gulp = require('gulp');
var scss = require('gulp-scss');
var minifyCSS = require('gulp-csso');
var gulpCopy = require('gulp-copy');
var del = require('del');

var sourceFiles = [ 'client/**/*.html', 'client/**/*.css','client/**/*.js' ];
var destination = 'dest/';



gulp.task('css', function(){
  return gulp.src('client/css/*.scss')
    .pipe(scss())
    .pipe(minifyCSS())
    .pipe(gulp.dest(destination + 'css'))
});

gulp.task('copy', function(){
  return gulp.src(sourceFiles)
    .pipe(gulpCopy(destination,{prefix:1}))
    .pipe(gulp.dest(destination))
});

gulp.task('clean', function(options) {
  del(['dest'], options);
})

gulp.task('demo',['default'], function() {
  return gulp.src('dest/**/*.*')
    .pipe(gulpCopy('demo',{prefix:1}))
    .pipe(gulp.dest('demo'))
});
gulp.task('default', [ 'copy', 'css' ]);
