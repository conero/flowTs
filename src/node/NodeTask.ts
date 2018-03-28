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
        var attr = this.opt2Attr(),
            opt = this.opt,
            bkg = opt.bkg || '#88EEEA'
        this.c = this.paper.rect(attr.x, attr.y, attr.w, attr.h)
        this.c.attr('fill', bkg)
    }
    /**
     * 通过选项映射到节点属性
     */
    opt2Attr(nOpt?: rSu.NodeOpt){
        var opt = nOpt? nOpt : this.opt,
            x = opt.cx - opt.w/2,
            y = opt.cy - opt.h/2,
            w = opt.w,
            h = opt.h
        return {
            x, y, w, h
        }
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt){
        this._updAttr(nOpt)
        var opt = this.opt2Attr()
        var cAttr: rSu.bsMap = {
            x: opt.x,
            y: opt.y,
            width: opt.w,
            height: opt.h
        }
        this.c.attr(cAttr)
    }
    /**
     * 拖动处理事件，移动
     */
    moveable(){
        var $this = this;
        this.c.undrag()
        this.c.drag(
            function(dx: number, dy: number, x: number, y: number){
                $this.updAttr({cx: x, cy: y})
                return {}
            },
            function(x ,y){
                return {x, y}
            },
            function(){
                return {}
            }
        )
        return this
    }
}