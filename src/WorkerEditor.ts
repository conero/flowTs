///<reference path='../index.d.ts' />
/**
 * 2018年3月1日 星期四
 * worker 工作流编辑器
 */
import H from './helper'            // 助手方法
import Judge from './node/NodeJudge'
import {Flow} from './flow'
import {VersionStruct, LibVersion} from '../version'

// 通过数据 object 类型
interface ItfMap {
    [k: string]: any,
    [k: number]: any
}

// 坐标点
interface ItfPoint {
    x?: number,
    y?: number
}

// 什么jQuery/RaphaelJs
// declare var $: any;

// 配置参数常量 , type 1801 为特殊类型
const Conf = {
    start: {
        type: 1,
        text: '开始'
    },
    opera: {
        type: 2,
        text: '任务'
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
    },
    text: {
        type: 1802,
        text: '文本框',
        size: 10,            // 默认大小
        selected:{              // 选择属性
            'font-size':20,
            'fill':'red'
        },
        // 默认属性
        defAtrr:{
            'font-size':10,
            'fill':'black'
        }
    }
}
/**
 * 工作流编辑器轻量级
 */
export default class WorkerEditor{
    // config: object
    config: any
    raphael: any
    _rIdx: number
    _code2EidDick: {
        [k: string]: string
    }
    _LineDragingP:any
    flow: any
    nodeQueues: any
    lineQueues: any
    textQueues: any
    tempNodes: any
    MagneticCore: any
    $tool: any
    // 静态属性
    static version: VersionStruct = LibVersion

