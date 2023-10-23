import gulp from "gulp";
// import path
import { path } from "./gulp/config/path.js";
// import plugins
import { plugins } from "./gulp/config/plugins.js";

//--------- IMPORT TASKS ---------
// Function for copy files from "srcFolder" to "buildFolder"
import { copy } from "./gulp/tasks/copy.js";
// Function for delete old build-folder
import { reset } from "./gulp/tasks/reset.js";
// Function for copy-html files
import { html } from "./gulp/tasks/html.js";
// Function for live-server
import { server } from "./gulp/tasks/server.js";
// function for scss files
import { scss } from "./gulp/tasks/scss.js";
// function for js files
import { js } from "./gulp/tasks/js.js";
// function for images files
import { images } from "./gulp/tasks/images.js";
//--------- IMPORT TASKS END ---------

// Watching on the "srcFolder"
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}
const mainTasks = gulp.parallel(copy, html, scss, js, images);
// Build execute scenes task
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
// Execute default Scene
gulp.task("default", dev);
