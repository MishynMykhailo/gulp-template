import gulp from "gulp";
import fileinclude from "gulp-file-include";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import { listRegExpHtml } from "../helpers/helpers.js";
import gulpWebpHtmlNosvg from "../helpers/gulp-webp-html-nosvg/index.js";
import versionNumber from "gulp-version-number";
// Function for copy-html files from "srcFolder" to "buildFolder"
export function html() {
  const settingsRegExp = Object.values(listRegExpHtml).join(", ");

  return gulp
    .src(path.src.html)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "HTML",
          message: "Error <%= error.message %>",
        })
      )
    )
    .pipe(fileinclude())
    .pipe(plugins.replace(/@images\//g, "./images/"))
    .pipe(gulpWebpHtmlNosvg())
    .pipe(
      versionNumber({
        value: "%DT%",
        append: {
          key: "_v",
          cover: 0,
          to: ["css", "js"],
        },
        output: {
          file: "gulp/version.json",
        },
      })
    )
    .pipe(gulp.dest(path.build.html))
    .pipe(plugins.browsersync.stream());
}
