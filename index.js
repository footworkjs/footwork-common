import * as fs from 'fs';
import { throttle } from 'lodash';
import gulp from 'gulp';
import gulpHelp from 'gulp-help';

const CONFIG_READ_THROTTLE = 125;

Object.defineProperty(global, 'pkg', {
  get: throttle(
      () => require(`${process.cwd()}/package.json`),
      CONFIG_READ_THROTTLE)
});

export default function setupGulpTasks (gulp) {
  const gulp = global.__gulp = gulpHelp(gulp);
  let tasks_path = __dirname + "/tasks";

  fs.readdirSync(tasks_path)
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => require(`${tasks_path}/${file}`));

  gulp.task('default', false, ['help']);
}
