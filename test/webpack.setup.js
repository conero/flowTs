/**
 * 2018年1月4日 星期四
 */

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// new ExtractTextPlugin("styles.css")

var buildData = []
var js = (name) => {    
    if('object' == typeof name){
        for(var i=0; i<name.length; i++){
            js(name[i])
        }
    }
    buildData.push({
        entry: './test/flow/'+name+'.js',
        output: {
            filename: './test/flow/_cro-'+name+'.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    // use: 'ts-loader',
                    // exclude: /node_modules/
                    loader: "ts-loader"
                }
            ]
        },
        resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
            extensions: ['.js', '.json', '.ts']
        }
    })
}

const extractSass = new ExtractTextPlugin({
    // filename: "[name].[contenthash].css"
    // filename: "[name].css"
    // filename: "[name].css"
    filename: "./test/flow/_cro-[name].css"
    // , disable: process.env.NODE_ENV === "development"
});

var sass = (name) => {
    if('object' == typeof name){
        for(var i=0; i<name.length; i++){
            sass(name[i])
        }
    }
    buildData.push({
        entry: './test/flow/'+name+'.scss',
        
        output: {
            filename: './test/flow/_cro-'+name+'.css'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    // use: extractSass.extract([ 'css-loader', 'postcss-loader' ])
                    use: extractSass.extract([ 'sass-loader', 'css-loader', 'style-loader'])
                }
            ]
            
                
            /*
            rules: [{
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                    ,options: {
                        sourceMap: true
                    }
                }]
            }]
            */
        },
        plugins: [
            // new ExtractTextPlugin("styles.css")
            extractSass
            /*
            new ExtractTextPlugin({
            filename:  (getPath) => {
                // return getPath('./test/flow/_cro-[name].css')
                console.log(getPath('./test/flow/_cro-[name].css'))
                return getPath('./test/flow/_cro-[name].css')
            },
            allChunks: true
            })
            */
        ]
    })
}

class Config{
    constructor(option){
        this.jsFileList = []
        //
        this.baseDir = ''
        if(option.baseDir){
            this.baseDir = option.baseDir
        }
    }
    add(opt){
        opt = 'object' == typeof opt? opt:{}
        if(opt.js){
            this.js(opt.js)
        }
        if(opt.scss){
            sass(opt.scss)
        }
        return this
    }
    base(_js, _scss){
        if(_js){
            this.js(_js)
        }
        if(_scss){
            sass(_scss)
        }
        return this
    }
    js(name){
        /*
        if('object' == typeof name){
            for(var i=0; i<name.length; i++){
                this.js(name[i])
            }
            return this
        }
        this.jsFileList.push({
            entry: './test/'+this.baseDir + name +'.js',
            output: {
                filename: './test/'+this.baseDir+'_cro-'+name+'.js'
            }
        })
        return this
        */
       if('object' == typeof name){
            for(var i=0; i<name.length; i++){
                this.js(name[i])
            }
            return this
        }
        this.jsFileList.push({
            entry: './test/flow/'+name+'.js',
            output: {
                filename: './test/flow/_cro-'+name+'.js'
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        // use: 'ts-loader',
                        // exclude: /node_modules/
                        loader: "ts-loader"
                    }
                ]
            },
            resolve: {// 现在你require文件的时候可以直接使用require('file')，不用使用require('file.coffee')
                extensions: ['.js', '.json', '.ts']
            }
        })
        return this
    }
    getJsFileList(){
        return this.jsFileList
    }
}

module.exports = {
    Config
}