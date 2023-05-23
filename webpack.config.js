// eslint-disable-next-line
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line
const FileManagerPlugin = require('filemanager-webpack-plugin');
// eslint-disable-next-line
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// eslint-disable-next-line
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// eslint-disable-next-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line
const TerserPlugin = require('terser-webpack-plugin');

// eslint-disable-next-line
module.exports = (env) => ({
  entry: './src/js/index.js',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    // hot: true,
    hot: false,
  },
  // devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(ttf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }, // images
      {
        test: /\.s[ac]ss$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }, // styles
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ], // rules
  }, // module
  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
            ],
          },
        },
      }),
      new CssMinimizerPlugin(),
      new TerserPlugin({
        test: /\.js$/i,
        exclude: /node_modules/,
      }),
    ], // minimazer
  }, // optimization
  plugins: [
    new MiniCssExtractPlugin({
      // filename: '[name].[contenthash].css',
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      title: 'COIN',
    }), // HtmlWebpackPlugin
    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ['dist'],
        },
      },
    }), // FileManagerPlugin
  ], // plugins
});
