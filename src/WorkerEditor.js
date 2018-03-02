/**
 * 2018年3月1日 星期四
 * worker 工作流编辑器
 */
import H from './helper'            // 助手方法
import Judge from './NodeJudge'
import {Flow} from './flow'


// 配置参数常量
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

        this.flow = new Flow(this.raphael)  // 工作流程按钮
        this.nodes = []                         // 运行节点数
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

        this.$tool = $tool
        this._toolbarDragEvt()
    }
    /**
     * 工具栏拖动处理
     */
    _toolbarDragEvt(){
        // console.log(this.$tool)
        var $this = this
        // 拖动处理    
        var dragHandlerEvnt = function(node, type){
            var cDragDt = {}
            node.drag(
                function(dx, dy){   // moving
                    // console.log(type)
                    // console.log(dx, dy)
                    cDragDt = {dx, dy}
                },
                function(){         // start
                    cDragDt = {dx: 0, dy: 0}
                    var _x, _y
                    cDragDt.x = _x
                    cDragDt.y = _y
                },
                function(){         // end
                    if(cDragDt.dx < 75 || cDragDt.dy < 50){
                        return null
                    }
                    $this._createNode(cDragDt, type)
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
     * 获取被选中的节点，只能一个
     * @returns {NodeBase}
     */
    getSelected(){
        var nodes = this.nodes
        var selectedNode = null
        for(var i=0; i<nodes.length; i++){
            var node = nodes[i]
            if(node.bBox){
                selectedNode = node
                break
            }
        }
        return selectedNode
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