const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {

  // devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname),
    compress: true,
    host: "192.168.0.53",
    port: 8912,
    open: false,
    openPage: "doc/index.html"
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("dev"),
        "port": JSON.stringify("8912"),
        "host": JSON.stringify("192.168.0.53")
      }
    })
  ]
});