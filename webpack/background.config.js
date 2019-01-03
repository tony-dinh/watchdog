const path = require('path')
const webpack = require('webpack')

const ROOT_DIR = process.cwd()
const entryPath = path.resolve(ROOT_DIR, 'app/background.js')
const outputPath = path.resolve(ROOT_DIR, 'build')

module.exports = {
    mode: 'production',
    entry: [
        'core-js/es6',
        'core-js/es7',
        entryPath
    ],
    output: {
        path: outputPath,
        filename: 'background.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'global': path.resolve(ROOT_DIR, 'app/global/'),
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: path.join(__dirname, 'tmp')
                }
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        })
    ]
}
