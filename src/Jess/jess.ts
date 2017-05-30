/**
 * @start 2017年5月26日 星期五
 * @name storage处理
 * @version 0.0.3
 * @author Joshua Coenro
 * @date 20170530
 * @other tsc 学习与实践
 */
class Jess{
    version:string;
    descrip:string; // 描述
    engine: string; // session/local
    table:string;
    private tableJson:object;
    /**
     * 构造函数
     * @param name 作用域
     * @param sengine 引擎名称
     */
    constructor(public name, public sengine){
        this.version = "0.0.3";
        this.descrip = "SessionStorage 和 LocalStorage 对象 v-k数据库";
        this.engine = sengine? sengine:'session';
        if(name) this.table;
        this.tableJson = this.getJson();
    }
    /**
     * 设置表名或作用名
     * @param name string 设置作用名
     */
    setName(name){
        this.table = name;
    }
    /**
     * 获取作用域下的所有的json数据
     */
    getJson(){
        var content = "";        
        if(this.engine == 'local') content = localStorage.getItem(this.table);
        else content = sessionStorage.getItem(this.table);
        if(content) this.tableJson = JSON.parse(content);
        else this.tableJson = {};
        return this.tableJson;
    }
    /**
     * 获取 key键值下的值
     * @param key string
     * @return mixed
     */
    getVal(key){
        return this.tableJson[key]? this.tableJson[key]:this.tableJson[key];
    }
    /**
     * 检查键值是否存在
     * @param key string
     * @return bool
     */
    hasKey(key){
        return this.tableJson[key]? true:false;
    }
    /**
     * 设置当前的值
     * @param key 
     * @param value 
     */
    setVal(key,value){
        this.tableJson[key] = value;
        this.save(this.tableJson);
    }
    /**
     * 通过键名删除值
     * @param key string
     */
    delVal(key){
        if(this.tableJson[key]){
            delete(this.tableJson[key]);
            this.save(this.tableJson);
        }
    }
    /**
     * 保存json值到storage栈内
     * @param data {}
     */
    save(data:object){
        if(this.engine == 'local') localStorage.setItem(this.table,JSON.stringify(data));
        else sessionStorage.setItem(this.table,JSON.stringify(data));
    }
    /**
     * 设置获取于删除值
     * @param key string
     * @param value minxed
     */
    value(key,value){
        if(typeof(value) == 'undefined'){
            return this.delVal(key);
        }else if(value){
            return this.setVal(key,value);
        }else{
            return this.getVal(key);
        }
    }
}