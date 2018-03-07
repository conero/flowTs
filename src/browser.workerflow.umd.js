/**
 * 2018年3月7日 星期三
 * 浏览器端，非 npm 管理引入包
 * Joshua Conero
 */

/*--
    Raphael 包与 worker 同文件打包时，umd 规范出错： eve is not defined // 2018年3月7日 星期三
--
*/
import Worker from './worker'
define(['raphael'], function(Raphael){
    window.Raphael = Raphael
    return Worker
})