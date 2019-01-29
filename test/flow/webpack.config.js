/**
 * 2018年1月4日 星期四
 */

const {Msr4} = require('wp4-msr/src/Msr4')

// js 生成函数： editor -> _cro-editor
const jsCrtHlderFn = function(queue){
    let newJs = {}
    for(let i=0; i<queue.length; i++){
        let v = queue[i]
        newJs[`_cro-${v}`]  = v
    }
    
    return newJs
}

// console.log(process.env.NODE_ENV);


let webpackData = new Msr4({
    source_dir: './test/flow/',
    target_dir: './test/flow/js/',
    options: {
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
    }
})
    .js(jsCrtHlderFn([
        'editor',
        'melemhtml',
        'editor-actb'
    ]))
    .data
// console.log(webpackData)
module.exports = webpackData