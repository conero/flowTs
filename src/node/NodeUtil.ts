import { Util } from "../util";

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

        let pV1 = [P2],
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
    /**
     * 点转折线
     * @param P1 地点
     * @param P2 终点
     * @param isYFirst 先移动Y轴
     */
    static point2Poly(P1: rSu.P, P2: rSu.P, isYFirst?: boolean){
        let tP: rSu.P 
        if(P1.x != P2.x && P1.y != P2.y){
            if(isYFirst){
                tP = {x: P1.x, y: P2.y}
            }
            else{
                tP = {x: P2.x, y: P1.y}
            }
        }
        return tP
    }
    /**
     * 点连线装换为path字符串
     * @param {array} pQue 
     * @param {bool} isClose 
     * @returns {string}
     */
    static ps2Path(pQue: rSu.P[], isClose?: boolean): string{
        var path = ''
        for(var i=0; i<pQue.length; i++){
            path += (path? 'L': 'M') + pQue[i].x + ',' + pQue[i].y
        }
        if(isClose){
            path += 'Z'
        }        
        return path
    }
    /**
     * 元素类型转节点
     * @param elem 
     */
    static path2ps(elem: RaphaelElement): rSu.P[]{
        let tPs: rSu.P[] = []
        Util.each(elem.attr('path'), (idx: number, row: any) => {
            tPs.push({x: row[1], y: row[2]})
        })
        return tPs
    }
    /**
     * 点连线转换为字符串数组
     * @param {array} pQue 
     * @param {bool} isClose 
     * @returns {array} string[]
     */
    static ps2PathAttr(pQue: rSu.P[], isClose?: boolean){
        var pArr: any[] = []
        for(var i=0; i<pQue.length; i++){
            var cPArr: any[] = ['L']
            if(pArr.length == 0){
                cPArr[0] = 'M'
            }
            cPArr.push(pQue[i].x, pQue[i].y)
            pArr.push(cPArr)
        }
        if(isClose){
            pArr.push(['Z'])
        }        
        return pArr
    }
    /**
     * 获取中间点坐标
     * @param p0 
     * @param p1 
     */
    static middP(p0: rSu.P, p1: rSu.P): rSu.P{
        return {x: (p0.x + p1.x)/2, y: (p0.y + p1.y)/2}
    }

    /**
     * 获取中间点坐标
     * @param p0 
     * @param p1 
     * @param type 类型 : ua/上角, la/下角
     */
    static polyP(p0: rSu.P, p1: rSu.P, type?: string): rSu.P{
        let p: rSu.P
        type = type? type.toLowerCase() : 'la'
        if(p0.x != p1.x && p0.y != p1.y){
            if('ua' == type){
                p = {x: p1.x, y: p0.y}
            }
            else if('la' == type){
                p = {x: p0.x, y: p1.y}
            }            
        }
        return p
    }
}