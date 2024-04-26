const gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'), // to minify the css
    del = require('del');

var paths = {
    styles: {
        src: './sass/**/*.scss',
        dest: 'assets/css'
    }
};

function clean() {
    return del(['assets/css']);
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        //.pipe(cleanCSS()) // to minify the css for prod
        .pipe(gulp.dest(paths.styles.dest));
}

function watch() {
    gulp.watch(paths.styles.src, styles);
}

var build = gulp.series(clean, gulp.parallel(styles, watch));

exports.clean = clean;
exports.styles = styles;
exports.watch = watch;
exports.build = build;

exports.default = build;