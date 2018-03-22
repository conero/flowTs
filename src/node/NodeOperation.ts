/**
 * 2018年1月5日 星期五
 * 操作处理节点
 */
import NodeBase from './NodeBase'

class NodeOperation extends NodeBase{
    NodeType: any
    opt: any
    c: any
    label: any
    instance: any
    position: any
    bBox: any
    minWidth: any
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance: any){
        super()
        this.NodeType = 'opera'
        this.instance = instance
        this.opt = {}       // 配置信息数据
        this.bBox = null    // 边缘盒子数据示例
    }
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */
    create(opt: object){
        this.opt = opt
        this.minWidth = opt.w       // 最小宽度
        // 容器        
        var ap = this.getAp()
        this.c = this.instance.rect(ap.x, ap.y, opt.w, opt.h)
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
        // 自动调整文本宽度
        this.resizeByText()
    }
    /**
     * 根据文本宽度自动适应文本的宽度
     */
    resizeByText(){
        if(this.label){
            //console.log(this.label.getBBox())
            var box = this.label.getBBox()
            var width = Math.ceil(box.width)
            var w = this.c.attr('w')
            if(width < this.minWidth && w<this.minWidth){
                return
            }
            // 保持最小宽度
            if(width < this.minWidth){
                width = this.minWidth
            }else{
                width += 10
            }
            this.opt.w = width
            var ap = this.getAp()
            this.c.attr({
                width: width,
                x: ap.x,
                y: ap.y
            })
        }
    }    

    // 外部移动坐标处理
    move(x: number, y: number){
        var ctP = this.getCtpByAp(x, y)
        this.c.attr({
            x, y
        })
        this.label.attr(ctP)
        this.opt.cx = x
        this.opt.cy = y
    }
    // 直线同步移动
    ToSyncLine(x: number, y: number){
        var ctP = this.getCtpByAp(x, y)
        // 直线同步移动
        this.syncLineMove((lnC: any, type: any, $ln: any) => {
            var position = $ln.position, methodName
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                methodName = 'get'+position.from+'p'
                var p1 = this[methodName](ctP.x, ctP.y)
                $fPath[0] = ['M', p1.x, p1.y]
                lnC.attr('path', $fPath)
            }
            else if(type == 'to'){
                methodName = 'get'+position.to+'p'
                var p2 = this[methodName](ctP.x, ctP.y)
                var $tPath = lnC.attr('path')
                $tPath[$tPath.length -1] = ['L', p2.x, p2.y]
                lnC.attr('path', $tPath)
            }
        })
    }
    // 箭头同步移动
    ToSyncArrow(x: number, y: number){
        var ctP = this.getCtpByAp(x, y)
        this.syncLineMove((lnC, type, $ln) => {
            var position = $ln.position, methodName
            if(type == 'from'){
                methodName = 'get'+position.from+'p'
                var bP = this[methodName](ctP.x, ctP.y)         
                $ln.updatePath([bP.x, bP.y])
            }
            else if(type == 'to'){
                methodName = 'get'+position.to+'p'
                var dP = this[methodName](ctP.x, ctP.y)
                $ln.updatePath(null, [dP.x, dP.y])
            }
        })
    }
    // // 箭头v2 同步机制 移动
    // ToSyncBow(x, y){
    //     var ctP = this.getCtpByAp(x, y)
    //     this.syncLineMove((lnC, type, $ln) => {
    //         var position = $ln.position, methodName
    //         if(type == 'from'){
    //             methodName = 'get'+position.from+'p'
    //             var bP = this[methodName](ctP.x, ctP.y)         
    //             $ln.updatePath([bP.x, bP.y])
    //         }
    //         else if(type == 'to'){
    //             methodName = 'get'+position.to+'p'
    //             var dP = this[methodName](ctP.x, ctP.y)
    //             $ln.updatePath(null, [dP.x, dP.y])
    //         }
    //     })
    // }
    // 获取连线的起点节点
    getStlnP(position?: string){
        position = position? position: 'Bt'
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    // 获取连线的终点节点
    getEnlnP(position?: string){
        position = position? position: 'T'
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    // 根据 A 点获取 中心点
    getCtpByAp(x: number, y: number){
        var opt = this.opt
        x += opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getAp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y -= opt.h/2
        return {x, y}
    }
    getBp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getCp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getDp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getTp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= opt.h/2
        return {x, y}
    }
    getRp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.w/2
        return {x, y}
    }
    getBtp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += opt.h/2
        return {x, y}
    }
    getLp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        return {x, y}
    }
}

export default NodeOperation
