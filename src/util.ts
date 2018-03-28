/**
 * 2018年1月4日 星期四
 * 工具库
 */
// 什么jQuery/RaphaelJs
declare var $: any;
// 抽象类型
interface AbstMap {
    [k: number]: any,
    [k: string]: any
}


class Util{
    /**
     * 对象复制
     * @param {object} t1 
     */
    static clone(t1: object){
        t1 = 'object' == typeof t1? t1:{}
        var obj = {}
        return $.extend(true, obj, t1)
    }
    /**
     * 数据合并相同的元素
     * @param {*} array 
     */
    static ArrayMergeSameValue(array: any[]){
        if('object' == typeof array && array.length && array.length > 1){
            var valueMap: AbstMap = {}
            var newArray = []
            for(var i=0; i<array.length; i++){
                if(valueMap[array[i]]){
                    continue
                }
                newArray.push(array[i])
                valueMap[array[i]] = true
            }
            array = newArray
        }
        return array
    }
    /**
     * @param {array|object} obj 
     * @param {function} callback (k, v)
     */
    static each(obj: any, callback: any){
        if('object' == typeof obj){
            if($.isArray(obj)){
                for(var i=0; i<obj.length; i++){
                    if(false === callback(i, obj[i])){
                        break
                    }
                }
            }else{
                for(var k in obj){
                    if(false === callback(k, obj[k])){
                        break
                    }
                }
            }
        }        
    }
    /**
     * 字符首字母大写切换，test_case => TestCase, longtext => Longtext
     * @param {string} str 
     */
    static ucFirst(str: string, delimter?: string): string{
        delimter = delimter? delimter : '_'
        var strQue: string[] = str.split(delimter)
        strQue.forEach((v: string, idx: number) => {
            strQue[idx] = v.substr(0, 1).toUpperCase() + v.substr(1)
        })
        return strQue.join('')
    }
}

export {Util}