/**
 * 2018年1月4日 星期四
 * 工作流引擎, 基于 raphaelJs, 只用于绘制容器以及，拖动事件的相关算法
 */
import {Util} from './util'
import NodeEndpoint from './node/NodeEndpoint'
import NodeOperation from './node/NodeOperation'
import NodeJudge from './node/NodeJudge'
import NodeLine from './node/NodeLine'
import NodeArrow from './node/NodeArrow'
import NodeBow from './node/NodeBow'

class Flow{
    paper: any
    /**
     * @param {Raphael} paper 
     */
    constructor(paper: any){        
        this.paper = paper
    }
    /**
     * 端点(圆别名) , 圆心 和 半径
     * @param {number} cx 
     * @param {number} cy 
     * @param {number} r 
     * @param {string|null} 文本框
     */
    endpoint(cx: number, cy: number, r: number, text: string){
        var nd = new NodeEndpoint(this.paper)
        nd.create({cx, cy, r, text})
        return nd
    }
    /**
     * 判断节点
     */
    judge(cx: number, cy: number, w: number, h: number, text: string){
        var nd = new NodeJudge(this.paper)
        nd.create({cx, cy, w, h, text})
        return nd
    }
    /**
     * 操作节点
     */
    operation(cx:number, cy:number, w:number, h:number, text: string){
        var nd = new NodeOperation(this.paper)
        nd.create({cx, cy, w, h, text})
        return nd
    }
    /**
     * p1 -> p2 的连线
     * @param {*} p1 {x,y} 
     * @param {*} p2 
     */
    line(p1: any, p2: any){
        var nd = new NodeLine(this.paper)
        nd.create(p1, p2)
        return nd
    }
    /**
     * p1 -> p2 直角转线算啊分
     * @param {object} opt
     */
    rightAngleLine(opt: any){
        var nd = new NodeLine(this.paper)
        nd.RightAngle(opt)
        return nd
    }
    /**
     * p1 -> p2 的连线
     * @param {*} p1 [x,y]
     * @param {*} p2 
     * @param {number} r
     */
    arrow(p1: any, p2: any, r: number){
        var nd = new NodeArrow(this.paper)
        nd.create(p1, p2, r)
        return nd
    }
    /**
     * 箭头
     * @param {object} opt 
     */
    bow(opt: object){
        var nd = new NodeBow(this.paper)
        nd.create(opt)
        return nd
    }
    /**
     * 获取空节点对象
     * @param {string} nType 
     */
    getEmptyNode(nType: string){
        var $node = null
        switch(nType){
            case 'endpoint': 
                $node = new NodeEndpoint(this.paper)
                break
            case 'judge': 
                $node = new NodeJudge(this.paper)
                break
            case 'operation': 
                $node = new NodeOperation(this.paper)
                break
            case 'line': 
                $node = new NodeLine(this.paper)
                break
            case 'arrow': 
                $node = new NodeArrow(this.paper)
                break
        }
        return $node
    }
}

export {Flow}
export {NodeLine}
export {NodeArrow}
export {NodeEndpoint}
export {NodeOperation}
export {NodeJudge}

