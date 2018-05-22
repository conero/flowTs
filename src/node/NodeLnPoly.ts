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
        let opt = this.opt,
            {bkg} = opt,
            {pQue, arrowPs} = this.opt2Attr()
        let sWd: string = '2px'
        this.c = this.paper.path(this._ps2Path(pQue))
            .attr('stroke-width', sWd)
            .attr('stroke', this.opt.bkg)
        // console.log(pQue, arrowPs)
        this.inlineEle = this.paper.path(this._ps2Path(Util.jsonValues(arrowPs)))
        this.inlineEle
            .attr('fill', this.opt.bkg)
            .attr('stroke', this.opt.bkg)
            .attr('stroke-width', sWd)
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
            // 起点与第一个相邻点非折线时，纠正
            if(MPs[0].x != P1.x && MPs[0].y != P1.y){
                let p1Ng: rSu.P = this.getMiddP(P1, MPs[0])
                MPs = Util.MergeArr([p1Ng], MPs)

            }

            // 起点与第一个相邻点非折线时，纠正
            let last = MPs.length - 1
            if(MPs[last].x != P2.x && MPs[last].y != P2.y){
                let p2Ng: rSu.P = this.getMiddP(MPs[last], P2)
                MPs = Util.MergeArr(MPs, [p2Ng])
            }

            pQue = pQue.concat(MPs)
            this.opt.MPs = MPs
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
        this._mpsMerge()
        let {P1, P2} = this.opt,
            MPs = this.opt.MPs || []
        let psMap: rSu.pMap = {
            f: P1
        }
        // 个数统计
        let num: number = 0
        Util.each(MPs, (k: number, p: rSu.P) => {
            let kStr = 'm' + k
            psMap[kStr] = p
            num = k
        })
        psMap.t = P2
        // 中间点        
        let psValue: rSu.P[] = Util.jsonValues(psMap),
            psCtt: number = psValue.length,  // 节点统计个数
            fPsDick: rSu.pMap = {}  // 聚焦点坐标字典
        let fIdx: number = -1   // 聚焦点索引
        for(var i=0; i<psCtt-1; i++){
            num += 1
            let kStr = 'm' + num,
                pV1 = psValue[i],
                pV2 = psValue[i+1]
            
            fIdx += 1
            fPsDick['f'+fIdx] = pV1            
            fIdx += 1   // 中间点 ~ 中点坐标公式
            fPsDick['f'+fIdx] = NodeUtil.middP(pV1, pV2)

        }
        fIdx += 1
        fPsDick['f'+fIdx] = psValue[psCtt-1]
        return fPsDick
    }
    /**
     * 2018年5月12日 星期六: 左右相等检测法
     * 中间点合并
     */
    private _mpsMerge(): void{
        let opt: rSu.NodeOpt = this.opt,
            MPs: rSu.P[] = opt.MPs,
            nMPs: rSu.P[] = [],
            dt: number = 1
        let MPsLen: number = MPs.length
        Util.each(MPs, (i: number, p: rSu.P) => {
            let afterP: rSu.P = i == 0? opt.P1 : MPs[i-1]
            let nextP: rSu.P = i == MPsLen-1? opt.P2 : MPs[i+1]
            // 左右相等检测是否坐标同直线
            if(
                (Math.abs(afterP.x - p.x) <= dt && Math.abs(nextP.x - p.x) <= dt) ||
                (Math.abs(afterP.y - p.y) <= dt && Math.abs(nextP.y - p.y) <= dt)
            ){
                return
            }
            nMPs.push(p)
        })
        this.updAttr({
            MPs: nMPs
        })

    }
    /**
     * 端点移动
     * @param {rSu.P} p 移动的节点
     * @param {bool} isEnd 是否为终点
     */
    mvEndPoint(p: rSu.P, isEnd?: boolean){
        let tP: rSu.P
        let pathArr = this.c.attr('path'),
            opt = this.opt
        if(isEnd){      // 终点
            let pA0 = pathArr[pathArr.length - 2],
            p0: rSu.P = {
                x: pA0[1],
                y: pA0[2]
            }
            tP = this.getMiddP(p0, opt.P2)
            if(tP){
                opt.MPs = opt.MPs? opt.MPs: []
                if(opt.MPs.length > 0){
                    opt.MPs[opt.MPs.length-1] = tP
                }
            }else{
                opt.MPs = []
            }
            opt.P2 = p
        }
        else{       // 起点
            let pA0 = pathArr[1],
            p0: rSu.P = {
                x: pA0[1],
                y: pA0[2]
            }
            tP = this.getMiddP(opt.P1, p0)
            if(tP){
                opt.MPs = opt.MPs? opt.MPs: []
                if(opt.MPs.length > 0){
                    opt.MPs[0] = tP
                }
            }else{
                opt.MPs = []
            }
            opt.P1 = p
        }
        this.updAttr(opt)
    }
}