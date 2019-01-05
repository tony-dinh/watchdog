const webpack = require('webpack')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const ROOT_DIR = process.cwd()

const entryPath = path.resolve(ROOT_DIR, 'app/index.jsx')
const outputPath = path.resolve(ROOT_DIR, 'build')

const config = {
    entry: [
        'core-js/es6',
        'core-js/es7',
        entryPath,
        path.resolve(ROOT_DIR, 'app/styles/styles.scss'),
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:9000/',
    ],
    output: {
        filename: 'index.js',
        path: outputPath,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'components': path.resolve(ROOT_DIR, 'app/components'),
            'containers': path.resolve(ROOT_DIR, 'app/containers'),
            'global': path.resolve(ROOT_DIR, 'app/global/'),
            'styles': path.resolve(ROOT_DIR, 'app/styles/'),
        }
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                options: {
                    cacheDirectory: `${__dirname}/tmp`
                }
            },
            {
                loader: 'eslint-loader',
                test: /\.jsx?$/,
                exclude: /node_modules/,
            },
            {
                loader: 'url-loader',
                test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/,
                options: {
                    limit: 100000
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            {from: path.resolve(ROOT_DIR, 'app/static'), to: path.resolve(ROOT_DIR, 'build')},
            {from: path.resolve(ROOT_DIR, 'manifest.json'), to: path.resolve(ROOT_DIR, 'build')},
        ]),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }),
    ]
}

module.exports = config
