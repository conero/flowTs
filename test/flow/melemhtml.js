/**
 * 工作流程编辑器
 */
import workerflow from '../../src/WorkerEditor'

$(function(){
    var $worker = new workerflow({
        dom: '#workflow',
        w: 900,
        // h: 600
        h: 570,
        // noToolBar: true
    })
    // 事件处理
    $(document).keydown(function(key){
        // console.log(key)
        var code = key.keyCode
        console.log(code)
        var nodeSelEd = $worker.getSelected()
        if(key.shiftKey){
            // 向上 ↑ + shift
            if(38 == code){
                if(nodeSelEd){
                    nodeSelEd.move2T()
                }
            }
            // 向下 ↓
            else if(40 == code){
                if(nodeSelEd){
                    nodeSelEd.move2B()
                }
            }
            // ←
            else if(37 == code){
                if(nodeSelEd){
                    nodeSelEd.move2L()
                }
            }
            // →
            else if(39 == code){
                if(nodeSelEd){
                    nodeSelEd.move2R()
                }
            }
            // shitf + v 克隆
            else if(86 == code){
                $worker.clone()
            }
            // shitf + D 删除
            else if(68 == code){
                $worker.remove()
            }
            // shitf + T tab 循环
            else if(84 == code){
                $worker.tab()
            }
            // shitf + + tab 循环
            else if(107 == code){
                if(nodeSelEd){
                    nodeSelEd.zoomOut()
                }
            }
            // shitf + - tab 循环
            else if(109 == code){
                if(nodeSelEd){
                    nodeSelEd.zoomIn()
                }
            }
        }
        
    })

    // 暴露用于测试
    window.$worker = $worker
})

window.workerflow = workerflow