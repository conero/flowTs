/**
 * 工作流程编辑器
 */
import workerflow from '../../src/WorkerEditor'

$(function(){
    // 数据缓存
    var strClsKey = 'test_flow',
        testFlowStr = localStorage.getItem(strClsKey),
        cacheDt = null
    try{
        if(testFlowStr){
            cacheDt = JSON.parse(testFlowStr)
        }
    }catch(e){}

    var $worker = new workerflow({
        dom: '#workflow',
        w: 900,
        // h: 600
        h: 570,
        data: cacheDt
        // , noToolBar: true
        // noToolBar: true
    })
    // 事件处理
    $(document).keydown(function(key){
        // console.log(key)
        var code = key.keyCode
        //console.log(code)
        var nodeSelEd = $worker.select()
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
            // shitf + S 数据保存
            else if(83 == code){
                let data = $worker.save()
                localStorage.setItem(strClsKey, JSON.stringify(data))
                alert('数据已经保存')
            }
        }
        
    })

    // 暴露用于测试
    window.cacheDt = cacheDt
    window.$worker = $worker
})

window.workerflow = workerflow