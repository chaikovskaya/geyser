const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
//compile scss into css
function style() {
    return gulp.src('scss/common.scss')
        .pipe(concat('common.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}
function style1() {
    return gulp.src('scss/bootstrap-grid.scss')
        .pipe(concat('bootstrap-grid.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "/contacts.html"
        }
    });
    gulp.watch('scss/**/*.scss', style);
    gulp.watch('scss/**/*.scss', style1);
    gulp.watch('./*.html').on('change', browserSync.reload);

}
exports.style = style;
exports.style1 = style1;
exports.watch = watch;

let def = gulp.series(style, style1, watch);
gulp.task('default', def);