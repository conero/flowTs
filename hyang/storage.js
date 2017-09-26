/**
 * 2017年9月26日 星期二
 * ES6 版 storage 扩展
 */

// 储存器
class SusannaStorage{
    /**
     * @param {string|null} ns 命名空间，为空时值全局变量
     * @param {string} dirver SESSION/LOCAL
     * @param {bool} noDecode 不进行base64 编码
     */
    constructor(ns, dirver, noDecode){
        this.dirver = dirver || 'session'
        if(this.dirver) this.dirver = this.dirver.toUpperCase()
        this.ns = ns || null
        this.noDecode = noDecode || true

        // 值获取       
        this.rawJson = this.GetRawJson()
    }
    /**
     * @param {string} key 
     * @param {any} def 
     */
    Get(key, def){
        def = def || null
        if(this.ns){
            return key? this.rawJson[key] || def : this.rawJson
        }
        return (('SESSION' == this.dirver)? sessionStorage.getItem(key): localStorage.getItem(key)) || def
    }
    hasKey(key){
    }
    /**
     * 链式后去值
     * @param {string} key 
     * @param {function} callback 
     * @return {SusannaStorage}
     */
    GetCallback(key, callback){
        if(key){
            var value = this.Get(key, false)
            if(false !== value && 'function' == typeof callback){
                callback(value)
            }
        }
        return this
    }
    /**
     * 设置值，可作为链式调用
     * @param {string} key 
     * @param {any} value 
     * @param {bool} commit 
     * @return {SusannaStorage}
     */
    Set(key, value, commit){
        var json = ('object' == typeof key)? key: null
        if(null === json){
            json = {}
            json[key] = value
        }
        this.rawJson = Object.assign(this.rawJson, json)
        if(commit){
            this.Save()
        }
        return this
    }
    /**
     * 删除数据
     * @param {string|Array} keys 
     * @param {bool} commit
     * @return {SusannaStorage}
     */
    Del(keys, commit){
        keys = 'object' == typeof keys? keys : [keys]
        for(var i=0; i<keys.length; i++){
            delete this.rawJson[keys[i]]
        }
        if(commit){
            this.Save()
        }
        return this
    }
    /**
     * 获取原始的json值
     * @return {Object}
     */
    GetRawJson(){
        var json = {}
        if(this.ns){
            if('SESSION' == this.dirver){
                var value = sessionStorage.getItem(this.ns)
                if(value){
                    if(!this.noDecode){
                        json = Susanna.base64_decode(value)
                    }
                    json = JSON.parse(value)
                }
            }else{
                var value = sessionStorage.getItem(this.ns)
                if(value){
                    if(!this.noDecode){
                        json = Susanna.base64_decode(value)
                    }
                    json = JSON.parse(value)
                }
            }
        }
        return json
    }
    /**
     * 数据保存
     * @return {bool}
     */
    Save(){
        if(!Susanna.EmptyJson(this.rawJson)){
            console.log(this.rawJson)
            if(this.ns){
                var value = JSON.stringify(this.rawJson)
                if(!this.noDecode){
                    value = Susanna.base64_encode(value)
                }
                if('SESSION' == this.dirver){
                    return sessionStorage.setItem(this.ns, value)
                }else{
                    return localStorage.setItem(this.ns, value)
                }
                
            }
            else{
                for(var k in this.rawJson){
                    if('SESSION' == this.dirver){
                        return sessionStorage.setItem(k, this.rawJson[k])
                    }else{
                        return localStorage.setItem(k, this.rawJson[k])
                    }
                }
            }
        }
        return false
    }
}