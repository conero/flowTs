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
    constructor(){}
    add(opt){
        opt = 'object' == typeof opt? opt:{}
        if(opt.js){
            js(opt.js)
        }
        if(opt.scss){
            sass(opt.scss)
        }
        return this
    }
    base(_js, _scss){
        if(_js){
            js(_js)
        }
        if(_scss){
            sass(_scss)
        }
        return this
    }
    js(name){
        js(name)
        return this
    }
}


// 编译文件添加
new Config()
    // .base('base', 'base')
    .js('base')
    .js('line')
    .js('dysteps')

// console.log(JSON.stringify(buildData, null, 4))


module.exports = buildData