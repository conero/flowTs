/**
 * 2018年1月7日 星期日
 * 直线来连接式工作流
 */

import worker from '../../src/worker'
import {Cfg} from './frp1000c-v1'

$(function(){
    var $worker = new worker({
        dom: '#workflow',
        // rightAngle: false,
        h: $(window).height() * 6
    }, Cfg)
})