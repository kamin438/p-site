var gulp = require('gulp'),
    del = require('del'),
    plugin = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();

gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./src/scss/*.scss", ['styles']);
  gulp.watch("./**/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function(){
  return plugin.rubySass('src/scss/styles.scss', {style: 'expand'})
    .pipe(plugin.autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(plugin.rename({suffix: '.min'}))
    .pipe(plugin.cssnano())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(plugin.notify({message: "Styles task complete"}))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(plugin.jshint())
    .pipe(plugin.jshint.reporter('default'))
    .pipe(plugin.concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(plugin.rename({suffix: '.min'}))
    .pipe(plugin.uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(plugin.notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function(){
  return gulp.src('src/images/**/*')
    .pipe(plugin.cache(plugin.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(plugin.notify({ message: 'Images task complete'}))
});

gulp.task('clean', function(){
  return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img', 'dist/assets/particles/min'])
});

gulp.task('default', ['clean', 'serve', 'watch'], function(){
  gulp.start('styles', 'scripts', 'images')
});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);

});
