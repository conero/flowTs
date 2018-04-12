/**
 * 2018年3月26日 星期一
 * 直线
 */
import NodeAbstract from "./NodeAbstract"
import { Util } from "../util";
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
     * 生成器 nOpt: {P1: rSu.P, P2: rSu.P, r?: number}
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
    /**
     * 特殊的连接方式
     */
    select(): rSu.Node{
        let fP = this.getFocusPoint()
        this.removeBox()
        this.isSelEd = true
        Util.each(fP, (k: string, p: rSu.P) => {
            let tPIst = this.paper.circle(p.x, p.y, 3)
                .attr('fill', this.feature('focusPBkg', null, '#990000'))    
                .data('pcode', this.code)
                .data('posi', k)                                        
            this.tRElem['__p' + k] = tPIst
            this.onCreateBoxPnt(this.tRElem['__p' + k])
        })
        return <rSu.Node>this
    }
    /**
     * 获取聚焦点
     * f/m/t
     */
    getFocusPoint(){
        let {P1, P2} = this.opt,
            len = this.getPLen(P1, P2),
            tP = this.c.getPointAtLength(len/2)
        return {
            f: P1,
            m: {x: tP.x, y: tP.y},
            t: P2
        }
    }
}