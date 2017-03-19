var fs = require('fs');
var _ = require('lodash');
var gulp = require('gulp');
var gulpHelp = require('gulp-help');

Object.defineProperty(global, 'pkg', {
  get: _.throttle(() => require(`${process.cwd()}/package.json`), 125)
});

module.exports = function setupGulpTasks (gulp) {
  gulp = global.__gulp = gulpHelp(gulp);
  const tasks_path = __dirname + "/tasks";

  fs.readdirSync(tasks_path)
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => require(`${tasks_path}/${file}`));

  gulp.task('default', false, ['help']);
};
