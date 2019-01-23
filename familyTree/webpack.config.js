const path = require("path");
const SRC_DIR = path.join(__dirname, "/react-client/src");
const DIST_DIR = path.join(__dirname, "/react-client/dist");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css", ".html"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  devServer: {
    hot: true,
    port: 3000
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      template: "react-client/src/sample.html"
    })
  ]
};
