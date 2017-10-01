/**
 * ajax 封装 Uymas
 * 2017年10月1日 星期日
 * XMLHttpRequest -> https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */


 /**
  * 普通请求方法
  * @class Uymas
  */
 class Uymas{
     constructor(){
     }
     /**
      * 
      * @param {JOSN} options {method}
      * @memberof Uymas
      */
     ajax(options){
         var xtq = new XMLHttpRequest();
         if(options.load){
            options.load = function(){};
         }
         if(options.error){
            options.error = function(){};
         }
         if('undefined' == typeof options.async) options.async = false;
         xtq.addEventListener('load', options.load);
         xtq.addEventListener('error', options.error);
         var url = options.url;
         xtq.open(options.method, url, options.asyn);
         xtq.send();
     }
     /**
      * @param {string} url 
      * @param {function} loadFn 
      * @param {function} errorFn 
      * @memberof Uymas
      */
     get(url, loadFn, errorFn){
        var options = {
            method: 'get',
            url: url,
            'load': loadFn
        }; 
        if(errorFn){
            options.error = errorFn;
        }
        this.ajax(options);
     }
     /**
      * 
      * @param {string} url 
      * @param {JSON|null} data 
      * @param {function} loadFn 
      * @param {function} errorFn 
      * @memberof Uymas
      */
     post(url, data, loadFn, errorFn){
        var options = {
            method: 'post',
            url: url,
            'load': loadFn
        }; 
        if(errorFn){
            options.error = errorFn;
        }
        this.ajax(options);
     }
 }

 /**
  * promise 封装法
  * @class UymasPromise
  */
 class UymasPromise{
    constructor(){
    }
    /**
     * 
     * @param {JOSN} options {method}
     * @memberof Uymas
     */
    ajax(options){
        var xtq = new XMLHttpRequest();
        if(options.load){
           options.load = function(){};
        }
        if(options.error){
           options.error = function(){};
        }
        if('undefined' == typeof options.async) options.async = false;
        xtq.addEventListener('load', options.load);
        xtq.addEventListener('error', options.error);
        var url = options.url;
        xtq.open(options.method, url, options.asyn);
        xtq.send();
    }
    /**
     * @param {string} url 
     * @param {function} loadFn 
     * @param {function} errorFn 
     * @memberof Uymas
     */
    get(url){
        $instance = this;
        return new Promise(function(resolve, reject){
            var options = {
                method: 'get',
                url: url,
                load: function(){
                    resolve(this);
                },
                error: function(){
                    reject(this);
                }
            }; 
            $instance.ajax(options);
        });
    }
    /**
     * 
     * @param {string} url 
     * @param {JSON|null} data 
     * @param {function} loadFn 
     * @param {function} errorFn 
     * @memberof Uymas
     */
    post(url, data, loadFn, errorFn){
       return new Promise(function(resolve, reject){
           var options = {
               method: 'post',
               url: url,
               load: function(){
                   resolve(this);
               },
               error: function(){
                   reject(this);
               }
           }; 
           $instance.ajax(options);
       });
    }
}