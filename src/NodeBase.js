/**
 * 2018年1月5日 星期五
 * 基础节点类
 */
class NodeBase{
    constructor(){
        // 连接线起点获取终点
        this.fromLine = []
        this.toLine = []
        this.NodeType = null            // 节点类型
    }    
    // 记录连接线
    recordLine(type, $node){
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
    syncLineMove(callback){
        if('function' !== typeof callback){
            callback = (instance, type) => {}
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
}
export default NodeBase