/**
 * 2018年1月7日 星期日
 * 步骤动态配置
 */

import worker from '../../src/tree'

$(function(){
    var $worker = new worker({
        dom: '#workflow',
        h: $(window).height() * 6,
        line: 'arrow'
    }, {
        step:[
            {code: 'A', name:'杨氏家族', type: 1},
            {code: 'B', name:'泰金', type: 2, prev: 'A'},
            {code: 'C', name:'政武', type: 2, prev: 'B'},
            {code: 'D1', name:'庆德', type: 2, prev: 'C'},
            {code: 'D2', name: '庆志', type: 2, prev: 'C'},
            {code: 'D3', name: '庆耀', type: 2, prev: 'C'},
            {code: 'D4', name: '庆兵', type: 2, prev: 'C'},
            {code: 'D5', name: '庆泰', type: 2, prev: 'C'},
            {code: 'D6', name: '庆全', type: 2, prev: 'C'},
            {code: 'D7', name: '庆昭', type: 2, prev: 'C'},


            {code: 'E1', name: '正泰', type: 2, prev: 'D4'},
            {code: 'E2', name: '正易', type: 2, prev: 'D1'},
            {code: 'E3', name: '正关', type: 2, prev: 'D1'},
            {code: 'E4', name: '正疆', type: 2, prev: 'D6'},
            
        ]
    })
})