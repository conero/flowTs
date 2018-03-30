/**
 * 2018年3月30日 星期五
 * Object 类型扩展类
 */

export default class ObjX{
    protected jsonObj: rSu.bsMap
    constructor(jsonObj: rSu.bsMap){
        if('object' == typeof jsonObj && !(jsonObj instanceof Array)){
            this.jsonObj = jsonObj
        }else{
            this.jsonObj = {}
        }
    }
    /**
     * 参数获取
     * @param key 
     * @param def 
     */
    get(key: any, def?:any): any{
        if('undefined' != typeof this.jsonObj[key]){
            return this.jsonObj[key]
        }else{
            return def
        }
    }
    // 设置值
    set(key: any, value: any): this{
        this.jsonObj[key] = value
        return this
    }
    // 获取值
    static value(json: rSu.bsMap, key: any, def?: any): any{
        if('object' == typeof json){
            return 'undefined' == typeof json[key]? def : json[key]
        }
        return def
    }
}