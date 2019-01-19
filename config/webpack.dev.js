const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration, 
    {
        devtool: 'source-map',
        mode: 'development',
        plugins:
        [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html')
            })
        ],
        devServer: 
        {
            contentBase: './dist',
            open: true,
            hot: true
        },
        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use:
                    [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.styl$/,
                    use:
                    [
                        'style-loader',
                        'css-loader',
                        'stylus-loader'
                    ]
                }
            ]
        }
    }
)