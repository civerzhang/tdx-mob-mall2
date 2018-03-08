const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const pathsToClean = [
  // "dist/css",
  // "dist/js"
  "dist"
];

const cleanOptions = {

};

module.exports = merge(common, {

  // devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ]
});