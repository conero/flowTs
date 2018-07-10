/**
 * WorkerEditor Plugin 插件级别
 * 2018年7月10日 星期二
 */

export default class WePlg {
    worker: rSu.WEditor
    constructor(worker: rSu.WEditor){
        this.worker = worker
        this._addPlg()
    }
    private _addPlg(){
        let {config} = this.worker
        // 用户绑定事件，以及传入绑定事件时
        if(config.bindOEvts || (config.onKeydown && 'function' == typeof config.onKeydown)){
            config.bindOEvts = true
            this.operHelpEvts()
        }
    }
    /**
     * 操作助手事件
     */
    operHelpEvts(){
        let $this:rSu.WEditor = this.worker,
            {config} = $this,
            {dom} = config
        // tabindex ="0" 是元素可以聚焦，outline 取消边框
        dom.attr('tabindex', '0')
            .css({'outline':'none'})
        dom.off('keydown').on('keydown', function(evt: any){
            let code = evt.keyCode
            // 用户自定义键盘事件
            if(config.onKeydown && 'function' == typeof config.onKeydown){
                let breakMk = config.onKeydown(code, $this, evt)
                if(breakMk === false){
                    return
                }
            }
            // console.log(code)
            // shift +
            if(evt.shiftKey){
                // 基本操作
                if(68 == code){	// shift + D	删除当前的选择节点
                    $this.remove()
                }
                else if(84 == code){ // shitf + T tab 循环
                    $this.tab()
                }
                else if(67 == code){    // shift + C tab 循环 conn
                    $this.tab('c')
                }
                else if(76 == code){    // shift + L tab 循环 text/lable
                    $this.tab('t')
                }
                else if(65 == code){ // shift + A 全选择
                    $this.allSelect()
                }
                else if(82 == code){    // shift + R 删除
                    $this.allRemove();
                }
                else if(86 == code){ // shift + v 克隆
                    $this.clone();
                }
                else if(69 == code){    // shift + E 错误检测
                    $this.error()
                }
                // 移动，方向移动：缩放
                else if($.inArray(code, [38, 40, 37, 39, 107, 109]) > -1){
                    let nodeSelEd: rSu.Node = $this.select()
                    if(nodeSelEd){
                        switch(code){
                            case 38: nodeSelEd.move2T(); break;
                            case 40: nodeSelEd.move2B(); break;
                            case 37: nodeSelEd.move2L(); break;
                            case 39: nodeSelEd.move2R(); break;
                            case 107: nodeSelEd.zoomOut(); break;
                            case 109: nodeSelEd.zoomIn(); break;
                        }
                    }
                }
            }
            else if(46 == code){    // delete 键删除
                $this.remove()
            }
        })
    }
}