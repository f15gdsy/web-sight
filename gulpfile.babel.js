import path from 'path';
import gulp from 'gulp';
import del from 'del';
import lint from 'gulp-eslint';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';

import config from './config/config.dev';

const sync = browserSync.create();

const browserifyOpts = {
  debug: true,
  entries: config.scripts.ENTRY,
  standalone: 'WebSight',
  transform: [
    'babelify',
  ],
};
const watchifyOpts = Object.assign({}, watchify.args, browserifyOpts);
const bundler = watchify(browserify(watchifyOpts));
bundler.on('update', bundle);

function bundle() {
  let temp = bundler.bundle()
    .on('error', () => console.error())
    .pipe(source(config.scripts.OUTPUT))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps', { addComment: false }));

  config.scripts.OUTPUT_DIR.forEach(dir => {
    temp = temp.pipe(gulp.dest(dir))
  });

  return temp.pipe(sync.stream());
}


gulp.task('clean', () =>
  del(['dist'])
);

gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'index.js', 'gulpfile.js'])
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failOnError())
);

gulp.task('js', ['clean', 'lint'], bundle);

const sendMaps = (req, res, next) => {
  const filename = req.url.split('/').pop()
  const extension = filename.split('.').pop()

  if(extension === 'css' || extension === 'js') {
    res.setHeader('X-SourceMap', `/maps/${filename}.map`);
  }

  return next();
};

const serverOpts = {
  server: {
    baseDir: './examples/dist',
    index: "index.html",
    middleware: [
      sendMaps,
    ],
  },
  watchOptions: {
    ignores: '*.map',
  },
};

gulp.task('serve', ['js'], () => {
  sync.init(serverOpts);
});


gulp.task('dev', ['clean', 'lint', 'js', 'serve']);
