import path from 'path';

export default {
  scripts: {
    ENTRY: path.join('src', 'index.js'),
    OUTPUT: 'web-sight.js',
    OUTPUT_DIR: ['dist', 'examples/src/js'],
    STAND_ALONE: 'WebSight',
  },
};
