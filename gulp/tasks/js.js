import gulp from "gulp";
import { path } from "../config/path.js";
import { plugins } from "../config/plugins.js";
import webpack from "webpack-stream";
import { handlerErrors } from "../helpers/handleErrors.js";

const args = process.argv.slice(2);
const isDev = args.includes("--dev");
const isBuild = args.includes("--production");

export function js() {
  const configWebpack = {
    mode: isDev ? "development" : isBuild ? "production" : "development",
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
