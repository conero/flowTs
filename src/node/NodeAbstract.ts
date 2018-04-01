import { Util } from "../util";

/**
 * 2018年3月26日 星期一
 * 抽象节点
 */
///<reference path="../../index.d.ts"/>
///<reference path="../types/raphael.ts"/>
///<reference path="../types/jquery.ts"/>

// declare var $: jQuery
// declare var $: jquery
    // BUG[180331]  <reference path="../types/jquery.ts"/> 无效
declare var $: any


/**
 * @export
 * @abstract
 * @class NodeAbstract
 */
export default abstract class NodeAbstract{
    fromLine: NodeAbstract[]    // 起点连线
    toLine: NodeAbstract[]      // 终点连线
    NodeType: string            // 节点类型
    opt: rSu.NodeOpt            // 节点选项
    label?: RaphaelElement      // 标签元素
    c?: RaphaelElement          // 容器元素
    paper: RaphaelPaper         // Raphael 绘制对象器
    isSelEd: boolean            // 选中标记

    // 审核、合并
    xRate?: number           // 移除边框百分比
    inlinesEle?: RaphaelElement[]    // 合并
    inlineEle?: RaphaelElement // 并行
    tRElem: rSu.MapRElm        // 临时类集合
    protected _dataQueueDick: rSu.bsMap
    protected _code: string

