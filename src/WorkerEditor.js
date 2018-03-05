/**
 * 2018年3月1日 星期四
 * worker 工作流编辑器
 */
import H from './helper'            // 助手方法
import Judge from './NodeJudge'
import {Flow} from './flow'


// 配置参数常量 , type 1801 为特殊类型
const Conf = {
    start: {
        type: 1,
        text: '开始'
    },
    opera: {
        type: 2,
        text: '流程'
    },
    judge: {
        type: 3,
        text: '判断'
    },
    end: {
        type: 9,
        text: '结束'
    },
    arrow: {
        type: 1801,
        text: '箭头'
    }
}
/**
 * 工作流编辑器轻量级
 */
class WorkerEditor{
    /**
     * @param {object} config 数据配置项
     */
    constructor(config){
        this.config = config            // 系统配置参数
        this.raphael = H.createInstance(config) // Raphael 对象
        // 配置参数处理
        this._configMergeToDefule()
        this._LineDragingP = null              // RaphaelElement 直线正在拖动记录点
        this.flow = new Flow(this.raphael)  // 工作流程按钮
        this.nodes = []                         // 运行节点数
        this.lineQueues = []                    // 连线记录器
        this.tempNodes = []                     // 临时节点集
        this._toolbar()
    }
    /**
     * 配置参数与默认参数和合并处理
     */
    _configMergeToDefule(){
        // pkgClr 背景颜色
        var pkgClr = this.config.pkgClr || {}
        pkgClr.start = pkgClr.start || 'rgb(181, 216, 126)'
        pkgClr.opera = pkgClr.opera || 'rgb(224, 223, 226)'
        pkgClr.judge = pkgClr.judge || 'rgb(49, 174, 196)'
        pkgClr.end = pkgClr.end || 'rgb(34, 185, 41)'
        pkgClr.arrow = pkgClr.arrow || 'rgb(3, 84, 41)'
        pkgClr.NodeBox = pkgClr.NodeBox || 'rgb(15, 13, 105)'

        this.config.pkgClr = pkgClr
        this.config.listener = this.config.listener || {}   // 监听事件
    }
    /**
     * 工具集按钮栏
     */
    _toolbar(){
        // 工具栏参数信息
        var $tool = {}  
        var raphael = this.raphael
        var ctX = 5, 
            ctY = 5,
            ctW = 75,
            ctH = 300,
            x = ctX, y = ctY,            // 当前坐在的位置坐标
            config = this.config,
            pkgClr = config.pkgClr
        
        // 拖动处理            
        // var dragHandlerEvnt = function(){}

        // 容器集
        $tool.containerIst = raphael.rect(ctX, ctY, ctW, ctH)
        $tool.containerIst.attr('fill', '#ffffff')      // 容器底色

        // 开始
        x += 20, y += 50
        $tool.startIst = raphael.ellipse(x, y, 8, 6)
        $tool.startIst.attr('fill', pkgClr.start)
        $tool.startTxtIst = raphael.text(x+30, y, Conf.start.text)

        // 流程
        y += 20
        $tool.operaIst = raphael.rect(x-8, y, 16, 12)
        $tool.operaIst.attr('fill', pkgClr.opera)
        $tool.operaTxtIst = raphael.text(x+30, y+4, Conf.opera.text)

        // 判断
        y += 30
        $tool.judgeIst = (new Judge(raphael)).onlyCell(x, y, 16, 12)
        $tool.judgeIst.attr('fill', pkgClr.judge)
        $tool.judgeTxtIst = raphael.text(x+30, y, Conf.judge.text)

        // 结束
        y += 30
        $tool.endIst = raphael.ellipse(x, y, 8, 6)
        $tool.endIst.attr('fill', pkgClr.end)
        $tool.endTxtIst = raphael.text(x+30, y, Conf.end.text)

        // 箭头
        y += 30
        $tool.arrowIst = this.flow.arrow([x-5,y], [x+10, y], 3)
        $tool.arrowIst.c.attr('fill', pkgClr.arrow)
        $tool.arrowTxtIst = raphael.text(x+30, y, Conf.arrow.text)

        this.$tool = $tool
        this._toolbarDragEvt()
    }
    /**
     * 工具栏拖动处理
     */
    _toolbarDragEvt(){
        // console.log(this.$tool)
        var $this = this
        var pkgClr = this.config.pkgClr
        // 拖动处理    
        var dragHandlerEvnt = function(node, type){
            var cDragDt = {}
            node.drag(
                function(dx, dy){   // moving
                    // console.log(type)
                    // console.log(dx, dy)
                    // cDragDt = {dx, dy}
                    dx += cDragDt.dx
                    dy += cDragDt.dy
                    var newElem = $this.getLastElem()
                    if(newElem){
                        newElem.move(dx, dy)
                    }
                },
                function(){         // start
                    // cDragDt = {dx: 0, dy: 0}
                    var _x, _y
                    if(2 == type){
                        _x = this.attr('x')
                        _y = this.attr('y')
                    }else if(3 == type){
                        var tpPath = this.attr('path')
                        var tpPath0 = tpPath[0]
                        _x = tpPath0[1]
                        _y = tpPath0[2]
                    }else{
                        // console.log(this)
                        _x = this.attr('cx')
                        _y = this.attr('cy')
                    }
                    
                    cDragDt.dx = _x + 5
                    cDragDt.dy = _y + 10

                    // cDragDt.x = _x
                    // cDragDt.y = _y
                    // console.log(cDragDt)
                    $this._createNode(cDragDt, type)
                },
                function(){         // end
                    // if(cDragDt.dx < 75 || cDragDt.dy < 50){
                    //     return null
                    // }
                    // $this._createNode(cDragDt, type)
                }
            )
        }
        // 开始
        dragHandlerEvnt(this.$tool.startIst, Conf.start.type)
        dragHandlerEvnt(this.$tool.startTxtIst, Conf.start.type)

        // 流程
        dragHandlerEvnt(this.$tool.operaIst, Conf.opera.type)
        dragHandlerEvnt(this.$tool.operaTxtIst, Conf.opera.type)

        // 判断
        dragHandlerEvnt(this.$tool.judgeIst, Conf.judge.type)
        dragHandlerEvnt(this.$tool.judgeTxtIst, Conf.judge.type)

        // 结束
        dragHandlerEvnt(this.$tool.endIst, Conf.end.type)
        dragHandlerEvnt(this.$tool.endTxtIst, Conf.end.type)

        // 特殊部件生成器
        // dragHandlerEvnt(this.$tool.arrowIst, Conf.arrow.type)
        // console.log(this.$tool.arrowIst)
        // this.$tool.arrowIst.c.drag()
        var arrowDragHandler = function(ist){
            // console.log(ist)
            var cDragDt = {x: 0, y: 0};
            // (function(){
            // var innerTmpArror = null
            var innerTmpArror = null
            ist.drag(
                function(x, y){
                    // console.log(arguments)
                    // x += cDragDt.x;
                    // y += cDragDt.y;
                    // console.log(cDragDt)
                    // cDragDt = {x, y}
                    // cDragDt.x += x
                    // cDragDt.y += y
                    x += cDragDt.x
                    y += cDragDt.y
                    if(innerTmpArror){
                        innerTmpArror.updatePath([x, y], [x + 50, y])
                    }
                    // console.log(cDragDt, x, y)
                },
                function(){
                    // cDragDt = {x: 0, y: 0}
                    // var _x, _y
                    // cDragDt.x = _x
                    // cDragDt.y = _y
                    // console.log(ist)
                    if('text' == ist.type){
                        cDragDt.x = ist.attr('x')                        
                        cDragDt.y = ist.attr('y')                        
                    }
                    else{
                        var pathA1 = ist.attr('path')
                        pathA1 = pathA1[0]
                        cDragDt.x = pathA1[1]
                        cDragDt.y = pathA1[2]
                    }
                    // 生成
                    innerTmpArror = $this.flow.arrow([cDragDt.x, cDragDt.y], [cDragDt.x + 50, cDragDt.y], 5)
                    innerTmpArror.c.attr('fill', pkgClr.arrow)
                    innerTmpArror.c.click(function(){         
                        $this.removeBBox()  // 移除当前的节点的外部边框      
                        var opt = innerTmpArror.opt 
                        var color = '#000000'
                        var pR = 3      // 半径                        
                        // console.log('*', innerTmpArror)
                        // 起始节点
                        var arrowLineP1 = $this.raphael.circle(opt.p1[0], opt.p1[1], pR)
                        arrowLineP1.attr('fill', color);                        

                        // 结束节点
                        var arrowLineP2 = $this.raphael.circle(opt.p2[0], opt.p2[1], pR)
                        arrowLineP2.attr('fill', color)

                        var lineEndPointMoveEvt = function(LIst, isEnd){
                            var aCDt = {ax: 0, ay: 0}
                            // console.log(arrowLineP1)
                            LIst.drag(
                                function(ax, ay){
                                    ax += aCDt.ax
                                    ay += aCDt.ay
                                    if(isEnd){
                                        innerTmpArror.updatePath(null, [ax, ay])
                                    }
                                    else{
                                        innerTmpArror.updatePath([ax, ay])
                                    }
                                    this.attr({
                                        cx: ax,
                                        cy: ay
                                    })  
                                },
                                function(){
                                    aCDt.ax = this.attr('cx')
                                    aCDt.ay = this.attr('cy')
                                },
                                function(){
                                    // if(aCDt.ax < 75 || aCDt.ay < 50){
                                    //     return null
                                    // }
                                    // LIst.updatePath([aCDt.ax, aCDt.ay])
                                    // arrowLineP1.attr({
                                    //     x: aCDt.ax,
                                    //     y: aCDt.ay
                                    // })
                                }
                            )
                        }

                        lineEndPointMoveEvt(arrowLineP1)
                        lineEndPointMoveEvt(arrowLineP2, true)
                        // 临时数据节点
                        $this.tempNodes.push(arrowLineP1, arrowLineP2)
                    })
                    // console.log(innerTmpArror)
                    $this.lineQueues.push(innerTmpArror)
                },
                function(){
                    /*
                    var arrowLine = $this.flow.arrow([cDragDt.x, cDragDt.y], [cDragDt.x, cDragDt.y+50], 5)
                    arrowLine.c.attr('fill', pkgClr.arrow)
                    arrowLine.c.click(function(){
                        $this.removeBBox()  // 移除当前的节点的外部边框
                        //console.log(arrowLine)
                        var opt = arrowLine.opt
                        var color = '#000000'
                        var pR = 3      // 半径
                        // 起始节点
                        var arrowLineP1 = $this.raphael.circle(opt.p1[0], opt.p1[1], pR)
                        arrowLineP1.attr('fill', color);

                        (function(LIst){
                            var aCDt = {ax: 0, ay: 0}
                            // console.log(arrowLineP1)
                            arrowLineP1.drag(
                                function(ax, ay){
                                    ax += aCDt.ax;
                                    ay += aCDt.ay;
                                    aCDt = {ax, ay}
                                },
                                function(){
                                    aCDt = {ax: 0, ay: 0}
                                    var _ax, _ay
                                    aCDt.ax = _ax
                                    aCDt.ay = _ay
                                },
                                function(){
                                    if(aCDt.ax < 75 || aCDt.ay < 50){
                                        return null
                                    }
                                    LIst.updatePath([aCDt.ax, aCDt.ay])
                                    arrowLineP1.attr({
                                        x: aCDt.ax,
                                        y: aCDt.ay
                                    })
                                }
                            )
                        })(arrowLine)
                        

                        // 结束节点
                        var arrowLineP2 = $this.raphael.circle(opt.p2[0], opt.p2[1], pR)
                        arrowLineP2.attr('fill', color)
                        // 临时数据节点
                        $this.tempNodes.push(arrowLineP1, arrowLineP2)
                    })

                    $this.lineQueues.push(arrowLine)
                    */
                }
            )
            // })()
        }
        arrowDragHandler(this.$tool.arrowIst.c)
        arrowDragHandler(this.$tool.arrowTxtIst)
    }
    /**
     * 移除全部的边框
     */
    removeBBox(){
        var nodes = this.nodes
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.bBox){
                node.bBox.remove()
                node.bBox = null    // 清空 bBox 
            }
        }
        // 临时节点
        var tempNodes = this.tempNodes
        for(var j=0; j<tempNodes.length; j++){
            var tNode = tempNodes[j]
            tNode.remove()
        }
        this.tempNodes = []
    }
    /**
     * 删除节点, 为空是删除当前选中的节点
     * @param {RaphaelElement|string|null} code 
     */
    removeNode(code){
        if(!code){
            code = this.getSelected()
        }
        if(code){
            var node = 'object' == typeof code? code : this.raphael.getById(code)
            if('object' == typeof node){
                // 删除实体数据
                var id = node.id    // id 数据
                if(node.bBox){
                    node.bBox.remove()
                    node.bBox = null
                }
                if(node.label){
                    node.label.remove()
                    node.label = null
                }
                node.c.remove();
                node = null // 覆盖并或删除数据
                // 删除内部对象缓存的数据
                var nodes = this.nodes
                var nodeStack = []
                for(var i=0; i<nodes.length; i++){
                    var $node = nodes[i]
                    // 清除已经删除节点的缓存数据
                    if(id == $node.c.id){
                        continue
                    }
                    nodeStack.push($node)
                }
                return true
            }
        }
        return false
    }
    /**
     * 设置指定/当前选择节点对象属性
     * @param {object} option {text}
     * @param {RaphaelElement|string|null} code 
     * @returns {bool}
     */
    setOption(option, code){
        var isSuccess = false
        if(option){
            if('object' != typeof option){  // 默认为文本，快速设置文本
                option = {text: option}
            }
            if(!code){
                code = this.getSelected()
            }
            var node = 'object' == typeof code? code : this.raphael.getById(code)
            // 文本属性
            if(option.text){
                if(node.label){
                    node.label.attr('text', option.text)
                    // 自动适应文本的宽度
                    if('function' == typeof node.resizeByText){
                        node.resizeByText()
                    }
                }
            }
        }
        return isSuccess
    }
    /**
     * 赋值节点，为空是复制当前选中的节点
     * @param {RaphaelElement|string|null} code 
     */
    cloneNode(code){
        if(!code){
            code = this.getSelected()
        }
        if(code){
            var node = 'object' == typeof code? code : this.raphael.getById(code)
            if('object' == typeof node){
                // 删除实体数据
                var id = node.id    // id 数据
                node.c.clone()
                node.label.clone()
                return true
            }
        }
        return false
    }
    /**
     * 获取被选中的节点，只能一个
     * @returns {NodeBase}
     */
    getSelected(){
        var nodes = this.nodes
        var selectedNode = null
        // 节点扫描
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.bBox){
                selectedNode = node
                break
            }
        }
        // 连线扫描
        var lines = this.lineQueues
        for(var j=0; j<lines.length; j++){
            var line = lines[j]
        }
        return selectedNode
    }
    /**
     * 获取最新生成的节点
     * @returns {NodeBase}
     */
    getLastElem(){
        var lastElem = null
        var nodes = this.nodes
        if(nodes.length > 0){
            lastElem = nodes[nodes.length - 1]
        }
        return lastElem
    }
    /**
     * 获取工作流步骤,用于保存工作流的数据结构
     * @returns {array}
     */
    getFlowStep(){
        var step = []
        var nodes = this.nodes
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            var stepAttr = this.getFlowJson(node)
            step.push(stepAttr)
        }
        return step
    }
    /**
     * 获取节点业务需求的数据结构
     * @param {RaphaelElement|null} node 节点实例， 为空时为当前选中的节点
     * @returns {object|null}
     */
    getFlowJson(node){
        if(!node){
            node = this.getSelected()
        }
        var fjson = {}
        if(node){
            var label = node.label || null
            var c = node.c
            fjson = {
                text: label? label.attr('text'):'',
                code: c.id,
                type: c.data('type')
            }
        }
        else{
            fjson = null
        }
        return fjson
    }
    /**
     * 创建节点数
     * @param {object} cDragDt 当前节点拖动的参数
     * @param {number|string} type 节点类型
     */
    _createNode(tbDragDt, type){
        var $this = this,
            nodeIst = null,
            config = this.config,
            pkgClr = config.pkgClr
        switch(type){
            case 1:
                nodeIst = this.flow.endpoint(tbDragDt.dx, tbDragDt.dy, 10, '开始')
                nodeIst.c.attr('fill', pkgClr.start)
                break;
            case 2:
                nodeIst = this.flow.operation(tbDragDt.dx, tbDragDt.dy, 50, 40, '操作流程')
                nodeIst.c.attr('fill', pkgClr.opera)
                break;  
            case 3:
                nodeIst = this.flow.judge(tbDragDt.dx, tbDragDt.dy, 50, 40, '流程判断')
                nodeIst.c.attr('fill', pkgClr.judge)
                break;
            case 9:
                nodeIst = this.flow.endpoint(tbDragDt.dx, tbDragDt.dy, 10, '结束')
                nodeIst.c.attr('fill', pkgClr.end)
                break;                          
        }
        if(nodeIst){    // 保存节点实例
             // 节点拖动
            (function(){
                var cDragDt = {}
                nodeIst.c.drag(
                    function(dx, dy){
                        dx += cDragDt.x
                        dy += cDragDt.y
                        nodeIst.move(dx, dy)
                    },
                    function(){
                        var _x, _y
                        if('ellipse' == this.type){
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
                        // console.log(cDragDt)
                    },
                    function(){
                        cDragDt = {x:0, y:0}
                    }
                )
                // console.log(nodeIst)
                // console.log(nodeIst.c)
            })()

            // 节点点击处理
            nodeIst.c.click(function(){
                $this.removeBBox()
                // if(nodeIst.bBox){
                //     nodeIst.bBox.remove()
                // }
                var bt = this.getBBox()
                var dt = 5
                nodeIst.bBox = nodeIst.instance.rect(bt.x-dt, bt.y-dt, bt.width+dt*2, bt.height+dt*2)
                nodeIst.bBox.attr({
                    'stroke': pkgClr.NodeBox
                })
            })
            nodeIst.c.data('type', type)
            this.nodes.push(nodeIst)
        }
    }
}

export default WorkerEditor