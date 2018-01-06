/**
 * 2018年1月5日 星期五
 * 端点处理
 */
import {Util} from './util'
import NodeBase from './NodeBase'

class NodeEndpoint extends NodeBase{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        super()
        this.instance = instance
        this.opt = {}
    }
    /**
     * @param {object} opt / [cx, cy, r, text]
     */
    create(opt){
        // 解析类型
        if('object' != typeof opt){
            var param = arguments
            opt = {
                cx: param[0],
                cy: param[1],
                r: param[2]
            }
            if(param[3]){
                opt.text = param[3]
            }
        }
        this.opt = opt
        // 容器
        this.c = this.instance.circle(opt.cx, opt.cy, opt.r)
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
    }
    // 外部移动坐标处理， 
    move(x, y){
        // 容器移动
        this.c.attr({
            cx: x,
            cy: y
        })
        // 文本联动
        this.label.attr({
            x,y
        })
        /*
        // 直线同步移动
        this.syncLineMove((lnC, type) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                var dP = this.getDp(x, y)
                lnC.attr('path', [
                    ['M', dP.x, dP.y],
                    $fPath[1]
                ])
            }
            else if(type == 'to'){
                var bP = this.getBp(x, y)
                var $tPath = lnC.attr('path')
                lnC.attr('path', [
                    $tPath[0],
                    ['L', bP.x, bP.y]
                ])
            }
        })
        */
    }
    // 直线同步移动
    ToSyncLine(x, y){
        this.syncLineMove((lnC, type) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                var dP = this.getDp(x, y)
                lnC.attr('path', [
                    ['M', dP.x, dP.y],
                    $fPath[1]
                ])
            }
            else if(type == 'to'){
                var bP = this.getBp(x, y)
                var $tPath = lnC.attr('path')
                lnC.attr('path', [
                    $tPath[0],
                    ['L', bP.x, bP.y]
                ])
            }
        })
    }
    // 箭头同步移动
    ToSyncArrow(x, y){
        this.syncLineMove((lnC, type, $ln) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')                
                var dP = this.getDp(x, y)
                $ln.updatePath([dP.x, dP.y])
            }
            else if(type == 'to'){
                var bP = this.getBp(x, y)
                $ln.updatePath(null, [bP.x, bP.y])
            }
        })
    }
    // 获取连线的起点节点
    getStlnP(){
        var p = this.getDp()
        return [p.x, p.y]
    }
    // 获取连线的终点节点
    getEnlnP(){
        var p = this.getBp()
        return [p.x, p.y]
    }
    getAp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.r
        return {x, y}
    }
    getBp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= opt.r
        return {x, y}
    }
    getCp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.r
        return {x, y}
    }
    getDp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += opt.r
        return {x, y}
    }
}

export default NodeEndpoint