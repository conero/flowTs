/**
 * 2018年3月26日 星期一
 * 直线
 */
import NodeAbstract from "./NodeAbstract"
export default class NodeLn extends NodeAbstract{
    protected _onInit(){
        this.NodeType = 'ln'
        // 箭头最大长度
        this.data('maxR', 5)
    }
    protected _whenCreatorEvt(){
        this.opt.bkg = this.opt.bkg || 'rgb(3, 84, 41)'
        var opt = this.opt,
            {bkg} = opt
        this.c = this.paper.path(this._ps2Path(this.opt2Attr()))
        this.c.attr('fill', this.opt.bkg)
    }
    /**
     * 生成器
     */
    opt2Attr(nOpt?: rSu.NodeOpt){
        var opt = nOpt? nOpt : this.opt,
            P1: rSu.P = opt.P1,
            P2: rSu.P = opt.P2,
            r = opt.r || this.getLen() * 0.2,
            maxR = this.data('maxR')
        
        if(r > maxR){
            r = maxR
        }
        
        var atan = Math.atan2(P1.y - P2.y, P2.x - P1.x) * (180 / Math.PI);

        var centerX = P2.x - r * Math.cos(atan * (Math.PI / 180));
        var centerY = P2.y + r * Math.sin(atan * (Math.PI / 180));

        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));

        return [
            P1,
            P2,
            {x: x2, y: y2},
            {x: x3, y: y3},
            P2
        ]
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt): rSu.Node{
        this._updAttr(nOpt)
        this.c.attr('path', this._ps2PathAttr(this.opt2Attr()))
        return <rSu.Node>this
    }
    /**
     * 获取两点间的距离
     */
    getLen(nOpt?: rSu.NodeOpt): number{
        var opt = nOpt? nOpt : this.opt,
            P1: rSu.P = opt.P1,
            P2: rSu.P = opt.P2
        return this.getPLen(P1, P2)
    }
}