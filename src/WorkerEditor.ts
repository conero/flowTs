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
import NodeUtil from './node/NodeUtil';
import {LnPolyConn} from './algo/LnPolyConnFn';

// 什么jQuery/RaphaelJs
declare var $: any;

/**
 * 工作流编辑器轻量级
 */
export default class WorkerEditor{
    // config: object
    config: rSu.bsMap
    paper: RaphaelPaper
    toolbarCtrl?: rSu.ToolBar       // 工具栏控制器
    nodeDick: rSu.mapNode       // 节点字典
    connDick: rSu.mapNode       // 连线字典 c{index}
    textDick: rSu.mapNode       // 文本字典 t{index}
    
    protected toolNodeIstQue: any[]     // 工具栏部件节点队列

    private ndMer: rSu.NodeQue
    private idxDick: rSu.bsMap          // 连线处理栈 {c: numer-连线, a: number-字母}
    private lineCnMode: {               // 直线连接模式
        isSelEd: boolean,
        type: string,
        fromIst?: rSu.Node                // 连线起点节点实例
        toIst?: rSu.Node                  // 连线终点节点实例
        lnIst?: rSu.Node                  // 连线实例
    }
    private tmpNodeMap: rSu.mapNode     // 临时节点字典
    private tmpMapRElm: rSu.MapRElm     // 临时节点
    private previewMk: boolean          // 预览模式
    
    // 静态属性
    static version: VersionStruct = LibVersion

