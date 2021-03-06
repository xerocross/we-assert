const path = require('path')
const webpack = require('webpack')

module.exports = [{
    entry : {
        'we-assert' : './src/we-assert.js'
    },
    output : {
        globalObject : "this",
        path : path.resolve(__dirname, './'),
        publicPath : '/',
        filename : '[name].bundle.js',
        library : "WeAssert",
        libraryTarget : "umd",
        umdNamedDefine : true
    },
    externals : {
    },
    module : {
        rules : [
        ]
    },
    optimization : {
        minimize : false
    },
    plugins : [
        new webpack.DefinePlugin({
            'NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer : {
        contentBase : "./public",
        compress : true,
        port : 9000,
        watchContentBase : true
    }
}]