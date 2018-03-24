/**
 * 2018年1月5日 星期五
 * 判断处理节点
 */
import NodeBase from './NodeBase'

class NodeJudge extends NodeBase{
    NodeType: any
    opt: any
    c: any
    label: any
    instance: any
    minWidth: any
    [k: string]: any
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance: any){
        super()
        this.NodeType = 'judge'
        this.instance = instance
        this.opt = {}       // 配置信息数据
    }
    /**
     * 仅仅生成容器并且返回对象
     * @param {number} cx 
     * @param {number} cy 
     * @param {number} w 
     * @param {number} h 
     * @returns RaphaelElement
     */
    onlyCell(cx: number, cy: number, w: number, h: number){
        this.opt = {cx, cy, w, h}
        // 容器        
        var ap = this.getAp()
        var bp = this.getBp()
        var cp = this.getCp()
        var dp = this.getDp()
        return this.instance.path(
            'M' + ap.x + ',' + ap.y +
            'L' + bp.x + ',' + bp.y +
            'L' + cp.x + ',' + cp.y +
            'L' + dp.x + ',' + dp.y +
            'Z'
        )
    }
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */
    create(opt: rSu.NodeOpt){
        this.opt = opt
        this.minWidth = opt.w
        // 容器        
        var ap = this.getAp()
        var bp = this.getBp()
        var cp = this.getCp()
        var dp = this.getDp()
        this.c = this.instance.path(
            'M' + ap.x + ',' + ap.y +
            'L' + bp.x + ',' + bp.y +
            'L' + cp.x + ',' + cp.y +
            'L' + dp.x + ',' + dp.y +
            'Z'
        )
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
        this.resizeByText()
    }
    /**
     * 根据文本宽度自动适应文本的宽度
     */
    resizeByText(){
        if(this.label){
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
                width += 25
            }            
            this.opt.w = width
            this.resizeByOpt()
        }     
    }
    /**
     * 根据 opt 值的改变重调整容器形状大小
     */
    resizeByOpt(){
        var ap = this.getAp()
        var bp = this.getBp()
        var cp = this.getCp()
        var dp = this.getDp()
        this.c.attr('path', [
            ['M', ap.x, ap.y],
            ['L', bp.x, bp.y],
            ['L', cp.x, cp.y],
            ['L', dp.x, dp.y],
            ['Z']                   
        ])
    }
    // 按照 A 点移动
    move(x: number, y: number){
        var ctP = this.getCpByAp(x, y)
        var bP = this.getBp(ctP.x, ctP.y)
        var cP = this.getCp(ctP.x, ctP.y)
        var dP = this.getDp(ctP.x, ctP.y)
        // 容器移动
        this.c.attr('path', [
            ['M', x, y],
            ['L', bP.x, bP.y],
            ['L', cP.x, cP.y],
            ['L', dP.x, dP.y],
            ['Z']
        ])
        // 数据选项值更新
        this.opt.cx = ctP.x
        this.opt.cy = ctP.y
        // 文本移动
        this.label.attr(ctP)
    }
    // 直线同步移动
    ToSyncLine(x: number, y: number){
        var ctP = this.getCpByAp(x, y)
        this.syncLineMove((lnC: any, type: string, $ln: any) => {
            var position = $ln.position
            var methodName
            if(type == 'from'){
                methodName = 'get' + position.from + 'p'
                var p1 = this[methodName](ctP.x, ctP.y)
                var $fPath = lnC.attr('path')
                $fPath[0] = ['M', p1.x, p1.y]
                lnC.attr('path', $fPath)
            }
            else if(type == 'to'){
                methodName = 'get' + position.to + 'p'
                var p2 = this[methodName](ctP.x, ctP.y)
                var $tPath = lnC.attr('path')
                $tPath[$tPath.length -1] = ['L', p2.x, p2.y]
                lnC.attr('path', $tPath)
            }
        })
    }
    // 箭头同步器
    ToSyncArrow(x: number, y: number){
        var ctP = this.getCpByAp(x, y)
        this.syncLineMove((lnC: any, type: any, $ln: any) => {
            var position = $ln.position
            var methodName
            if(type == 'from'){
                methodName = 'get' + position.from + 'p'
                var p1 = this[methodName](ctP.x, ctP.y)
                $ln.updatePath([p1.x, p1.y])
            }
            else if(type == 'to'){
                methodName = 'get' + position.to + 'p'
                var p2 = this[methodName](ctP.x, ctP.y)
                $ln.updatePath(null, [p2.x, p2.y])
            }
        })
    }
    // 获取连线的起点节点
    getStlnP(position: string){
        // var position = 'D'
        position = position? position:'D'
        var methodName = 'get' + position + 'p';
        // var p = this.getDp()
        var p = this[methodName]()
        // 起点重合
        if(this.isCoincidence(p, 'from')){
            p = this.getCp()
            position = 'C'
        }
        var nP = {x: p.x, y: p.y, position}
        return nP
    }
    // 获取连线的终点节点
    getEnlnP(position: string){
        position = position? position:'B'
        // var p = this.getBp()
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    /**
     * 根据 A 点获取中心点
     */
    getCpByAp(x?: number, y?: number){
        var opt = this.opt
        x += opt.w/2
        return {x, y}
    }
    // A 点
    getAp(x?: number, y?: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= (opt.w/2)
        return {x, y}
    }
    getBp(x?: number, y?: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= (opt.h/2)
        return {x, y}
    }
    getCp(x?: number, y?: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += (opt.w/2)
        return {x, y}
    }
    getDp(x?: number, y?: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += (opt.h/2)
        return {x, y}
    }
    /**
     * 是否为重合点
     * @param {object} p {x,y}
     * @param {string} type [from/to]
     * @returns {boolean}
     */
    isCoincidence(p: any, type: string){
        var successMK = false
        if(p && 'object' == typeof p && 
            'undefined' != typeof p.x && 'undefined' != typeof p.y){
            // 起点
            if('from' == type){
                if(this.fromLine.length > 0){
                    for(var i=0; i<this.fromLine.length; i++){
                        var $line = this.fromLine[i]
                        var path = $line.c.attr('path')
                        var pathArr = path[0]
                        if(pathArr[1] == p.x && pathArr[2] == p.y){
                            successMK = true
                            break
                        }
                    }
                }
            }
            // 终点
            else if('to' == type){
                if(this.toLine.length > 0){
                    for(var j=0; j<this.toLine.length; j++){
                        var $line = this.toLine[j]
                        var path = $line.c.attr('path')
                        var pathArr = path[path.length - 1]
                        if(pathArr[1] == p.x && pathArr[2] == p.y){
                            successMK = true
                            break
                        }
                    }
                }
            }
        }
        return successMK
    }
}

export default NodeJudge