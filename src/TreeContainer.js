/**
 * 2018年1月8日 星期一
 * 树形容器生成器
 */

import {Util} from './util'
import NodeOperation from './NodeOperation'
import NodeLine from './NodeLine'
import NodeArrow from './NodeArrow'

class TreeContainer{
    /**
     * @param {Raphael} paper 
     */
    constructor(paper){        
        this.paper = paper
    }
    /**
     * 操作节点
     */
    operation(x, y, w, h, text){
        var nd = new NodeOperation(this.paper)
        nd.create(x, y, w, h, text)
        return nd
    }
    /**
     * p1 -> p2 的连线
     * @param {*} p1 {x,y} 
     * @param {*} p2 
     */
    line(p1, p2){
        var nd = new NodeLine(this.paper)
        nd.create(p1, p2)
        return nd
    }
    /**
     * p1 -> p2 的连线
     * @param {*} p1 {x,y} 
     * @param {*} p2 
     * @param {number} r
     */
    arrow(p1, p2, r){
        var nd = new NodeArrow(this.paper)
        nd.create(p1, p2, r)
        return nd
    }
}

export default TreeContainer

