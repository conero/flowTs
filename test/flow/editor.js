/**
 * 工作流程编辑器
 */
import worker from '../../src/worker'

$(function(){
    var $worker = worker.editor({
        dom: '#workflow',
    })
    // 暴露用于测试
    window.$worker = $worker
})

window.workerflow = worker