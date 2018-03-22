/**
 * 2018年1月5日 星期五
 * 基础节点类
 */

// 工作流数据结构 -------------------------------------------------------------------->

declare namespace  Flow{
    // 工作流-步骤-属性
    interface FlowStepAttr{
        col_list?: string[]
        can_revoke?: number
        auth_list?: any
        filter_by?: any
    }
    // 工作流-步骤-属性
    interface FlowStepStru{
        NodeType?: string
        opt?: rSu.NodeOpt
        c?: any
        label?: any
    }
    // 工作流-步骤 数据结构
    interface FlowStepStr{
        code?: string                // 代码
        name?: string                // 名称
        type?: number
        prev?: string
        next?: string
        attr?: FlowStepAttr
        _struct?: FlowStepStru
    }
}

// 工作流数据结构 --------------------------------------------------------------------||

// 图标界面 -------------------------------------------------------------------->

// 画布
declare namespace Dance {
    // 工具栏
    interface Tool{
        containerIst?: any        
        startIst?: any
        startTxtIst?: any
        operaIst?: any
        operaTxtIst?: any
        judgeIst?: any
        judgeTxtIst?: any
        endIst?: any
        endTxtIst?: any
        arrowIst?: any
        arrowTxtIst?: any
        textInst?: any
    }
}
// 界面布局
declare namespace rSu{
    // 坐标点
    interface P{
        x: number
        y: number
    }
    // 节点属性
    interface NodeOpt{
        cx?: number 
        cy?: number 
        w?: number 
        h?: number
        text?: string
    }
}

// 图标界面 --------------------------------------------------------------------||

class NodeBase{
    fromLine: any
    toLine: any
    NodeType: string
    opt: rSu.NodeOpt
    label: any
    c: any
    constructor(){
        // 连接线起点获取终点
        this.fromLine = []
        this.toLine = []
        this.NodeType = null            // 节点类型
    }    
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
        var _struct: Flow.FlowStepStru = {
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
}
export default NodeBase