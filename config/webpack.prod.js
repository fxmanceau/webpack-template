const path = require('path')
const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'production',
        plugins:
        [
            new MiniCssExtractPlugin({filename: '../style/main.[hash].css'}),
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