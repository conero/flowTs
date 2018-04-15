///<reference path='../index.d.ts' />
/**
 * 2018年3月1日 星期四
 * worker 工作流编辑器
 */
import H from './helper'            // 助手方法
import {VersionStruct, LibVersion} from '../version'
import { Util } from './util';
import ToolBar from './ToolBar';
import { NodeQue } from './NodeQue';
import {cNode} from './confNode'

// 什么jQuery/RaphaelJs
declare var $: any;

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
    config: rSu.bsMap
    paper: RaphaelPaper
    _rIdx: number
    _code2EidDick: {
        [k: string]: string
    }
    _LineDragingP:any
    nodeQueues: any
    lineQueues: any
    textQueues: any
    tempNodes: any
    MagneticCore: any
    toolbarCtrl?: rSu.ToolBar       // 工具栏控制器
    
    protected toolNodeIstQue: any[]     // 工具栏部件节点队列
    private ndMer: rSu.NodeQue
    private nodeDick: rSu.mapNode       // 节点字典
    private connDick: rSu.mapNode       // 连线字典 c{index}
    private idxDick: rSu.bsMap          // 连线处理栈 {c: numer-连线, a: number-字母}
    private lineCnMode: {               // 直线连接模式
        isSelEd: boolean,
        type: string,
        fromIst?: rSu.Node                // 连线起点节点实例
        toIst?: rSu.Node                  // 连线终点节点实例
        lnIst?: rSu.Node                  // 连线实例
    }
    private tmpNodeMap: rSu.mapNode     // 临时节点字典
    // toolNodeIstQue: any[]     // 工具栏部件节点队列
    // 静态属性
    static version: VersionStruct = LibVersion

    /**
     * @param {object} config 数据配置项
     */
    constructor(config: any){  
        // 索引处理字典
        this.idxDick = {
            c: 0,
            n: 0
        }
        this.nodeDick = {}      
        this.connDick = {}
        this.tmpNodeMap = {}
        this.config = config            // 系统配置参数
        this.paper = H.createInstance(config) // Raphael 对象        
        this.ndMer = new NodeQue(this.paper)
        // 配置参数处理
        this._configMergeToDefule()
        this._rIdx = 0                          // 内部索引，用于生成代码
        this._code2EidDick = {}                 // 内部代码与元素id的映射字段
        this._LineDragingP = null               // RaphaelElement 直线正在拖动记录点
        // 内部缓存数组件容器： 节点、连接线、独立文本
        this.lineQueues = []                    // 连线记录器
        this.textQueues = []
        this.tempNodes = []                     // 临时节点集
        this.MagneticCore = null                // 连线磁化中心点，用于节点关联，单状态的结构 data: {type: from/to}        
        this._cerateToolBar()
        if(this.config.stepCfg){
            try {
                // this.loadStep(this.config.stepCfg)
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
     * 连线同步
     * @param x 
     * @param y 
     */
    private _lineMoveSync(x: number, y: number, node: rSu.Node){
        let conLns = node.conLns,
            {from, to} = conLns,
            $this = this
        // 处理起点
        Util.each(from, (k: number, v: string) => {
            let fromLn: rSu.Node = $this.connDick[v]
            if('ln' == fromLn.NodeType){
                let from_code = fromLn.data('from_code'),
                    from_posi = fromLn.data('from_posi'),
                    {ps} = node.getBBox()
                fromLn.updAttr({P1: ps[from_posi]})
            }else{
                let from_code = fromLn.data('from_code'),
                    from_posi = fromLn.data('from_posi'),
                    {ps} = node.getBBox()
                // fromLn.updAttr({P1: ps[from_posi]})
                //fromLn.updAttr({P1: ps[from_posi]})
                ; (<any>fromLn).mvEndPoint(ps[from_posi])
            }
        })
        // 处理终点
        Util.each(to, (k: number, v: string) => {
            let toLn: rSu.Node = $this.connDick[v]
            if('ln' == toLn.NodeType){
                toLn.updAttr({P2: {x, y}})
                let to_code = toLn.data('to_code'),
                    to_posi = toLn.data('to_posi'),
                    {ps} = node.getBBox()
                toLn.updAttr({P2: ps[to_posi]})
            }else{
                toLn.updAttr({P2: {x, y}})
                let to_code = toLn.data('to_code'),
                    to_posi = toLn.data('to_posi'),
                    {ps} = node.getBBox()
                // toLn.updAttr({P2: ps[to_posi]})
                ;(<any>toLn).mvEndPoint(ps[to_posi], true)
            }
        })
    }
    /**
     * 工具栏处理器
     */
    private _cerateToolBar(): any{
        // 工具栏显示控制
        if(this.config.noToolBar){
            return null
        }
        this.toolbarCtrl = new ToolBar(this.paper, this.config)
        //console.log(this.toolbarCtrl)

        // 事件绑定处理
        var $this = this,
            {tBodyNds, cBodyNds, connElems} = $this.toolbarCtrl
            
        // 节点拖动处理事件
        Util.each(tBodyNds, (key: string, nd: rSu.Node) => {
            // 开始和结束不支持拖动
            // if(key == 'begin' || key == 'end'){
            //     return null
            // }
            let ndAst: rSu.Node,
                tP: rSu.P = {x: 0, y:0}
            nd.c.drag(function(dx: number, dy: number): any{
                dx += tP.x
                dy += tP.y
                if(ndAst){
                    ndAst.updAttr({cx: dx, cy: dy})
                }                    
            },
            function(): any{
                let {cx, cy} = nd.opt
                tP.x = cx
                tP.y = cy
                cx += 25
                let ndOpt:rSu.NodeOpt = {cx, cy, w: 50, h:40}
                if(cNode[key]){
                    ndOpt.text = cNode[key].text
                }           
                ndAst = $this.ndMer.make(key, ndOpt)
                    .creator()
                    .moveable({
                        afterUpd: function(x: number, y: number, node: rSu.Node){
                            $this._lineMoveSync(x, y, node)
                        }
                    })
                $this._nodeBindEvt(ndAst)
                let _index = $this._getOrderCode()
                // 保存到字典中
                ndAst.data('_code', _index)
                $this.nodeDick[_index] = ndAst
            },
            function(): any{
                console.log(this, '测试：end')
            })
        })
        // 连接线 -----------------
        let {lnCon, lnPolyCon} = connElems,
            {lnSeledBkg, lnDefBkg} = $this.toolbarCtrl.config
        // 内部属性标记
        lnCon.data('con', 'ln')
        lnPolyCon.data('con', 'lnPoly')

        // 清空连线选择状态
        this.lineCnMode = {
            isSelEd: false,
            type: null
        }
        var clearAllLinkSeled = () => {
            Util.each(cBodyNds, (key: string, nd: rSu.Node) => {
                nd.isSelEd = false
            })
            this.lineCnMode = {
                isSelEd: false,
                type: null
            }
            lnCon.attr('fill', lnDefBkg)
            lnPolyCon.attr('fill', lnDefBkg)
        }
        // 节点内部选择控制事件
        var afterLnCnnClickedEvt = () => {
            // 存在被选中的节点时，重新生成
            let cSeledNode = $this.select()
            if(cSeledNode){
                cSeledNode.select()
            }
        }
        Util.each(cBodyNds, (key: string, nd: rSu.Node) => {
            //console.log(key, nd)
            // 点击事件
            nd.c.click(function(){
                let isSelEd = nd.isSelEd
                clearAllLinkSeled()
                if(!isSelEd){
                    nd.isSelEd = true
                    $this.lineCnMode = {
                        isSelEd: true,
                        type: nd.NodeType
                    }
                    if(nd.NodeType == 'ln'){
                        lnCon.attr('fill', lnSeledBkg)
                    }
                    else{
                        lnPolyCon.attr('fill', lnSeledBkg)
                    }
                    afterLnCnnClickedEvt()
                }
            })
        })
        // 基于 WorkerEditor 属性
        let lnConClickEvt = function(){            
            // 选中
            if(!$this.lineCnMode.isSelEd || 
                ($this.lineCnMode.isSelEd && this.data('con') != $this.lineCnMode.type)){    
                    clearAllLinkSeled()
                    this.attr('fill', lnSeledBkg)
                    $this.lineCnMode = {
                        isSelEd: true,
                        type: this.data('con')
                    }              
                    afterLnCnnClickedEvt()              
            }else{
                clearAllLinkSeled()
            }
        }
        lnCon.click(lnConClickEvt)
        lnPolyCon.click(lnConClickEvt)
    }
    /**
     * 节点事件绑定
     * @param {rSu.Node} node 输入为空时绑定所有值
     */
    private _nodeBindEvt(node?: rSu.Node){
        var $this = this,
            {ndMer} = this
        ;
        // 事件绑定处理
        var toBindNodeEvts = (nd: rSu.Node) => {
            // 点击
            nd.c.click(function(){
                $this.removeAllSeled()
                nd.select()
            })
            //nd
            // 处理接口            
            nd.onCreateBoxPnt = function(pnt: RaphaelElement){
                var tmpLnIst: rSu.Node             
                // 开启连线模式时
                if($this.lineCnMode.isSelEd){
                    //console.log(pnt)
                    var tmpP = {x: 0, y: 0}
                    pnt.drag(
                        function(dx: number, dy: number){   // moving
                            if(!tmpLnIst){
                                console.log('选择框连线拖动出错！')
                                return
                            }
                            dx += tmpP.x
                            dy += tmpP.y
                            let collNode: rSu.Node = $this.collisionByP(dx, dy)
                            $this.allBackground()
                            if(collNode){                                
                                let rElem = collNode.magnCore(dx, dy)
                                if(rElem){
                                    dx = rElem.attr('cx')
                                    dy = rElem.attr('cy')
                                    tmpLnIst.data('to_code', rElem.data('pcode'))
                                        .data('to_posi', rElem.data('posi'))
                                }                                
                                collNode.background('magn')
                            }else{
                                tmpLnIst.data('to_code', null)
                                        .data('to_posi', null)
                            }
                            if($this.lineCnMode.type == 'ln'){
                                tmpLnIst.updAttr({
                                    P2: {x: dx, y: dy}
                                })
                            }else{
                                tmpLnIst.opt.MPs = [];   // 删除中间代码
                                // (<any>tmpLnIst).getMiddP()
                                tmpLnIst.updAttr({
                                    P2: {x: dx, y: dy}
                                })
                            }
                        },
                        function(){     // start
                            // 历史节点处理                            
                            $this.removeTmpNode('connLnIst')
                            // 删除所有联系那选中状态
                            $this.rmAllLnSeled()
                            // 处理
                            tmpP.x = this.attr('cx')
                            tmpP.y = this.attr('cy')
                          
                            let newOpt: rSu.NodeOpt = {},
                                lx = tmpP.x, 
                                ly = tmpP.y
                            if($this.lineCnMode.type == 'ln'){
                                newOpt = {
                                    P1: {x: lx, y: ly},
                                    P2: {x: lx+10, y: ly+5}
                                }
                            }
                            else{
                                newOpt = {
                                    P1: {x: lx, y: ly},            
                                    P2: {x: lx+4, y: ly + 4},
                                    //h: 4
                                    r: 5
                                }
                            }
                            tmpLnIst = ndMer.make($this.lineCnMode.type, newOpt)
                                .creator()
                                .data('from_code', pnt.data('pcode'))
                                .data('from_posi', pnt.data('posi'))
                            $this.tmpNodeMap['connLnIst'] = tmpLnIst
                            
                        },
                        function(){ // end 
                            // 有效的连线保留，说明其连接成功
                            if(tmpLnIst.data('to_code') && tmpLnIst.data('to_posi')){
                                let cIdx = $this._order('c', 'C'),
                                    fCode = tmpLnIst.data('from_code'),
                                    tCode = tmpLnIst.data('to_code')
                                tmpLnIst.data('_code', cIdx)         

                                let fNd: rSu.Node = $this.nodeDick[fCode]
                                let tNd: rSu.Node = $this.nodeDick[tCode]

                                fNd.line(<string>cIdx)
                                fNd.clearTmpElem('mc')
                                tNd.line(<string>cIdx, true)
                                tNd.clearTmpElem('mc')
                                $this.allBackground()

                                // 记录到字典中
                                $this._lineBindEvt(tmpLnIst)
                                $this.connDick[cIdx] = tmpLnIst
                                $this.tmpNodeMap['connLnIst'] = null
                            }
                            $this.removeTmpNode('connLnIst')
                            // 
                            // $this.tmpNodeMap['connLnIst'] = tmpLnIst
                        }
                    )
                }
            }
        }
        if(node){
            toBindNodeEvts(node)
        }else{           
            for(var key in this.nodeDick){
                toBindNodeEvts(this.nodeDick[key])
            }
        }
    }
    /**
     * 连接线事件绑定
     * @param ln 
     */
    private _lineBindEvt(ln?: rSu.Node){
        let $this = this
        if(ln){
            if('ln' == ln.NodeType){
                ln.onCreateBoxPnt = function(pElem: RaphaelElement){
                    let pcode = pElem.data('pcode'),
                        posi = pElem.data('posi')
                    // 起点
                    if('f' == posi){
                        let p1: rSu.P = {x: 0, y: 0}
                        pElem.drag(
                            function(dx: number, dy: number){
                                dx += p1.x
                                dy += p1.y

                                // 节点碰撞
                                let collNode: rSu.Node = $this.collisionByP(dx, dy),
                                    fCode = ln.data('from_code'),
                                    lnCode = ln.code
                                if(fCode){
                                    $this.nodeDick[fCode].rmLine(lnCode)
                                }
                                $this.allBackground()

                                if(collNode){                                
                                    let rElem = collNode.magnCore(dx, dy)
                                    if(rElem){
                                        dx = rElem.attr('cx')
                                        dy = rElem.attr('cy')
                                        ln.data('from_code', rElem.data('pcode'))
                                            .data('from_posi', rElem.data('posi'))
                                    }                                
                                    collNode.background('magn')
                                    collNode.line(lnCode)
                                }else{
                                    ln.data('from_code', null)
                                        .data('from_posi', null)
                                }
                                ln.updAttr({P1: {x: dx, y: dy}})
                            },
                            function(){
                                p1.x = this.attr('cx')                                
                                p1.y = this.attr('cy')                                
                            },
                            function(){}
                        )
                    }
                    else if('t' == posi){
                        let p1: rSu.P = {x: 0, y: 0}
                        pElem.drag(
                            function(dx: number, dy: number){
                                dx += p1.x
                                dy += p1.y

                                // 节点碰撞
                                let collNode: rSu.Node = $this.collisionByP(dx, dy),
                                    fCode = ln.data('to_code'),
                                    lnCode = ln.code
                                if(fCode){
                                    $this.nodeDick[fCode].rmLine(lnCode, true)
                                }
                                $this.allBackground()

                                if(collNode){                                
                                    let rElem = collNode.magnCore(dx, dy)
                                    if(rElem){
                                        dx = rElem.attr('cx')
                                        dy = rElem.attr('cy')
                                        ln.data('to_code', rElem.data('pcode'))
                                            .data('to_posi', rElem.data('posi'))
                                    }                                
                                    collNode.background('magn')
                                    collNode.line(lnCode, true)
                                }else{
                                    ln.data('to_code', null)
                                        .data('to_posi', null)
                                }
                                ln.updAttr({P2: {x: dx, y: dy}})
                            },
                            function(){
                                p1.x = this.attr('cx')                                
                                p1.y = this.attr('cy')                                
                            },
                            function(){}
                        )
                    }
                }
                // 连线选中
                ln.c.click(function(){
                    $this.removeAllSeled()
                    ln.select()
                })
            }else{
                // 连线选中
                ln.c.click(function(){
                    $this.removeAllSeled()
                    ln.select()
                })
            }
            // 公共鼠标选中事件
            ln.c.hover(
                function(){
                    this.attr('stroke-width', '3px')
                        //.attr('fill', '#0033FF')
                        .attr('stroke', '#0033FF')
                        
                    // console.log(ln)
                    // if('ln' == ln.NodeType){
                    //     this.attr('fill', '#0033FF')
                    // }else{}
                },
                function(){
                    this.attr('stroke-width', '1px')
                        // .attr('fill', '#000000')
                        .attr('stroke', '#000000')
                }
            )
            // console.log(ln)
        }
    }
    /**
     * 移除所有选中中元素
     */
    removeAllSeled(){
        this.rmAllNdSeled()
        this.rmAllLnSeled()
    }
    /**
     * 全选
     */
    allSelect(){
        this.allNodeSelect()
    }
    // 所有节点选中
    allNodeSelect(){
        for(var key in this.nodeDick){
            let nd: rSu.Node = this.nodeDick[key]
            nd.select()
        }
    }
    /**
     * 移除所有节点选中状态
     */
    rmAllNdSeled(){
        for(var key in this.nodeDick){
            let nd: rSu.Node = this.nodeDick[key]
            if(nd.isSelEd){
                nd.removeBox()
            }
        }
    }
    /**
     * 移除所有连线选中状态
     */
    rmAllLnSeled(){
        for(var key in this.connDick){
            let nd: rSu.Node = this.connDick[key]
            if(nd.isSelEd){
                nd.removeBox()
            }
        }
    }

    /**
     * 设置统一变化管理
     */
    allBackground(type?:string){
        Util.each(this.nodeDick, (i: number, v: rSu.Node) => {
            v.background(type)
        })
    }
    /**
     * 获取
     */
    private _getOrderCode(){
        this._rIdx += 1
        var code = this.config.prefCode + this._rIdx
        // 判断序列号是否已经存在
        if(this._code2EidDick[code]){
            code = this._getOrderCode()
        }
        return code
    }
    /**
     * 序列号获取
     * @param type 
     */
    private _order(type: string, prev?: string): string|number{
        let newStr: string|number
        if(type){
            if('undefined' != typeof this.idxDick[type]){
                this.idxDick[type] += 1
                newStr = this.idxDick[type]
            }
        }
        if(prev){
            newStr = prev + newStr
        }
        return newStr
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
     * 获取最新的节点
     */
    last(): rSu.Node{
        let lastNode:rSu.Node = null
        for(var key in this.nodeDick){
            lastNode = this.nodeDick[key]
        }
        return lastNode
    }
    /**
     * 删除节点
     */
    remove(code?: string){
        let isSuccess = false
        // 删除节点
        var removeNode = (node: rSu.Node) => {
            if(node){
                let NodeType = node.NodeType,
                    value = node.code
                if('ln' == NodeType){   // 连线删除
                    let fCode = node.data('from_code'),
                        tCode = node.data('to_code')               
                    this.nodeDick[fCode].rmLine(value)
                    this.nodeDick[tCode].rmLine(value, true)
                }
                
                node.delete()
                if(this.nodeDick[value]){
                    delete this.nodeDick[value]
                }else if(this.connDick[value]){
                    delete this.connDick[value]
                }
                isSuccess = true
                // 选择切换
                let lastElem: rSu.Node = this.last()
                if(lastElem){
                    lastElem.select()
                }
                
            }
        }
        if(!code){
            removeNode(this.select())
        }else{
            removeNode(this.nodeDick[code])
        }
        return isSuccess
    }
    /**
     * 循环获取节点， tab 节点选择切换
     */
    tab(){
        var cSelEd: rSu.Node = this.select(),
            code: string = cSelEd? cSelEd.code : null,
            findLastMk: boolean = false,    // 找到最后一个
            successMk: boolean = false     // 匹配到标志

        for(var key in this.nodeDick){
            var nd = this.nodeDick[key]
            if(!cSelEd){    // 没有的从第一个开始
                nd.select()
                successMk = true
                break
            }else{
                if(findLastMk){     // 正好遍历到
                    this.removeAllSeled()
                    nd.select()
                    successMk = true
                    break
                }
                else if(code == nd.code){
                    findLastMk = true
                }
            }
        }
        // 没有找到时从新开始，且存在元素
        if(findLastMk && !successMk){
            this.removeAllSeled()
            this.tab()
        }
    }
    /**
     * 节点复制
     * @param {string} code 
     */
    clone(code?: string | rSu.Node): rSu.Node{
        let node: rSu.Node,
            newNode: rSu.Node,
            $this = this
        if(code && 'string' == typeof code){
            node = this.nodeDick[code]
        }else if(code && 'object' == typeof code){
            node = code
        }else{
            node = this.select()
        }
        if(node){
            let newOpt: rSu.NodeOpt = $.extend(true, {}, node.opt),
                rate = 0.2
            newOpt.cx += newOpt.w * rate
            newOpt.cy += newOpt.h * rate
            newNode = this.ndMer.make(node.NodeType, newOpt)
                .creator()
                .moveable({
                    afterUpd: function(x: number, y: number, node: rSu.Node){
                        $this._lineMoveSync(x, y, node)
                    }
                })
            // 切换选中状态
            this.removeAllSeled()
            newNode.select()
            this._nodeBindEvt(newNode)
            let _index = this._getOrderCode()
            // 保存到字典中
            newNode.data('_code', _index)
            this.nodeDick[_index] = newNode
        }
        return newNode
    }
    /**
     * // d2rw
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
     * d2rw
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
                code = this.select()
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
     * 获取选中的实例
     */
    select(): rSu.Node{
        var nodes = this.nodeQueues
        var selectedNode: rSu.Node = null
        // 节点扫描
        Util.each(this.nodeDick, (k: string, node: rSu.Node) => {
            if(node.isSelEd){
                selectedNode = node
                return false
            }
        })
        // 连线扫描
        if(!selectedNode){
            Util.each(this.connDick, (k: string, node: rSu.Node) => {
                if(node.isSelEd){
                    selectedNode = node
                    return false
                }
            })
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
            node = this.select()
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
    // removeTmpNode(value?: any){
    removeTmpNode(value?: string | string[]){
       if(value){
           let queue: string[] = []
           if('object' == typeof value){
               queue = value
           }else{
               queue = [value]
           }
           Util.each(queue, (k:number, v: string) => {
                if(this.tmpNodeMap[v]){
                    this.tmpNodeMap[v].delete()
                    delete this.tmpNodeMap[v]
                }
            })
       }
       else{
           Util.each(this.tmpNodeMap, (k: string, nd: rSu.Node) => {
                nd.delete()
                delete this.tmpNodeMap[k]
           })
       }
       return this
   }
   /**
    * 通过点坐标计算相碰撞的元素
    */
   collisionByP(x: number|rSu.NodeOpt, y?: number): rSu.Node{
       let tmpNode: rSu.Node
       // 点坐标自动转换
       if('object' == typeof x){
           let nX = x.x,
            nY = x.y
            x = nX
            y = nY
       }
       if(x && y){
           Util.each(this.nodeDick, (index: number, nd: rSu.Node) => {
               let boxdt = nd.getBBox(),
                {attr, ps} = boxdt,
                {width, height} = attr,
                x1 = attr.x,
                y1 = attr.y
                if(
                    (x >= x1 && x <= x1 + width) &&
                    (y >= y1 && y <= y1 + height)
                ){
                    tmpNode = nd
                    return false
                }
           })
       }
       return tmpNode
   }

    /**
     * 事件处理接口
     * @param {NodeBase} nodeIst 
     */
    onNodeClick(nodeIst: any){}
}
