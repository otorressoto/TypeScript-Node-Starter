import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const NodemonPlugin = require('nodemon-webpack-plugin') as any;
const nodemonPlugin = new NodemonPlugin({ nodeArgs: ['--inspect'] }) as webpack.Plugin;

const config: webpack.Configuration = {
  entry: './src/server.ts',
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [nodemonPlugin],
};

export default config;
