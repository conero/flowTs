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
        this.opt.bkg = this.opt.bkg || '#88EEEA'
        var attr = this.opt2Attr(),
            opt = this.opt,
            {bkg} = opt
        this.c = this.paper.rect(attr.x, attr.y, attr.w, attr.h)
        this.c.attr('fill', bkg)

        // 文字
        if(opt.text){
            let {x, y} = this._getTextPnt()
            this.label = this.paper.text(x, y, opt.text)
            this.sets = this.paper.set()
            this.sets.push(
                this.c,
                this.label
            )
        }
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
    updAttr(nOpt: rSu.NodeOpt): rSu.Node{
        this._updAttr(nOpt)
        var opt = this.opt2Attr()
        var cAttr: rSu.bsMap = {
            x: opt.x,
            y: opt.y,
            width: opt.w,
            height: opt.h
        }
        this.c.attr(cAttr)
        this.updTextAttr(nOpt.text)  // 文字
        this.onSize()
        return <rSu.Node>this
    }
    /**
     * 获取 icon 坐标地址
     */
    getIconP(): rSu.P{
        let p: rSu.P,
            {cx, cy, w, h} = this.opt
        let d = 2
        let x = cx - w/2 + d,
            y = cy - h/2 + d
        p = {x, y}
        return p
    }
}