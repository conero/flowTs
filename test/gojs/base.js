/**
 * 基于 gojs 的流程图
 * 2018年1月22日 星期一
 * 由于收费，暂时基于此的程序开发
 */

import {
    Flow
} from './src/flow'
import {Cfg} from '../frp1000c-v1'

(function(){
    function baseTest(){
        var flow = new Flow({
            id: 'workflow',
            data: Cfg
        })
        // flow.setData(Cfg)
        console.log(flow)
    }
    baseTest()

})()