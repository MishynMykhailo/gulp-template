import gulp from "gulp";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import webpack from "webpack-stream";
import { handlerErrors } from "../helpers/handleErrors.js";

export function js() {
  const configWebpack = {
    mode: "development",
    output: {
      filename: "app.min.js",
    },
  };

  return gulp
    .src(path.src.js, { sourcemaps: true })
    .pipe(handlerErrors("JS"))
    .pipe(webpack(configWebpack))
    .pipe(gulp.dest(path.build.js))
    .pipe(plugins.browsersync.stream());
}