    /**
     * @param {object} config 数据配置项
     */
    constructor(config: any){  
        // 索引处理字典
        this.idxDick = {
            c: 0,                   // 连接线
            n: 0,                   // 节点
            t: 0                    // 文本
        }
        this.nodeDick = {}      
        this.connDick = {}
        this.textDick = {}
        this.tmpNodeMap = {}
        this.tmpMapRElm = {}
        this.config = config            // 系统配置参数
        this.paper = H.createInstance(config) // Raphael 对象        
        this.ndMer = new NodeQue(this.paper)
        // 配置参数处理
        this._configMergeToDefule()
        this._readonly()
        // 内部缓存数组件容器： 节点、连接线、独立文本
        this._cerateToolBar()
        // 数据加载
        if(config.data){
            try {
                this.load(config.data)   
            } catch (error) {
                console.log(error)
            }            
        }
        // 绑定协助事件
        if(this.config.bindOEvts){
            this.operHelpEvts()
        }
        this._domListener()
    }
    /**
     * 配置参数与默认参数和合并处理
     */
    _configMergeToDefule(){
        // pkgClr 背景颜色
        let pkgClr = this.config.pkgClr || {}
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

        // 事件绑定处理
        let $this = this,
            {tBodyNds, cBodyNds, connElems} = $this.toolbarCtrl,
            bkg = this.config.bkg || {}
            
        // 节点拖动处理事件
        Util.each(tBodyNds, (key: string, nd: rSu.Node) => {
            // 开始和结束不支持拖动
            // if(key == 'begin' || key == 'end'){
            //     return null
            // }
            let ndAst: rSu.Node,
                tP: rSu.P = {x: 0, y:0}
            
            nd.c.drag(
                function(dx: number, dy: number): any{
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
                    // 默认颜色，新增节点未运行状态
                    ndOpt.bkg = bkg.urunNd || '#CDC5BF'
                    ndAst = $this.ndMer
                        .make(key, ndOpt)
                        .creator()
                },
                function(): any{
                    ndAst.moveable({
                            beforeMv: function(node: rSu.Node){
                                if($this.previewMk){
                                    return false
                                }
                            },
                            afterUpd: function(x: number, y: number, node: rSu.Node){
                                $this._lineMoveSync(x, y, node)
                            }
                        })
                    $this._nodeBindEvt(ndAst)
                    if('text' == ndAst.NodeType){
                        let tIdx = $this._order('t', 'T')
                        // 保存到字典中
                        ndAst.data('_code', tIdx)
                        $this.textDick[tIdx] = ndAst
                    }
                    else{
                        let _index = $this._order('n', 'A')
                        // 保存到字典中
                        ndAst.data('_code', _index)
                        $this.nodeDick[_index] = ndAst
                    }      
                }
            )
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
        let clearAllLinkSeled = () => {
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
        let afterLnCnnClickedEvt = () => {
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
        this._baseNodeBindEvt(node)
        let $this = this,
            {ndMer, config} = this,
            bkg = config.bkg || {}            
        ;
        // 事件绑定处理
        let toBindNodeEvts = (nd: rSu.Node) => {
            // 点击
            nd.c.click(function(){
                $this.removeAllSeled()
                nd.select()
                $this.onClick(nd)
            })
            // 双击
            nd.c.dblclick(function(){
                $this.onDbClick(nd)
            })
            //nd
            // 处理接口            
            nd.onCreateBoxPnt = function(pnt: RaphaelElement){
                // 预览标识
                if($this.previewMk || $this.config.disDragble){
                    return null
                }
                let tmpLnIst: rSu.Node
                // 开启连线模式时
                if($this.lineCnMode && $this.lineCnMode.isSelEd){
                    // 配置，禁止节点之间连线
                    if(config.disConnNode){
                        return null
                    }
                    let tmpP = {x: 0, y: 0}
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
                                // 折线连接线处理
                                LnPolyConn(tmpLnIst, $this, collNode)
                            }
                        },
                        function(){     // start
                            // 历史节点处理                            
                            $this.removeTmpNode('connLnIst')
                            // 删除所有联系那选中状态
                            $this.removeAllSeled('conn')
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
                            // 默认颜色，新增节点未运行状态
                            newOpt.bkg = bkg.urunNd || '#CDC5BF'
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
                // 节点方位拖动大小
                else if(!config.disEpDragble){
                    let tp: rSu.P = {x: 0, y: 0},
                        attr: rSu.bsMap = {pcode: null, posi: null}
                    pnt.drag(
                        function(dx: number, dy: number){
                            dx += tp.x, dy += tp.y
                            let cnode: rSu.Node = attr.pcode? $this.nodeDick[attr.pcode]: null
                            if(cnode && attr.pcode && attr.posi){
                                let opt = cnode.opt,
                                    {cx, cy, h, w} = opt,
                                    boxPadding: number = cnode.feature('boxPadding')
                                    
                                // 数据申明
                                let yt: number, yb: number, xl: number, xr:  number
                                // 新值
                                let yt1: number, yb1: number, xl1: number, xr1: number
                                let cx1: number, cy1: number, h1: number, w1: number
                                switch(attr.posi){
                                    case 'a':   // 左上角移动
                                        yt1 = dy + boxPadding
                                        xl1 = dx + boxPadding
                                        yb = cy + h/2
                                        xr = cx + w/2
                                        if(yt1 <= yb && xl1 <= xr){
                                            h1 = Math.abs(yt1 - yb)
                                            w1 = Math.abs(xl1 - xr)
                                            cx1 = xl1 + w1/2
                                            cy1 = yt1 + h1/2
                                            cnode.updAttr({
                                                h: h1,
                                                w: w1,
                                                cx: cx1,
                                                cy: cy1
                                            })  
                                        }
                                        break
                                    case 'b':   // 上拉 
                                        yt1 = dy + boxPadding
                                        yb = cy + h/2
                                        if(yt1 <= yb){
                                            h1 = Math.abs(yb - yt1)
                                            cy1 = yt1 + h1/2
                                            cnode.updAttr({
                                                h: h1,
                                                cy: cy1
                                            })  
                                            // 同步更新边框，报错 [BUG]
                                            // cnode.select()
                                        }
                                        break
                                    case 'c':   // 右上角
                                        yt1 = dy + boxPadding
                                        xr1 = dx - boxPadding
                                        yb = cy + h/2
                                        xl = cx - w/2
                                        if(yt1 <= yb && xr1 >= xl){
                                            h1 = Math.abs(yt1 - yb)
                                            w1 = Math.abs(xr1 - xl)
                                            cx1 = xr1 - w1/2
                                            cy1 = yt1 + h1/2
                                            cnode.updAttr({
                                                h: h1,
                                                w: w1,
                                                cx: cx1,
                                                cy: cy1
                                            })  
                                        }
                                        break
                                    case 'd':   // 右拉
                                        xr1 = dx - boxPadding
                                        xl = cx - w/2
                                        if(xr1 >= xl){
                                            w1 = Math.abs(xl - xr1),
                                            cx1 = xr1 - w1/2
                                            cnode.updAttr({
                                                w: w1,
                                                cx: cx1
                                            })
                                            // 同步更新边框，报错 [BUG]
                                            // cnode.select()
                                        }
                                        break
                                    case 'e':   // 右下角
                                        yb1 = dy - boxPadding
                                        xr1 = dx - boxPadding
                                        yt = cy - h/2
                                        xl = cx - w/2
                                        if(yb1 >= yt && xr1 >= xl){
                                            h1 = Math.abs(yb1 - yt)
                                            w1 = Math.abs(xr1 - xl)
                                            cx1 = xr1 - w1/2
                                            cy1 = yb1 - h1/2
                                            cnode.updAttr({
                                                h: h1,
                                                w: w1,
                                                cx: cx1,
                                                cy: cy1
                                            }) 
                                        }
                                        break
                                    case 'f':   // 下拉
                                        yb1 = dy - boxPadding,
                                        yt = cy - h/2
                                        if(yb1 >= yt){
                                            h1 = Math.abs(yt - yb1),
                                            cy1 = yb1 - h1/2
                                            cnode.updAttr({
                                                h: h1,
                                                cy: cy1
                                            })  
                                            // 同步更新边框，报错 [BUG]
                                            // cnode.select()
                                        }
                                        break
                                    case 'g':   // 左下角
                                        yb1 = dy - boxPadding
                                        xl1 = dx + boxPadding
                                        yt = cy - h/2
                                        xr = cx + w/2
                                        if(yb1 >= yt && xl1 <= xr){
                                            h1 = Math.abs(yb1 - yt)
                                            w1 = Math.abs(xl1 - xr)
                                            cx1 = xl1 + w1/2
                                            cy1 = yb1 - h1/2
                                            cnode.updAttr({
                                                h: h1,
                                                w: w1,
                                                cx: cx1,
                                                cy: cy1
                                            }) 
                                        } 
                                        break
                                    case 'h':   // 左拉
                                        xl1 = dx + boxPadding,
                                        xr = cx + w/2
                                        if(xl1 <= xr){
                                            w1 = Math.abs(xr - xl1)
                                            cx1  = xl1 + w1/2
                                            cnode.updAttr({
                                                w: w1,
                                                cx: cx1
                                            })
                                            // 同步更新边框，报错 [BUG]
                                            // cnode.select()
                                        }
                                        break
                                }
                            }
                        },
                        function(){
                            // 处理
                            tp.x = this.attr('cx')
                            tp.y = this.attr('cy')
                            //console.log(this.data())

                            attr.pcode = this.data('pcode')
                            attr.posi = this.data('posi')
                        },
                        function(){}
                    )
                }
            }
            // 尺寸自适应
            nd.onSize = function(){
                let opt = this.opt
                $this._lineMoveSync(opt.cx, opt.cy, this)
            }
        }
        if(node){
            toBindNodeEvts(node)
        }else{           
            for(let key in this.nodeDick){
                toBindNodeEvts(this.nodeDick[key])
            }
        }
    }
    /**
     * 连接线事件绑定
     * @param ln 
     */
    private _lineBindEvt(ln?: rSu.Node){
        this._baseNodeBindEvt(ln)
        let $this = this
        if(ln){
            let bkg = this.config.bkg || {}
            // 起点移动处理
            let startPFn = (elem: RaphaelElement) => {
                let p1: rSu.P = {x: 0, y: 0}
                elem.drag(
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
            // 终点移动处理
            let endPFn = (elem: RaphaelElement) => {
                let p1: rSu.P = {x: 0, y: 0}
                elem.drag(
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
                        // 折线
                        if('ln_poly' == ln.NodeType){
                            LnPolyConn(ln, $this, collNode)
                        }
                    },
                    function(){
                        p1.x = this.attr('cx')                                
                        p1.y = this.attr('cy')                                
                    },
                    function(){}
                )
            }
            if('ln' == ln.NodeType){
                ln.onCreateBoxPnt = function(pElem: RaphaelElement){
                    // 预览标识，禁止拖动
                    if($this.previewMk || $this.config.disDragble){
                        return null
                    }                    
                    let pcode = pElem.data('pcode'),
                        posi = pElem.data('posi')
                    // 起点
                    if('f' == posi){
                        startPFn(pElem)
                    }
                    else if('t' == posi){
                        endPFn(pElem)
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
                // 边框点
                ln.onCreateBoxPnt = function(pElem: RaphaelElement){
                    // 预览标识
                    if($this.previewMk || $this.config.disDragble){
                        return null
                    }
                    let pcode = pElem.data('pcode'),
                        posi = pElem.data('posi'),
                        MPs = ln.opt.MPs,
                        fMIdx: number =  (2 + MPs.length)*2 - 2,    // 聚焦点最大索引
                        fMIdxStr: string = 'f' + fMIdx
                    if('f0' == posi){    // 起点
                        startPFn(pElem)
                    }
                    else if(fMIdxStr == posi){   // 终点
                        endPFn(pElem)
                    }
                    else{   // 中间点
                        let tP: rSu.P = {x: 0, y: 0},
                            MPsTmp: rSu.P[] = [],
                            MPsLn: RaphaelElement,   // 中间点串联成的临时连线
                            fPQue: rSu.MapP = {},
                            tElemKey: string = 'ln_ploy_point',
                            idx0: number = -1, idx1: number = -1

                        pElem.drag(
                            function(dx: number, dy: number){
                                dx += tP.x
                                dy += tP.y
                                let MPsLnAttr: rSu.P[] = NodeUtil.path2ps(MPsLn),
                                    len: number = MPsLnAttr.length,
                                    fp: rSu.P = MPsLnAttr[0],
                                    tp: rSu.P = MPsLnAttr[len-1]
                               let pAttr: rSu.P[] = [fp]
                               // 同 x/y 轴坐标
                               if(fp.x == tp.x || fp.y == tp.y){
                                   // 同 x 轴，向 y 方向移动
                                   if(fp.x == tp.x){
                                       pAttr.push(
                                           {x: dx, y: fp.y},
                                           {x: dx, y: tp.y}
                                       )
                                   }
                                   else{
                                       pAttr.push(
                                           {x: fp.x, y: dy},
                                           {x: tp.x, y: dy}
                                        )                                  
                                   }
                               }
                               else{
                                   pAttr.push(
                                       {x: dx, y: fp.y},
                                       {x: dx, y: dy},
                                       {x: tp.x, y: dy},
                                   )
                               }
                               pAttr.push(tp)
                            //    console.log(pAttr)
                               MPsLn.attr('path', NodeUtil.ps2Path(pAttr))
                            },
                            function(){
                                tP.x = this.attr('cx')
                                tP.y = this.attr('cy')
                                
                                fPQue = (<any>ln).getFocusPoint()
                                let idx: number = parseInt(posi.replace('f', ''))
                                
                                idx0 = idx - 1
                                idx1 = idx + 1

                                let key0 = 'f' + idx0,
                                key1 = 'f' + idx1

                                let fp: rSu.P = fPQue[key0],
                                    mp: rSu.P = fPQue[posi],
                                    tp: rSu.P = fPQue[key1]

                                if('f0' == key0){
                                    fp = NodeUtil.middP(fp, mp)
                                }
                                if(fMIdxStr == key1){
                                    tp = NodeUtil.middP(mp, tp)
                                }
                                MPsLn = this.paper.path(NodeUtil.ps2Path([
                                    fp,
                                    mp,
                                    tp
                                ]))
                                    .attr('stroke', '#00FF00')

                                $this.rmTempElem(tElemKey)
                                $this.tmpMapRElm[tElemKey] = MPsLn
                            },
                            function(){
                                let MPsLnAttr: rSu.P[] = NodeUtil.path2ps(MPsLn)
                                let pQue: rSu.P[] = [],
                                    isMkMPs: boolean = false    // 中间值产生成功
                                Util.each(fPQue, (k: string, p: rSu.P) => {
                                    let kIdx: number = parseInt(k.replace('f', ''))
                                    if(kIdx >= idx0 && kIdx <= idx1){
                                        if(!isMkMPs){
                                            pQue = pQue.concat(pQue, MPsLnAttr)
                                            isMkMPs = true
                                        }
                                    }
                                    else{
                                        pQue.push(p)
                                    }
                                })
                                let nPMs = Util.subArray(pQue, 1, -1)
                                ln.updAttr({
                                    MPs: nPMs
                                })
                                ln.select()
                                $this.rmTempElem(tElemKey)
                            }
                        )
                    }
                }
            }
            // 公共鼠标选中事件
            ln.c.hover(
                function(){
                    let _bkg = bkg.lnHover || '#FF0000',
                        sWd = '4px'
                    this.attr('stroke-width', sWd)
                        .attr('stroke', _bkg)
                    // 箭体
                    if(ln.inlineEle){
                        ln.inlineEle
                            .attr('fill', _bkg)
                            .attr('stroke', _bkg)
                            .attr('stroke-width', sWd)
                    }
                },
                function(){
                    let _bkg = ln.opt.bkg,
                        sWd = '2px'

                    this.attr('stroke-width', '2px')
                        .attr('stroke', ln.opt.bkg)
                    // 箭体
                    if(ln.inlineEle){
                        ln.inlineEle.attr('fill', ln.opt.bkg)
                        ln.inlineEle.attr('stroke', ln.opt.bkg)
                    }
                }
            )
            // console.log(ln)
        }
    }
    /**
     * 基本节点时间绑定，用于外部处理以及所有节点需要的时间
     * @param nd 
     */
    private _baseNodeBindEvt(nd: rSu.Node){
        this._nodeToolTip(nd)
    }
    /**
     * 序列号获取
     * @param {string} type 类型 [c, n, t]
     * @param {string} prev
     * @param {string} ref
     * @returns {string | number}
     * @private
     */
    private _order(type: string, prev?: string, ref?: string): string|number{
        let newStr: string|number
        prev = prev? prev: ''
        if(type){
            if('undefined' != typeof this.idxDick[type]){
                this.idxDick[type] += 1
                newStr = ref? ref: prev + this.idxDick[type]
                switch(type){
                    case 'c':
                        if(this.connDick[newStr]){
                            newStr = this._order(type, prev)
                        }
                        break
                    case 'n':
                        if(this.nodeDick[newStr]){
                            newStr = this._order(type, prev)
                        }
                        break
                    case 't':
                        if(this.textDick[newStr]){
                            newStr = this._order(type, prev)
                        }
                        break
                }
            }
        }
        return newStr
    }
    /**
     * dom 监听
     */
    private _domListener(){
        let {dom} = this.config,
            $this = this
        // 双击
        dom.find('svg').dblclick(function(){
            $this.removeAllSeled()
        })
    }
    /**
     * 节点title提示绑定，包括 node/text/conn
     * @param {rSu.Node} node
     */
    private _nodeToolTip(node: rSu.Node): void{
        if(!this.config.closeToolTip && node){
            let $this = this
            node.c.hover(
                function(){
                    let textTip = node.textTip
                    if(textTip){
                        let offset = $this.getDomOffset()
                        $this.tooltip(textTip, 
                            this.attr('x') + offset.left + 20, 
                            this.attr('y') + offset.top + 2
                        )
                    }
                },
                function(){
                    $this.tooltip('')
                }
            )
        }
    }
    /**
     * 只读属性
     */
    private _readonly(){
        if(this.config.readonly){
            this.config.noToolBar = true
            this.config.disEpDragble = true
            this.config.disConnNode = true
            this.config.disDragble = true
        }
    }
    /**
     * 移除所有选中中元素
     */
    removeAllSeled(type?: string|string[]){
        // 删除所有节点
        let removeAllSeledNodeFn = (dick: rSu.mapNode) => {
            Util.each(dick, (cd: string, ist: rSu.Node) => {
                if(ist.isSelEd){
                    ist.removeBox()
                }
            })
        }
        type = type? ('object' == typeof type? type: [type]): ''
        if(!type){
            type = ['c', 't', 'n']
        }
        //console.log(type)
        Util.each(type, (idx: number, tp: string) => {
            let dick: rSu.mapNode = {}
            if('c' == tp || 'conn' == tp){
                dick = this.connDick
            }else if('t' == tp || 'text' == tp){
                dick = this.textDick
            }else{
                dick = this.nodeDick
            }
            removeAllSeledNodeFn(dick)
        })
        this.rmTempElem('allBorde')
    }
    /**
     * 全选
     */
    allSelect(){
        // 标记选中状态
        this.allNdSeled()
        // 预览模式
        if(this.previewMk){
            return
        }
        let {x, y, w, h} = this.getAllSelPs()
        let $this = this
        // 生成全选遮挡层
        this.rmTempElem('allBorde')
        let tP: rSu.P = {x: 0, y: 0},
            pS: rSu.MapP = {}
        let allBorde = this.paper.rect(x, y, w, h)
            .attr('fill-opacity', 0.75)
            .attr('fill', '#9999FF')
            .dblclick(function(){   // 双击移除遮蔽层
                $this.removeAllSeled()
            })
            .drag(
                function(dx: number, dy: number){
                    // 自身移动
                    this.attr('x', tP.x + dx)
                    this.attr('y', tP.y + dy)
                    // 全部节点迁移
                    // 等比例移动法
                    Util.each($this.nodeDick, (k: string, node: rSu.Node) => {
                        let nTp = pS[k]
                        node.updAttr({
                            cx: nTp.x + dx,
                            cy: nTp.y + dy
                        })
                        node.select()
                    })
                    $this.allNdSeled('conn')
                },
                function(){
                    tP.x = this.attr('x')
                    tP.y = this.attr('y')
                    // 节点中心点坐标
                    Util.each($this.nodeDick, (k: string, node: rSu.Node) => {
                        let opt = node.opt
                        pS[k] = {
                            x: opt.cx,
                            y: opt.cy
                        }
                    })
                },
                function(){}
            )
        this.tmpMapRElm['allBorde'] = allBorde
    }
    /**
     * 全选是相关端点
     */
    getAllSelPs(){
        // 获取所有节点边框
        let t: number = 0, b: number = 0, l: number = 0, r: number = 0
        let boxPadding: number
        Util.each(this.nodeDick, (k: string, node: rSu.Node) => {
            let c = node.c,
                {attr} = node.getBBox(),
                {x, y, width, height} = attr,
                t1: number = y, b1: number = y + height, l1: number = x, r1: number = x + width
            if(!boxPadding) boxPadding = node.feature('boxPadding', null, 3)
            if(t == 0) t = t1
            if(b == 0) b = b1
            if(l == 0) l = l1
            if(r == 0) r = r1

            // 上边框
            if(t > t1) t = t1
            // 下边框
            if(b < b1) b = b1
            // 左边框
            if(l > l1) l = l1
            // 右边框
            if(r < r1) r = r1
        })
        let x1 = l, y1 = t, w1 = Math.abs(l - r), h1 = Math.abs(t - b)
        boxPadding = boxPadding * 2
        let boxPadding2 = boxPadding*2
        return {
            x: x1 - boxPadding,
            y: y1 - boxPadding,
            w: w1 + boxPadding2,
            h: h1 + boxPadding2
        }
    }
    /**
     * 选中所有节点
     * @param type 
     */
    allNdSeled(type?: string | string[]){
        if(type){
            type = 'object' == typeof type? type: [type]
        }else{
            type = ['c', 't', 'n']
        }
        Util.each(type, (idx: number, tp: string) => {
            let dick: rSu.mapNode = {}
            if('c' == tp || 'conn' == tp){
                dick = this.connDick
            }else if('t' == tp || 'text' == tp){
                dick = this.textDick
            }else{
                dick = this.nodeDick
            }
            Util.each(dick, (k: string, node: rSu.Node) => {
                node.select()
            })
        })
    }
    // 删除所有节点
    rmAllNode(){
        Util.each(this.nodeDick, (k: string, node: rSu.Node) => {
            this.remove(node)
        })
    }
    // 删除所有连线
    rmAllLine(){
        Util.each(this.connDick, (k: string, node: rSu.Node) => {
            this.remove(node)
        })
    }
    // 删除所有文本
    rmAllText(){
        Util.each(this.textDick, (k: string, node: rSu.Node) => {
            this.remove(node)
        })
    }
    // 移除所有节点
    allRemove(){
        this.rmAllLine()
        this.rmAllNode()
        this.rmAllText()
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
     * 移除临时元素字典（支持模糊查询）
     * @param key 
     * @param isLike 模糊查询
     */
    rmTempElem(key?: string, isLike?: string){
        if(key && !isLike){
            if(this.tmpMapRElm[key]){
                this.tmpMapRElm[key].remove()
            }
        }else{
            Util.each(this.tmpMapRElm, (k: string, elem: RaphaelElement) => {
                if(isLike && key){
                    if(k.indexOf(key) > -1){
                        this.rmTempElem(k)
                    }
                }
                else{
                    this.rmTempElem(k)
                }
            })
        }
    }
    /**
     * 获取最新的节点
     */
    last(): rSu.Node{
        let lastNode:rSu.Node = null
        for(let key in this.nodeDick){
            lastNode = this.nodeDick[key]
        }
        return lastNode
    }
    /**
     * 删除节点
     */
    remove(code?: string| rSu.Node){
        let isSuccess = false
        // 删除节点
        let removeNode = (node: rSu.Node) => {
            if(node){
                let NodeType = node.NodeType,
                    value = node.code
                if('ln' == NodeType || 'ln_poly' == NodeType){   // 连线删除
                    let fCode = node.data('from_code'),
                        tCode = node.data('to_code')
                    let fNodeIst = this.nodeDick[fCode],
                        tNodeIst = this.nodeDick[tCode]
                    // 先删除节点后删除连线，连线不存在
                    if(fNodeIst){
                        fNodeIst.rmLine(value)
                    }      
                    if(tNodeIst){
                        tNodeIst.rmLine(value, true)
                    }           
                }
                
                node.delete()
                if(this.nodeDick[value]){
                    delete this.nodeDick[value]
                }else if(this.connDick[value]){
                    delete this.connDick[value]
                }else if(this.textDick[value]){
                    delete this.textDick[value]
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
            let {node, text, conn} = this.selectGroup()
            let eachNodeFn = (rs: rSu.bsMap) => {
                Util.each(rs, (i: number, nd: rSu.Node) => {
                    removeNode(nd)
                })
            }
            eachNodeFn(node)
            eachNodeFn(text)
            eachNodeFn(conn)
        }else if('object' == typeof code){
            removeNode(code)
        }else{
            removeNode(this.nodeDick[code])
        }
        return isSuccess
    }
    /**
     * 循环获取节点， tab 节点选择切换
     * @param {string|null} type 类型 c-conn, t-text
     */
    tab(type?: string){
        let cSelEd: rSu.Node = this.select(),
            code: string = cSelEd? cSelEd.code : null,
            findLastMk: boolean = false,    // 找到最后一个
            successMk: boolean = false,     // 匹配到标志
            nt: string = cSelEd? cSelEd.NodeType: ''    // 节点类型
        
        // 节点选择处理函数            
        let handlerNodeSelFn = (cd: string, node: rSu.Node) => {
            if(!cSelEd){
                node.select()
                successMk = true
                return false
            }else{
                if(findLastMk){     // 正好遍历到
                    this.removeAllSeled()
                    node.select()
                    successMk = true
                    return false
                }
                else if(code == node.code){
                    findLastMk = true
                }
            }
        }
        if('c' == type){    // 连线
            if(nt && ('ln' != nt || <string>'ln_poly' != nt)){
                this.removeAllSeled()
            }
            Util.each(this.connDick, (cd: string, node: rSu.Node) => {
                return handlerNodeSelFn(cd, node)
            })
        }
        else if('t' == type){
            if(nt && ('text' != nt)){
                this.removeAllSeled()
            }
            Util.each(this.textDick, (cd: string, node: rSu.Node) => {
                return handlerNodeSelFn(cd, node)
            })
        }
        else{
            let isUnNode: boolean = false
            if(nt){
                if('ln' == nt || <string>'ln_poly' == nt){
                    isUnNode = true
                }else if('text' == nt){
                    isUnNode = true
                }
            }
            if(isUnNode){
                this.removeAllSeled()
            }
            Util.each(this.nodeDick, (cd: string, node: rSu.Node) => {
                return handlerNodeSelFn(cd, node)
            })
        }
        // 没有找到时从新开始，且存在元素
        if(findLastMk && !successMk){
            this.removeAllSeled()
            this.tab(type)
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
                    beforeMv: function(node: rSu.Node){
                        if($this.previewMk){
                            return false
                        }
                    },
                    afterUpd: function(x: number, y: number, node: rSu.Node){
                        $this._lineMoveSync(x, y, node)
                    }
                })
            // 切换选中状态
            this.removeAllSeled()
            newNode.select()
            this._nodeBindEvt(newNode)
            let ndType = newNode.NodeType
            if('text' == ndType){
                let tIdx = this._order('t', 'T')
                newNode.data('_code', tIdx)
                this.textDick[tIdx] = newNode
            }
            else{
                let _index = this._order('n', 'A')
                // 保存到字典中
                newNode.data('_code', _index)
                this.nodeDick[_index] = newNode
            }
        }
        return newNode
    }
    /**
     * 粘贴
     */
    paste(data: rSu.bsMap){
        let $this = this;
        data = 'object' == typeof data? data : []
        Util.each(data, (i: number, dd: rSu.bsMap) => {
            let {code, opt, NodeType, type} = dd,
                rate = 0.2
            opt.cx += opt.w * rate
            opt.cy += opt.h * rate
            let newNode = this.ndMer.make(NodeType, opt)
                .creator()
                
            if('node' == type){
                newNode.moveable({
                    beforeMv: function(node: rSu.Node){
                        if($this.previewMk){
                            return false
                        }
                    },
                    afterUpd: function(x: number, y: number, node: rSu.Node){
                        $this._lineMoveSync(x, y, node)
                    }
                })
                let _index = this._order('n', 'A', code)
                newNode.data('_code', _index)
                this._nodeBindEvt(newNode)
                this.nodeDick[_index] = newNode
            }
            else if('conn' == type){
                let _index = this._order('c', 'C', code)
                newNode.data('_code', _index)
                // 连线处理
                Util.each(dd.data, (k: string, v: any) => {
                    let lnNode: rSu.Node
                    switch(k){
                        case 'from_code':
                            lnNode = $this.nodeDick[v]
                            if(lnNode){
                                lnNode.line(<string>_index)
                            }
                            break
                        case 'to_code':
                            lnNode = $this.nodeDick[v]
                            if(lnNode){
                                lnNode.line(<string>_index, true)
                            }
                            break
                    }
                })

                this._lineBindEvt(newNode)
                // 保存到字典中
                this.connDick[_index] = newNode
            }
            else if('text' == type){
                let _index = this._order('t', 'T', code)
                newNode.data('_code', _index)
                this.textDick[_index] = newNode
            }
            newNode.data(dd.data)
        })
        return this
    }
    /**
     * 获取赋值的结果数据
     * 复制
     */
    copy(): rSu.bsMap[]{
        // >>>
            //>> [{code:code, opt: nodeOpt, cls: ''}]
        let data: rSu.bsMap[] = []
        let pushToData = (code: string, type: string, node: rSu.Node) => {
            data.push({
                code, 
                opt: $.extend(true, {}, node.opt),
                NodeType: node.NodeType,
                data: node.data(),
                type
            })
        }
        Util.each(this.nodeDick, (code: string, node: rSu.Node) => {
            if(node.isSelEd){
                pushToData(code, 'node', node)
            }
        })
        Util.each(this.connDick, (code: string, node: rSu.Node) => {
            if(node.isSelEd){
                pushToData(code, 'conn', node)
            }
        })
        Util.each(this.textDick, (code: string, node: rSu.Node) => {
            if(node.isSelEd){
                pushToData(code, 'text', node)
            }
        })
        return data
    }
    /**
     * 获取选中的实例(单节点)
     */
    select(): rSu.Node{     
        let selectedNode: rSu.Node = null
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
        // 扫描文本
        if(!selectedNode){
            Util.each(this.textDick, (k: string, node: rSu.Node) => {
                if(node.isSelEd){
                    selectedNode = node
                    return false
                }
            })
        }
        return selectedNode
    }
    /**
     * 选中连接实例的点(分组，所有节点)
     * @returns {object} {type: node[]} -> {node: [], conn: [], text: []}
     */
    selectGroup(): rSu.bsMap{
        let mNode: rSu.bsMap = {
            node: [],
            conn: [],
            text: []
        }
        // 节点
        Util.each(this.nodeDick, (cd: string, nd: rSu.Node) => {
            if(nd.isSelEd){
                mNode.node.push(nd)
            }
        })
        // 连线
        Util.each(this.connDick, (cd: string, nd: rSu.Node) => {
            if(nd.isSelEd){
                mNode.node.push(nd)
            }
        })
        // 文本
        Util.each(this.textDick, (cd: string, nd: rSu.Node) => {
            if(nd.isSelEd){
                mNode.node.push(nd)
            }
        })
        return mNode
    }
    /**
     * 获取节点属性
     * @memberof WorkerEditor
     */
    step(node?: string | rSu.Node){
        node = node? node: this.select()
        if('object' != typeof node){
            node = this.connDick[<string>node]
        }
        let step: rSu.bsMap,
            _srroo: rSu.bsMap
        if(node){
            let {conLns} = node,
                {from, to} = conLns,
                fromQue: string[] = [],
                toQue: string[] = []
            // 起点
            Util.each(from, (idx: number, cc: string) => {
                let cnIst = this.connDick[cc]
                if(cnIst){
                    let tCode = cnIst.data('to_code'),
                        tPosi = cnIst.data('to_posi')
                    toQue.push(cnIst.data('to_code'))
                }
            })
            // 终点
            Util.each(to, (idx: number, cc: string) => {
                let cnIst = this.connDick[cc]
                if(cnIst){
                    let fCode = cnIst.data('from_code'),
                        fPosi = cnIst.data('from_posi')
                    fromQue.push(cnIst.data('from_code'))
                }
            })
            step = {}
            // 正式数据
            step.code = node.code
            step.name = node.name
            step.type = node.type            
            step.next = toQue.join(',')
            step.prev = fromQue.join(',')
            // 坐标点属性值
            _srroo = {
                opt: node.opt,
                NodeType: node.NodeType,
                textTip: node.textTip
            }
            let nStep = this.onStep(node, step)
            if(nStep){
                step = <rSu.bsMap>nStep
            }
        }
        return {
            step,
            _srroo
        }
    }
    /**
     * 保存，且获取数据
     * 
     * @memberof WorkerEditor
     */
    save(){
        var stepStru: any[] = [],
            nodeSrroo: rSu.bsMap = {},
            line: rSu.bsMap = {},
            text: rSu.bsMap = {},
            _srroo: rSu.bsMap = {}

        Util.each(this.nodeDick, (code: string, node: rSu.Node) => {
            let stepData = this.step(node)
            stepStru.push(stepData.step)
            nodeSrroo[code] = stepData._srroo
        })
            
        // 连线
        Util.each(this.connDick, (cd: string, ist: rSu.Node) => {
            line[cd] = {
                data: ist.data(),
                NodeType: ist.NodeType,
                opt: ist.opt,
                textTip: ist.textTip
            }
        })
        // 文本
        Util.each(this.textDick, (cd: string, ist: rSu.Node) => {
            text[cd] = {
                data: ist.data(),
                NodeType: ist.NodeType,
                opt: ist.opt,
                textTip: ist.textTip
            }
        })
        _srroo = {node: nodeSrroo, line, text}
        return {
            step: stepStru,
            _srroo
        }
    }
    /**
     * 数据加载
     * @param {any} data 
     * @returns 
     * @memberof WorkerEditor
     */
    load(data: any){        
        let $this = this,
            lineQue: rSu.bsMap = {}
        let {step, _srroo} = data

        // 文件加载以后才显示
        let config = this.config,
            rCodes: string| string[] = config.rCodes || null,
            bkg: rSu.bsMap = config.bkg || {},
            noIcon: boolean = 'undefined' == typeof config.icon,
            icon: rSu.bsMap = config.icon || {}   

        // 节点生成复原
        Util.each(_srroo.node, (cd: string, nd: rSu.bsMap) => {
            // 节点生成
            nd.opt.bkg = bkg.urunNd || '#CDC5BF'
            nd.opt.bkgTxt = bkg.urunTxt || '#000000'
            let $node = this.ndMer.make(nd.NodeType, nd.opt)
                .creator()           
            // 禁止拖动     
            if(!config.disDragble){
                $node.moveable({
                    beforeMv: function(node: rSu.Node){
                        if($this.previewMk){
                            return false
                        }
                    },
                    afterUpd: function(x: number, y: number, node: rSu.Node){
                        $this._lineMoveSync(x, y, node)
                        
                        // 图标处理，存在图片同步移动
                        let icon:RaphaelElement = $node.tRElem['icon']
                        if(icon){
                            let iconP = $node.getIconP()
                            icon.attr({
                                x: iconP.x,
                                y: iconP.y
                            })
                        }
                    }
                })
            }
            // 保存到字典中
            $node.data('_code', cd)

            // 悬停提示
            $node.textTip = nd.textTip || null

            this._nodeBindEvt($node)
            $this.nodeDick[cd] = $node
        })
        // 连线生成处理
        Util.each(_srroo.line, (cd: string, ln: rSu.bsMap)=>{
            let _data = ln.data
            let $ln = this.ndMer.make(ln.NodeType, ln.opt)
                .creator()                
            // 禁止拖动     
            if(!config.disDragble){
                $ln.moveable({
                    beforeMv: function(node: rSu.Node){
                        if($this.previewMk){
                            return false
                        }
                    },
                    afterUpd: function(x: number, y: number, node: rSu.Node){
                        $this._lineMoveSync(x, y, node)
                    }
                })
            }
            $ln.data('_code', cd)     
            $ln.data(_data)
            
            let fCode = _data.from_code,
                tCode = _data.to_code
            let fIst = this.nodeDick[fCode],
                tIst = this.nodeDick[tCode]

            this._lineBindEvt($ln)
            this.connDick[cd] = $ln

            if(fIst){   // 起点
                fIst.line(cd)
            }
            if(tIst){   // 终点
                tIst.line(cd, true)
            }
            // 悬停提示
            $ln.textTip = ln.textTip || null
        })
        // 文本生成
        Util.each(_srroo.text, (cd: string, dd: rSu.bsMap) => {
            let _data = dd.data
            let $ist = this.ndMer.make(dd.NodeType, dd.opt)
                .creator()
                
            // 禁止拖动     
            if(!config.disDragble){
                $ist.moveable({
                    beforeMv: function(node: rSu.Node){
                        if($this.previewMk){
                            return false
                        }
                    },
                    afterUpd: function(x: number, y: number, node: rSu.Node){
                        $this._lineMoveSync(x, y, node)
                    }
                })
            }
            $ist.data('_code', cd)            
            $ist.data(_data)

            this._nodeBindEvt($ist)
            this.textDick[cd] = $ist
            // 悬停提示
            $ist.textTip = dd.textTip || null
        })

        // 自动撑高
        if(!config.closeSize){
            this.autoSize()
        }
        this.stateRender()
        return this
    }
    /**
     * 状态渲染
     */
    stateRender(){
        let {config} = this, 
            {rCodes} = config,
            $this = this
        // 运行状态
        if(rCodes){
            let bkg: rSu.bsMap = config.bkg || {},
                urunNd = bkg.urunNd || '#CDC5BF',
                urunTxt = bkg.urunNd || '#000000',
                runningNd = bkg.runningNd || '#0000FF',
                runningTxt = bkg.runningTxt || '#FFFFFF',
                ranNd = bkg.ranNd || '#32CD32',
                ranTxt = bkg.ranTxt || '#FFFFFF'

            let noIcon: boolean = 'undefined' == typeof config.icon,
                icon: rSu.bsMap = config.icon || {}   

            // 字符串转数组类型
            if('object' != typeof rCodes){
                if(rCodes.indexOf(',') > -1){
                    rCodes = rCodes.replace(/\s/g, '')
                    rCodes = rCodes.split(',')
                }
                else{
                    rCodes = [rCodes]
                }
            }

            // 生成图标
            let iconState: rSu.bsMap = icon.state || {}
            let createIconFn = (iconSrc: string, node: rSu.Node) => {
                if(noIcon){
                    return
                }
                let iconP: rSu.P = node.getIconP()
                if(iconP){                    
                    let rect: number = 10
                    node.tRElem['icon'] = this.paper.image(iconSrc, iconP.x, iconP.y, rect, rect)
                }
            }
            
            // 变量连线，用于连线渲染
            let conRendMap: rSu.bsMap = {}
            Util.each(this.connDick, (cd: string, ist: rSu.Node) => {
                let cData: rSu.bsMap = ist.data(),
                    {from_code, to_code} = cData
                if(!from_code || !to_code){
                    return
                }
                let crmKey: string = `${from_code}_${to_code}`
                conRendMap[crmKey] = cd
            })
            // console.log(conRendMap);

            // 渲染处理
            Util.each(rCodes, (i: number, cd: string) => {
                // 正在运行
                let isRunningMk: boolean = false
                if(cd.indexOf('*') > -1){
                    cd = cd.replace('*', '')
                    isRunningMk = true
                }
                let node: rSu.Node = this.nodeDick[cd]
                if(!node){
                    return
                }
                // 节点渲染
                if(isRunningMk){   // 正在运行
                    node.data('state', 'isRunning')
                    node.opt.bkg = runningNd
                    node.opt.bkgTxt = runningTxt
                    node.background(['node', 'text'])

                    createIconFn(iconState.ran || 'state_ran.png', node)
                }
                else{   // 已经运行
                    node.data('state', 'isRan')
                    node.opt.bkg = ranNd
                    node.opt.bkgTxt = ranTxt
                    node.background(['node', 'text'])

                    createIconFn(iconState.ran || 'state_ran.png', node)
                }

                // 徽标
                let iconImg = node.tRElem['icon']
                if(iconImg){
                    iconImg.hover(
                        function(){
                            // f_in
                            let state = node.data('state')
                            let title = ''
                            switch(state){
                                case 'isRan':
                                    title = '已经运行'
                                    break
                                case 'isRunning':
                                    title = '正在运行中'
                                    break
                            }
                            let offset = $this.getDomOffset()
                            $this.tooltip(title, 
                                this.attr('x') + offset.left + 20, 
                                this.attr('y') + offset.top + 2
                            )
                        },
                        function(){
                            $this.tooltip('')
                        },
                    )
                }

                // 连线渲染
                let crmKey2: string = i>0? `${rCodes[i-1]}_${cd}` : null,
                    lnCd: string,
                    lnIst: rSu.Node
                if(crmKey2 && (lnCd = conRendMap[crmKey2]) && (lnIst = this.connDick[lnCd])){
                    let bkgCol: string = isRunningMk? runningNd : ranNd
                    lnIst.opt.bkg = bkgCol
                    lnIst.c.attr('stroke', bkgCol)
                    // 箭头，箭体颜色一致性变化
                    if(lnIst.inlineEle){
                        lnIst.inlineEle.attr('stroke', bkgCol)
                        lnIst.inlineEle.attr('fill', bkgCol)
                    }
                }
            })
        }

        return this
    }
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
     * 预览，启动预览
     * @param disable 是否禁止
     */
    preview(disable?: boolean){
        if(disable){
            if(this.toolbarCtrl){
                this.toolbarCtrl.show()
            }
            this.previewMk = false
        }
        else{
            // 隐藏工具栏
            if(this.toolbarCtrl){
                this.toolbarCtrl.hide()
            }
            this.previewMk = true
        }
    }
    /**
     * 悬停提示
     * @param text 
     * @param x 
     * @param y 
     */
    tooltip(text: string, x?: number, y?: number){
        let ctrl = $('.flowts-tip')
        if(!text){
            if(ctrl.length > 0){
                ctrl.hide()
            }
            return
        }
        if(ctrl.length == 0){
            ctrl = $('<div class="flowts-tip"></div>')
            $('body').append(ctrl)
        }
        ctrl.show()
        ctrl.html(text)
        if(x && y){
            ctrl.css({
                top: y,
                left: x
            })
        }
    }
    /**
     * dom 坐标地址
     */
    getDomOffset(){
        let dom = this.config.dom
        return {
            left: dom[0].offsetLeft,
            top: dom[0].offsetTop
        }
    }    
    /**
     * 操作助手事件
     */
    operHelpEvts(){
        let {config} = this,
            {dom} = config,
            $this = this
        // tabindex ="0" 是元素可以聚焦，outline 取消边框
        dom.attr('tabindex', '0')
            .css({'outline':'none'})
        dom.off('keydown').on('keydown', function(evt: any){
            let code = evt.keyCode
            // console.log(code)
            // shift + 
            if(evt.shiftKey){
                // 基本操作
                if(68 == code){	// shift + D	删除当前的选择节点
                    $this.remove()
                }
                else if(84 == code){ // shitf + T tab 循环
					$this.tab()
                }
                else if(67 == code){    // shift + C tab 循环 conn
                    $this.tab('c')
                }
                else if(76 == code){    // shift + L tab 循环 text/lable
                    $this.tab('t')
                }
                else if(65 == code){ // shift + A 全选择
					$this.allSelect()
                }
                else if(82 == code){    // shift + R 删除
					$this.allRemove();
                }
                else if(86 == code){ // shitf + v 克隆
					$this.clone();
                }
                
                // 移动，方向移动：缩放
                else if($.inArray(code, [38, 40, 37, 39, 107, 109]) > -1){
                    let nodeSelEd: rSu.Node = $this.select()
                    if(nodeSelEd){
                        switch(code){
                            case 38: nodeSelEd.move2T(); break;
                            case 40: nodeSelEd.move2B(); break;
                            case 37: nodeSelEd.move2L(); break;
                            case 39: nodeSelEd.move2R(); break;
                            case 107: nodeSelEd.zoomOut(); break;
                            case 109: nodeSelEd.zoomIn(); break;
                        }
                    }
                }
                else{
                    // 键盘
                    if(config.onKeydown && 'function' == typeof config.onKeydown){
                        config.onKeydown(code, $this)
                    }
                }
            }
        })
    }
    /**
     * 错误连线
     * @param {boolean} noClear
     */
    errorLine(noClear?: boolean): boolean{
        let hasErr: boolean = false
        if(!noClear){
            this.removeAllSeled()
        }
        let cRecordM: rSu.bsMap = {}    // 节点连线记录
        Util.each(this.connDick, (code: string, node: rSu.Node) => {
            let data = node.data(),
                {to_code, from_code} = data
            if(!to_code || !from_code){
                node.select()
                hasErr = true
            }
            else{               
                // 重复的连线
                let key: string =  `${from_code}__${to_code}`
                if(cRecordM[key]){
                    node.select()
                    hasErr = true
                }
                else{
                    cRecordM[key] = true
                }                
            }
        })
        return hasErr
    }
    /**
     * 获取的节点
     * @param {boolean} noClear
     */
    errorNode(noClear?: boolean): boolean{
        let hasErr: boolean = false
        if(!noClear){
            this.removeAllSeled()
        }
        Util.each(this.nodeDick, (code: string, node: rSu.Node) => {
            let type = node.type
            // 不是开始或者结束
            if(1 != type && 9 != type){
                let data = this.step(node),
                    step = data.step
                if(!step.next || !step.prev){
                    node.select()
                    hasErr = true
                }
            }
        })
        return hasErr
    }
    /**
     * 显示所有错误
     */
    error(): boolean{
        let hasErr: boolean = false
        this.removeAllSeled()
        hasErr = this.errorLine(true)
        let hasErr2: boolean = this.errorNode(true)
        hasErr = hasErr? hasErr : hasErr2
        return hasErr
    }
    /**
     * 获取节点最大的宽度
     */
    get maxHw(){
        let m = {h: 0, w: 0}
        // 节点扫描
        Util.each(this.nodeDick, (k: string, nd: rSu.Node) => {
            let box = nd.getBBox(),
                {attr} = box,
                y = attr.y + attr.height,
                x = attr.x + attr.width
            if(y > m.h){
                m.h = y
            }      
            if(x > m.w){
                m.w = x
            }      
        })

        // 文本扫描
        Util.each(this.textDick, (k: string, nd: rSu.Node) => {
            let box = nd.getBBox(),
                {attr} = box,
                y = attr.y + attr.height,
                x = attr.x + attr.width
            if(y > m.h){
                m.h = y
            }      
            if(x > m.w){
                m.w = x
            }      
        })
        return m
    }
    /**
     * 尺寸自适应，为弥补不同画布之间尺寸不一致
     * @memberof WorkerEditor
     */
    autoSize(): void{
        let hw = this.maxHw,
            $svg = this.config.dom.find('svg'),
            cW: number = $svg.attr('width'),
            cH: number = $svg.attr('height'),
            dt: number = 5
        let tSvg = this.config.dom.find('svg')
        if(cW < hw.w){
            $svg.attr('width', hw.w + dt)
        }          
        if(cH < hw.h){
            $svg.attr('height', hw.h + dt)
        }  
    }
    /**
     * 双击事件
     * @param node 
     */
    onDbClick(node: rSu.Node){}
    /**
     * 点击事件
     * @param node 
     */
    onClick(node: rSu.Node){}
    /**
     * 节点保存时处理事件
     * @param node 
     * @return {object|null} 返回值时可以覆盖参数
     */
    onStep(node: rSu.Node, data: any): any{
        return data
    }
}
