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
        this._LineDragingP = null               // RaphaelElement 直线正在拖动记录点
        this.flow = new Flow(this.raphael)      // 工作流程按钮
        this.nodes = []                         // 运行节点数
        this.lineQueues = []                    // 连线记录器
        this.tempNodes = []                     // 临时节点集
        this.MagneticCore = null                // 连线磁化中心点，用于节点关联，单状态的结构 data: {type: from/to}
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
            $this.MagneticCore = null           // 移动工具栏时磁芯消失
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
            var cDragDt = {x: 0, y: 0};
            var innerTmpArror = null
            ist.drag(
                function(x, y){
                    x += cDragDt.x
                    y += cDragDt.y
                    if(innerTmpArror){
                        innerTmpArror.updatePath([x, y], [x + 50, y])
                    }
                },
                function(){
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
                    innerTmpArror = $this.flow.arrow([cDragDt.x, cDragDt.y], [cDragDt.x + 50, cDragDt.y], 5);
                    // 使用js闭包，将值保存再内存中 修复V1.1.1 中的BUG
                    (function(TmpArrIst){
                        // console.log(innerTmpArror.c.id)
                        TmpArrIst.c.attr('fill', pkgClr.arrow)
                        TmpArrIst.c.click(function(){         
                            $this.removeBBox()  // 移除当前的节点的外部边框      
                            var opt = TmpArrIst.opt 
                            var color = '#000000'
                            var pR = 3      // 半径                        
                            // console.log('*', innerTmpArror)
                            // console.log(innerTmpArror.c.id, 'click')
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
                                        var hasIntersectElem = $this.getIntersectElem({x: ax, y:ay})
                                        if(hasIntersectElem){   // 碰撞时，使用连接端点
                                            $this.removeIntersectMk()
                                            hasIntersectElem.c.attr('fill', '#FF0000')                                            
                                            hasIntersectElem._IntersectMk = true
                                            var CntLinePnt
                                            if(isEnd){
                                                CntLinePnt = hasIntersectElem.getEnlnP()
                                            }
                                            else{
                                                CntLinePnt = hasIntersectElem.getStlnP()
                                            }
                                            // console.log(CntLinePnt, hasIntersectElem)
                                            ax = CntLinePnt.x
                                            ay = CntLinePnt.y
                                            // 关联
                                            var position = isEnd? 'to':'from'
                                            $this.removeConLine(TmpArrIst, position)
                                            hasIntersectElem.recordLine(position, TmpArrIst)
                                            if(!TmpArrIst.position){
                                                TmpArrIst.position = {}
                                            }
                                            TmpArrIst.position[position] = CntLinePnt.position
                                        }
                                        //console.log(hasIntersectElem)
                                        var mmgntcIst = this    // 磁芯点
                                        // var id = this.id
                                        if(isEnd){
                                            TmpArrIst.updatePath(null, [ax, ay])
                                            mmgntcIst.data('type', 'to')
                                            // TmpArrIst.position.to = id
                                        }
                                        else{
                                            TmpArrIst.updatePath([ax, ay])
                                            mmgntcIst.data('type', 'from')
                                            // TmpArrIst.position.from = id
                                        }
                                        $this.MagneticCore = mmgntcIst  // 保存正在移动的磁芯点
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
                                        $this.MagneticCore = null           // 拖动完成以后
                                    }
                                )
                            }

                            lineEndPointMoveEvt(arrowLineP1)
                            lineEndPointMoveEvt(arrowLineP2, true)
                            // 临时数据节点
                            $this.tempNodes.push(arrowLineP1, arrowLineP2)
                        })
                    })(innerTmpArror)
                    $this.lineQueues.push(innerTmpArror)
                },
                function(){
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
        this.MagneticCore = null
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
        this.removeIntersectMk()
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
     * 移除碰撞属性
     */
    removeIntersectMk(){
        var nodes = this.nodes
        var IntersectEl = null
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node._IntersectMk){
                node._IntersectMk = false       
                var _type = node.NodeType
                var pkgClr = this.config.pkgClr
                if(pkgClr[_type]){
                    node.c.attr('fill', pkgClr[_type])
                }else{
                    _type = node.c.data('type')
                    if(1 == _type){
                        node.c.attr('fill', pkgClr.start)
                    }
                    else if(9 == _type){
                        node.c.attr('fill', pkgClr.end)
                    }
                }
                IntersectEl = node         

            }
        }
        return IntersectEl
    }
    /**
     * 移除连接检测线，用于连接线与节点关联时删除就的关联
     * @param {NodeBase} lineIst 
     * @param {string} type from/to
     * @returns {bool}
     */
    removeConLine(lineIst, type){
        var isSuccess = false
        if(lineIst && type){
            var nodes = this.nodes
            var refId = lineIst.c.id
            for(var i=0; i<nodes.length; i++){
                var node = nodes[i]
                var lineType = type + 'Line'
                // 只检测为数组的类型
                if(node[lineType] && node[lineType].length){
                    var lineQues = node[lineType]
                    var nLineQues = []
                    for(var j=0; j<lineQues.length; j++){
                        var lineQue = lineQues[j]
                        if(refId != lineQue.c.id){
                            nLineQues.push(lineQue)
                        }
                    }
                    node[lineType] = nLineQues
                }
            }
        }
        return isSuccess
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
     * 获取碰撞的元素
     * @param {object} point {x, y} 坐标点
     * @returns {RapaelElement|null}
     */
    getIntersectElem(point){
        var itsctEl = null
        if('object' == typeof point){
            var nodes = this.nodes
            for(var i=0; i<nodes.length; i++){
                var node = nodes[i]
                var type = node.NodeType
                if('endpnt' == type){
                    var $c = node.c
                    var cx = $c.attr('cx'),
                        cy = $c.attr('cy'),
                        rx = $c.attr('rx'),
                        ry = $c.attr('ry')
                    if(
                        // x
                        (point.x >= (cx - rx) && point.x <= (cx + rx))
                        // y
                        && 
                        (point.y >= (cy - ry) && point.y <= (cy + ry))
                    ){
                        itsctEl = node
                        break
                    }        
                }
                else if('opera' == type){
                    var $c = node.c,
                        x = $c.attr('x'),
                        y = $c.attr('y'),
                        w = $c.attr('width'),
                        h = $c.attr('height')
                    if(
                        // x
                        (point.x >= x && point.x <= (x + w))
                        // y
                        && 
                        (point.y >= y && point.y <= (y + h))
                    ){
                        itsctEl = node
                        break
                    }   
                }
                else if('judge' == type){
                    var $opt = node.opt,
                        cx = $opt.cx,
                        cy = $opt.cy,
                        h = $opt.h,
                        w = $opt.w
                    if(
                        // x
                        (point.x >= (cx - w/2) && point.x <= (cx + w/2))
                        // y
                        && 
                        (point.y >= (cy - h/2) && point.y <= (cy + h/2))
                    ){
                        itsctEl = node
                        break
                    }    
                }
                //console.log(node)
            }
        }
        return itsctEl
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
                        nodeIst.ToSyncArrow(dx, dy)
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
            /*
                // mouseover  鼠标移动到元素上时 mousemove
                nodeIst.c.mouseover(function(){
                    if($this.MagneticCore){
                        console.log($this.MagneticCore.data('type'), 'mouseover')
                        // this.attr('fill', '#FF0000')
                        this.attr('stroke', '#FF0000')
                    }
                })
                // mouseup/mouseout
                nodeIst.c.mouseout(function(){
                    // if($this.MagneticCore){
                        // console.log($this.MagneticCore.data('type'), 'mouseout')
                        console.log('onmouseout')
                        this.attr('stroke', '#000000')
                    // }
                })
            */

           /*
           nodeIst.c.hover(
               function(){
                //    console.log('f_in')
                    if($this.MagneticCore){
                        console.log($this.MagneticCore.data('type'), 'mouseover')
                        // this.attr('fill', '#FF0000')
                        this.attr('stroke', '#FF0000')
                    }
               },
               function(){
                   console.log('f_out')
                   this.attr('stroke', '#000000')
               }
           )
           */
            nodeIst.c.data('type', type)
            this.nodes.push(nodeIst)
        }
    }
}

export default WorkerEditor