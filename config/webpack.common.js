const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/script/script.js',
    output: 
    {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist/script') // Output folder
    },
    plugins:
    [
        new CopyWebpackPlugin([ { from: 'static', to: '../images/' } ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            filename: '../index.html'
        })
    ],
    module:
    {
        rules:
        [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: '../images/'
                        }
                    }
                ]
            },
            {
                test: /\.html?$/,
                use:
                [
                    'html-loader'
                ]
            }
        ]
    }
}