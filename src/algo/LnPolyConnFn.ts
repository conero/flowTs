import NodeUtil from "../node/NodeUtil";

/**
 * 折线连线处理算法，函数
 */
export function LnPolyConn(ln: rSu.Node, tNd: rSu.Node, work: rSu.WEditor) {
    if(tNd){
        let data: rSu.bsMap = ln.data(),
            from_code: string = data.from_code,
            fPosi: string = data.from_posi,
            tPosi: string = data.to_posi,
            fNd: rSu.Node = work.nodeDick[from_code],
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
                tx = P1.x + ('d' == fPosi? 1 : -1) * (dtX + 20)
                MPs.push(
                    {x: tx, y:P1.y},
                    {x: tx, y:P2.y},
                )
                ln.updAttr({
                    P2,
                    MPs
                })
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
        }
    }
}