
/**
 * 2018年3月26日 星期一
 * 结束
 */
import NodeAbstract from "./NodeAbstract"
export default class NodeEnd extends NodeAbstract{
    protected _onInit(){
        this.NodeType = 'end'
    }
    /**
     * 生成器处理事件
     */
    protected _whenCreatorEvt(){
        this.opt.bkg = this.opt.bkg || '#2EF25F'
        var opt = this.opt
        this.c = this.paper.ellipse(opt.cx, opt.cy, opt.w/2, opt.h/2)
        this.c.attr('fill', this.opt.bkg)
        // 文字
        if(opt.text){
            let {x, y} = this._getTextPnt()
            this.label = this.paper.text(x, y, opt.text)
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
        return <rSu.Node>this
    }
}