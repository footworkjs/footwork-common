const gulp = global.__gulp;

gulp.task('watch', 'Watch for changes to the source code and the make task when changes are detected', () => {
  gulp.start('make');
  gulp.watch(['src/**/*.*', 'index.js'], ['make']);
});
