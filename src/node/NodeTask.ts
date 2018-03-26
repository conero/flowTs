/**
 * 2018年3月26日 星期一
 * 任务节点
 */

import NodeAbstract from "./NodeAbstract"

export default class NodeTask extends NodeAbstract{
    protected _onInit(){
        this.NodeType = 'task'
    }
    /**
     * 生成器处理事件
     */
    protected _whenCreatorEvt(){
        var attr = this.opt2Attr()
        this.c = this.paper.rect(attr.x, attr.y, attr.w, attr.h)
    }
    /**
     * 通过选项映射到节点属性
     */
    opt2Attr(nOpt?: rSu.NodeOpt){
        var opt = nOpt? nOpt : this.opt
        var x = opt.cx - opt.w/2
        var y = opt.cy - opt.h/2
        var w = opt.w
        var h = opt.h
        return {
            x, y, w, h
        }
    }
}