// 公共函数 nspc namespace 命名空间
(function(nspc){    
    function Util(){
        this.createTime = '2017年3月27日 星期一';
    }
    /**
     * URL 键值获取
     * @times 2017年3月27日 星期一
     * @param {string} key url 中键值
     */
    Util.prototype.getQuery = function(key){
        var strKey = key+'=';
        var href = location.href;
        var idx = href.indexOf(strKey,href);
        if(idx == -1) return '';
        var tmpStr = href.substr(idx);
        if(tmpStr.indexOf('&',tmpStr) > -1) tmpStr = tmpStr.substr(0,tmpStr.indexOf('&',tmpStr));
        tmpStr = tmpStr.substr(tmpStr.indexOf('=',tmpStr)+1);
        return tmpStr;                
    }
   /**
    * 数组合并
    * @param array1,array2,...
    */
    Util.prototype.ArrayMerge = function(){
		   var args = arguments;
		   var baseArray = args.length > 0? args[0] : [];
		   if(args.length > 1){
			   for(var i=1; i<args.length; i++){
				   var uArr = args[i];
				   for(var j=0; j<uArr.length; j++){baseArray.push(uArr[j]);}
			   }
		   }
		   return baseArray;
	   };
    window.Util = new Util();
})();