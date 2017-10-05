import gulp from 'gulp';
import pug from 'gulp-pug';
import babelify from 'babelify';
import watchify from 'watchify';
import browserify from 'browserify';
import browserSync from 'browser-sync';
import source from 'vinyl-source-stream';
import watch from 'gulp-watch';

const SRC = './src';
const DEST = './public';

gulp.task('pug', () => {
    return gulp.src(`${SRC}/pug/**/[!_]*.pug`)
        .pipe(pug({
            pretty: true,
            basedir: `${SRC}/pug`
        }))
        .pipe(gulp.dest(DEST));
})
gulp.task('html', gulp.series('pug'));

gulp.task('watchify', () => {
    return watchify(browserify(`${SRC}/js/script.js`))
        .transform(babelify)
        .bundle()
        .on("error", function(err) {
        })
        .pipe(source('script.js'))
        .pipe(gulp.dest(`${DEST}/js`));
})
gulp.task('js', gulp.parallel('watchify'));

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: '/'
        }
    });
    watch([`${SRC}/js/**/*.js`], gulp.series('watchify', browserSync.reload));
    watch([`${SRC}/pug/**/*`], gulp.series('pug', browserSync.reload));
})
gulp.task('serve', gulp.series('browser-sync'));

gulp.task('build', gulp.parallel('js', 'html'));
gulp.task('default', gulp.series('build', 'serve'));
