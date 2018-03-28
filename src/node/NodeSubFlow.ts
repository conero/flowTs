/**
 * 2018年3月26日 星期一
 * 子流程
 */

import NodeAbstract from "./NodeAbstract"
export default class NodeSubFlow extends NodeAbstract{
    xRate: number                   // x 主偏移量
    inlineEle: RaphaelElement[]   // 内部连线线段元素
    protected _onInit(){
        this.NodeType = 'sub_flow'
        this.xRate = 0.15
    }
    /**
     * 生成器处理事件
     */
    protected _whenCreatorEvt(){
        var {cAttr, lLine, rLine} = this.opt2Attr(),
            opt = this.opt,
            bkg = opt.bkg || '#88EEEA'

        this.c = this.paper.rect(cAttr.x, cAttr.y, cAttr.w, cAttr.h)
        this.c.attr('fill', bkg)
        this.inlineEle = [
            this.paper.path(this._ps2Path(lLine)),
            this.paper.path(this._ps2Path(rLine))
        ]
    }
    /**
     * 通过选项映射到节点属性
     */
    opt2Attr(nOpt?: rSu.NodeOpt){
        var opt = nOpt? nOpt : this.opt,
            x = opt.cx - opt.w/2,
            y = opt.cy - opt.h/2,
            w = opt.w,
            h = opt.h,
            xRate = this.xRate

        return {
            cAttr: {
                x, y, w, h
            },
            lLine:[
                {x: x + w*xRate, y: y},
                {x: x + w*xRate, y: y + h}
            ],
            rLine:[
                {x: x + w - w*xRate, y: y},
                {x: x + w - w*xRate, y: y + h}
            ]
        }
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt){
        this._updAttr(nOpt)
        var {cAttr, lLine, rLine} = this.opt2Attr()
        this.c.attr({
            x: cAttr.x, y: cAttr.y, width: cAttr.w, height: cAttr.h
        })
        this.inlineEle[0].attr('path', this._ps2PathAttr(lLine))
        this.inlineEle[1].attr('path', this._ps2PathAttr(rLine))
    }
    /**
     * 节点可移动
     * @returns 
     * @memberof NodeAudit
     */
    moveable(){
        var $this = this;
        this.c.undrag()
        this.c.drag(
            function(dx: number, dy: number, x: number, y: number){
                $this.updAttr({cx: x, cy: y})
                return {}
            }
        )
        return $this
    }
}