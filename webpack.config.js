const path = require('path')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
}
const sass = {
  test: /\.sass$/,
  use: [
    'style-loader',
    'css-loader',
    { loader: 'sass-loader', options: { minimize: false } }
  ]
}
const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: { babelrc: true }
  }
}
module.exports = {
  context: __dirname,
  mode: 'development',
  devtool: '#eval-source-map',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-index.js'
  },
  module: {
    rules: [js, pug, sass]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.pug',
      inject: false
    }),
    new ManifestPlugin()
  ]
}
