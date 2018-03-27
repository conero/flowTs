/**
 * 2018年3月26日 星期一
 * 折线
 */
import NodeAbstract from "./NodeAbstract"
export default class NodeLnPoly extends NodeAbstract{
    protected _onInit(){
        this.NodeType = 'polyln'
    }
    protected _whenCreatorEvt(){
        console.log(this.opt2Attr())
        this.c = this.paper.path(this._ps2Path(this.opt2Attr()))
    }
    opt2Attr(nOpt?: rSu.NodeOpt){
        var opt = nOpt? nOpt : this.opt,
            P1 = opt.P1,
            P2 = opt.P2,
            h = opt.h || 4,
            rX = opt.rX || 0.35,
            l = this.getLen(),
            r = opt.r || (l * (1 - rX) * 0.2)

        var nP1: rSu.P = {x: P1.x + l * rX, y: P1.y + h}

        // 箭头计算
        var atan = Math.atan2(nP1.y - P2.y, P2.x - nP1.x) * (180 / Math.PI);

        var centerX = P2.x - r * Math.cos(atan * (Math.PI / 180));
        var centerY = P2.y + r * Math.sin(atan * (Math.PI / 180));

        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));

        return [
            P1,
            {x: P1.x + l * rX, y: P1.y},
            nP1,
            nP1,
            P2,
            {x: x2, y: y2},
            {x: x3, y: y3},
            P2
        ]            
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