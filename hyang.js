/**
 * 2016年10月2日 星期日
 * JQuery 风格化浏览器原生API操作法
 */
function hyang(selector){
    var version = "1.0"
    var doc = document
    var con = console
    var _this = this
    this.hyang = function(ele){
        if(_this.String(ele)) ele = doc.querySelector(ele)
        else ele = window
        /**
         * 事件绑定
         */
        this.on = function(event,func){
            doc.addEventListener(event,func)
        }
        this.html = function(xhtml){
           if(_this.nil(xhtml)) return ele.innerHTML
           ele.innerHTML = xhtml
        }
        this.append = function(xhtml){
            var str = this.html()
            str += xhtml
            this.html(str)
        }
       return this 
    }
    /**
     * 载入网站执行
     */
    this.ready = function(func){
        this.on('DOMContentLoaded',func)
    }
    /**
     * 事件绑定函数
     */
    this.on = function(event,func){
        doc.addEventListener(event,func)
    }
    /**
     * 事件解绑
     */
    this.unbind = function(event,func,sel){
        if(selector) sel = selector
        var dom = this.object(sel)? sel:this.query(sel)
        doc.removeEventListener(event,func)
    }
    /**
     * 选择单元元素
     */
    this.query = function(sel){
        return doc.querySelector(sel)
    }
    /**
     * 添加css
     */
    this.addClass = function(className,sel){
        if(selector) sel = selector
        var dom = this.object(sel)? sel:this.query(sel)
        dom.classList.add(className)
    }
    /**
     * 移除css名称
     */
    this.removeClass = function(className,sel){
        if(selector) sel = selector
        var dom = this.object(sel)? sel:this.query(sel)
        dom.classList.remove(className)
    }
    /**
     * 属性操作
     */
    this.attr = function(attrName,sel){
        if(selector) sel = selector
        var dom = this.object(sel)? sel:this.query(sel)
        //if(this.nil(attrName)) return dom.textContent 
        dom.setAttribute = attrName
    }
    /**
     * text 操作以及获取
     */
    this.text = function(txt,sel){
        if(selector) sel = selector
        var dom = this.object(sel)? sel:this.query(sel)
        if(this.nil(txt)) return dom.textContent      
        dom.textContent = txt
    }
    /**
     * html 操作以及获取
     */
    this.html = function(xhtml,sel){
        if(selector) sel = selector
        //var dom = this.query(sel)
        var dom = this.object(sel)? sel:this.query(sel)
        if(this.nil(xhtml)) return dom.innerHTML
        dom.innerHTML = xhtml
    }
    /**
     * 选择多元素
     */
    this.queryAll = function(sel){
        return doc.querySelectorAll(sel)
    }
    /**
     * 封装 console.log
     */
    this.log = con.log
    /**
     * 检测为undefined
     * nil 为 undefined；命名方式仿造 golang
     */
    this.nil = function(value){
        if(typeof(value) == 'undefined') return true
        return false
    }
    /**
     * 检测是否为object
     */
    this.object = function(value){
        if(typeof(value) == 'object') return true
        return false
    }
    /**
     * 检测是否为string
     */
    this.String = function(value){
        if(typeof(value) == 'string') return true
        return false
    }
}
window.hy = new hyang