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
import { Util } from "../util"
import {cNode} from '../confNode'
import NodeUtil from "./NodeUtil";


/**
 * @export
 * @abstract
 * @class NodeAbstract
 */
export default abstract class NodeAbstract{
    conLns: {
        from?: string[]    // [code: string] 
        to?: string[]
    }
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
        this.conLns = {
            from: [],
            to: []
        }
        this.tRElem = {}
        this._dataQueueDick = {}
        this.isSelEd = false
        this.paper = paper
        this.NodeType = null            // 节点类型
        // 传入属性时，设置目前的对象
        if(opt){
            opt.bkgMagnetic = opt.bkgMagnetic || '#FF0000'
            let features = opt.features || {}
            this.opt = opt
        }        
        this._onInit()
    }    
    /**
     * 特征值处理
     * @param {string|object} key 
     * @param {*} value 
     * @param {*} def  默认值，默认时会自动设置参数
     */
    feature(key: string|rSu.bsMap, value?: any, def?: any): rSu.Node|any{
        let feature = this.opt.features || {}
        if(!value){
            if('object' == typeof key){
                return null
            }
            let gValue = feature[key] || null
            if(def && !gValue){
                feature[key] = def
                this.opt.features = feature
                return def
            }
            return gValue
        }else{
            if('object' == typeof key){
                feature = Util.jsonMerge(feature, key)
            }
            else{
                feature[key] = value
            }
            this.opt.features = feature
            return <rSu.Node>this
        }
    }
    /**
     * @param {string|number|object} key _code 特殊属性
     * @param {*} value 
     */
    data(key?:any, value?:any): any{        
        if('undefined' == typeof value){
            if('undefined' == typeof key){
                return Util.clone(this._dataQueueDick)
            }
            else if('object' == typeof key){
                Util.each(key, (k: any, v: any) => {
                    this._dataQueueDick[k] = v
                })
                return this
            }
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
     * 获取 name 做处理判断
     * @readonly
     * @type {string}
     * @memberof NodeAbstract
     */
    get name(): string{
        let txt = this.opt.text || ''
        if(txt && txt.indexOf('\n') > -1){
            txt = txt.replace(/\n/g, '')
        }
        return txt
    }
    /**
     * 键值， { cNode } = confNode 映射
     * @readonly
     * @type {string}
     * @memberof NodeAbstract
     */
    get _key(): string{
        let nt = this.NodeType
        if(nt.indexOf('_') > -1){
            let aStr = nt.split('_')
            Util.each(aStr, (idx: number, v: string) => {
                if(idx > 0){
                    v = v.substr(0, 1).toLocaleUpperCase() + v.substr(1)
                    aStr[idx] = v
                }
            })
            nt = aStr.join('')
        }
        return nt
    }
    /**
     * 获取类型
     * @readonly
     * @type {number}
     * @memberof NodeAbstract
     */
    get type(): number{
        let code = this.code,
            attr = cNode[this._key],
            tp: number = attr? attr.type : null
        return tp
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
        return NodeUtil.ps2Path(pQue, isClose)
    }
    /**
     * 点连线转换为字符串数组
     * @param {array} pQue 
     * @param {bool} isClose 
     * @returns {string}
     */
    protected _ps2PathAttr(pQue: rSu.P[], isClose?: boolean){
        return NodeUtil.ps2PathAttr(pQue, isClose)
    }
    /**
     * 连线处理(记录)
     * @param value 参数值
     * @param isEnd 
     */
    line(value: string, isEnd?: boolean): rSu.Node{
        if(isEnd){
            this.conLns.to.push(value)
        }
        else{
            this.conLns.from.push(value)
        }
        return <rSu.Node>this
    }
    /**
     * 移除连接线
     * @param type 
     * @param code 
     */
    rmLine(value: string, isEnd?: boolean): rSu.Node{
        if(value){
            if(isEnd){
                let tLns: string[] = []
                Util.each(this.conLns.to, (k: number, code: string) => {
                    if(code != value){
                        tLns.push(code)
                    }
                })
                this.conLns.to = tLns
            }
            else{
                let fLns: string[] = []
                Util.each(this.conLns.from, (k: number, code: string) => {
                    if(code != value){
                        fLns.push(code)
                    }
                })
                this.conLns.from = fLns
            }
        }
        return <rSu.Node>this
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
     * data => {afterUpd(x, y, $node)}
     * @returns 
     * @memberof NodeAbstract
     */
    moveable(data?: rSu.bsMap): rSu.Node{
        var $this = this;
        data = 'object' == typeof data? data : {}
        this.c.undrag()
        var tP = {cx: 0, cy: 0}
        this.c.drag(
            function(dx: number, dy: number){
                dx += tP.cx
                dy += tP.cy
                $this.updAttr({cx: dx, cy: dy})
                $this.select()
                if(data.afterUpd && 'function' == typeof data.afterUpd){
                    data.afterUpd(dx, dy, $this)
                }
            },
            function(){
                let {cx, cy} = $this.opt
                tP = {cx, cy}
            }
        )
        return <rSu.Node>$this
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt): rSu.Node{
        return <rSu.Node>this
    }    
    /**
     * 文本属性更新
     * 
     * @param {string} [text] 
     * @memberof NodeAbstract
     */
    updTextAttr(text?: string): rSu.Node{
        let {x, y} = this._getTextPnt()
        if(this.label){
            this.label.attr({
                x, y
            })
        }
        // 生成文本
        if(text){
            if(this.label){
                this.label.attr('text', text)
            }else{
                this.label = this.paper.text(x, y, text)
            }
        }
        return <rSu.Node>this
    }
    /**
     * 获取处理以后的边框值
     */
    getBBox(): rSu.BoxAttr{
        let {x, y, width, height} = this.c.getBBox(),
            boxPadding = this.feature('boxPadding', null, 3)
        x -= boxPadding, y -= boxPadding
        width += boxPadding*2, height += boxPadding*2

        // 顺时针： 
        let mx = x + width/2, 
            xx = x + width,
            my = y + height/2,
            xy = y + height,
            ps: rSu.bsMap = {
                a: {x, y},             // A
                b: {x: mx, y},         // B
                c: {x: xx, y},         // C
                d: {x: xx, y: my},     // D
                e: {x: xx, y: xy},     // E
                f: {x: mx, y: xy},     // F
                g: {x: x, y: xy},      // G
                h: {x: x, y: my}       // H
            }
        let attr = {x, y, width, height}
        return {attr, ps}
    }
    /**
     * 磁化核心，基于碰撞以后的坐标点
     * @param px
     * @param py
     */
    magnCore(px: number, py: number): RaphaelElement{
        let bAttr = this.getBBox(),
            {attr, ps} = bAttr,
            {x, y} = attr,
            w = attr.width,
            h = attr.height
        // a-h
        let pt: rSu.P,
            cx1 = x + w/4,
            cx = x + w/2,
            cx2 = x + w*(3/4),
            cy1 = y + w/4,
            cy = y + w/2,
            cy2 = y + w*(3/4),
            posi = null

        if(px <= cx1 && py <= cy1){
            pt = ps.a
            posi = 'a'
        }
        else if((px > cx1 && px < cx2) && py <= cy1){
            pt = ps.b
            posi = 'b'
        }
        else if((px >= cx2) && py <= cy1){
            pt = ps.c
            posi = 'c'
        }
        else if((px >= cx2) && (py > cy1 && py < cy2)){
            pt = ps.d
            posi = 'd'
        }
        else if((px >= cx2) && py >= cy2){
            pt = ps.e
            posi = 'e'
        }
        else if((px > cx1 && px < cx2) && py >= cy2){
            pt = ps.f
            posi = 'f'
        }
        else if((px <= cx1) && py >= cy2){
            pt = ps.g
            posi = 'g'
        }
        else if((px<= cx1) && (py > cy1 && py < cy2)){
            pt = ps.h
            posi = 'h'
        }
        this.clearTmpElem('mc')
        if(pt){
            this.tRElem['mc'] = this.paper
                .circle(pt.x, pt.y, 3)
                .attr('fill', this.opt.bkgMagnetic)
                .data('pcode', this.code)
                .data('posi', posi)
        }
        let rElem: RaphaelElement
        if(this.tRElem['mc']){
            rElem = this.tRElem['mc']
        }
        return rElem
    }
    /**
     * [BUG20180417] 端点拖动以后报错： Uncaught TypeError: Cannot read property 'nextSibling' of null
     * 选中
     */    
    select(): rSu.Node{
        let selMk = false,
            bAttr = this.getBBox(),
            {attr, ps} = bAttr,
            {x, y, width, height} = attr,
            {paper} = this,
            ist:RaphaelElement 
        
        this.removeBox()
        this.isSelEd = true        
        this.tRElem['box'] = paper.rect(x, y, width, height)
            .attr({
                'stroke': '#0033FF',
                'stroke-width': '0.8'
            })        
        for(var key in ps){
            let {x, y} = ps[key]
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
        this.isSelEd = false
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
    /**
     * 底色
     * @param {string} type 空便是默认底色， 
     */
    background(type?: string): rSu.Node{
        if(type){
            type = type.toLowerCase()
        }
        switch(type){
            case 'magn':        // 磁化背景色
                this.c.attr('fill', this.opt.bkgMagnetic)
                break
            default:
                this.c.attr('fill', this.opt.bkg)
        }
        return <rSu.Node>this
    }
    /**
     * 删除节点中的临时节点
     * @param key 
     */
    clearTmpElem(key?: string|Array<string>): rSu.Node{
        if(key){
            let tArr: Array<string> = []
            if('object' == typeof key){
                tArr = key
            }else{
                tArr = [key]
            }
            Util.each(this.tRElem, (k: string, elem: RaphaelElement) => {
                if($.inArray(k, tArr) > -1){
                    elem.remove()
                    delete this.tRElem[k]
                }
            })            
        }else{
            Util.each(this.tRElem, (k: string, elem: RaphaelElement) => {
                elem.remove()
                delete this.tRElem[k]
            })  
        }
        return <rSu.Node>this
    }
    /**
     * 事件接口 [生成边框先关的点] 用于连线
     */
    onCreateBoxPnt(rElem: RaphaelElement){}
    /**
     * 尺寸大小更新
     * @memberof NodeAbstract
     */
    onSize(){}
}