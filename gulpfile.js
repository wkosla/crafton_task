const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  browsersync = require('browser-sync').create();

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './build/'
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function scripts() {
  return gulp.src('./src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/assets/'))
    .pipe(browsersync.stream());
}

function styles() {
  return gulp.src('./src/assets/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/assets/'))
    .pipe(browsersync.stream());
}

function html() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build/'));
}

function php() {  
  return gulp.src('./src/**/*.php')
    .pipe(gulp.dest('./build/'));
}

function fonts() {
  return gulp.src('./src/assets/fonts/**/*.ttf')
    .pipe(gulp.dest('./build/assets/fonts/'));
}

function images() {
  return gulp.src('./src/assets/img/**/*')
    .pipe(gulp.dest('./build/assets/img/'));
}

function watchFiles() {
  gulp.watch('./src/assets/css/**/*', styles);
  gulp.watch('./src/assets/js/**/*', scripts);
  gulp.watch('./src/**/*.html', gulp.series(html, browserSyncReload));
  gulp.watch('./src/**/*.php', gulp.series(php, browserSyncReload));
  gulp.watch('./src/assets/img/**/*', gulp.series(images, browserSyncReload));
}

const watch = gulp.series(html, styles, scripts, fonts, images, php, gulp.parallel(watchFiles, browserSync));
const build = gulp.series(html, styles, scripts, fonts, images, php);

exports.watch = watch;
exports.build = build;
