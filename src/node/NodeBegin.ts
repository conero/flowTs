

/**
 * 2018年3月26日 星期一
 * 开始
 */
///<reference path="../../index.d.ts"/>

import NodeAbstract from "./NodeAbstract"
export default class NodeBegin extends NodeAbstract{    
    protected _onInit(){
        this.NodeType = 'begin'
    }
    /**
     * 生成器处理事件
     */
    protected _whenCreatorEvt(){
        this.opt.bkg = this.opt.bkg || '#851E07'
        var opt = this.opt
        this.c = this.paper.ellipse(opt.cx, opt.cy, opt.w/2, opt.h/2)
        this.c.attr('fill', opt.bkg)
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
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt): rSu.Node{
        var opt = this._updAttr(nOpt)
            .opt
        this.c.attr({
            cx: opt.cx,
            cy: opt.cy,
            rx: opt.w/2,
            ry: opt.h/2
        })
        this.updTextAttr(nOpt.text)  // 文字
        this.onSize()
        return <rSu.Node>this
    }
}