    constructor(paper: RaphaelPaper, opt?: rSu.NodeOpt){
        this.tRElem = {}
        this._dataQueueDick = {}
        this.isSelEd = false
        this.paper = paper
        // 连接线起点获取终点
        this.fromLine = []
        this.toLine = []
        this.NodeType = null            // 节点类型
        // 传入属性时，设置目前的对象
        if(opt){
            this.opt = opt
        }
        this._onInit()
    }
    /**
     * @param {string|number} key _code 特殊属性
     * @param {*} value 
     */
    data(key:any, value?:any): any{
        if('undefined' == typeof value){
            return this._dataQueueDick[key]
        }else{
            this._dataQueueDick[key] = value
            // 特殊处理，保持 code 只读，首次写入时保存
            if(!this._code && key == '_code'){
                this._code = value
            }
        }
        return this
    }
    /**
     * 获取代码，使之只读
     */
    get code():string{
        return this._code
    }
    /**
     * 节点生成器，外部可访问接口
     * @param opt 
     */
    creator(opt?: rSu.NodeOpt){
        this._whenCreatorEvt()
        return this
    }
    /**
     * 点连线装换为path字符串
     * @param {array} pQue 
     * @param {bool} isClose 
     * @returns {string}
     */
    protected _ps2Path(pQue: rSu.P[], isClose?: boolean): string{
        var path = ''
        for(var i=0; i<pQue.length; i++){
            path += (path? 'L': 'M') + pQue[i].x + ',' + pQue[i].y
        }
        if(isClose){
            path += 'Z'
        }        
        return path
    }
    /**
     * 点连线转换为字符串数组
     * @param {array} pQue 
     * @param {bool} isClose 
     * @returns {string}
     */
    protected _ps2PathAttr(pQue: rSu.P[], isClose?: boolean){
        var pArr: any[] = []
        for(var i=0; i<pQue.length; i++){
            var cPArr: any[] = ['L']
            if(pArr.length == 0){
                cPArr[0] = 'M'
            }
            cPArr.push(pQue[i].x, pQue[i].y)
            pArr.push(cPArr)
        }
        if(isClose){
            pArr.push(['Z'])
        }        
        return pArr
    }
    /**
     * 创建事件时，处理事件
     */
    protected _whenCreatorEvt(){}
    /**
     * 节点初始化 [接口]
     */
    protected _onInit(){}
    /**
     * 节点拖动以后处理，调用拖动以后 [接口]
     */
    onDrag(){}
    /**
     * 记录连接线
     * @param {stirng} type 连接线类型
     * @param {this}  $node 节点实例
     */
    recordLine(type: string, $node: any){
        if('from' == type){
            this.fromLine.push($node)
        }
        else if('to' == type){
            this.toLine.push($node)
        }
    }
    /**
     * 同步处理连线
     * @param {function} callback 
     */
    syncLineMove(callback: any){
        if('function' !== typeof callback){
            callback = (instance: any, type: any) => {}
        }
        // 直线同步移动
        var fLines = this.fromLine        
        var tLines = this.toLine
        // 起点列表处理
        for(var i=0; i<fLines.length; i++){
            var $fC = fLines[i].c
            var $fPath = $fC.attr('path')
            callback($fC, 'from', fLines[i])
        }
        // 终点列表处理
        for(var j=0; j<tLines.length; j++){
            var $tC = tLines[j].c
            callback($tC, 'to', tLines[j])
        }
    }
    /**
     * 公共接口化
     * NodeBase struct to json 对象， 用于生产节点中 “struct” 的数据结构
     * @returns {object}
     */
    toJson(){
        var _struct: Flower.StepStru = {
            NodeType: this.NodeType,            // 节点类型
            opt: this.opt,                      // 数据属性
            c: {
                attr: this.c.attr()              // 容器属性值
            }            
        }
        if(this.label){                         // 节点标签
            _struct.label = {
                attr: this.label.attr()
            }
        }
        return _struct
    }
    /**
     * 获取两点间的距离
     */
    getPLen(P1: rSu.P, P2: rSu.P): number{
        return Math.pow(
            (Math.pow((P1.x - P2.x), 2) + Math.pow((P1.y - P2.y), 2)),
            1/2
        )
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    protected _updAttr(nOpt: rSu.NodeOpt){
        for(var key in nOpt){
            if('undefined' != typeof this.opt[key]){
                this.opt[key] = nOpt[key]
            }
        }
        return this
    }
    /**
     * 获取文本所在的位置
     */
    protected _getTextPnt(): rSu.P{
        let {cx, cy} = this.opt,
            p = {x: cx + 1, y: cy + 1}
        return p
    }
    /**
     * 节点删除
     */
    delete(){        
        this.c.remove()
        if(this.label){
            this.label.remove()
        }
        if(this.inlineEle){
            this.inlineEle.remove()
        }
        if(this.inlinesEle){
            this.inlinesEle.forEach((ist: RaphaelElement) => {
                ist.remove()
            })
        }
        this.removeBox()
    }
    /**
     * 隐藏
     */
    hide(){
        if(this.c){
            this.c.hide()
        }
        if(this.label){
            this.label.hide()
        }
        // 内部元素
        if(this.inlinesEle){
            this.inlinesEle.forEach((nd) => {
                nd.hide()
            })
        }
        if(this.inlineEle){
            this.inlineEle.hide()
        }
        return this
    }
    /**
     * 显示
     */
    show(){
        if(this.c){
            this.c.show()
        }
        if(this.label){
            this.label.show()
        }
        // 内部元素
        if(this.inlinesEle){
            this.inlinesEle.forEach((nd) => {
                nd.show()
            })
        }
        if(this.inlineEle){
            this.inlineEle.show()
        }
        return this
    }
    /**
     * 节点可移动处理
     * @returns 
     * @memberof NodeAbstract
     */
    moveable(){
        var $this = this;
        this.c.undrag()
        var tP = {cx: 0, cy: 0}
        this.c.drag(
            function(dx: number, dy: number){
                dx += tP.cx
                dy += tP.cy
                $this.updAttr({cx: dx, cy: dy})
                $this.select()
            },
            function(){
                let {cx, cy} = $this.opt
                tP = {cx, cy}
            }
        )
        return $this
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt): rSu.Node{
        return <rSu.Node>this
    }
    /**
     * 事件接口 [生成边框先关的点] 用于连线
     */
    onCreateBoxPnt(rElem: RaphaelElement){}
    /**
     * 选中
     */
    select(): rSu.Node{
        let selMk = false,
            {x, y, width, height} = this.c.getBBox(),
            {paper} = this,
            ist:RaphaelElement 
        
        this.removeBox()
        this.isSelEd = true        
        x -= 4, y -= 4
        width += 8, height += 8
        this.tRElem['box'] = paper.rect(x, y, width, height)
            .attr({
                'stroke': '#0033FF',
                'stroke-width': '0.8'
            })
        // 顺时针： 
        let mx = x + width/2, 
            xx = x + width,
            my = y + height/2,
            xy = y + height,
            ptQue: rSu.bsMap = {
                a: {x, y},             // A
                b: {x: mx, y},         // B
                c: {x: xx, y},         // C
                d: {x: xx, y: my},     // D
                e: {x: xx, y: xy},     // E
                f: {x: mx, y: xy},     // F
                g: {x: x, y: xy},      // G
                h: {x: x, y: my}       // H
            }
        for(var key in ptQue){
            let {x, y} = ptQue[key]
            this.tRElem['__p' + key] = paper.circle(x, y, 2)
                .attr('fill', '#000000')
                .data('pcode', this.code)
                .data('posi', key)
            this.onCreateBoxPnt(this.tRElem['__p' + key])            
        }
        return <rSu.Node>this
    }
    /**
     * 移除历史边框
     */
    removeBox(){
        if(!this.tRElem){
            this.tRElem = {}
        }
        // 移除原边框，重新获取
        if(this.tRElem.box){
            this.tRElem.box.remove()
            delete this.tRElem.box
        }
        for(var key in this.tRElem){
            if(key.indexOf('__p') > -1){
                this.tRElem[key].remove()
                delete this.tRElem[key]
            }
        }
        return this
    }
    /**
     * 放大
     * @param {number} rate 比例 0.05 [0-1]
     */
    zoomOut(rate?: number): rSu.Node{
        rate = rate? rate: 0.05
        var {c, opt} = this
        opt.w = opt.w * (1 + rate)
        opt.h = opt.h * (1 + rate)
        this.updAttr({
            w: opt.w,
            h: opt.h
        })
        this.select()
        return <rSu.Node>this
    }
    /**
     * 首先
     * @param {number} rate 比例 0.05 [0-1]
     */
    zoomIn(rate?: number): rSu.Node{
        rate = rate? rate: 0.05
        var {c, opt} = this
        opt.w = opt.w * (1 - rate)
        opt.h = opt.h * (1 - rate)
        this.updAttr({
            w: opt.w,
            h: opt.h
        })
        this.select()
        return <rSu.Node>this
    }
    /**
     * 方向移动
     * @param {number} rate 比例 0.05 [0-1]
     */
    move(type?: string, rate?: number): rSu.Node{
        rate = rate? rate: 0.05
        var {opt} = this,
            uOpt: rSu.NodeOpt
        type = type? type.toUpperCase() : type
        switch(type){
            case 'T':
                uOpt = {cy: opt.cy * (1 - rate)}
                break
            case 'B':
                uOpt = {cy: opt.cy * (1 + rate)}
                break
            case 'L':
                uOpt = {cx: opt.cx * (1 - rate)}
                break
            case 'R':
                uOpt = {cx: opt.cx * (1 + rate)}
                break
        }
        if(uOpt){
            this.updAttr(uOpt)
            this.select()
        }
        return <rSu.Node>this
    }
    /**
     * 上移
     * @param {number} rate 比例 0.05 [0-1]
     */
    move2T(rate?: number): rSu.Node{
        this.move('T', rate)
        return <rSu.Node>this
    }
    /**
     * 
     * 下移
     * @param {number} rate 比例 0.05 [0-1]
     */
    move2B(rate?: number): rSu.Node{
        this.move('B', rate)
        return <rSu.Node>this
    }
    /**
     * 
     * 下移
     * @param {number} rate 比例 0.05 [0-1]
     */
    move2L(rate?: number): rSu.Node{
        this.move('L', rate)
        return <rSu.Node>this
    }
    /**
     * 
     * 下移
     * @param {number} rate 比例 0.05 [0-1]
     */
    move2R(rate?: number): rSu.Node{
        this.move('R', rate)
        return <rSu.Node>this
    }
}