const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let publicPath = '/';
if (process.env.MODE === 'production') {
  publicPath = './'
}

module.exports = {
  mode: process.env.MODE,
  entry: './public/index.js',
  devtool: 'source-map',
  devServer: {
    open: true,
    port: '3000',
    clientLogLevel: 'warning',
    disableHostCheck: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath,
    filename: "[contenthash].js",
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    ...process.env.MODE === 'production' ? [new CleanWebpackPlugin()] : [],
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
