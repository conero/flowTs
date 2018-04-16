/**
 * 2018年3月26日 星期一
 * 条件判断节点
 */

import NodeAbstract from "./NodeAbstract";
export default class NodeCond extends NodeAbstract{
    protected _onInit(){
        this.NodeType = 'cond'
    }
    protected _whenCreatorEvt(){
        this.opt.bkg = this.opt.bkg || '#88EEEA'
        var pQue = this.opt2Attr(),
            opt = this.opt
        this.c = this.paper.path(this._ps2Path(pQue, true))
        this.c.attr('fill', opt.bkg)
        // 文字
        if(opt.text){
            let {x, y} = this._getTextPnt()
            this.label = this.paper.text(x, y, opt.text)
        }
    }

    /**
     * 选项与节点属性的映射
     * @param {obejct|null} opt  选项属性
     * @returns {array} 选项表
     */
    opt2Attr(opt?: rSu.NodeOpt): rSu.P[]{
        var nOpt = opt? opt : this.opt,
            cx = nOpt.cx,
            cy = nOpt.cy,
            w = nOpt.w,
            h = nOpt.h

        return [
            {   // A
                x: cx,
                y: cy - h/2
            },
            {   // B
                x: cx + w/2,
                y: cy
            },
            {   // C
                x: cx,
                y: cy + h/2
            },
            {   // D
                x: cx - w/2,
                y: cy
            }
        ]
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt): rSu.Node{
        this._updAttr(nOpt)
        var opt = this.opt2Attr()
        this.c.attr('path', this._ps2PathAttr(opt, true))

        this.updTextAttr(nOpt.text)  // 文字
        return <rSu.Node>this
    }
}