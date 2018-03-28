
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
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt){
        var opt = this._updAttr(nOpt)
            .opt
        this.c.attr({
            cx: opt.cx,
            cy: opt.cy,
            rx: opt.w/2,
            ry: opt.h/2
        })
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