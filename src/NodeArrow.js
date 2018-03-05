/**
 * 2018年1月6日 星期六
 * 连接类型： 箭头
 */

class NodeArrow{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        this.NodeType = 'arrow'
        this.instance = instance
        this.opt = {}           // 配置信息数据
        this.position = {}      // 连接点
        /*
            {from: A/B/C/D, to: A/B/C/D}
        */
    }
    /**
     * 画箭头，p1 开始位置,p2 结束位置, r前头的边长
     * @param {*} p1 [x,y]
     * @param {*} p2 [x,y]
     * @param {*} r  
     */
    create(p1, p2, r){
        this.opt = {
            p1, p2, r
        }
        // 非同 x 线
        var points = this.getPoints()
        this.c = this.instance.path(
            'M' + p1[0] + ',' + p1[1] + 
            'L' + p2[0] + ',' + p2[1] + 
            'L' + points.cP.x + ',' + points.cP.y + 
            'L' + points.dP.x + ',' + points.dP.y + 
            'L' + p2[0] + ',' + p2[1]
        )
    }
    // 获取点序列
    getPoints(p1, p2, r){
        var opt = this.opt
        if(!p1){
            p1 = opt.p1
        }
        if(!p2){
            p2 = opt.p2
        }
        if(!r){
            r = opt.r
        }
        var atan = Math.atan2(p1[1] - p2[1], p2[0] - p1[0]) * (180 / Math.PI);

        var centerX = p2[0] - r * Math.cos(atan * (Math.PI / 180));
        var centerY = p2[1] + r * Math.sin(atan * (Math.PI / 180));

        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));
        return {
            cP: {x:x2, y:y2},
            dP: {x:x3, y:y3}
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
        if(!p1){
            p1 = opt.p1
        }
        if(!p2){
            p2 = opt.p2
        }
        if(!r){
            r = opt.r
        }
        var points = this.getPoints(p1, p2, r)
        this.c.attr('path', [
            ['M', p1[0], p1[1]],
            ['L', p2[0], p2[1]],
            ['L', points.cP.x, points.cP.y],
            ['L', points.dP.x,  points.dP.y],
            ['L', p2[0], p2[1]]
        ])
        // 同步更新记录
        this.opt = {
            p1, p2, r
        }
    }
}

export default NodeArrow