    /**
     * @param {object} config 数据配置项
     */
    constructor(config: any){
        this.config = config            // 系统配置参数
        this.raphael = H.createInstance(config) // Raphael 对象        
        // 配置参数处理
        this._configMergeToDefule()
        this._rIdx = 0                          // 内部索引，用于生成代码
        this._code2EidDick = {}                 // 内部代码与元素id的映射字段
        this._LineDragingP = null               // RaphaelElement 直线正在拖动记录点
        this.flow = new Flow(this.raphael)      // 工作流程按钮
        // 内部缓存数组件容器： 节点、连接线、独立文本
        this.nodeQueues = []                         // 运行节点数
        this.lineQueues = []                    // 连线记录器
        this.textQueues = []
        this.tempNodes = []                     // 临时节点集
        this.MagneticCore = null                // 连线磁化中心点，用于节点关联，单状态的结构 data: {type: from/to}
        // 工具栏显示控制
        if(!this.config.noToolBar){
            this._toolbar()
        }
        if(this.config.stepCfg){
            try {
                this.loadStep(this.config.stepCfg)
            } catch (error) {
                console.log(error)
            }
        }
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
        this.config.prefCode = this.config.prefCode || 'A' // 内部代码前缀
        this.config.listener = this.config.listener || {}   // 监听事件

        this.config.noToolBar = this.config.noToolBar || false
    }
    /**
     * 工具集按钮栏
     */
    _toolbar(){
        // 工具栏参数信息
        var $tool: Dance.Tool = {}  
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


        // 文本框
        y += 30
        $tool.textInst = this.raphael.text(x+10, y, Conf.text.text)

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
        var dragHandlerEvnt = function(node: any, type: any){
            $this.MagneticCore = null           // 移动工具栏时磁芯消失
            var cDragDt = {dx: 0, dy: 0}
            node.drag(
                function(dx: number, dy: number){   // moving
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
        var arrowDragHandler = function(ist: any){
            var cDragDt = {x: 0, y: 0};
            var innerTmpArror: any = null
            ist.drag(
                function(x: number, y: number){
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
                    // 生成连线
                    innerTmpArror = $this.flow.arrow([cDragDt.x, cDragDt.y], [cDragDt.x + 50, cDragDt.y], 5)
                    innerTmpArror.c.attr('fill', pkgClr.arrow);
                    $this._lineTragEvent(innerTmpArror)                    
                    $this.lineQueues.push(innerTmpArror)
                },
                function(){
                }
            )
            // })()
        }
        arrowDragHandler(this.$tool.arrowIst.c)
        arrowDragHandler(this.$tool.arrowTxtIst);

        // 文字拖动
        (function(){
            var _dragDt = {x: 0, y:0}
            var tmpTxtInst: any = null   // 临时文本
            $this.$tool.textInst.drag(
                function(x: number, y: number){
                    x += _dragDt.x
                    y += _dragDt.y
                    if(tmpTxtInst){
                        tmpTxtInst.attr({x, y})
                    }
                },
                function(){
                    _dragDt.x = this.attr('x') + 5
                    _dragDt.y = this.attr('y') + 5
                    tmpTxtInst = $this.raphael.text(_dragDt.x, _dragDt.y, '文本框')
                    $this._textBindEvent(tmpTxtInst)
                    $this.textQueues.push(tmpTxtInst)
                },
                function(){}
            )
        })()
    }
    /**
     * 获取
     */
    _getOrderCode(){
        this._rIdx += 1
        var code = this.config.prefCode + this._rIdx
        // 判断序列号是否已经存在
        if(this._code2EidDick[code]){
            code = this._getOrderCode()
        }
        return code
    }
    /**
     * 移除全部的边框
     */
    removeBBox(){
        this.MagneticCore = null
        // 系统节点
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.bBox){
                node.bBox.remove()
                node.bBox = null    // 清空 bBox 
            }
        }
        // 临时节点
        this.removeTempNodes()
        // 直线选中删除
        var lines = this.lineQueues
        for(var k=0; k<lines.length; k++){
            var line = lines[k]
            if(lines.selectEdMk){
                line.selectEdMk = false
            }
        }
        // 移除配置属性
        this.removeIntersectMk()
        // 删除文本选中状态
        this._removeTxtSelect()
        this.tempNodes = []
    }
    /**
     * 删除临时节点
     * @returns {this}
     */
    removeTempNodes(){
        // 临时节点
        var tempNodes = this.tempNodes
        for(var j=0; j<tempNodes.length; j++){
            var tNode = tempNodes[j]
            tNode.remove()
        }
    }
    /**
     * 删除节点, 为空是删除当前选中的节点
     * @param {RaphaelElement|string|null} code 
     */
    removeNode(code: any){
        if(!code){
            code = this.getSelected()
        }
        if(code){
            var node = 'object' == typeof code? code : 
                (this._code2EidDick[code]? this.raphael.getById(this._code2EidDick[code]):this.raphael.getById(code))
            if('object' == typeof node){
                // 删除实体数据
                var id = node.id    // id 数据
                var isConnectMk = false // 是否为连接线
                if(node.NodeType == 'arrow'){
                    isConnectMk = true
                }
                if(node.bBox){
                    node.bBox.remove()
                    node.bBox = null
                }
                // 文本
                if(node.label){
                    node.label.remove()
                    node.label = null
                }
                // 连线选择标识
                if(node.selectEdMk){
                    node.selectEdMk = false
                }
                node.c.remove();
                node = null // 覆盖并或删除数据
                // 清除连接线中的缓存器
                if(isConnectMk){
                    var lines = this.lineQueues
                    var newLineQ = []
                    for(var x=0; x<lines.length; x++){
                        var line = lines[x]
                        if(id == line.c.id){
                            continue
                        }
                        newLineQ.push(line)
                    }
                    this.lineQueues = newLineQ
                }
                else{
                    // 删除内部对象缓存的数据
                    var nodes = this.nodeQueues
                    var nodeStack = []
                    for(var i=0; i<nodes.length; i++){
                        var $node = nodes[i]
                        // 清除已经删除节点的缓存数据
                        if(id == $node.c.id){
                            continue
                        }
                        nodeStack.push($node)
                    }
                    this.nodeQueues = nodeStack
                }
                
                // 删除边框以及选中标识
                this.removeBBox()
                return true
            }
        }
        return false
    }
    /**
     * 移除碰撞属性
     */
    removeIntersectMk(){
        var nodes = this.nodeQueues
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
    removeConLine(lineIst: any, type: string){
        var isSuccess = false
        if(lineIst && type){
            var nodes = this.nodeQueues
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
     * 删除所有对象
     * @returns {this}
     */
    removeAll(){        
        this.removeAllText()
        this.removeAllLine()
        this.removeAllNode()
        return this
    }
    /**
     * 删除所有节点
     * @returns {this}
     */
    removeAllNode(){
        this.removeBBox()
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.label){
                node.label.remove()
            }
            node.c.remove()
        }
        this.nodeQueues = []
        return this
    }
    /**
     * 删除所有直线
     * @returns {this}
     */
    removeAllLine(){
        this.removeBBox()
        var lines = this.lineQueues
        for(var i=0; i<lines.length; i++){
            var line = lines[i]
            line.c.remove()
        }
        this.lineQueues = []
        return this
    }
    /**
     * 删除所有文本
     * @returns {this}
     */
    removeAllText(){
        this.removeBBox()
        var texts = this.textQueues
        for(var i=0; i<texts.length; i++){
            var text = texts[i]
            text.remove()
        }
        this.textQueues = []
        return this
    }
    /**
     * 通过节点代码获取节点
     * @param {string} code  NodeBase.c.data('code')
     * @returns {NodeBase|null}
     */
    getNodeByCode(code: any){
        var nodeIst = null
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.c.data('code') == code){
                nodeIst = node
                break
            }
        }
        return nodeIst
    }
     /**
     * 通过节点代码获取节点
     * @param {string} code  NodeBase.c.id
     * @returns {NodeBase|null}
     */
    getNodeByEid(code: string){
        var nodeIst = null
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.c.id == code){
                nodeIst = node
                break
            }
        }
        return nodeIst
    }
    /**
     * 代码与id对应，不同时传入值；设置字典
     * @param {string|null} code 
     * @param {string|null} id 
     * @returns {string|null|this}
     */
    code2Id(code: string, id:string){
        // 通过 code 获取 Id
        if(code && !id){
            return this._code2EidDick[code] || null
        }
        // 通过id 获取 code
        else if(id && !code){
            var dick = this._code2EidDick
            for(var prefCode in dick){
                if(id == dick[prefCode]){
                    return prefCode
                }
            }
            return null
        }
        else if(id && code){
            this._code2EidDick[code] = id
            return this
        }
    }
    /**
     * 设置指定/当前选择节点对象属性
     * @param {object} option {text}
     * @param {RaphaelElement|string|null} code REle.id
     * @returns {bool}
     */
    setOption(option: any, code: any){
        var isSuccess = false
        if(option){
            if('object' != typeof option){  // 默认为文本，快速设置文本
                option = {text: option}
            }
            if(!code){
                code = this.getSelected()
            }
            var node = 'object' == typeof code? code : this.getNodeByCode(code)
            // 文本属性
            if(node && option.text){
                if(node.label){
                    node.label.attr('text', option.text)
                    node.opt = node.opt || {}
                    node.opt.text = option.text     // NodeBase 的文本属性值
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
    cloneNode(code: any){
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
        var nodes = this.nodeQueues
        var selectedNode = null
        // 节点扫描
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.bBox){
                selectedNode = node
                break
            }
        }
        //console.log(this.lineQueues, selectedNode)
        if(!selectedNode){
            // 连线扫描
            var lines = this.lineQueues
            for(var j=0; j<lines.length; j++){
                var line = lines[j]
                if(line.selectEdMk){
                    selectedNode = line
                }
            }
        }
        return selectedNode
    }
    /**
     * 获取最新生成的节点
     * @returns {NodeBase}
     */
    getLastElem(){
        var lastElem = null
        var nodes = this.nodeQueues
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
        var nodes = this.nodeQueues
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            var stepAttr = this.getFlowJson(node)
            step.push(stepAttr)
        }
        return step
    }
    /**
     * 获取节点业务需求的数据结构
     * @param {NodeBase|null} node 节点实例， 为空时为当前选中的节点
     * @returns {object|null}
     */
    getFlowJson(node: any){
        if(!node){
            node = this.getSelected()
        }
        var fjson: Flower.StepStr = {}
        if(node){
            var label = node.label || null
            var c = node.c
            fjson = {
                name: label? label.attr('text'):'',
                code: c.data('code'),
                type: c.data('type'),
                _struct: node.toJson()
            }
            // 终点
            var toLines = node.toLine
            var toLineArr = []
            for(var j=0; j<toLines.length; j++){
                var code = this.getLineCntCode('from', toLines[j].c.id, node)
                if(code){
                    toLineArr.push(code)
                }
            }
            fjson.prev = toLineArr.length > 0? toLineArr.join(',') : '' 

            // 终点
            var fromLines = node.fromLine
            var fromLineArr = []
            for(var k=0; k<fromLines.length; k++){
                var code = this.getLineCntCode('to', fromLines[k].c.id, node)
                if(code){
                    fromLineArr.push(code)
                }
            }
            fjson.next = fromLineArr.length > 0? fromLineArr.join(',') : '' 
        }
        else{
            fjson = null
        }
        return fjson
    }
    /**
     * 获取连接线端点的节点代码
     * @param {string} type from/to
     * @param {string} lineId 直线代码
     * @param {NodeBase|null|string} refIst 参照id/NodeBase attr= {code}
     * @returns {string}
     */
    getLineCntCode(type: string, lineId: string, refIst?: any){
        var code = null
        if(type && lineId){
            var nodes = this.nodeQueues
            var refId = null
            if(refIst){
                refId = 'string' == typeof refIst? refIst : refIst.c.data('code')
            }
            var typeName = type + 'Line'
            for(var i=0; i<nodes.length; i++){
                var node = nodes[i]
                var cId = node.c.data('code')
                if(refId == cId){   // 跳过自身检测
                    continue
                }
                var typeLines = node[typeName]
                for(var j=0; j<typeLines.length; j++){
                    var typeLine = typeLines[j]
                    if(lineId == typeLine.c.id){
                        return cId
                    }
                }
            }
        }
        return code
    }
    /**
     * 获取碰撞的元素
     * @param {object} point {x, y} 坐标点
     * @returns {RapaelElement|null}
     */
    getIntersectElem(point: rSu.P){
        var itsctEl = null
        if('object' == typeof point){
            var nodes = this.nodeQueues
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
     * 加载流程数据,用于修改时加载历史数据
     * @param {object|null} steps 
     */
    loadStep(steps: any){
        if('object' == typeof steps){
            // 连接性先关联信息: {id:{}}
            var lineCntMapInfo: ItfMap = {},
                pkgClr = this.config.pkgClr
            // 记录连线端点信息                
            var recordLMapFn = (_from: string, _to: string) =>{
                if(_from.indexOf(',') == -1){
                    var _toQus = _to.indexOf(',') == -1? [_to]: _to.split(',')
                    for(var x1=0; x1<_toQus.length; x1++){
                        var ftK = _from + '__' + _toQus[x1]
                        if(!lineCntMapInfo[ftK]){
                            lineCntMapInfo[ftK] = true
                        }
                    }
                }
                else if(_to.indexOf(',') == -1){
                    var _fromQus = _from.indexOf(',') == -1? [_from]: _from.split(',')
                    for(var x2=0; x2<_fromQus.length; x2++){
                        var ftK = _fromQus[x2] + '__' + _to
                        if(!lineCntMapInfo[ftK]){
                            lineCntMapInfo[ftK] = true
                        }
                    }
                }
            }
            // 遍历节点
            for(var i = 0;i <steps.length; i++){
                var step = steps[i]
                var _struct = step._struct,
                    opt = _struct.opt,
                    config = this.config,
                    pkgClr = config.pkgClr
                var type = step.type
                var nodeIst = null
                if(1 == type || 9 == type){
                    nodeIst = this.flow.endpoint(opt.cx, opt.cy, opt.r, opt.text)
                    if(1 == type){
                        nodeIst.c.attr('fill', pkgClr.start)
                    }else{
                        nodeIst.c.attr('fill', pkgClr.end)
                    }
                }
                else if(2 == type){
                    nodeIst = this.flow.operation(opt.cx, opt.cy, opt.w, opt.h, opt.text)
                    nodeIst.c.attr('fill', pkgClr.opera)
                }
                else if(3 == type){
                    nodeIst = this.flow.judge(opt.cx, opt.cy, opt.w, opt.h, opt.text)
                    nodeIst.c.attr('fill', pkgClr.judge)
                }
                if(nodeIst){
                    var code = step.code || nodeIst.c.data('code')
                    var instId = nodeIst.c.id
                    if(!code){
                        code = this._getOrderCode()
                    }
                    nodeIst.c.data('code', code)
                    this._code2EidDick[code] = instId
                    nodeIst.c.data('type', type)
                    this._bindEvent(nodeIst)
                    this.nodeQueues.push(nodeIst)
                    
                    // 连线缓存器
                    var prev = step.prev || null    // to
                    if(prev){
                        recordLMapFn(prev, code)
                    }
                    var next = step.next || null    // from
                    if(next){
                        recordLMapFn(code, next)
                    }

                    // lineCntMapInfo[instId] = lineCntMapInfo[instId] || {}                    
                    // var prev = step.prev || null    // to
                    // if(prev){
                    //     var prevQu = lineCntMapInfo[instId].to || []
                    //     if(prev.indexOf(',') > -1){
                    //         prevQu = [].concat(prevQu, prev.split(','))
                    //     }else{
                    //         prevQu.push(prev)
                    //     }
                    //     lineCntMapInfo[instId].to = prevQu
                    // }
                    // var next = step.next || null    // from
                    // if(next){
                    //     var nextQu = lineCntMapInfo[instId].from || []
                    //     if(next.indexOf(',') > -1){
                    //         nextQu = [].concat(nextQu, next.split(','))
                    //     }else{
                    //         nextQu.push(next)
                    //     }
                    //     lineCntMapInfo[instId].from = nextQu
                    // }
                }
            }
            // console.log(lineCntMapInfo)

            for(var lnstr in lineCntMapInfo){
                var lnstrQus = lnstr.split('__')
                var fCodeNd = this.getNodeByCode(lnstrQus[0])
                var tCodeNd = this.getNodeByCode(lnstrQus[1])
                //console.log(fCodeNd, tCodeNd)
                var p1 = fCodeNd.getStlnP()
                var p2 = tCodeNd.getEnlnP()
                // console.log(p1, p2)
                var innerTmpArror = this.flow.arrow([p1.x, p1.y], [p2.x, p2.y], 5)
                // 连线实体关联，起点
                if(!innerTmpArror.position){
                    innerTmpArror.position = {}
                }
                innerTmpArror.position['from'] = p1.position
                fCodeNd.recordLine('from', innerTmpArror)
                tCodeNd.recordLine('to', innerTmpArror)
                innerTmpArror.position['to'] = p2.position

                innerTmpArror.c.attr('fill', pkgClr.arrow)                            
                this._lineTragEvent(innerTmpArror)
                this.lineQueues.push(innerTmpArror)
            }
        }
        // console.log(this._code2EidDick)
        // console.log(steps)
        // console.log(lineCntMapInfo)
        //console.log(this.getFlowStep())
        return this
    }
    /**
     * 创建节点数
     * @param {object} cDragDt 当前节点拖动的参数
     * @param {number|string} type 节点类型
     */
    _createNode(tbDragDt: any, type: any){
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
            var code = this._getOrderCode()
            nodeIst.c.data('code', code)
            this._code2EidDick[code] = nodeIst.c.id
            nodeIst.c.data('type', type)
            this._bindEvent(nodeIst)
            this.nodeQueues.push(nodeIst)
        }
    }
    /**
     * 节点绑定事件
     * @param {NodeBase} nodeIst 
     */
    _bindEvent(nodeIst: any){
        if(nodeIst){    // 保存节点实例
            var $this = this,
            config = this.config,
            pkgClr = config.pkgClr
            ;
            // 节点拖动
           (function(){
               var cDragDt = {x: 0, y: 0}
               nodeIst.c.drag(
                   function(dx: number, dy: number){
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
               $this.onNodeClick(nodeIst)
           })
       }
    }
    /**
     * 直线拖动
     * @param {RapaelElement} lineInst 
     */
    _lineTragEvent(lineInst: any){
        if(!lineInst || 'object' != typeof lineInst){
            return false
        }
        var $this = this;
        (function(TmpArrIst){
            TmpArrIst.c.click(function(){     
                $this.removeBBox()  // 移除当前的节点的外部边框
                // 选中标识符号
                TmpArrIst.selectEdMk = true   

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

                // tsc isEnd 可选参数
                var lineEndPointMoveEvt = function(LIst: any, isEnd?: any){
                    var aCDt = {ax: 0, ay: 0}
                    // console.log(arrowLineP1)
                    LIst.drag(
                        function(ax: number, ay: number){
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
        })(lineInst)
        return true
    }
    /**
     * 文本拖动，独立文本
     * @param {RapaelElement} textElem 
     */
    _textBindEvent(textElem: any){
        var $this = this;
        // 拖动
        (function(textIst){
            var _dragDt = {x:0, y:0}
            textIst.drag(
                function(x: number, y: number){
                    x += _dragDt.x
                    y += _dragDt.y
                    textIst.attr({x, y})
                },
                function(){
                    _dragDt.x = textIst.attr('x')
                    _dragDt.y = textIst.attr('y')
                },
                function(){}
            )
        })(textElem);
        // 点击处理
        textElem.click(function(){
            // this.attr('font-size', '100rem')
            // this.attr('font-size', '1.23em')
            // $this._removeTxtSelect()
            $this.removeBBox()
            this.attr(Conf.text.selected)
            this.data('selectMk', true)
        })
    }
    /**
     * 移除文本选中状态
     */
    _removeTxtSelect(){
        var texts = this.textQueues
        for(var i=0; i<texts.length; i++){
            var text = texts[i]
            if(text.data('selectMk')){
                text.attr(Conf.text.defAtrr)
                text.data('selectMk', false)
            }
        }
    }
    /**
     * 事件处理接口
     * @param {NodeBase} nodeIst 
     */
    onNodeClick(nodeIst: any){}
}
