const path = require("path");
const PnpWebpackPlugin = require("pnp-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");
const writeAssetsWebpackPlugin = require("write-assets-webpack-plugin");
const loaderUtils = require('loader-utils');
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
function getLocalIdent(
  context,
  localIdentName,
  localName,
  options
) {
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass)$/
  )
    ? '[folder]'
    : '[name]';
  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + '_' + localName,
    options
  );
  return className.replace('.module_', '_');
}
module.exports = function () {
  const isEnvDevelopment = process.env.NODE_ENV === "development";
  const isEnvProduction = !isEnvDevelopment;
  const cssModulesConfig = {
    importLoaders: 2,
    sourceMap: isEnvDevelopment,
    modules: true,
  };
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [{
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: require.resolve("css-loader"),
      options: cssOptions
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009"
            },
            stage: 3
          })
        ],
        sourceMap: isEnvDevelopment
      }
    }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: isEnvDevelopment
        }
      });
    }
    return loaders;
  };
  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin(
        Object.assign(
          {
          },
          {
            inject: true,
            template: "./public/index.html"
          }
        )
      ),
      new CaseSensitivePathsPlugin(),
      new MiniCssExtractPlugin({
        filename: "static/css/[name].css"
      })
    ];
    if (isEnvDevelopment) {
      plugins.push(new writeAssetsWebpackPlugin({
        force: true,
        extension: ['js', 'css', 'svg', 'html', 'jpeg', 'jpg', 'png']
      }));
    }
    return plugins;
  };
  return {
    mode: isEnvDevelopment ? "development" : "production",
    bail: isEnvProduction,
    devtool: isEnvDevelopment ? "source-map" : "cheap-module-source-map",
    entry: ["./src/index.js"],
    output: {
      path: path.resolve("./build/"),
      pathinfo: isEnvDevelopment,
      filename: "static/js/main.js",
      publicPath: "/",
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
          path
            .relative("./src", info.absoluteResourcePath)
            .replace(/\\/g, "/")
        : isEnvDevelopment &&
        (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/"))
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            }
          },
          parallel: true,
          cache: true,
          sourceMap: isEnvDevelopment
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: isEnvDevelopment
              ? {
                inline: false,
                annotation: true
              }
              : false
          }
        })
      ]
    },
    resolve: {
      extensions: [".js", ".json", ".jsx"],
      plugins: [PnpWebpackPlugin]
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)]
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          parser: {
            requireEnsure: false
          }
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve("url-loader"),
              options: {
                limit: 10000,
                name: "static/media/[name].[hash:8].[ext]"
              }
            },
            {
              test: /\.(js|jsx)$/,
              loader: require.resolve("babel-loader"),
              options: {
                customize: require.resolve(
                  "babel-preset-react-app/webpack-overrides"
                ),
                plugins: [
                  [
                    require.resolve("babel-plugin-named-asset-import"),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent: "@svgr/webpack?-svgo,+ref![path]"
                        }
                      }
                    }
                  ]
                ],
                cacheDirectory: true,
                cacheCompression: isEnvProduction,
                compact: isEnvProduction
              }
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 2,
                  sourceMap: isEnvDevelopment
                },
                "sass-loader"
              ),
              sideEffects: true
            },
            {
              test: sassModuleRegex,
              use: getStyleLoaders(
                isEnvDevelopment ?
                  {
                    ...cssModulesConfig,
                    getLocalIdent: getLocalIdent
                  } :
                  {
                    ...cssModulesConfig,
                    localIdentName: '[sha1:hash:hex:4]',
                  },
                "sass-loader"
              )
            },
            {
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: getPlugins(),
    devServer: {
      disableHostCheck: false,
      compress: true,
      https: true,
      clientLogLevel: 'none',
      historyApiFallback: true,
      port: 3000,
      host: 'localhost'
    },
    node: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    },
    performance: false
  };
};
