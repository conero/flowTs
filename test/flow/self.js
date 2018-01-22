/**
 * 2018年1月22日 星期一
 * 工作流，部件自回线
 */

import worker from '../../src/worker'
$(function(){
    // 有回路线
    function baseT1(){
        var $worker = new worker({
            dom: '#workflow',
            rightAngle: false,
            line: 'arrow'
            ,currentCode: 'H1'
            // currentCode: 'H1'
        }, {
            step:[
                {code: 'A', type: 1},
                {code: 'B', type: 2, prev: 'A, G1'},
                {code: 'C', type: 3, prev: 'B'},

                {code: 'D1', type: 2, prev: 'C'},

                {code: 'D2', type: 2, prev: 'C'},
                // {code: 'E2', type: 2, prev: 'D2'},

                {code: 'E1', type: 2, prev: 'D1'},
                {code: 'F1', type: 2, prev: 'E1'},
                {code: 'G1', type: 3, prev: 'F1'},
                {code: 'H1', type: 2, prev: 'G1'},
                {code: 'I1', type: 2, prev: 'H1'},
                {code: 'J1', type: 2, prev: 'I1'},

                {code: 'O1', type: 9, prev: 'J1,D2'}
            ]
        })
    }
    baseT1()
})