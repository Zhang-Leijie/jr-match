var path = require('path')
module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  module: {
      //加载器配置
      loaders: [
          { test: /\.vue$/,loader: 'vue'},
          {test: /\.js$/,loader: 'babel',exclude: /node_modules/},
          {test: /\.less$/, loader: 'style!css!less' }
      ]
  },
  resolve: {
      alias: {
        '~': path.join(__dirname)
      }
  },
  devServer: {
    publicPath: '/dist',
    hot: true,
    port: 2333
  }
}