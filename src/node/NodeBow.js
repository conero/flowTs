/**
 * 2018年1月23日 星期二
 * 弓形箭头
 */
/**
 * 
 * 
 * @class NodeBow
/**
 * 
 * 
 * @class NodeBow
 */
class NodeBow{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        this.NodeType = 'bow'
        this.instance = instance
        this.opt = {}           // 配置信息数据
        this.position = {}      // 连接点
        /*
            {from: A/B/C/D, to: A/B/C/D}
            this.arrow = 箭头实例
            this.body = 箭体实例
        */
    }
    /**
     * 弓形箭头创建
     * @param {*} opt   {r: 直径, queue:[点队列]}
     */
    create(opt){
        this.opt = opt
        this.queueCheck()
        this.bodySharp()
        this.arrowSharp()
    }
    /**
     * 箭头
     */
    arrowSharp(){
        var opt = this.opt
        var pointQue = opt.queue
        var r = opt.r? opt.r: 5
        var len = pointQue.length
        var p2 = pointQue[len - 1]
        var p1 = pointQue[len - 2]

        // 系统
        var atan = Math.atan2(p1.y - p2.y, p2.x - p1.x) * (180 / Math.PI);
        var centerX = p2.x - r * Math.cos(atan * (Math.PI / 180));
        var centerY = p2.y + r * Math.sin(atan * (Math.PI / 180));

        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));

        if(!this.arrow){
            this.arrow = this.instance.path(
                'M' + p2.x + ',' + p2.y +
                // 箭头体
                'L' + x2 + ',' + y2 + 
                'L' + x3 + ',' + y3 + 
                'L' + p2.x + ',' + p2.y
            )
        }
        else{
            this.arrow.attr('path', [
                ['M', p2.x, p2.y],
                // 箭头体
                ['L', x2, y2],
                ['L', x3, y3],
                ['L', p2.x, p2.y]
            ])
        }
    }
    /**
     * 键体
     */
    bodySharp(){
        var queue = this.opt.queue
        var pathStr = ''
        var pathArr = []
        var hasInstance = false,
            isM = true
        hasInstance = this.c? true: false

        for(var i=0; i<queue.length; i++){
            var que = queue[i]
            if(hasInstance){
                if(isM){
                    if(pathArr.length > 0){
                        isM = false
                    }
                }
                pathArr.push([isM? 'M':'L', que.x, que.y])
            }else{
                pathStr += (pathStr? 'L':'M') + ',' + que.x + ',' + que.y
            }
        }
        if(hasInstance){
            this.c.attr('path', pathArr)
        }
        else{            
            this.c = this.instance.path(pathStr)
        }
    }
    /**
     * 点队列检测
     */
    queueCheck(){
        var queue = this.opt.queue
        // 双点检测  “ 7 形 ”
        if(queue.length == 2){
            var middlePoint = []
            var p1 = queue[0],
                p2 = queue[1]
            if(p1.x < p2.x){
                middlePoint.push({x:p2.x, y:p1.y})
            }
            else if(p1.x > p2.x){
                // 20 @issue 需要可配置接口
                middlePoint.push({x:p1.x, y:p2.y-20})
                middlePoint.push({x:p2.x, y:p2.y-20})
            }
            this.opt.queue = [p1].concat(middlePoint, p2)
        }
    }
    /**
     * 更细记录表
     * @param {*} p1 
     * @param {*} p2 
     * @param {*} r 
     */
    updatePath(p1, p2, r){
        var opt = this.opt
        if(p1){
            opt.queue[0] = {x:p1[0], y:p1[1]}
        }
        if(p2){
            var len = opt.queue.length - 1
            opt.queue[len] = {x:p2[0], y:p2[1]}
        }

        // 自适应的星形状变化
        this.queueCheck()
        this.bodySharp()
        this.arrowSharp()
    }
}

export default NodeBow