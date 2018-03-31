/**
 * 2018年3月26日 星期一
 * 合并
 */

import NodeAbstract from "./NodeAbstract"
export default class NodeMerge extends NodeAbstract{
    xRate: number   // 偏移量
    inlinesEle: RaphaelElement[]
    protected _onInit(){
        this.NodeType = 'merge'
        this.xRate = 0.20        
    }
    protected _whenCreatorEvt(){
        var attrs = this.opt2Attr(),
            opt = this.opt,
            bkg = opt.bkg || '#88EEEA'
        this.c = this.paper.path(this._ps2Path(attrs.cAttr, true))
        this.c.attr('fill', bkg)
        this.inlinesEle = [
            this.paper.path(this._ps2Path(attrs.vLine)),
            this.paper.path(this._ps2Path(attrs.hLine))
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
            xRate = this.xRate,
            rW = w * (1 - xRate * 2)            // 内矩形宽度

        return {
            cAttr: [
                {   // A
                    x: x - rW/2 , y: y - h/2
                },
                {   // B
                    x: x + rW/2 , y: y - h/2
                },
                {   // C
                    x: x + w/2 , y: y
                },
                {   // D
                    x: x + rW/2 , y: y + h/2
                },
                {   // E
                    x: x - rW/2 , y: y + h/2
                },
                {   // F
                    x: x - w/2 , y: y
                }
            ],
            vLine: [    // 竖线
                {x: x, y: y  - h/2 * 0.80},
                {x: x, y: y  + h/2 * 0.80}
            ],
            hLine: [    // 水平线
                {x: x - rW/2 - rW * 0.1, y: y},
                {x: x + rW/2 + rW * 0.1, y: y}
            ]
        }            
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt): rSu.Node{
        this._updAttr(nOpt)
        var {cAttr, vLine, hLine} = this.opt2Attr()
        this.c.attr('path', this._ps2PathAttr(cAttr, true))
        this.inlinesEle[0].attr('path', this._ps2PathAttr(vLine))
        this.inlinesEle[1].attr('path', this._ps2PathAttr(hLine))
        return <rSu.Node>this
    }
}