import gulp from "gulp";
import { path } from "./gulp/config/path.js";

// Function for copy files from "srcFolder" to "buildFolder"
import { copy } from "./gulp/tasks/copy.js";
// Function for delete old build-folder
import { reset } from "./gulp/tasks/reset.js";

// Watching on the "srcFolder"
function watcher() {
  gulp.watch(path.watch.files, gulp.series(reset, copy));
}

// Build execute scenes task
const dev = gulp.series(reset, copy, watcher);
// Execute default Scene
gulp.task("default", dev);
