/**
 * 2018年3月7日 星期三
 * 浏览器端，非 npm 管理引入包
 * Joshua Conero
 */

/*--
    Raphael 包与 worker 同文件打包时，umd 规范出错： eve is not defined // 2018年3月7日 星期三
--
*/
// import WorkerEditor from './WorkerEditor'
// import WorkerEditor = require('./WorkerEditor')
const WorkerEditor = require('./WorkerEditor')

define(['raphael'], function(Raphael){
    window.Raphael = Raphael
    console.log(WorkerEditor)
    alert(8)
    return WorkerEditor
})


// define(['raphael', './WorkerEditor'], function(Raphael, WorkerEditor){
//     window.Raphael = Raphael
//     console.log(WorkerEditor)
//     return WorkerEditor
// })
