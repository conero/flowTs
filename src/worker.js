/**
 * 2018年1月5日 星期五
 * 工作流处理包
 */
import {Flow} from './flow'
import {Util} from './util'
import H from './helper'

/**
 * 工作流实例类
 */
class Worker{
    /**
     * @param {object} option  工作流配置对象
     * @param {object} config  dom 等相关配置 *
     */
    constructor(config, option){
        // 开发环境检测
        if (process.env.NODE_ENV !== 'production') {
            if(!window.$){
                console.warn('jQuery 依赖为安装，运行库将无法运行')
            }
            if(!window.Raphael){
                console.warn('Raphael 依赖为安装，运行库将无法运行')
            }
        }
        this.$index = H.getIndex()
        // 工作流实例
        this.Nodes = {}
        this.config = Util.clone(config)
        this.$raphael = H.createInstance(this.config)
        this.$flow = new Flow(this.$raphael)        
        this.setOption(option)
        this.draw()
        // console.log(this.config)
    }
    // 绘制工作流图
    draw(){
        if(this.option){            
            var steps = this.option.step
            // 生成代码索引
            this.codeIndex(steps)
            var config = this.config
            // 起点中心坐标点 (x, y)
            var x = config.x || parseInt(config.w * 0.4)
            var y = config.y || 10
            var cH = config.cH || 50    // 容器高度
            var dH = config.dH || 30    // 间距高度
            // 同级别节点字典
            var sameClsNodeMap = {}
            // 获取通节点指向的 Y 值
            var getSameClsNodeY = (_c) =>{
                var _sameClsNode = this.codeIndex(_c)
                var y = null
                if(_sameClsNode && _sameClsNode.length > 0){
                    Util.each(_sameClsNode, (index, value)=>{
                        if(sameClsNodeMap[value]){
                            y = sameClsNodeMap[value].y
                            return false
                        }
                    })
                }
                return y
            }
            /**
             * 获取同一级别节点差集对比数
             * @param {string} _c 
             */
            var getSameClsDiffCount = (_c) =>{
                var _sameClsNode = this.codeIndex(_c)
                var _count = _sameClsNode.length
                var hasEd = 0
                Util.each(_sameClsNode, (index, value)=>{
                    if(sameClsNodeMap[value]){
                        hasEd += 1
                    }
                })
                return (_count - hasEd)
            }

            // console.log(x ,y)
            for(var i=0; i<steps.length; i++){
                var step = steps[i]
                var code = step.code
                var name = step.name || code
                var nd
                // 开始
                if(1 == step.type){      
                    y += (dH + cH/2)
                    nd = this.$flow.endpoint(x, y, cH/2, name)
                    nd.c.attr('fill', 'rgb(181, 216, 126)')
                    nd.$step = step
                    this.drag(nd)
                    y += cH/2
                    // console.log(nd)
                }
                // 操作节点
                else if(2 == step.type){     
                    var w = 100
                    var sameClsNode = this.codeIndex(step.code)
                    var x0 = x
                    // 只有一个父类
                    if(step.prev){
                        if(step.prev.indexOf(',') == -1){
                            var parentNd = this.getNodeByCode(step.prev)
                            if(parentNd && parentNd.c){
                                // console.log(parentNd)
                                x0 = this.getStandX(parentNd)
                            }
                        }
                    }
                    // 多个同级节点
                    if(sameClsNode && sameClsNode.length > 1){
                        var diffCtt = getSameClsDiffCount(code)      
                        var dW = 25                  
                        // 中心偏移量算法
                        var smClsD = Math.ceil(sameClsNode.length/2)
                        var x1 = x0 - w/2
                        var x1 = x0 + (dW + w)*(smClsD - diffCtt)
                        var y1 = getSameClsNodeY(code)
                        // console.log(sameClsNode)
                        if(y1){
                            x1 = x0 + (dW + w)*(smClsD - diffCtt)
                        }else{
                            y += dH + cH/2
                        }
                        y1 = y1? y1: y
                        nd = this.$flow.operation(x1, y1, w, cH, name)
                        sameClsNodeMap[code] = {
                            y
                        }
                    }else{                        
                        y += dH + cH/2
                        nd = this.$flow.operation(x0, y, w, cH, name)
                    }         
                    nd.$step = step
                    this.drag(nd)  
                    nd.c.attr('fill', 'rgb(224, 223, 226)')
                    y += cH/2
                }
                // 判断节点
                else if(3 == step.type){
                    y += dH + cH/2
                    nd = this.$flow.judge(x, y, w+60, cH, name)
                    nd.c.attr('fill', 'rgb(49, 174, 196)')
                    nd.$step = step
                    this.drag(nd)
                    // y += 80 + 20
                    y += cH/2
                    
                }
                // 结束
                else if(9 == step.type){
                    y += dH + cH/2
                    nd = this.$flow.endpoint(x, y, cH/2, name)
                    nd.c.attr('fill', 'rgb(34, 185, 41)')
                    nd.$step = step
                    this.drag(nd)
                }

                if(nd){
                    this.Nodes[step.code] = nd
                    this.line(nd)
                }
            }
        }
    }
    // 移动处理
    drag(nd){
        // 不适用分割号时可能解析语句失败，报错
        var config = this.config;
        (function($nd, conf){
            var $c = $nd.c
            var cDragDt = {}
            $c.drag(
                // onmove
                function(dx, dy){
                    dx += cDragDt.x
                    dy += cDragDt.y
                    $nd.move(dx, dy)
                    // 直线同步移动
                    if(conf.line && conf.line == 'arrow'){
                        $nd.ToSyncArrow(dx, dy)
                    }
                    else{
                        $nd.ToSyncLine(dx, dy)
                    }
                },
                // onstart
                function(){
                    var _x, _y
                    if('circle' == this.type){
                        _x = this.attr('cx')
                        _y = this.attr('cy')
                    }
                    else if('rect' == this.type){
                        _x = this.attr('x')
                        _y = this.attr('y')
                    }
                    else if('path' == this.type){
                        var _path = this.attr('path')
                        var sP1 = _path[0]
                        _x = sP1[1]
                        _y = sP1[2]
                    }
                    cDragDt.x = _x
                    cDragDt.y = _y
                },
                // onend
                function(){}
            )
        })(nd, config)
    }
    // 连线
    line(nd){
        var step = Util.clone(nd.$step)
        if(step.prev){
            step.prev = step.prev.replace(/\s/g, '')
        }
        if(step.prev){
            var config = this.config   
            var rightAngle = 'undefined' == typeof config.rightAngle? true: config.rightAngle
            var makerLine = (from, to) => {
                var $lineInstance
                var fromNd = this.getNodeByCode(from)
                var toNd = this.getNodeByCode(to)
                if(fromNd && toNd){
                    if(config.line && 'arrow' == config.line){
                        var $p1 = fromNd.getStlnP()
                        var $p2 = toNd.getEnlnP()
                        $lineInstance = this.$flow.arrow([$p1.x, $p1.y], [$p2.x, $p2.y], 
                            (config.arrowLen? config.arrowLen: 4))
                        $lineInstance.position = {from: $p1.position, to: $p2.position}
                        $lineInstance.c.attr('fill', 'rgb(14, 10, 10)')
                    }
                    else{
                        var $p1 = fromNd.getStlnP()
                        var $p2 = toNd.getEnlnP()                        
                        if(rightAngle){
                            $lineInstance = this.$flow.rightAngleLine({
                                p1: {x:$p1.x, y:$p1.y},
                                p2: {x:$p2.x, y:$p2.y}
                            })
                        }
                        else{
                            $lineInstance = this.$flow.line([$p1.x, $p1.y], [$p2.x, $p2.y])
                        }
                        $lineInstance.position = {from: $p1.position, to: $p2.position}
                    }
                    fromNd.recordLine('from', $lineInstance)
                    toNd.recordLine('to', $lineInstance)
                }
            }
            var prev
            if(step.prev.indexOf(',') > -1){
                prev = step.prev.split(',')
            }else{
                prev = [step.prev]
            }
            for(var i=0; i<prev.length; i++){
                makerLine(prev[i], step.code)
            }
        }

    }
    /**
     * 设置配置文件信息
     * @param {*} option 
     */
    setOption(option){
        if('object' == typeof option){
            this.option = Util.clone(option)
        }
    }
    /**
     * 根据code获取节点信息
     * @param {string} code 
     */
    getNodeByCode(code){
        var node = null
        if(this.Nodes[code]){
            return this.Nodes[code]
        }
        return node
    }    
    /**
     * 代码分级算法
     * @param {object} steps 
     */
    codeIndex(steps){
        // 生成分级字典
        if('object' == typeof steps){
            var clsMap = {}
            for(var i=0; i<steps.length; i++){
                var step = steps[i]
                var code = step.code
                // 第一级
                if(!step.prev){
                    clsMap[code] = 1
                }
                else{
                    var prev = step.prev.replace(/\s/g, '').split(',')
                    for(var j=0; j<prev.length; j++){
                        var prevCode = prev[j]
                        var cls = clsMap[prevCode] ? clsMap[prevCode]: 0
                        // console.log(cls)
                        if('object' == typeof cls && cls.length){
                            cls = cls.length == 1? cls[0]: cls
                        }
                        cls += 1
                        if(!clsMap[code]){
                            clsMap[code] = cls
                        }else{
                            if('object' != typeof clsMap[code]){
                                var cls2 = clsMap[code]
                                clsMap[code] = [cls2]
                            }
                            clsMap[code].push(cls)
                            clsMap[code] = Util.ArrayMergeSameValue(clsMap[code])
                        }
                    }
                }
            }
            // console.log(clsMap)
            H.src(this.$index, 'clsMap', clsMap)
        }
        else if(steps){
            var clsMap = H.src(this.$index, 'clsMap')
            if(clsMap){
                var value = clsMap[steps] || null
                var List = [steps]
                for(var k in clsMap){
                    if(value == clsMap[k] && $.inArray(k, List) == -1){
                        List.push(k)
                    }
                }
                return List
            }
            
        }
    }
    /**
     * 节点表单x坐标
     * @param {NodeBase} nd 
     */
    getStandX(nd){
        var x = null
        if(nd && nd.c){
            var $c = nd.c
            switch($c.type){
                case 'circle':
                    x = $c.attr('cx')
                    break
                case 'rect':
                    x = $c.attr('x') + $c.attr('width')/2
                    break
                case 'path':
                    x = nd.opt.cx
                    break
            }
        }
        return x
    }
}


export default Worker