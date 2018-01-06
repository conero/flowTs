/**
 * webpack 打包配置
 * 2018年1月4日 星期四
 */
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')           // 文档
// 压缩插件
const nodeEnv = process.env.NODE_ENV 



var buildData = {
    entry: './src/worker.js',
    output: {
        filename: './build/worker'+
            (nodeEnv !== 'production'? '':'.min')+
            '.js'
    }
    // es2015 加载方式
    ,module: {
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
    }
    ,resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
        extensions: ['.js', '.json']
    }
}

if(nodeEnv == 'production'){
    buildData.plugins = []
    buildData.plugins.push(new UglifyJsPlugin())
    buildData.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
            //,cache: true                // 缓存 node_modules/.cache/uglifyjs-webpack-plugin.
        })
    )
}


module.exports = buildData