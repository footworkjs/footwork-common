const gulp = global.__gulp;
import file from 'gulp-file';
import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import 'colors';

gulp.task('make', 'Run rollup to produce UMD/build assets in dist/', function () {
  const distFilename = `${global.pkg.name}.js`;
  const dest = `dist/${distFilename}`;

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
    return file(distFilename, gen.code, { src: true })
      .pipe(gulp.dest(dest));
  });
})
