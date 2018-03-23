/**
 * 2018年3月7日 星期三
 * 浏览器端，非 npm 管理引入包
 * Joshua Conero
 */

/*--
    Raphael 包与 worker 同文件打包时，umd 规范出错： eve is not defined // 2018年3月7日 星期三
--
*/
declare function define(...args: any[]): any;

define(['raphael', './WorkerEditor'], function(Raphael: any, WorkerEditor: any){
    (<any>window).Raphael = Raphael
    // 2018年3月23日 星期五
    // `` AMD/RequireJs 文件加载风格，从 ts 库 中加载的文件，默认加载无效
    var workflow: any = 'function' == typeof WorkerEditor.default? WorkerEditor.default: WorkerEditor
    
    return workflow
})