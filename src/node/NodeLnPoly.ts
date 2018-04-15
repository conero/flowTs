/**
 * 2018年3月26日 星期一
 * 折线
 */
import NodeAbstract from "./NodeAbstract"
import NodeUtil from "./NodeUtil";
import { Util } from "../util";
export default class NodeLnPoly extends NodeAbstract{
    protected _onInit(){
        this.NodeType = 'ln_poly'
    }
    protected _whenCreatorEvt(){
        this.opt.bkg = this.opt.bkg || 'rgb(3, 84, 41)'
        var opt = this.opt,
            {bkg} = opt,
            {pQue, arrowPs} = this.opt2Attr()
        this.c = this.paper.path(this._ps2Path(pQue))
            // .attr('stroke-width', '1px')

        this.inlineEle = this.paper.path(this._ps2Path(Util.jsonValues(arrowPs)))
        this.inlineEle.attr('fill', this.opt.bkg)
            // .attr('stroke-width', '1px')
    }
    /**
     * 选项转属性
     * @param nOpt 
     */
    opt2Attr(nOpt?: rSu.NodeOpt){
        let pQue: rSu.P[] = []
        let opt = nOpt? nOpt : this.opt,
            {P1, P2} = opt,
            l = this.getLen(),
            rX = opt.rX || 0.35,
            r = opt.r || (l * (1 - rX) * 0.2),
            MPs: rSu.P[] = opt.MPs || []
        pQue = [P1] // 起点
        // 中间点计算
        if(MPs.length > 0){ // 使用默认的点列
            pQue = pQue.concat(MPs)
        }else{
            let x1 = P1.x, y1 = P1.y,
                x2 = P2.x, y2 = P2.y
            let delMps: rSu.P = this.getMiddP(P1, P2)
            if(delMps){
                MPs.push(delMps)
                pQue.push(delMps)
                this.opt.MPs = MPs
            }
        }
        pQue.push(P2)   // 终点

        // 箭头坐标
        let arrowPs: rSu.bsMap = {}
        if(pQue.length > 1){
            let pQLen = pQue.length - 1
            arrowPs = NodeUtil.ps2arrow(pQue[pQLen-1], pQue[pQLen], r)            
        }

        return {pQue, arrowPs}
    }
    __opt2Attr(nOpt?: rSu.NodeOpt){
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
     * 获取中间点
     * @param P0 
     * @param P1 
     */
    getMiddP(P0: rSu.P, P1: rSu.P): rSu.P{
        let p: rSu.P
        if(P0.x != P1.x && P0.y != P1.y){
            p = {x: P0.x, y: P1.y}
        }
        return p
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
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt): rSu.Node{
        this._updAttr(nOpt)
        let {pQue, arrowPs} = this.opt2Attr()
        this.c.attr('path', this._ps2PathAttr(pQue))
        this.inlineEle.attr('path', this._ps2PathAttr(Util.jsonValues(arrowPs)))
        return <rSu.Node>this
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
            tP = this.c.getPointAtLength(len/2),
            MPs = this.opt.MPs || []
        let psMap: rSu.pMap = {
            f: P1,
            t: P2
        }
        // 个数统计
        let num: number = 0
        Util.each(MPs, (k: number, p: rSu.P) => {
            let kStr = 'm' + k
            psMap[kStr] = p
            num = k
        })
        // 中间点        
        let psValue: rSu.P[] = Util.jsonValues(psMap),
            rLen: number = 0
        // console.log(psValue)
        
        for(var i=0; i<psValue.length-1; i++){
            num += 1
            let kStr = 'm' + num,
                pV1 = psValue[i],
                pV2 = psValue[i+1]
            //console.log(pV1, pV2) 
            let cLen: number = NodeUtil.getPLen(pV1, pV2),
                pTmp = this.c.getPointAtLength(rLen + cLen/2)         
            psMap[kStr] = pTmp
            // psMap[kStr] = {
            //     x: pV1.x + Math.abs((pV1.x - pV2.x)/2),
            //     y: pV1.y + Math.abs((pV1.y - pV2.y)/2),
            // }
            rLen += cLen
        }
        return psMap
    }
    /**
     * 端点移动
     */
    mvEndPoint(p: rSu.P, isEnd?: boolean){
        let tP: rSu.P
        let pathArr = this.c.attr('path'),
            opt = this.opt
        if(isEnd){ 
            let pA0 = pathArr[pathArr.length - 2],
            p0: rSu.P = {
                x: pA0[1],
                y: pA0[2]
            }
            tP = this.getMiddP(p0, opt.P2)
            if(tP){
                opt.MPs = opt.MPs? opt.MPs: []
                // opt.MPs.push(tP)
                if(opt.MPs.length > 0){
                    opt.MPs[opt.MPs.length-1] = tP
                }
            }
            opt.P2 = p
        }
        else{
            let pA0 = pathArr[1],
            p0: rSu.P = {
                x: pA0[1],
                y: pA0[2]
            }
            tP = this.getMiddP(opt.P1, p0)
            if(tP){
                opt.MPs = opt.MPs? opt.MPs: []
                //opt.MPs = opt.MPs.concat([tP])
                if(opt.MPs.length > 0){
                    opt.MPs[0] = tP
                }
            }
            opt.P1 = p
        }
        this.updAttr(opt)
    }
}