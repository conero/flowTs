
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
        var opt = this.opt,
            bkg = opt.bkg || '#2EF25F'
        this.c = this.paper.ellipse(opt.cx, opt.cy, opt.w/2, opt.h/2)
        this.c.attr('fill', bkg)
    }
}