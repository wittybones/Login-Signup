const webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  path = require("path");

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const SRC = path.resolve(__dirname, "src"),
  NODE_MODULES = path.resolve(__dirname, "node_modules"),
  JS = path.resolve(__dirname, "src/js"),
  BUILD = path.resolve(__dirname, "build");

process.env.NODE_ENV = "development";

const config = {
  context: path.resolve(__dirname),
  devtool: "source-map",
  entry: "./src/js/index.js",
  output: {
    pathinfo: true,
    filename: "[name][hash].js",
    publicPath: "/",
    path: BUILD
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
    modules: [SRC, NODE_MODULES, JS]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(ttf|svg|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{ loader: "file-loader" }]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: "url-loader", options: { limit: 10000 } }]
      },
      {
        test: sassRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
              includePaths: [JS],
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "sass-loader",
          "css-loader"
        ]
      },
      {
        test: sassModuleRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "sass-loader",
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false
    }),

    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: "./public/index.html"
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }
      )
    ),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
      }
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(new UglifyJSPlugin({ sourceMap: true }));
} else {
  config.devServer = {
    port: process.env.PORT || 3001,
    host: "0.0.0.0",
    hot: true,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept"
    }
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;