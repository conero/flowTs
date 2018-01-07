/**
 * 2018年1月7日 星期日
 * 步骤动态配置
 */

import worker from '../../src/worker'

$(function(){
    var $worker = new worker({
        dom: '#workflow',
        h: $(window).height() * 6,
        line: 'arrow'
    }, {
        step:[
            {code: 'A', type: 1},
            {code: 'B', type: 2, prev: 'A'},
            {code: 'C', type: 2, prev: 'B'},
            {code: 'D1', type: 2, prev: 'C'},
            {code: 'D2', name: 'D2 并列', type: 2, prev: 'C'},
            {code: 'D3', name: 'D3 并列', type: 2, prev: 'C'},
            {code: 'D4', name: 'D4 并列', type: 2, prev: 'C'},
            {code: 'D5', type: 2, prev: 'C'},
            {code: 'D6', type: 2, prev: 'C'},
            {code: 'D7', type: 2, prev: 'C'},


            {code: 'E1', type: 2, prev: 'D4'},
            {code: 'E2', type: 2, prev: 'D1'},
            {code: 'E3', type: 2, prev: 'D1'},

        ]
    })
})