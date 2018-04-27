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
        , rCodes: ['A1', 'A6', 'A5', 'A7', 'A12', 'A10']

        // 事件绑定
        , bindOEvts: true
        , onKeydown: function(code, $self){
            // console.log(code)
            switch(code){
                case 83:
                    let data = $self.save()
                    localStorage.setItem(strClsKey, JSON.stringify(data))
                    alert('数据已经保存')
                    break
            }
        }
    })
    

    // 暴露用于测试
    window.cacheDt = cacheDt
    window.$worker = $worker
    // 应用
    new class App{
        constructor(){
            // console.log(8)
            this.domListener()
            this.title()
            // 剪切板处理
            try {
                this.clipBoard()
            } catch (error) {
                console.warn(error)
            }
            
        }
        title(){
            let version = workerflow.version
            $('.srroo-top').text(`
            ${version.name} ${version.version} - ${version.release} / ${version.author}
            `)
        }
        domListener(){
            // 事件处理
            //this.keydownEvt()
        }
        keydownEvt(){
            $(document).keydown(function(key){
                // console.log(key)
                var code = key.keyCode
                // console.log(code)
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
                    else if(86 == code){ // shitf + v 克隆
                        $worker.clone()
                    }
                    // shitf + D 删除
                    else if(68 == code){
                        $worker.remove()
                    }
                    else if(84 == code){  // shitf + T tab 循环
                        $worker.tab()
                    }
                    else if(107 == code){ // shitf + + tab 循环
                        if(nodeSelEd){
                            nodeSelEd.zoomOut()
                        }
                    }
                    else if(109 == code){ // shitf + - tab 循环
                        if(nodeSelEd){
                            nodeSelEd.zoomIn()
                        }
                    }
                    else if(83 == code){ // shitf + S 数据保存
                        let data = $worker.save()
                        localStorage.setItem(strClsKey, JSON.stringify(data))
                        alert('数据已经保存')
                    }
                    else if(65 == code){ // shift + A 全选择
                        $worker.allSelect()
                    }
                    else if(82 == code){    // shift + R 删除
                        $worker.allRemove()
                    }
                }
                
            })
        }
        clipBoard(){
            // 粘贴
            document.addEventListener('paste', (e) => {
                var str = e.clipboardData.getData('text/plain')
                if(str){
                    try {
                        var rs = JSON.parse(str)
                        if(rs.name == workerflow.version.name){
                            $worker.paste(rs.data)
                        }
                    } catch (error) {
                        console.warn(error)
                    }
                }
            })
            // 复制
            document.addEventListener('copy', (e) => {
                var data = $worker.copy()
                if(data.length > 0){
                    var rs = {data, name: workerflow.version.name}
                    e.clipboardData.setData('text/plain', JSON.stringify(rs));
                }
                //e.clipboardData.setData('text/plain', 'Hello, world!');
                //e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
                e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
            })
        }
    }
})

window.workerflow = workerflow