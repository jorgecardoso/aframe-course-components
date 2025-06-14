const path = require('path');

module.exports = {
  entry: {
    'aframe-course': './index.js',
    'aframe-course.interaction': './src/interaction/index.js',
     'aframe-course.locomotion': './src/locomotion/index.js'
  },
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename:
      process.env.NODE_ENV === 'production'
        ? '[name].min.js'
        : '[name].js'
  },
  externals: {
    // Stubs out `import ... from 'three'` so it returns `import ... from window.THREE` effectively using THREE global variable that is defined by AFRAME.
    three: 'THREE',
  },
  devtool: 'source-map',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    port: process.env.PORT || 8080,
    hot: false,
    liveReload: true,
    watchFiles: ['src/**', 'examples/**'],
    server: {
      type: 'https'
    },
    static: {
      directory: path.resolve(__dirname)
    }
  },
};
