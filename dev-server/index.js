const NODE_ENV = process.env.NODE_ENV || 'staging'
const config = `../webpack/${NODE_ENV}.config.js`
const port = process.env.PORT || 9000

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const compiler = webpack(require(config))

const server = new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: {
        disableDotRule: true
    },
    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        chunks: true,
        chunkModules: false,
    }
})

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})
