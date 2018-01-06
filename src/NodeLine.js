/**
 * 2018年1月5日 星期五
 * 连接类型： 连线
 */

class NodeLine{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        this.instance = instance
        this.opt = {}       // 配置信息数据
    }
    create(p1, p2){
        this.opt = {
            p1, p2
        }
        this.c = this.instance.path(
            'M' + p1[0] + ',' + p1[1] + 
            'L' + p2[0] + ',' + p2[1]
        )
    }
}

export default NodeLine