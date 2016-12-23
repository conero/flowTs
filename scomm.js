/**
 * 跨文档消息通信 Communication API
 * XMLHttpRequest Level 2
 */
function Scomm(){
    var url,
        XHR = new XMLHttpRequest
    this.init = function(configure){
        if(configure['url']) url = configure['url']
    }
    /**
     * window.open
     */
    this.open = function(url){
        window.open(url)
    }
    /**
     * Frame 发送信息
     */
    this.postMsg = function(data,url){
        chatFrame.contextWindow.postMessage(data,url);
    }
}