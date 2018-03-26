/**
 * 2018年3月26日 星期一
 * 会签
 */

import NodeAbstract from "./NodeAbstract";
export default class NodeSign extends NodeAbstract{
    xRate: number           // 移除边框百分比
    protected _onInit(){
        this.NodeType = 'sign'
        this.xRate = 0.20
    }
    protected _whenCreatorEvt(){
        var pQue = this.opt2Attr()        
        this.c = this.paper.path(
            'M' + pQue[0].x + ',' + pQue[0].y + 
            'L' + pQue[1].x + ',' + pQue[1].y + 
            'L' + pQue[2].x + ',' + pQue[2].y + 
            'L' + pQue[3].x + ',' + pQue[3].y +
            'Z'
        )
    }
    /**
     * 选项与节点属性的映射
     * @param {obejct|null} opt  选项属性
     * @returns {array} 选项表
     */
    opt2Attr(opt?: rSu.NodeOpt): rSu.P[]{
        var nopt = opt? opt: this.opt,
            cx = nopt.cx,
            cy = nopt.cy,
            w = nopt.w,
            h = nopt.h,
            xRate = this.xRate
        return [
            {   // A
                x: cx - w/2 - w * xRate,
                y: cy - h/2
            },
            {   // B
                x: (cx + w/2) + (w * xRate),
                y: cy - h/2
            },
            {   // C
                x: cx + w/2,
                y: cy + h/2
            },
            {   // D
                x: cx - w/2,
                y: cy + h/2
            }
        ]
    }
}