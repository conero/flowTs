import WorkerEditor from '../../src/WorkerEditor'

$(function(){
    let $worker = new WorkerEditor({
        dom: '#workflow',
        // el_toolbar: '#workflow-toolbar'            // 工具栏
        // noToolBar: true
    });
    // 暴露用于测试
    (<any>window).$worker = $worker
})
