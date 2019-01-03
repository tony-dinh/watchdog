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
        new webpack.optimize.UglifyJsPlugin(),
    ])
})

productionConfig.module.rules = productionConfig.module.rules.concat(
    {
        test: /\.s?css$/,
        loader: mainCSSExtract.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        localIdentName: '[local]__[hash:base64:5]',
                        minimize: true,
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
                    options: {
                        data: '$env: "production";'
                    }
                }
            ]
        }),
        include: [fs.realpathSync(`${process.cwd()}/app`)],
        exclude: [fs.realpathSync(`${process.cwd()}/app/styles`)],
    }
)

backgroundConfig.plugins = [].concat(backgroundConfig.plugins, [
    new webpack.DefinePlugin({
        DEBUG: false,
    })
])

module.exports = [productionConfig, backgroundConfig]
