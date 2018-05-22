
/**
 * 折线连线处理算法，函数
 */
import NodeUtil from "../node/NodeUtil";

/**
 * 内部私有类，用于数据处理
 * 2018年5月22日 星期二
 */
class cSR{
    /**
     * 代理节点连接点
     * @param nd 节点
     * @param posi 位置
     * @param opt 选项 {dn: number, box: rSu.BoxAttr}
     */
    static agentNodeCnP(nd: rSu.Node, posi: string, opt?: rSu.bsMap): rSu.P{
        opt = 'object' == typeof opt? opt : {}
        let p: rSu.P,
            dtNum: number = opt.dn || 20     // 相差值
            , box: rSu.BoxAttr = opt.box || nd.getBBox()
            , ps: rSu.bsMap = box.ps
            , tP: rSu.P

        switch(posi){
            case 'b':   // 正上
                tP = ps.b
                p = {x: tP.x, y: tP.y - dtNum}
                break
            case 'd':   // 正右
                tP = ps.d
                p = {x: tP.x + dtNum, y: tP.y}
                break
            case 'f':   // 正下
                tP = ps.f
                p = {x: tP.x, y: tP.y + dtNum}
                break
            case 'h':   // 正左
                tP = ps.h
                p = {x: tP.x - dtNum, y: tP.y}
                break
        }
        return p
    }
}

/**
 * @export
 * @param {rSu.Node} ln 
 * @param {rSu.WEditor} work 
 * @param {rSu.Node} [tNd] 
 */
export function LnPolyConn(ln: rSu.Node, work: rSu.WEditor, tNd?: rSu.Node) {
    let data: rSu.bsMap = ln.data(),
        from_code: string = data.from_code,
        to_code: string = data.to_code,
        fPosi: string = data.from_posi,
        tPosi: string = data.to_posi
    // 没有终点节点，自动从连线中获取
    if(!tNd){
        tNd = work.nodeDick[to_code]
    }
    let fNd: rSu.Node = work.nodeDick[from_code]
    if(tNd && tNd.code == fNd.code){   // 自身连接
        let AncpOpt: rSu.bsMap = {
            box: fNd.getBBox()
        }
        let ap1: rSu.P = cSR.agentNodeCnP(fNd, fPosi, AncpOpt),
            ap2: rSu.P = cSR.agentNodeCnP(fNd, tPosi, AncpOpt)
        
        let apMd: rSu.P 
        // = (ap1 && ap2)? NodeUtil.polyP(ap1, ap2, 'ua') : null
        if(
            (fPosi == 'f' && (tPosi == 'd' || tPosi == 'h'))
            || (fPosi == 'b' && (tPosi == 'h' || tPosi == 'd'))
        ){
            // 上角拐
            apMd = NodeUtil.polyP(ap1, ap2, 'ua')
        }
        else if(
            ((fPosi == 'h' || fPosi == 'd') && tPosi == 'f')
            // || (fPosi == 'b' && (tPosi == 'h' || tPosi == 'd'))
            
        ){
            // 下角拐
            apMd = NodeUtil.polyP(ap1, ap2, 'la')
        }
        
        // console.log(ap1, apMd, ap2);
        if(apMd){
            ln.updAttr({
                MPs:[ap1, apMd, ap2]
            })
        }
        
        
    }
    else if(tNd){
        let fNd: rSu.Node = work.nodeDick[from_code],
            P1: rSu.P = ln.opt.P1,           // 连线起点
            P2: rSu.P = ln.opt.P2,            // 连接终点
            fOpt: rSu.NodeOpt = fNd.opt,
            tOpt: rSu.NodeOpt = tNd.opt,
            dtX: number = 10,        // X 轴偏差
            dtY: number = 10,         // Y 轴偏差
            MPs: rSu.P[] = [],
            tx: number, ty: number
        // console.log(tPosi, fPosi)
        // 侧面连接线
        if('d' == fPosi || 'h' == fPosi){
            // 同X轴
            if(Math.abs(fOpt.cx - tOpt.cx) <= dtX){
                // console.log(fPosi, tPosi)
                // 同向
                let _dx: number = ('d' == fPosi? 1 : -1) * (dtX + 20)
                if(fPosi == tPosi){
                    tx = P1.x + _dx
                    MPs.push(
                        {x: tx, y:P1.y},
                        {x: tx, y:P2.y},
                    )
                    ln.updAttr({
                        P2,
                        MPs
                    })
                }
            }
            // 数据接入点
            else if('b' == tPosi){
                let p: rSu.P = NodeUtil.polyP(P1, P2, 'ua')         
                if(p){
                    MPs.push(p)
                    ln.updAttr({
                        P2,
                        MPs
                    })
                }
            }
            // 终点结与侧边
            else if('d' == fPosi || 'h' == fPosi){
                let _dx: number = (('d' == tPosi)? 1 : -1) * (dtX  + 20),
                    pE: rSu.P = {x: P2.x + _dx, y: P2.y},
                    p: rSu.P = NodeUtil.polyP(P1, pE, 'ua')  
                if(p){
                    MPs.push(p, pE)
                    ln.updAttr({
                        P2,
                        MPs
                    })
                }
            }
        }
    }
}