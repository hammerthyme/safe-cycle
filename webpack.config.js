const path = require("path");
const { resolve } = path;

module.exports = {
  entry: {
    app: ["babel-polyfill", "./app/index.js"]
  },
  mode: "development",
  devServer: {
    contentBase: "./public"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, "./app"),
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
