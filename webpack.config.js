var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './dist/rc-scoll-animate.min.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
}
