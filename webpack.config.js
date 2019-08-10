const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const pug = {
  test: /\.pug$/,
  use: ['html-loader?attrs=false', 'pug-html-loader']
}
const sass = {
  test: /\.s(a|c)ss$/,
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
const img = {
  test: /\.(png|svg|jpe?g|gif|eot|woff2?|ttf)$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '/test/[name].[ext]'
    }
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
    rules: [js, img, pug, sass]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.pug',
      inject: false
    }),
    new ManifestPlugin({
      map: (file) => ({
        ...file,
        path: file.name.includes('/test/') ? file.path : '/test/' + file.path
      })
    }),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      jQuery: 'jquery',
      $: 'jquery'
    })
  ]
}
