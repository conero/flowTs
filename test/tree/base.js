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
        // 特征
        feature:{
            // 背景色
            background:{
                female: '',
                male:'rgb(39, 116, 80)'
            }
        },
        // 节点
        nodes:[
            {code: 'B', name:'古泰金', type: 'M', parent: 'A'},

            {code: 'C', name:'古政武', type: 'M', parent: 'B'},

            {code: 'D1', name:'古庆德', type: 'M', parent: 'C'},
            // {code: 'D2', name:'古庆志', type: 'M', parent: 'C'},
            // {code: 'D3', name:'古庆耀', type: 'M', parent: 'C'},
            {code: 'D4', name:'古庆兵', type: 'M', parent: 'C'},
            // {code: 'D5', name:'古庆泰', type: 'M', parent: 'C'},
            {code: 'D6', name:'古庆全', type: 'M', parent: 'C'},
            {code: 'D7', name:'古庆昭', type: 'M', parent: 'C'},
            {code: 'd1', name:'亚江美子', type: 'F', parent: ''},
            {code: 'd2', name:'李晶贤', type: 'F', parent: ''},


            // {code: 'E1', name:'古正泰', type: 'M', parent: 'D4'},
            // {code: 'E2', name:'古正易', type: 'M', parent: 'D1'},
            {code: 'E3', name:'古正关', type: 'M', parent: 'D1'},
            {code: 'E4', name:'古正疆', type: 'M', parent: 'D6,d1'},
            {code: 'E5', name:'古正首美', type: 'F', parent: 'D6,d1'},
            {code: 'E6', name:'古正季美', type: 'F', parent: 'D6,d1'},
            {code: 'E7', name:'古正次美', type: 'F', parent: 'D6,d1'},
            {code: 'E8', name:'古李娜美', type: 'F', parent: 'D6,d2'},


            {code: 'F1', name:'关姜宇', type: 'M', parent: ''},

            {code: 'G1', name:'关古神之', type: 'M', parent: 'F1,E7'},
            {code: 'G2', name:'关古倾之', type: 'M', parent: 'F1,E7'},
            {code: 'G3', name:'古全吉', type: 'M', parent: 'E8'},
            
        ]
    })
})