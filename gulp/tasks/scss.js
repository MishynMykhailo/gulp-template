import gulp from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import { listRegExpStyle } from "../helpers/helpers.js";
import rename from "gulp-rename";

const sass = gulpSass(dartSass);
export function scss() {
  return gulp
    .src(path.src.scss, { sourcemaps: true })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "SCSS",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(plugins.replace(...listRegExpStyle.images))
    .pipe(
      sass({
        outputStyle: "expanded",
      })
    )
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest(path.build.css))
    .pipe(plugins.browsersync.stream());
}
