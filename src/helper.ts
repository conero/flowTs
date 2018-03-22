/**
 * 2018年1月8日 星期一
 * 内部处理类，从 worker.js/flow.js 内部分离
 */
interface numberMap {
    [k: number]: any
}
// 实例索引序列
var instanceIndex = 0
var instanceSource: numberMap = {}     // 实列资源队列

// 内部协助函数(私有)
class H{
    /**
     * 内部函数生成实例
     * @param {*} config 
     */
    static createInstance(config?: any){
        config = 'object' == typeof config? config:{}
        if(!config.dom){
            if(process.env.NODE_ENV !== 'production'){
                console.warn('[Worker] 配置文件无效，缺少 config.dom')
            }
        }
        // 生成 HTML
        if('string' == typeof config.dom){
            config.dom = $(config.dom)
        }
        if(!config.w){
            config.w = parseInt($(window).width() * 1.1)
        }
        if(!config.h){
            config.h = parseInt($(window).height() * 1.1)
        }
        return Raphael(config.dom.get(0), config.w, config.h)
    }
    static onMoveEvt(){}
    static onStartEvt(){}
    static onEndEvt(){}
    /**
     * 内部索引序列
     */
    static getIndex(){
        instanceIndex += 1
        return instanceIndex
    }
    /**
     * 内部资源处理
     * @param {number} index 
     * @param {string|null} key 
     * @param {*} value 
     */
    static src(index: number, key?:any, value?: any){
        if(!instanceSource[index]){
            instanceSource[index] = {}
        }
        var dd = instanceSource[index]
        if('undefined' == typeof key){
            return dd
        }
        if('undefined' == typeof value){
            return dd[key] || null
        }
        dd[key] = value
    }
}

export default H