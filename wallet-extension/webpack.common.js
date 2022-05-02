const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { 
      popup: './src/popup.js', 
      background: './src/background.js',
      contentScript: ['./src/open-dialog.js']
    },
  module: {
    rules: [
     /* {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },*/
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css'],
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "fs": require.resolve("browserify-fs"),
      "util": require.resolve("util/"),
      "path": require.resolve("path-browserify"),
    }
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({ template: 'src/popup.html' }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json' },
      ],
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ],
  output: { filename: '[name].js', path: path.resolve(__dirname, 'dist') }, // chrome will look for files under dist/* folder
};