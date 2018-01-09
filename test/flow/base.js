/**
 * 基本测试版本
 * 2018年1月4日 星期四
 */

import worker from '../../src/worker'
import {Cfg} from './frp1000c-v1'

$(function(){
    var $worker = new worker({
        dom: '#workflow',
        // h: $(window).height() * 6
        h: $(window).height()
        ,line: 'arrow'
    }, Cfg)
})