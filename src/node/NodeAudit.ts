/**
 * 2018年3月26日 星期一
 * 审核节点
 */

import NodeAbstract from "./NodeAbstract";
export default class NodeAudit extends NodeAbstract{
    xRate: number           // 移除边框百分比
    protected _onInit(){
        this.NodeType = 'audit'
        this.xRate = 0.20
    }
    protected _whenCreatorEvt(){
        var pQue = this.opt2Attr(),
            nOpt = this.opt,
            bkg = nOpt.bkg || '#88EEEA'

        this.c = this.paper.path(this._ps2Path(pQue, true))
        this.c.attr('fill', bkg)
        // 文字
        if(nOpt.text){
            let {x, y} = this._getTextPnt()
            this.label = this.paper.text(x, y, nOpt.text)
        }
    }
    /**
     * 选项与节点属性的映射
     * @param {obejct|null} opt  选项属性
     * @returns {array} 选项表
     */
    opt2Attr(opt?: rSu.NodeOpt): rSu.P[]{
        var nopt = opt? opt: this.opt,
            cx = nopt.cx,
            cy = nopt.cy,
            w = nopt.w,
            h = nopt.h,
            xRate = this.xRate

        return [
            {   // A
                x: cx - w/2,
                y: cy - h/2
            },
            {   // B
                x: (cx + w/2) + (w * xRate),
                y: cy - h/2
            },
            {   // C
                x: cx + w/2,
                y: cy + h/2
            },
            {   // D
                x: (cx - w/2) - (w * xRate),
                y: cy + h/2
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
        // 文字
        if(this.label){
            let {x, y} = this._getTextPnt()
            this.label.attr({
                x, y
            })
        }
        return <rSu.Node>this
    }
}