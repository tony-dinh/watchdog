const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./base.config.js')
const backgroundConfig = require('./background.config')

const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT_DIR = process.cwd()
const outputPath = path.resolve(ROOT_DIR, 'build')

const mainCSSExtract = new MiniCSSExtractPlugin('[name].css')

const productionConfig = Object.assign(baseConfig, {
    mode: 'production',
    optimization: {
        minimize: true
    },
    plugins: [].concat(baseConfig.plugins, [
        mainCSSExtract,
        new HtmlWebpackPlugin({
            hash: true,
            filename: path.resolve(outputPath, 'index.html'),
            template: path.resolve(ROOT_DIR, 'app/static/index.html')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'DEBUG': false
        }),
    ])
})

productionConfig.module.rules = productionConfig.module.rules.concat(

    {
        test: /\.s?css$/,
        use: [
            'style-loader',
            MiniCSSExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2,
                    localIdentName: '[local]__[hash:base64:5]',
                    modules: true,
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
        DEBUG: false,
    })
])

module.exports = [productionConfig, backgroundConfig]
