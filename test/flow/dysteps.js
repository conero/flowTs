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
            // {code: 'D7', type: 2, prev: 'C,F1'},         // 流程中退回的线条算法
            {code: 'D7', type: 2, prev: 'C'},


            {code: 'E1', type: 2, prev: 'D4'},
            {code: 'E2', type: 2, prev: 'D1'},
            {code: 'E3', type: 2, prev: 'D1'},
            {code: 'E4', type: 2, prev: 'D6'},
            
            {code: 'F1', type: 3, prev: 'E1,E3'},

            {code: 'G1', type: 3, prev: 'F1'},
            {code: 'G2', type: 2, prev: 'F1'},
            {code: 'H1', type: 2, prev: 'G2'},
            
            {code: 'J1', type: 2, prev: 'H1'},
            // 自连接测试 - BUG
            // {code: 'J1', type: 2, prev: 'J1'},

            {code: 'K1', type: 2, prev: 'J1'},
            {code: 'O1', type: 9, prev: 'G1,K1,E4'},


        ]
    })
})