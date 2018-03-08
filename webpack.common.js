const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry: {
    index: "./src/index.js",
    jjxq: "./src/jjxq.js",
    jjlist: "./src/jjlist.js",
    wdlc: "./src/wdlc.js",
    ddcx: "./src/ddcx.js",
    jjjy: "./src/jjjy.js"
  },

  output: {

    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),

    // publicPath: "/assets/"
  },

  resolve: {

    alias: {

      pages: path.resolve(__dirname, "src/pages"),
      components: path.resolve(__dirname, "src/components"),
      layouts: path.resolve(__dirname, "src/layouts"),
      commons: path.resolve(__dirname, "src/commons")
    }
  },

  module: {

    rules: [

      // vue 处理
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: true
        }
      },

      // js 处理
      {
        test: /\.js$/,
        loader: "babel-loader"
      },

      // css 处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            "css-loader",
            "postcss-loader"
          ]
        })
      },

      // 外部文件处理
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 256,
              outputPath: "css/",
              publicPath: "../",
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    
    // 提取公共部分 js
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      minChunks: 3
    }),

    // 提出 css 文件
    new ExtractTextPlugin({
      filename: `css/[name].css`
    }),

    // new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
}