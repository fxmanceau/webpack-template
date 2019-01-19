const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function recursiveIssuer(m) {
    if (m.issuer) {
      return recursiveIssuer(m.issuer);
    } else if (m.name) {
      return m.name;
    } else {
      return false;
    }
  }

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'production',
        entry:
        {
            'reset':'./src/style/reset.css',
            'style': './src/style/style.styl'
        },
        optimization: {
            splitChunks: {
              cacheGroups: {
                mainStyles: {
                  name: 'foo',
                  test: (m,c,entry = 'main-css') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                  chunks: 'all',
                  enforce: true
                },
                resetStyles: {
                  name: 'bar',
                  test: (m,c,entry = 'reset-css') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                  chunks: 'all',
                  enforce: true
                }
              }
            }
          },
        plugins:
        [
            new MiniCssExtractPlugin({filename: '../style/[name].css'}),
            new CleanWebpackPlugin(
                ['dist'],
                {root: path.resolve(__dirname, '..')}
            )
        ],
        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use:
                    [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.styl$/,
                    use:
                    [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'stylus-loader'
                    ]
                }
            ]
        }
    }
)