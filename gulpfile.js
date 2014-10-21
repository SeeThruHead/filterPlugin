var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload;

gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(['*.js','*.html'], function() {
    reload();
  });
});

gulp.task('default', ['serve']);