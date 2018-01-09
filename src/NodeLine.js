/**
 * 2018年1月5日 星期五
 * 连接类型： 连线
 */
import {Util} from './util'
class NodeLine{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        this.instance = instance
        this.opt = {}       // 配置信息数据
        this.position = {}      // 连接点        
        /*
            {from: A/B/C/D, to: A/B/C/D}
        */

        this.rightAngle = false // 直线直角连法
    }
    create(p1, p2){
        this.opt = {
            p1, p2
        }
        this.c = this.instance.path(
            'M' + p1[0] + ',' + p1[1] + 
            'L' + p2[0] + ',' + p2[1]
        )
    }
    /**
     * 直角连接法
     * @param {object} opt {p1{x,y}, p2, d}
     */
    RightAngle(opt){
        this.opt = opt
        this.rightAngle = true
        var p1 = opt.p1, 
            p2 = opt.p2,
            d0 = 20
        if(opt.d){
            d0 = opt.d
        }
        var middlePathStr = ''
        if(p1.x != p2.x && p1.y != p2.y){
            var d1 = p2.x - p1.x
            middlePathStr = 
                'L' + (p1.x+d1 + d0*(d1>0? 1:-1)) + ',' + p1.y + 
                'L' + (p1.x+d1 + d0*(d1>0? 1:-1)) + ',' + p2.y + 
                ''
        }

        this.c = this.instance.path(
            'M' + p1.x + ',' + p1.y + 
            middlePathStr + 
            'L' + p2.x + ',' + p2.y
        )
    }

    /**
     * 直接通过坐标点生成直线
     * @param {object} point 
     */
    createByPoint(point){
        this.opt = point
        var pathStr = ''
        Util.each(this.opt.points, (index, value) => {
            if(value){
                pathStr += (pathStr? 'L':'M') + value.x + ',' + value.y
            }
        })
        this.c = this.instance.path(pathStr)
    }
}

export default NodeLine