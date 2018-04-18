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
    lineQueues: any
    textQueues: any
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
    private tmpMapRElm: rSu.MapRElm     // 临时节点
    // toolNodeIstQue: any[]     // 工具栏部件节点队列
    // 静态属性
    static version: VersionStruct = LibVersion

    /**
     * @param {object} config 数据配置项
     */
    constructor(config: any){  
        // 索引处理字典
        this.idxDick = {
            c: 0,                   // 连接线
            n: 0                    // 节点
        }
        this.nodeDick = {}      
        this.connDick = {}
        this.tmpNodeMap = {}
        this.tmpMapRElm = {}
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
        this.MagneticCore = null                // 连线磁化中心点，用于节点关联，单状态的结构 data: {type: from/to}        
        this._cerateToolBar()
        // 数据加载
        if(config.data){
            try {
                this.load(config.data)   
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
            {ndMer, config} = this            
        ;
        // 事件绑定处理
        var toBindNodeEvts = (nd: rSu.Node) => {
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
                var tmpLnIst: rSu.Node             
                // 开启连线模式时
                if($this.lineCnMode && $this.lineCnMode.isSelEd){
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
        this.rmTempElem('allBorde')
    }
    /**
     * 全选
     */
    allSelect(){
        // 标记选中状态
        this.allNodeSelect()
        this.allLineSelect()
        let {x, y, w, h} = this.getAllSelPs()
        let $this = this
        // 生成全选遮挡层
        this.rmTempElem('allBorde')
        var tP: rSu.P = {x: 0, y: 0},
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
                    $this.allLineSelect()
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
    // 所有节点选中
    allNodeSelect(){
        Util.each(this.nodeDick, (k: string, node: rSu.Node) => {
            node.select()
        })
    }
    // 所有连线选择
    allLineSelect(){
        Util.each(this.connDick, (k: string, node: rSu.Node) => {
            node.select()
        })
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
    allRemove(){
        this.rmAllLine()
        this.rmAllNode()
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
        if(this.nodeDick[code]){
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
                }
            }
        }
        if(prev){
            newStr = prev + newStr
        }
        return newStr
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
        for(var key in this.nodeDick){
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
        var removeNode = (node: rSu.Node) => {
            if(node){
                let NodeType = node.NodeType,
                    value = node.code
                if('ln' == NodeType || 'ln_poly' == NodeType){   // 连线删除
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
        }else if('object' == typeof code){
            removeNode(code)
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
     * 获取选中的实例
     */
    select(): rSu.Node{     
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
     * 获取节点属性
     * @memberof WorkerEditor
     */
    step(node?: string | rSu.Node){
        node = node? node: this.select()
        if('object' != typeof node){
            node = this.connDick[<string>node]
        }
        let data: rSu.bsMap
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
            data = {}
            // 正式数据
            data.code = node.code
            data.name = node.name
            data.type = node.type            
            data.prev = toQue.join(',')
            data.next = fromQue.join(',')
            // 坐标点属性值
            data._srroo = {
                opt: node.opt,
                NodeType: node.NodeType
            }
            let nData = this.onStep(node, data)
            if(nData){
                data = <rSu.bsMap>nData
            }
        }
        return data
    }
    /**
     * 保存，且获取数据
     * 
     * @memberof WorkerEditor
     */
    save(){
        var stepStru: any[] = []
        Util.each(this.nodeDick, (code: string, node: rSu.Node) => {
            stepStru.push(this.step(node))
        })
        var _srroo: rSu.bsMap = {},
            line: rSu.bsMap = {}
        // 连线
        Util.each(this.connDick, (cd: string, ist: rSu.Node) => {
            line[cd] = {
                data: ist.data(),
                NodeType: ist.NodeType,
                opt: ist.opt
            }
        })
        _srroo = {line}
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
        Util.each(step, (i: number, _step: rSu.Step) => {
            let {code} = _step,
                srroo = _step._srroo
            // 节点生成
            let $node = this.ndMer.make(srroo.NodeType, srroo.opt)
                .creator()
                .moveable({
                    afterUpd: function(x: number, y: number, node: rSu.Node){
                        $this._lineMoveSync(x, y, node)
                    }
                })
            // 保存到字典中
            $node.data('_code', code)
            this._nodeBindEvt($node)
            $this.nodeDick[code] = $node
        })

        // 连线生成处理
        // console.log(_srroo.line)
        Util.each(_srroo.line, (cd: string, ln: rSu.bsMap)=>{
            let _data = ln.data
            let $ln = this.ndMer.make(ln.NodeType, ln.opt)
                .creator()
                .moveable({
                    afterUpd: function(x: number, y: number, node: rSu.Node){
                        $this._lineMoveSync(x, y, node)
                    }
                })
            $ln.data('_code', cd)            
            $ln.data(_data)
            
            let fCode = _data.from_code,
                tCode = _data.to_code
            let fIst = this.nodeDick[fCode],
                tIst = this.nodeDick[tCode]

            this._lineBindEvt($ln)
            this.connDick[cd] = $ln

            if(fIst){
                fIst.line(cd)
            }
            if(tIst){
                tIst.line(cd, true)
            }
        })

        // 当前运行的节点
        // 文件加载以后才显示
        let config = this.config,
            rCodes: string| string[] = config.rCodes || null,
            bkg: rSu.bsMap = config.bkg || {},
            ranNodeBkg = bkg.ranNode || '#C1CDCD'                  // 默认值
        if(rCodes){
            rCodes = 'object' == typeof rCodes? rCodes: [rCodes]
            Util.each(rCodes, (idx: number, code: string) => {
                let cnode: rSu.Node
                if(cnode = this.nodeDick[code]){
                    //console.log(cnode)
                    cnode.c.attr('fill', ranNodeBkg)
                }
            })
        }
        return this
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
