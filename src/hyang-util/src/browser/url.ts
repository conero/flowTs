export default {
    // $_GET// URL 解析
	// fname=RDpccGhwc2VydmVyXGFwcFxjb25lcm9cRmlsZXMvX19jYWNoZS9iNjAzYWY1Yzk1NWM1NmYxNGI0ZDYyMzg3MzE3Yzg2NQ== 解析失败
	/**
	 * 解析 url 地址中的 GET 参数
	 * @param {string|undefind} key 键值
	 * @param {string|undefined} url 为空时默认为 location.search
	 * @return {string|JSON}
	 */
    getQuery(key, url){
        if('#' == key){
			var href = url? url: location.href;
			if(href.indexOf('#')>-1){
				var arr = href.split('#');
				return arr[1];
			}
			return '';
		}
		var ser = location.search;
		if(url){
			var idx = url.indexOf('?');
			ser = idx > -1? url.substr(idx): false;
		}
		if(ser){
			ser = ser.replace('?','');
			ser = ser.replace(new RegExp('=','g'),'":"');
			ser = ser.replace(new RegExp('&','g'),'","');
			ser = '{"'+ser+'"}';
			var GET = JSON.parse(ser);
			if(key){
				if(GET[key]) return GET[key];
				return '';
			}
			return GET;
		}
		return '';
    }
}