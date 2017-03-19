const gulp = global.__gulp;
const file = require('gulp-file');
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
require('colors');

gulp.task('make', 'Run rollup to produce UMD/build assets in dist/', function () {
  const dest = `${global.pkg.name}.js`;

  console.log(`🔨  Compiling index.js -> ${dest.green}`);

  return rollup({
    entry: 'index.js',
    plugins: [
      resolve({
        jsnext: true
      }),
      babel({
        presets: [
          [
            "es2015", {
              "modules": false
            }
          ]
        ],
        babelrc: false,
        exclude: 'node_modules/**'
      })
    ]
  })
  .then(bundle => {
    return bundle.generate({
      format: 'umd',
      moduleName: global.pkg.name
    });
  })
  .then(gen => {
    return file(dest, gen.code, { src: true })
      .pipe(gulp.dest('dist/'));
  });
})
