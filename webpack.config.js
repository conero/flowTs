/**
 * webpack 打包配置
 * 2018年1月4日 星期四
 */
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')           // 文档
// 压缩插件
const nodeEnv = process.env.NODE_ENV 

class Queue{
    constructor(){
        this.FileList = []
    }
    js(name){
        var opt = {
            entry: './src/'+name+'.js',
            output: {
                filename: './build/'+name + 
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
            opt.plugins = []
            opt.plugins.push(new UglifyJsPlugin())
            opt.plugins.push(
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('production')
                    //,cache: true                // 缓存 node_modules/.cache/uglifyjs-webpack-plugin.
                })
            )
        }
        this.FileList.push(opt)
        return this
    }
    getFiles(){
        return this.FileList
    }
}

module.exports = new Queue()
    .js('worker')
    .js('tree')
.getFiles()