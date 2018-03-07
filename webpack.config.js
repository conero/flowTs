/**
 * webpack 打包配置
 * 2018年1月4日 星期四
 */
const fs = require('fs')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')           // 文档
const Pkg = require('./package.json')

// 压缩插件
const nodeEnv = process.env.NODE_ENV 

class Queue{
    constructor(){
        this.FileList = []
    }
    /**
     * @param {string} name 源文件名
     * @param {string|null} refName 编译以后的文件名
     * @param {function|null} 回调函数 
     */
    js(name, refName, callback){
        refName = refName? refName:name
        var opt = {
            entry: './src/'+name+'.js',
            output: {
                filename: './build/'+refName + 
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
        if('function' == typeof callback){
            callback(opt)
        }
        this.FileList.push(opt)
        return this
    }
    getFiles(){
        return this.FileList
    }
}

// 编译时时间运行
(function(){
    var _json = {
        version: Pkg.version,
        release: Pkg.release,
        author: Pkg.author
    }
    fs.writeFileSync('./version.js', `export default ${JSON.stringify(_json)}`)
})()

module.exports = new Queue()
    .js('worker')

    .js('worker', 'workflow')   // 别名编译， 实际用于 zonmaker 框架的工作流库

    .js('browser.workerflow', 'workflow')   // 别名编译， 实际用于 zonmaker 框架的工作流库  

    // 别名编译， 实际用于 zonmaker 框架的工作流库  AMD
    .js('browser.workerflow.umd', 'workflow.umd', (opt) => {
        opt.output.libraryTarget = 'umd'
        opt.externals = {
            'raphael': 'raphael'
        }
    })

    .js('tree')
    .js('surong')   // index
.getFiles()