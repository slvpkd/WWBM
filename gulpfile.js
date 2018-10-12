var gulp = require('gulp'); //GULP BUILD TOOL
var sass = require('gulp-sass'); //SASS-COMPILER
var browserSync = require('browser-sync').create(); //LIVE-SERVER
var useref = require('gulp-useref'); //CONCATENATOR
var uglify = require('gulp-uglify'); //CONCATENATOR
var gulpIf = require('gulp-if'); //JS MINIFIER
var cssnano = require('gulp-cssnano'); //CSS MINIFIER
var imagemin = require('gulp-imagemin'); //IMAGE MINIFIER
var cache = require('gulp-cache'); //IMAGE MINIFIER
var del = require('del'); //FILE CLEANER
var runSequence = require('run-sequence'); //GULP PROCESS AUTOMATOR
var sourcemaps = require('gulp-sourcemaps'); //SOURCE MAPS

gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// gulp.task('sourcemap-js', function () {
//   return gulp.src('app/js/**/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('dist/js'))
// });

// gulp.task('sourcemap', function () {
//   return gulp.src('app/**/*.+(css|js)')
//     .pipe(sourcemaps.init())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('dist'))
// });


gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('useref', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg|mp4)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('sounds', function () {
  return gulp.src('app/sounds/**/*')
    .pipe(gulp.dest('dist/sounds'))
})

gulp.task('clean:dist', function () {
  return del.sync('dist');
})



gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
})

gulp.task('build', function (callback) {
  runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts', 'sounds'],
    callback
  )
})



gulp.task('default', function (callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
})