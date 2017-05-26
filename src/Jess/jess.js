/**
 * @start 2017年5月26日 星期五
 * @name storage处理
 * @version 0.0.1
 * @author Joshua Coenro
 * @date 20170526
 * @other tsc 学习与实践
 */
var Jess = (function () {
    function Jess(name, sengine) {
        this.name = name;
        this.sengine = sengine;
        this.version = "0.0.1";
        this.descrip = "SessionStorage 和 LocalStorage 对象 v-k数据库";
        this.engine = sengine ? sengine : 'session';
        if (name)
            this.table;
        this.tableJson = {};
    }
    // 设置表名或作用名
    Jess.prototype.setName = function (name) {
        this.table = name;
    };
    // 获取 json 值
    Jess.prototype.getJson = function () {
        var content = "";
        if (this.engine == 'local')
            content = localStorage.getItem(this.table);
        else
            content = sessionStorage.getItem(this.table);
        if (content)
            this.tableJson = JSON.parse(content);
        return this.tableJson;
    };
    // 获取 json 值
    Jess.prototype.getVal = function (key) {
        return this.tableJson[key] ? this.tableJson[key] : this.tableJson[key];
    };
    // 键值是否存在
    Jess.prototype.hasKey = function (key) {
        return this.tableJson[key] ? true : false;
    };
    Jess.prototype.setVal = function (key, value) {
        this.tableJson[key] = value;
        this.save(this.tableJson);
    };
    Jess.prototype.delVal = function (key) {
        if (this.tableJson[key]) {
            delete (this.tableJson[key]);
            this.save(this.tableJson);
        }
    };
    Jess.prototype.save = function (data) {
        if (this.engine == 'local')
            localStorage.setItem(this.table, JSON.stringify(data));
        else
            sessionStorage.setItem(this.table, JSON.stringify(data));
    };
    Jess.prototype.value = function (key, value) {
        if (typeof (value) == 'undefined') {
            return this.delVal(key);
        }
        else if (value) {
            return this.setVal(key, value);
        }
        else {
            return this.getVal(key);
        }
    };
    return Jess;
}());
