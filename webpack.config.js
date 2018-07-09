/**
 * webpack 打包配置
 * 2018年1月4日 星期四
 */

const {Msr4} = require('./wp4-msr/src/Msr4')

// 公共数据
let publicOpt = {
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
// 公共配置
let publicMsr4 = {
    source_dir: './src/',
    target_dir: './build/',
    hasMinScr: true
}
let webpackFiles = [
    // 普通应用
    new Msr4(Object.assign(publicMsr4, {
        options: Object.assign({
            // output: {
            //     libraryTarget: 'umd'
            // }
        }, publicOpt)
    }))
        .js({
            WorkerEditor: 'WorkerEditor'
        })
        .data
    
    // umd
    , new Msr4(Object.assign(publicMsr4, {
        options: Object.assign({
            output: {
                libraryTarget: 'umd'
            },
            externals: {
                'raphael': 'raphael'
            }
        }, publicOpt)
    }))
        .js({
            'FlowEditor.umd': 'browser.FlowEditor.umd'
        })
        .data
];

// 系统便于-for zonMaker
webpackFiles.push(
    new Msr4({
        source_dir: './src/',
        target_dir: '../../zmapp/ZonMaker/public/libs/workflow/',
        hasMinScr: true,
        options: Object.assign({
            output: {
                libraryTarget: 'umd'
            },
            externals: {
                'raphael': 'raphael'
            }
        }, publicOpt)
    })
        .js({
            'workflow': 'browser.FlowEditor.umd'
        })
        .data
)

module.exports = webpackFiles