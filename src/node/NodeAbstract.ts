/**
 * 2018年3月26日 星期一
 * 抽象节点
 */
///<reference path="../../index.d.ts"/>
///<reference path="../types/raphael.ts"/>
/**
 * 
 * 
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
    constructor(paper: RaphaelPaper, opt?: rSu.NodeOpt){
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
     * 节点删除
     * @returns {boolean}
     */
    delete(): boolean{
        return false
    }
    /**
     * 节点可移动处理
     * @returns 
     * @memberof NodeAbstract
     */
    moveable(){
        return this
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt): any{
        return this
    }
}