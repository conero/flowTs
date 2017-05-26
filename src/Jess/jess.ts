/**
 * @start 2017年5月26日 星期五
 * @name storage处理
 * @version 0.0.1
 * @author Joshua Coenro
 * @date 20170526
 * @other tsc 学习与实践
 */
class Jess{
    version:string;
    descrip:string; // 描述
    engine: string; // session/local
    table:string;
    private tableJson:object;

    constructor(public name, public sengine){
        this.version = "0.0.1";
        this.descrip = "SessionStorage 和 LocalStorage 对象 v-k数据库";
        this.engine = sengine? sengine:'session';
        if(name) this.table;
        this.tableJson = {};
    }
    // 设置表名或作用名
    setName(name){
        this.table = name;
    }
    // 获取 json 值
    getJson(){
        var content = "";        
        if(this.engine == 'local') content = localStorage.getItem(this.table);
        else content = sessionStorage.getItem(this.table);
        if(content) this.tableJson = JSON.parse(content);
        return this.tableJson;
    }
    // 获取 json 值
    getVal(key){
        return this.tableJson[key]? this.tableJson[key]:this.tableJson[key];
    }
    // 键值是否存在
    hasKey(key){
        return this.tableJson[key]? true:false;
    }
    setVal(key,value){
        this.tableJson[key] = value;
        this.save(this.tableJson);
    }
    delVal(key){
        if(this.tableJson[key]){
            delete(this.tableJson[key]);
            this.save(this.tableJson);
        }
    }
    save(data:object){
        if(this.engine == 'local') localStorage.setItem(this.table,JSON.stringify(data));
        else sessionStorage.setItem(this.table,JSON.stringify(data));
    }
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