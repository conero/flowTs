/**
 * 2018年3月26日 星期一
 * 并行
 */
import NodeAbstract from "./NodeAbstract"
export default class NodeParallel extends NodeAbstract{
    xRate: number   // 偏移量
    inlineEle: RaphaelElement
    protected _onInit(){
        this.NodeType = 'parallel'
        this.xRate = 0.20
    }
    protected _whenCreatorEvt(){
        this.opt.bkg = this.opt.bkg || '#88EEEA'
        var attrs = this.opt2Attr(),
            opt = this.opt,
            {bkg} = opt

        this.c = this.paper.path(this._ps2Path(attrs.cAttr, true))
        this.c.attr('fill', bkg)
        this.inlineEle = this.paper.path(this._ps2Path(attrs.inLine))
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
            inLine: [
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
        var {cAttr, inLine} = this.opt2Attr()
        this.c.attr('path', this._ps2PathAttr(cAttr, true))
        this.inlineEle.attr('path', this._ps2PathAttr(inLine))
        return <rSu.Node>this
    }
}