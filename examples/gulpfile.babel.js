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
import fileinclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import nano from 'gulp-cssnano';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

function errorHandler(err) {
  console.log(err);
  this.emit('end');
}

gulp.task('clean', () =>
  del(['dist'])
);

// --- JS ---
const browserifyOpts = {
  debug: true,
  entries: 'src/js/example.js',
  transform: [
    'babelify',
  ],
};
const watchifyOpts = Object.assign({}, watchify.args, browserifyOpts);
const bundler = watchify(browserify(watchifyOpts));
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
    .on('error', () => console.error())
    .pipe(source('example.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps', { addComment: false }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
}

// --- HTML ---
gulp.task('html', () => {
  return gulp.src('src/html/**/*.html')
    .pipe(plumber({
      errorHandler,
    }))
    .pipe(fileinclude({
      prefix: '@',
      basepath: 'src/',
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('dist'));
})

// --- Style ---
gulp.task('style', () => {
  return gulp.src('src/style/main.scss')
    .pipe(plumber({
      errorHandler,
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(nano({
      safe: true,
    }))
    .pipe(sourcemaps.write('./maps', { addComment: false }))
    .pipe(gulp.dest('dist'));
});


// --- Image ---
gulp.task('image', () => {
  return gulp.src('src/image/**/*.{png, jpg, gif, svg}')
    .pipe(plumber({
      errorHandler,
    }))
    .pipe(changed('dist'))
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', () =>
  gulp.src(['src/**/*.js', 'gulpfile.js', '!src/js/web-sight.js'])
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failOnError())
);

gulp.task('js', ['lint'], bundle);

// --- Serve ---
const sync = browserSync.create();
const reload = sync.reload;

function sendMaps(req, res, next) {
  const filename = req.url.split('/').pop()
  const extension = filename.split('.').pop()

  if(extension === 'css' || extension === 'js') {
    res.setHeader('X-SourceMap', `/maps/${filename}.map`);
  }

  return next();
};

const serverOpts = {
  server: {
    baseDir: './dist',
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

// --- Watch ---
gulp.task('watch', ['build'], () => {
  gulp.watch('src/html/**/*.html', ['html', reload]);
  gulp.watch('src/style/**/*.scss', ['style', reload]);
  gulp.watch('src/image/**/*.{gif,jpg,png,svg}', ['image', reload]);
});

gulp.task('build', ['html', 'style', 'lint', 'js', 'image']);
gulp.task('dev', ['serve', 'build', 'watch']);
