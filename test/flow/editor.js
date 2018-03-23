/**
 * 工作流程编辑器
 */
import workerflow from '../../src/WorkerEditor'

$(function(){
    var $worker = new workerflow({
        dom: '#workflow',
        // noToolBar: true
    })
    // 暴露用于测试
    window.$worker = $worker
})

window.workerflow = workerflow