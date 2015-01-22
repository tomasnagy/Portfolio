/**
 * Created by Tomas Nagy on 21/01/2015.
 */
var livereload = require('gulp-livereload'),
    gulp = require('gulp');

gulp.task('livereloader', function() {
    livereload.listen();
    gulp.watch(['public/**/*.js', 'public/**/*.css', 'public/**/*.scss', 'views/*.ejs']).on('change', livereload.changed);
});
