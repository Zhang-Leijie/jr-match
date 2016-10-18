var path = require('path')
module.exports = {
  entry: './main.js',
  output: {
    filename: 'build.js'
  },
  module: {
      //加载器配置
      loaders: [
          { test: /\.vue$/,loader: 'vue'},
          {test: /\.js$/,loader: 'babel',exclude: /node_modules/}
      ]
  },
  resolve: {
      alias: {
        '~': path.join(__dirname)
      }
  },
  devServer: {
    publicPath: '/',
    hot: true
  }
}