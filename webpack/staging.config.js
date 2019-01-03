/* eslint-disable */

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./base.config')
const backgroundConfig = require('./background.config')

const MiniCSSExtactPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT_DIR = process.cwd()
const outputPath = path.resolve(ROOT_DIR, 'build')

const mainCSSExtract = new MiniCSSExtactPlugin('[name].css')

const stagingConfig = Object.assign(baseConfig, {
    mode: 'development',
    devtool: 'inline-source-maps',
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    plugins: [].concat(baseConfig.plugins, [
        mainCSSExtract,
        new HtmlWebpackPlugin({
            hash: false,
            filename: path.resolve(outputPath, 'index.html'),
            template: path.resolve(ROOT_DIR, 'app/static/index.html')
        }),
        new webpack.DefinePlugin({
            'DEBUG': true
        }),
        new webpack.HotModuleReplacementPlugin()
    ])
})

stagingConfig.module.rules = stagingConfig.module.rules.concat(
    {
        test: /\.s?css$/,
        use: [
            'style-loader',
            MiniCSSExtactPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]__[hash:base64:5]',
                    importLoaders: 2
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    config: {
                        path: './webpack/postcss.config.js'
                    }
                }
            },
            {
                loader: 'sass-loader',
            }
        ],
        exclude: ['node_modules'],
    }
)

backgroundConfig.plugins = [].concat(backgroundConfig.plugins, [
    new webpack.DefinePlugin({
        DEBUG: true,
    })
])

module.exports = [stagingConfig, backgroundConfig]
