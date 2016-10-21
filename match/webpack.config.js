var webpack = require('webpack');
var path = require('path');
module.exports = {
    //页面入口文件配置
    // entry: './main.js',
    entry: ['whatwg-fetch','./main.js'],
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./",
        filename: 'build.js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    babel: {
        "presets": [path.join(__dirname, "node_modules/babel-preset-es2015"), 
          path.join(__dirname, "node_modules/babel-preset-stage-2")]
    },
    resolve: {
        alias: {
          '~': path.join(__dirname)
        }
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.vue$/,loader: 'vue'},
            {test: /\.js$/,loader: 'babel',exclude: /node_modules/},
            {test: /\.less$/, loader: 'style!css!less' }
        ]
    }
};
if (process.env.NODE_ENV === 'production') {
  /*module.exports.devtool = '#source-map'*/
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}