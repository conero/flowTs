/**
 * 2018年3月26日 星期一
 * 子流程
 */

import NodeAbstract from "./NodeAbstract"
export default class NodeSubFlow extends NodeAbstract{
    xRate: number                   // x 主偏移量
    inlineEle: RaphaelElement[]   // 内部连线线段元素
    protected _onInit(){
        this.NodeType = 'subflow'
        this.xRate = 0.15
    }
    /**
     * 生成器处理事件
     */
    protected _whenCreatorEvt(){
        var attrs = this.opt2Attr(),
            attr = attrs.cAttr,
            lLine = attrs.lLine,
            rLine = attrs.rLine,
            opt = this.opt,
            bkg = opt.bkg || '#88EEEA'

        this.c = this.paper.rect(attr.x, attr.y, attr.w, attr.h)
        this.c.attr('fill', bkg)
        this.inlineEle = [
            this.paper.path(
                'M' + lLine[0].x + ',' + lLine[0].y + 
                'L' + lLine[1].x + ',' + lLine[1].y
            ),
            this.paper.path(
                'M' + rLine[0].x + ',' + rLine[0].y + 
                'L' + rLine[1].x + ',' + rLine[1].y 
            )
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
}