const path = require('path')
const webpack = require('webpack')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  mode: isProduction ? 'production' : 'development',
  devServer: {
    contentBase: path.join(__dirname, 'client', 'build'),
    compress: true,
    port: 9000,
    proxy: {
      '/': {
        target: 'http://localhost:3000'
      },
      '^/static/*': {
        target: 'http://localhost:3000/static/'
      },
      '^/api/*': {
        target: 'http://localhost:3000/api/'
      }
    }
  },

  entry: {
    app: './client/src/index'
  },

  output: {
    path: path.join(__dirname, 'client', 'build'),
    publicPath: '/build/',
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
    sourceMapFilename: '[name].js.map'
  },

  resolve: {
    symlinks: isProduction
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: /client\//,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  stats: {
    hash: false,
    version: false,
    timings: true,
    assets: true,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: false,
    publicPath: false
  }
}
