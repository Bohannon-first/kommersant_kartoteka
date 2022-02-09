const gulp = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
// const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

// Компилирование sass файла в css
gulp.task('sass-compile', function () {
    return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(gulpSass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
})

// Перезагрузка браузера
gulp.task('refresh', function (done) {
  browserSync.reload();
  done();
});

// Запуск сервера + работа вотчера
gulp.task('server', function () {
  browserSync.init({
      server: './',
      notify: false,
      open: true,
      cors: true,
      ui: false
    });
  
    gulp.watch('scss/**/*.scss', gulp.series('sass-compile'));
    gulp.watch('*.html', gulp.series('refresh'));
  });

gulp.task('start', gulp.series('sass-compile', 'server'));