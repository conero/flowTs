/**
 * 2018年4月13日 星期五
 * 节点计算算法
 */

export default class NodeUtil{
    /**
     * 两点转箭头，箭头生成算法
     * @param P1 
     * @param P2 
     * @param r 
     * @param onlyMidPMk 仅仅中间坐标点
     */
    static ps2arrow(P1: rSu.P, P2: rSu.P, r: number, onlyMidPMk?: boolean){
        var atan = Math.atan2(P1.y - P2.y, P2.x - P1.x) * (180 / Math.PI);

        var centerX = P2.x - r * Math.cos(atan * (Math.PI / 180));
        var centerY = P2.y + r * Math.sin(atan * (Math.PI / 180));

        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));

        let pV1 = [P1, P2],
            pV2 = [
                {x: x2, y: y2},
                {x: x3, y: y3},
                P2
            ]
        if(onlyMidPMk){
            pV1 = pV2
        }else{
            pV1 = pV1.concat(pV2)
        }
        return pV1
    }
    /**
     * 获取两点间的距离
     */
    static getPLen(P1: rSu.P, P2: rSu.P): number{
        return Math.pow(
            (Math.pow((P1.x - P2.x), 2) + Math.pow((P1.y - P2.y), 2)),
            1/2
        )
    }
}