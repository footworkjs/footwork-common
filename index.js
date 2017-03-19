import * as fs from 'fs';
import { throttle } from 'lodash';
import gulp from 'gulp';
import gulpHelp from 'gulp-help';

Object.defineProperty(global, 'pkg', {
  get: throttle(() => require(`${process.cwd()}/package.json`), 125)
});

export function setupGulpTasks (gulp) {
  gulp = global.__gulp = gulpHelp(gulp);
  let tasks_path = __dirname + "/tasks";

  fs.readdirSync(tasks_path)
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => require(`${tasks_path}/${file}`));

  gulp.task('default', false, ['help']);
}
