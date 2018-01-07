/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Util; });
/**
 * 2018年1月4日 星期四
 * 工具库
 */
class Util{
    /**
     * 对象复制
     * @param {object} t1 
     */
    static clone(t1){
        t1 = 'object' == typeof t1? t1:{}
        var obj = {}
        return $.extend(true, obj, t1)
    }
    /**
     * 数据合并相同的元素
     * @param {*} array 
     */
    static ArrayMergeSameValue(array){
        if('object' == typeof array && array.length && array.length > 1){
            var valueMap = {}
            var newArray = []
            for(var i=0; i<array.length; i++){
                if(valueMap[array[i]]){
                    continue
                }
                newArray.push(array[i])
                valueMap[array[i]] = true
            }
            array = newArray
        }
        return array
    }
    /**
     * @param {array|object} obj 
     * @param {function} callback (k, v)
     */
    static each(obj, callback){
        if('object' == typeof obj){
            if($.isArray(obj)){
                for(var i=0; i<obj.length; i++){
                    if(false === callback(i, obj[i])){
                        break
                    }
                }
            }else{
                for(var k in obj){
                    if(false === callback(k, obj[k])){
                        break
                    }
                }
            }
        }        
    }
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年1月5日 星期五
 * 基础节点类
 */
class NodeBase{
    constructor(){
        // 连接线起点获取终点
        this.fromLine = []
        this.toLine = []
    }    
    // 记录连接线
    recordLine(type, $node){
        if('from' == type){
            this.fromLine.push($node)
        }
        else if('to' == type){
            this.toLine.push($node)
        }
    }
    /**
     * 同步处理取现
     * @param {function} callback 
     */
    syncLineMove(callback){
        if('function' !== typeof callback){
            callback = (instance, type) => {}
        }
        // 直线同步移动
        var fLines = this.fromLine        
        var tLines = this.toLine
        // 起点列表处理
        for(var i=0; i<fLines.length; i++){
            var $fC = fLines[i].c
            var $fPath = $fC.attr('path')
            callback($fC, 'from', fLines[i])
        }
        // 终点列表处理
        for(var j=0; j<tLines.length; j++){
            var $tC = tLines[j].c
            callback($tC, 'to', tLines[j])
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (NodeBase);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_worker__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frp1000c_v1__ = __webpack_require__(11);
/**
 * 2018年1月7日 星期日
 * 直线来连接式工作流
 */




$(function(){
    var $worker = new __WEBPACK_IMPORTED_MODULE_0__src_worker__["a" /* default */]({
        dom: '#workflow',
        h: $(window).height() * 6
    }, __WEBPACK_IMPORTED_MODULE_1__frp1000c_v1__["a" /* Cfg */])
})

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flow__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/**
 * 2018年1月5日 星期五
 * 工作流处理包
 */



// 实例索引序列
var instanceIndex = 0
var instanceSource = {}     // 实列资源队列

// 内部协助函数(私有)
class H{
    /**
     * 内部函数生成实例
     * @param {*} config 
     */
    static createInstance(config){
        config = 'object' == typeof config? config:{}
        if(!config.dom){
            if(process.env.NODE_ENV !== 'production'){
                console.warn('[Worker] 配置文件无效，缺少 config.dom')
            }
        }
        // 生成 HTML
        if('string' == typeof config.dom){
            config.dom = $(config.dom)
        }
        if(!config.w){
            config.w = parseInt($(window).width() * 1.1)
        }
        if(!config.h){
            config.h = parseInt($(window).height() * 1.1)
        }
        return Raphael(config.dom.get(0), config.w, config.h)
    }
    static onMoveEvt(){}
    static onStartEvt(){}
    static onEndEvt(){}
    /**
     * 内部索引序列
     */
    static getIndex(){
        instanceIndex += 1
        return instanceIndex
    }
    /**
     * 内部资源处理
     * @param {number} index 
     * @param {string|null} key 
     * @param {*} value 
     */
    static src(index, key, value){
        if(!instanceSource[index]){
            instanceSource[index] = {}
        }
        var dd = instanceSource[index]
        if('undefined' == typeof key){
            return dd
        }
        if('undefined' == typeof value){
            return dd[key] || null
        }
        dd[key] = value
    }
}

/**
 * 工作流实例类
 */
class Worker{
    /**
     * @param {object} option  工作流配置对象
     * @param {object} config  dom 等相关配置 *
     */
    constructor(config, option){
        // 开发环境检测
        if (process.env.NODE_ENV !== 'production') {
            if(!window.$){
                console.warn('jQuery 依赖为安装，运行库将无法运行')
            }
            if(!window.Raphael){
                console.warn('Raphael 依赖为安装，运行库将无法运行')
            }
        }
        this.$index = H.getIndex()
        // 工作流实例
        this.Nodes = {}
        this.config = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].clone(config)
        this.$raphael = H.createInstance(this.config)
        this.$flow = new __WEBPACK_IMPORTED_MODULE_0__flow__["a" /* default */](this.$raphael)        
        this.setOption(option)
        this.draw()
        // console.log(this.config)
    }
    // 绘制工作流图
    draw(){
        if(this.option){            
            var steps = this.option.step
            // 生成代码索引
            this.codeIndex(steps)
            var config = this.config
            // 起点中心坐标点 (x, y)
            var x = config.x || parseInt(config.w * 0.4)
            var y = config.y || 10
            var cH = config.cH || 50    // 容器高度
            var dH = config.dH || 30    // 间距高度
            // 同级别节点字典
            var sameClsNodeMap = {}
            // 获取通节点指向的 Y 值
            var getSameClsNodeY = (_c) =>{
                var _sameClsNode = this.codeIndex(_c)
                var y = null
                if(_sameClsNode && _sameClsNode.length > 0){
                    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(_sameClsNode, (index, value)=>{
                        if(sameClsNodeMap[value]){
                            y = sameClsNodeMap[value].y
                            return false
                        }
                    })
                }
                return y
            }
            /**
             * 获取同一级别节点差集对比数
             * @param {string} _c 
             */
            var getSameClsDiffCount = (_c) =>{
                var _sameClsNode = this.codeIndex(_c)
                var _count = _sameClsNode.length
                var hasEd = 0
                __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(_sameClsNode, (index, value)=>{
                    if(sameClsNodeMap[value]){
                        hasEd += 1
                    }
                })
                return (_count - hasEd)
            }

            // console.log(x ,y)
            for(var i=0; i<steps.length; i++){
                var step = steps[i]
                var code = step.code
                var name = step.name || code
                var nd
                // 开始
                if(1 == step.type){      
                    y += (dH + cH/2)
                    nd = this.$flow.endpoint(x, y, cH/2, name)
                    nd.c.attr('fill', 'rgb(181, 216, 126)')
                    nd.$step = step
                    this.drag(nd)
                    y += cH/2
                    // console.log(nd)
                }
                // 操作节点
                else if(2 == step.type){     
                    var w = 100
                    var sameClsNode = this.codeIndex(step.code)
                    var x0 = x
                    // 只有一个父类
                    if(step.prev){
                        if(step.prev.indexOf(',') == -1){
                            var parentNd = this.getNodeByCode(step.prev)
                            if(parentNd && parentNd.c){
                                console.log(parentNd)
                                x0 = this.getStandX(parentNd)
                            }
                        }
                    }
                    // 多个同级节点
                    if(sameClsNode && sameClsNode.length > 1){
                        var diffCtt = getSameClsDiffCount(code)      
                        var dW = 25                  
                        // 中心偏移量算法
                        var smClsD = Math.ceil(sameClsNode.length/2)
                        var x1 = x0 - w/2
                        var x1 = x0 + (dW + w)*(smClsD - diffCtt)
                        var y1 = getSameClsNodeY(code)
                        if(y1){
                            x1 = x0 + (dW + w)*(smClsD - diffCtt)
                        }else{
                            y += dH + cH/2
                        }
                        y1 = y1? y1: y
                        nd = this.$flow.operation(x1, y1, w, cH, name)
                        sameClsNodeMap[code] = {
                            y
                        }
                    }else{                        
                        y += dH + cH/2
                        nd = this.$flow.operation(x0, y, w, cH, name)
                    }         
                    nd.$step = step
                    this.drag(nd)  
                    nd.c.attr('fill', 'rgb(224, 223, 226)')
                    y += cH/2
                }
                // 判断节点
                else if(3 == step.type){
                    y += dH + cH/2
                    nd = this.$flow.judge(x, y, w+60, cH, name)
                    nd.c.attr('fill', 'rgb(49, 174, 196)')
                    nd.$step = step
                    this.drag(nd)
                    // y += 80 + 20
                    y += cH/2
                    
                }
                // 结束
                else if(9 == step.type){
                    y += dH + cH/2
                    nd = this.$flow.endpoint(x, y, cH/2, name)
                    nd.c.attr('fill', 'rgb(34, 185, 41)')
                    nd.$step = step
                    this.drag(nd)
                }

                if(nd){
                    this.Nodes[step.code] = nd
                    this.line(nd)
                }
            }
        }
    }
    // 移动处理
    drag(nd){
        // 不适用分割号时可能解析语句失败，报错
        var config = this.config;
        (function($nd, conf){
            var $c = $nd.c
            var cDragDt = {}
            $c.drag(
                // onmove
                function(dx, dy){
                    dx += cDragDt.x
                    dy += cDragDt.y
                    $nd.move(dx, dy)
                    // 直线同步移动
                    if(conf.line && conf.line == 'arrow'){
                        $nd.ToSyncArrow(dx, dy)
                    }
                    else{
                        $nd.ToSyncLine(dx, dy)
                    }
                },
                // onstart
                function(){
                    var _x, _y
                    if('circle' == this.type){
                        _x = this.attr('cx')
                        _y = this.attr('cy')
                    }
                    else if('rect' == this.type){
                        _x = this.attr('x')
                        _y = this.attr('y')
                    }
                    else if('path' == this.type){
                        var _path = this.attr('path')
                        var sP1 = _path[0]
                        _x = sP1[1]
                        _y = sP1[2]
                    }
                    cDragDt.x = _x
                    cDragDt.y = _y
                },
                // onend
                function(){}
            )
        })(nd, config)
    }
    // 连线
    line(nd){
        var step = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].clone(nd.$step)
        if(step.prev){
            step.prev = step.prev.replace(/\s/g, '')
        }
        if(step.prev){
            var config = this.config          
            var makerLine = (from, to) => {
                var $lineInstance
                var fromNd = this.getNodeByCode(from)
                var toNd = this.getNodeByCode(to)
                if(fromNd && toNd){
                    if(config.line && 'arrow' == config.line){
                        $lineInstance = this.$flow.arrow(fromNd.getStlnP(), toNd.getEnlnP(), 4)
                        $lineInstance.c.attr('fill', 'rgb(14, 10, 10)')
                    }
                    else{
                        $lineInstance = this.$flow.line(fromNd.getStlnP(), toNd.getEnlnP())
                    }
                    fromNd.recordLine('from', $lineInstance)
                    // fromNd.recordLine('to', $lineInstance)
                    toNd.recordLine('to', $lineInstance)
                }
            }
            var prev
            if(step.prev.indexOf(',') > -1){
                prev = step.prev.split(',')
            }else{
                prev = [step.prev]
            }
            for(var i=0; i<prev.length; i++){
                makerLine(prev[i], step.code)
            }
        }

    }
    /**
     * 设置配置文件信息
     * @param {*} option 
     */
    setOption(option){
        if('object' == typeof option){
            this.option = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].clone(option)
        }
    }
    /**
     * 根据code获取节点信息
     * @param {string} code 
     */
    getNodeByCode(code){
        var node = null
        if(this.Nodes[code]){
            return this.Nodes[code]
        }
        return node
    }    
    /**
     * 代码分级算法
     * @param {object} steps 
     */
    codeIndex(steps){
        // 生成分级字典
        if('object' == typeof steps){
            var clsMap = {}
            for(var i=0; i<steps.length; i++){
                var step = steps[i]
                var code = step.code
                // 第一级
                if(!step.prev){
                    clsMap[code] = 1
                }
                else{
                    var prev = step.prev.replace(/\s/g, '').split(',')
                    for(var j=0; j<prev.length; j++){
                        var prevCode = prev[j]
                        var cls = clsMap[prevCode] ? clsMap[prevCode]: 0
                        console.log(cls)
                        if('object' == typeof cls && cls.length){
                            cls = cls.length == 1? cls[0]: cls
                        }
                        cls += 1
                        if(!clsMap[code]){
                            clsMap[code] = cls
                        }else{
                            if('object' != typeof clsMap[code]){
                                var cls2 = clsMap[code]
                                clsMap[code] = [cls2]
                            }
                            clsMap[code].push(cls)
                            clsMap[code] = __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].ArrayMergeSameValue(clsMap[code])
                        }
                    }
                }
            }
            // console.log(clsMap)
            H.src(this.$index, 'clsMap', clsMap)
        }
        else if(steps){
            var clsMap = H.src(this.$index, 'clsMap')
            if(clsMap){
                var value = clsMap[steps] || null
                var List = [steps]
                for(var k in clsMap){
                    if(value == clsMap[k] && $.inArray(k, List) == -1){
                        List.push(k)
                    }
                }
                return List
            }
            
        }
    }
    /**
     * 节点表单x坐标
     * @param {NodeBase} nd 
     */
    getStandX(nd){
        var x = null
        if(nd && nd.c){
            var $c = nd.c
            switch($c.type){
                case 'circle':
                    x = $c.attr('cx')
                    break
                case 'rect':
                    x = $c.attr('x') + $c.attr('width')/2
                    break
                case 'path':
                    x = nd.opt.cx
                    break
            }
        }
        return x
    }
}


/* harmony default export */ __webpack_exports__["a"] = (Worker);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NodeEndpoint__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NodeOperation__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__NodeJudge__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NodeLine__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__NodeArrow__ = __webpack_require__(10);
/**
 * 2018年1月4日 星期四
 * 工作流引擎, 基于 raphaelJs, 只用于绘制容器以及，拖动事件的相关算法
 */







class Flow{
    /**
     * @param {Raphael} paper 
     */
    constructor(paper){        
        this.paper = paper
    }
    /**
     * 端点(圆别名) , 圆心 和 半径
     * @param {number} cx 
     * @param {number} cy 
     * @param {number} r 
     * @param {string|null} 文本框
     */
    endpoint(cx, cy, r, text){
        var nd = new __WEBPACK_IMPORTED_MODULE_1__NodeEndpoint__["a" /* default */](this.paper)
        nd.create(cx, cy, r, text)
        return nd
    }
    /**
     * 判断节点
     */
    judge(x, y, w, h, text){
        var nd = new __WEBPACK_IMPORTED_MODULE_3__NodeJudge__["a" /* default */](this.paper)
        nd.create(x, y, w, h, text)
        return nd
    }
    /**
     * 操作节点
     */
    operation(x, y, w, h, text){
        var nd = new __WEBPACK_IMPORTED_MODULE_2__NodeOperation__["a" /* default */](this.paper)
        nd.create(x, y, w, h, text)
        return nd
    }
    /**
     * p1 -> p2 的连线
     * @param {*} p1 {x,y} 
     * @param {*} p2 
     */
    line(p1, p2){
        var nd = new __WEBPACK_IMPORTED_MODULE_4__NodeLine__["a" /* default */](this.paper)
        nd.create(p1, p2)
        return nd
    }
    /**
     * p1 -> p2 的连线
     * @param {*} p1 {x,y} 
     * @param {*} p2 
     * @param {number} r
     */
    arrow(p1, p2, r){
        var nd = new __WEBPACK_IMPORTED_MODULE_5__NodeArrow__["a" /* default */](this.paper)
        nd.create(p1, p2, r)
        return nd
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Flow);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NodeBase__ = __webpack_require__(1);
/**
 * 2018年1月5日 星期五
 * 端点处理
 */



class NodeEndpoint extends __WEBPACK_IMPORTED_MODULE_1__NodeBase__["a" /* default */]{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        super()
        this.instance = instance
        this.opt = {}
    }
    /**
     * @param {object} opt / [cx, cy, r, text]
     */
    create(opt){
        // 解析类型
        if('object' != typeof opt){
            var param = arguments
            opt = {
                cx: param[0],
                cy: param[1],
                r: param[2]
            }
            if(param[3]){
                opt.text = param[3]
            }
        }
        this.opt = opt
        // 容器
        this.c = this.instance.circle(opt.cx, opt.cy, opt.r)
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
    }
    // 外部移动坐标处理， 
    move(x, y){
        // 容器移动
        this.c.attr({
            cx: x,
            cy: y
        })
        // 文本联动
        this.label.attr({
            x,y
        })
        /*
        // 直线同步移动
        this.syncLineMove((lnC, type) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                var dP = this.getDp(x, y)
                lnC.attr('path', [
                    ['M', dP.x, dP.y],
                    $fPath[1]
                ])
            }
            else if(type == 'to'){
                var bP = this.getBp(x, y)
                var $tPath = lnC.attr('path')
                lnC.attr('path', [
                    $tPath[0],
                    ['L', bP.x, bP.y]
                ])
            }
        })
        */
    }
    // 直线同步移动
    ToSyncLine(x, y){
        this.syncLineMove((lnC, type) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                var dP = this.getDp(x, y)
                lnC.attr('path', [
                    ['M', dP.x, dP.y],
                    $fPath[1]
                ])
            }
            else if(type == 'to'){
                var bP = this.getBp(x, y)
                var $tPath = lnC.attr('path')
                lnC.attr('path', [
                    $tPath[0],
                    ['L', bP.x, bP.y]
                ])
            }
        })
    }
    // 箭头同步移动
    ToSyncArrow(x, y){
        this.syncLineMove((lnC, type, $ln) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')                
                var dP = this.getDp(x, y)
                $ln.updatePath([dP.x, dP.y])
            }
            else if(type == 'to'){
                var bP = this.getBp(x, y)
                $ln.updatePath(null, [bP.x, bP.y])
            }
        })
    }
    // 获取连线的起点节点
    getStlnP(){
        var p = this.getDp()
        return [p.x, p.y]
    }
    // 获取连线的终点节点
    getEnlnP(){
        var p = this.getBp()
        return [p.x, p.y]
    }
    getAp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.r
        return {x, y}
    }
    getBp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= opt.r
        return {x, y}
    }
    getCp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.r
        return {x, y}
    }
    getDp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += opt.r
        return {x, y}
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeEndpoint);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeBase__ = __webpack_require__(1);
/**
 * 2018年1月5日 星期五
 * 操作处理节点
 */


class NodeOperation extends __WEBPACK_IMPORTED_MODULE_0__NodeBase__["a" /* default */]{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        super()
        this.instance = instance
        this.opt = {}       // 配置信息数据
    }
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */
    create(opt){
        // 解析类型
        if('object' != typeof opt){
            var param = arguments
            opt = {
                cx: param[0],
                cy: param[1],
                w: param[2],
                h: param[3],
            }
            if(param[4]){
                opt.text = param[4]
            }
        }
        this.opt = opt
        // 容器        
        var ap = this.getAp()
        this.c = this.instance.rect(ap.x, ap.y, opt.w, opt.h)
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
    }    
    // 外部移动坐标处理
    move(x, y){
        var ctP = this.getCtpByAp(x, y)
        this.c.attr({
            x, y
        })
        this.label.attr(ctP)
        // 连接线同步处理
        // // 直线同步移动
        // this.syncLineMove((lnC, type) => {
        //     if(type == 'from'){
        //         var $fPath = lnC.attr('path')
        //         // var dP = this.getStlnP()
        //         var bP = this.getBtp(ctP.x, ctP.y)
        //         lnC.attr('path', [
        //             ['M', bP.x, bP.y],
        //             $fPath[1]
        //         ])
        //     }
        //     else if(type == 'to'){
        //         var dP = this.getTp(ctP.x, ctP.y)
        //         var $tPath = lnC.attr('path')
        //         lnC.attr('path', [
        //             $tPath[0],
        //             ['L', dP.x, dP.y]
        //         ])
        //     }
        // })
    }
    // 直线同步移动
    ToSyncLine(x, y){
        var ctP = this.getCtpByAp(x, y)
        // 直线同步移动
        this.syncLineMove((lnC, type) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                // var dP = this.getStlnP()
                var bP = this.getBtp(ctP.x, ctP.y)
                lnC.attr('path', [
                    ['M', bP.x, bP.y],
                    $fPath[1]
                ])
            }
            else if(type == 'to'){
                var dP = this.getTp(ctP.x, ctP.y)
                var $tPath = lnC.attr('path')
                lnC.attr('path', [
                    $tPath[0],
                    ['L', dP.x, dP.y]
                ])
            }
        })
    }
    // 箭头同步移动
    ToSyncArrow(x, y){
        var ctP = this.getCtpByAp(x, y)
        this.syncLineMove((lnC, type, $ln) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')       
                var bP = this.getBtp(ctP.x, ctP.y)         
                $ln.updatePath([bP.x, bP.y])
            }
            else if(type == 'to'){
                var dP = this.getTp(ctP.x, ctP.y)
                $ln.updatePath(null, [dP.x, dP.y])
            }
        })
    }
    // 获取连线的起点节点
    getStlnP(){
        var p = this.getBtp()
        return [p.x, p.y]
    }
    // 获取连线的终点节点
    getEnlnP(){
        var p = this.getTp()
        return [p.x, p.y]
    }
    // 根据 A 点获取 中心点
    getCtpByAp(x, y){
        var opt = this.opt
        x += opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getAp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y -= opt.h/2
        return {x, y}
    }
    getBp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getCp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getDp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y += opt.h/2
        return {x, y}
    }
    getTp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= opt.h/2
        return {x, y}
    }
    getRp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.w/2
        return {x, y}
    }
    getBtp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += opt.h/2
        return {x, y}
    }
    getLp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.w/2
        y += opt.h/2
        return {x, y}
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeOperation);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeBase__ = __webpack_require__(1);
/**
 * 2018年1月5日 星期五
 * 判断处理节点
 */


class NodeJudge extends __WEBPACK_IMPORTED_MODULE_0__NodeBase__["a" /* default */]{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        super()
        this.instance = instance
        this.opt = {}       // 配置信息数据
    }
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */
    create(opt){
        // 解析类型
        if('object' != typeof opt){
            var param = arguments
            opt = {
                cx: param[0],
                cy: param[1],
                w: param[2],
                h: param[3],
            }
            if(param[4]){
                opt.text = param[4]
            }
        }
        this.opt = opt
        // 容器        
        var ap = this.getAp()
        var bp = this.getBp()
        var cp = this.getCp()
        var dp = this.getDp()
        this.c = this.instance.path(
            'M' + ap.x + ',' + ap.y +
            'L' + bp.x + ',' + bp.y +
            'L' + cp.x + ',' + cp.y +
            'L' + dp.x + ',' + dp.y +
            'Z'
        )
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
    }
    // 按照 A 点移动
    move(x, y){
        var ctP = this.getCpByAp(x, y)
        var bP = this.getBp(ctP.x, ctP.y)
        var cP = this.getCp(ctP.x, ctP.y)
        var dP = this.getDp(ctP.x, ctP.y)
        // 容器移动
        this.c.attr('path', [
            ['M', x, y],
            ['L', bP.x, bP.y],
            ['L', cP.x, cP.y],
            ['L', dP.x, dP.y],
            ['Z']
        ])
        // 文本移动
        this.label.attr(ctP)
        // // 直线同步移动
        // this.syncLineMove((lnC, type) => {
        //     if(type == 'from'){
        //         var $fPath = lnC.attr('path')
        //         lnC.attr('path', [
        //             ['M', dP.x, dP.y],
        //             $fPath[1]
        //         ])
        //     }
        //     else if(type == 'to'){
        //         var $tPath = lnC.attr('path')
        //         lnC.attr('path', [
        //             $tPath[0],
        //             ['L', bP.x, bP.y]
        //         ])
        //     }
        // })
    }
    // 直线同步移动
    ToSyncLine(x, y){
        var ctP = this.getCpByAp(x, y)
        var bP = this.getBp(ctP.x, ctP.y)
        var dP = this.getDp(ctP.x, ctP.y)
        this.syncLineMove((lnC, type) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                lnC.attr('path', [
                    ['M', dP.x, dP.y],
                    $fPath[1]
                ])
            }
            else if(type == 'to'){
                var $tPath = lnC.attr('path')
                lnC.attr('path', [
                    $tPath[0],
                    ['L', bP.x, bP.y]
                ])
            }
        })
    }
    // 箭头同步器
    ToSyncArrow(x, y){
        var ctP = this.getCpByAp(x, y)
        var bP = this.getBp(ctP.x, ctP.y)
        var dP = this.getDp(ctP.x, ctP.y)
        this.syncLineMove((lnC, type, $ln) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')                
                $ln.updatePath([dP.x, dP.y])
            }
            else if(type == 'to'){
                $ln.updatePath(null, [bP.x, bP.y])
            }
        })
    }
    // 获取连线的起点节点
    getStlnP(){
        var p = this.getDp()
        return [p.x, p.y]
    }
    // 获取连线的终点节点
    getEnlnP(){
        var p = this.getBp()
        return [p.x, p.y]
    }
    /**
     * 根据 A 点获取中心点
     */
    getCpByAp(x, y){
        var opt = this.opt
        x += opt.w/2
        return {x, y}
    }
    // A 点
    getAp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= (opt.w/2)
        return {x, y}
    }
    getBp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= (opt.h/2)
        return {x, y}
    }
    getCp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += (opt.w/2)
        return {x, y}
    }
    getDp(x, y){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += (opt.h/2)
        return {x, y}
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeJudge);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年1月5日 星期五
 * 连接类型： 连线
 */

class NodeLine{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        this.instance = instance
        this.opt = {}       // 配置信息数据
    }
    create(p1, p2){
        this.opt = {
            p1, p2
        }
        this.c = this.instance.path(
            'M' + p1[0] + ',' + p1[1] + 
            'L' + p2[0] + ',' + p2[1]
        )
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeLine);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年1月6日 星期六
 * 连接类型： 箭头
 */

class NodeArrow{
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance){
        this.instance = instance
        this.opt = {}       // 配置信息数据
    }
    /**
     * 画箭头，p1 开始位置,p2 结束位置, r前头的边长
     * @param {*} p1 [x,y]
     * @param {*} p2 [x,y]
     * @param {*} r  
     */
    create(p1, p2, r){
        this.opt = {
            p1, p2, r
        }
        var points = this.getPoints()
        this.c = this.instance.path(
            'M' + p1[0] + ',' + p1[1] + 
            'L' + p2[0] + ',' + p2[1] + 
            'L' + points.cP.x + ',' + points.cP.y + 
            'L' + points.dP.x + ',' + points.dP.y + 
            'L' + p2[0] + ',' + p2[1]
        )
    }
    // 获取点序列
    getPoints(p1, p2, r){
        var opt = this.opt
        if(!p1){
            p1 = opt.p1
        }
        if(!p2){
            p2 = opt.p2
        }
        if(!r){
            r = opt.r
        }
        var atan = Math.atan2(p1[1] - p2[1], p2[0] - p1[0]) * (180 / Math.PI);

        var centerX = p2[0] - r * Math.cos(atan * (Math.PI / 180));
        var centerY = p2[1] + r * Math.sin(atan * (Math.PI / 180));

        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));
        return {
            cP: {x:x2, y:y2},
            dP: {x:x3, y:y3}
        }
    }
    /**
     * 更细记录表
     * @param {*} p1 
     * @param {*} p2 
     * @param {*} r 
     */
    updatePath(p1, p2, r){
        var opt = this.opt
        if(!p1){
            p1 = opt.p1
        }
        if(!p2){
            p2 = opt.p2
        }
        if(!r){
            r = opt.r
        }
        var points = this.getPoints(p1, p2, r)
        this.c.attr('path', [
            ['M', p1[0], p1[1]],
            ['L', p2[0], p2[1]],
            ['L', points.cP.x, points.cP.y],
            ['L', points.dP.x,  points.dP.y],
            ['L', p2[0], p2[1]]
        ])
        // 同步更新记录
        this.opt = {
            p1, p2, r
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (NodeArrow);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cfg; });
/**
 * 2018年1月4日 星期四
 * 版本信息
 */
var Cfg = {
    "form": {
        "url": "fra5000c#list",
        "args": {
            "listid": {
                "name": "故障流水号",
                "map": "__flow_pk_id"
            }
        },
        "fields": {
            "frp_checker": {
                "name": "选择核实人员",
                "classify": 2,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_user",
                    "notnull": 1,
                    "_user_range": 2
                }
            },
            "frp_check_rpt": {
                "name": "故障核实情况",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "frp_product_model": {
                "name": "产品型号",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "radio",
                    "notnull": 1,
                    "option": {
                        "C": "C",
                        "S": "S",
                        "D": "D",
                        "P": "P"
                    }
                }
            },
            "frp_auditor": {
                "name": "选择审查人员",
                "classify": 2,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_user",
                    "notnull": 1,
                    "_user_range": 4,
                    "_user_rngval": "R7"
                }
            },
            "frp_audit_rpt": {
                "name": "故障审查情况",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "run_fracas": {
                "name": "运行FRACAS",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "switch",
                    "notnull": 1,
                    "switch": "1,0"
                }
            },
            "fas_stru_id": {
                "name": "选择分析单位",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_stru",
                    "notnull": 0,
                    "_stru_range": 2,
                    "_stru_rngval": "A1"
                }
            },
            "fas_uid": {
                "name": "选择分析主办人",
                "classify": 2,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_user",
                    "notnull": 1,
                    "_user_range": 2,
                    "_user_rngval": ""
                }
            },
            "fas_reason_categ": {
                "name": "原因分类",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "chkbox",
                    "notnull": 1,
                    "opt_source": "fas_reason_categ"
                }
            },
            "fas_reason_other": {
                "name": "其他原因描述",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "30",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "text",
                    "notnull": 0
                }
            },
            "fas_failure_categ": {
                "name": "故障分类",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "chkbox",
                    "notnull": 1,
                    "opt_source": "fas_failure_categ"
                }
            },
            "fas_failure_other": {
                "name": "其他故障描述",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "30",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "text",
                    "notnull": 0
                }
            },
            "fas_implement_adv": {
                "name": "实施建议",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "chkbox",
                    "notnull": 1,
                    "opt_source": "fas_implement_adv"
                }
            },
            "fas_implement_other": {
                "name": "其他实施建议",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "30",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "text",
                    "notnull": 0
                }
            },
            "fas_reason": {
                "name": "故障原因分析",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fas_reason_files": {
                "name": "原因分析附件",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "upfile",
                    "notnull": 0,
                    "upload_max": 20,
                    "upload_len": 10,
                    "upload_filetype": ""
                }
            },
            "fas_correct": {
                "name": "纠正措施",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fas_correct_files": {
                "name": "纠正措施附件",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "upfile",
                    "notnull": 0,
                    "upload_max": 20,
                    "upload_len": 10,
                    "upload_filetype": ""
                }
            },
            "fas_check_require": {
                "name": "验证要求",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fas_audit_rpt": {
                "name": "故障分析审核意见",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_stru_id": {
                "name": "选择实施单位",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_stru",
                    "notnull": 1,
                    "_stru_range": 2,
                    "_stru_rngval": "C1"
                }
            },
            "fca_uid": {
                "name": "选择实施主办人",
                "classify": 2,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "_user",
                    "notnull": 1,
                    "_user_range": 2
                }
            },
            "fca_method": {
                "name": "纠正措施实施情况",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "label": "纠正措施<br\/>实施情况",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_method_verify": {
                "name": "效果验证情况",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_lest_rpt": {
                "name": "遗留问题",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_finish_verify": {
                "name": "归零检查",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_audit_rpt": {
                "name": "实施审核意见",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "fca_customer_cms": {
                "name": "顾客代表意见",
                "classify": 1,
                "ctype": 2,
                "dtype": {
                    "type": "char",
                    "len": "",
                    "dec": "",
                    "def": "",
                    "min": "",
                    "max": ""
                },
                "attr": {
                    "etype": "mtext",
                    "width": 340,
                    "notnull": 1,
                    "mtext_rows": 3,
                    "prompt": ""
                }
            },
            "_uid_R1": {
                "name": "【指定核实人员】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R2": {
                "name": "【核实登记】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R3": {
                "name": "【核实确认】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R5": {
                "name": "【设计所批办】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R6": {
                "name": "【质量部批办】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R7": {
                "name": "【审查登记】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_R9": {
                "name": "【审查确认】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_A1": {
                "name": "【分析部门批办】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_A2": {
                "name": "【故障分析登记】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_A3": {
                "name": "【故障分析审查】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C1": {
                "name": "【实施单位批办】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C2": {
                "name": "【实施情况登记】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C3": {
                "name": "【故障归零检查】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C4": {
                "name": "【故障归零审查】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            },
            "_uid_C5": {
                "name": "【顾客代表确认】主办人",
                "classify": 2,
                "ctype": 3,
                "dtype": null,
                "attr": []
            }
        }
    },
    "dataset": {
        "fas_reason_categ": {
            "name": "原因分类",
            "from": "fra0001m",
            "where": "code='reason_categ'",
            "orderby": "order",
            "fields": {
                "value": {
                    "name": "分类代码",
                    "fieldsql": "value"
                },
                "text": {
                    "name": "分类名称",
                    "fieldsql": "text"
                }
            },
            "pk_code": "value",
            "pk_desc": "text"
        },
        "fas_failure_categ": {
            "name": "故障分类",
            "from": "fra0001m",
            "where": "code='failure_categ'",
            "orderby": "order",
            "fields": {
                "value": {
                    "name": "分类代码",
                    "fieldsql": "value"
                },
                "text": {
                    "name": "分类名称",
                    "fieldsql": "text"
                }
            },
            "pk_code": "value",
            "pk_desc": "text"
        },
        "fas_implement_adv": {
            "name": "实施建议",
            "from": "fra0001m",
            "where": "code='implement_adv'",
            "orderby": "order",
            "fields": {
                "value": {
                    "name": "分类代码",
                    "fieldsql": "value"
                },
                "text": {
                    "name": "分类名称",
                    "fieldsql": "text"
                }
            },
            "pk_code": "value",
            "pk_desc": "text"
        }
    },
    "callback": {
        "module": "flowFrp1000c",
        "args": {
            "frp_submit_uid": {
                "name": "指定核实人员的主办人",
                "map": "_uid_R1"
            },
            "frp_check_rpt": {
                "name": "故障核实情况",
                "map": "frp_check_rpt"
            },
            "frp_check_uid": {
                "name": "故障核实人",
                "map": "_uid_R2"
            },
            "frp_check_confirm_uid": {
                "name": "故障核实确认人",
                "map": "_uid_R3"
            },
            "frp_audit_super_uid1": {
                "name": "设计所批办人",
                "map": "_uid_R5"
            },
            "frp_audit_super_uid2": {
                "name": "质量部批办人",
                "map": "_uid_R6"
            },
            "frp_audit_rpt": {
                "name": "故障审查情况",
                "map": "frp_audit_rpt"
            },
            "frp_audit_uid": {
                "name": "故障审查人",
                "map": "_uid_R7"
            },
            "frp_audit_confirm_uid": {
                "name": "故障审查确认人",
                "map": "_uid_R9"
            },
            "fas_stru_id": {
                "name": "故障分析单位",
                "map": "fas_stru_id"
            },
            "fas_super_uid": {
                "name": "分析部门批办人",
                "map": "_uid_A1"
            },
            "fas_reason_categ": {
                "name": "原因分类",
                "map": "fas_reason_categ"
            },
            "fas_reason_other": {
                "name": "其他原因分类",
                "map": "fas_reason_other"
            },
            "fas_failure_categ": {
                "name": "故障分类",
                "map": "fas_failure_categ"
            },
            "fas_failure_other": {
                "name": "其他故障分类",
                "map": "fas_failure_other"
            },
            "fas_implement_adv": {
                "name": "实施建议",
                "map": "fas_implement_adv"
            },
            "fas_implement_other": {
                "name": "其他实施建议",
                "map": "fas_implement_other"
            },
            "fas_reason": {
                "name": "故障原因分析",
                "map": "fas_reason"
            },
            "fas_reason_files": {
                "name": "原因分析附件",
                "map": "fas_reason_files"
            },
            "fas_correct": {
                "name": "纠正措施",
                "map": "fas_correct"
            },
            "fas_correct_files": {
                "name": "纠正措施附件",
                "map": "fas_correct_files"
            },
            "fas_check_require": {
                "name": "验证要求",
                "map": "fas_check_require"
            },
            "fas_sign_uid": {
                "name": "故障分析登记人",
                "map": "_uid_A2"
            },
            "fas_audit_rpt": {
                "name": "故障分析审核意见",
                "map": "fas_audit_rpt"
            },
            "fas_audit_uid": {
                "name": "故障分析审核人",
                "map": "_uid_A3"
            },
            "fca_stru_id": {
                "name": "故障实施部门",
                "map": "fca_stru_id"
            },
            "fca_super_uid": {
                "name": "实施部门批办人",
                "map": "_uid_C1"
            },
            "fca_method": {
                "name": "纠正措施实施情况",
                "map": "fca_method"
            },
            "fca_method_verify": {
                "name": "效果验证情况",
                "map": "fca_method_verify"
            },
            "fca_lest_rpt": {
                "name": "遗留问题",
                "map": "fca_lest_rpt"
            },
            "fca_sign_uid": {
                "name": "实施登记人",
                "map": "_uid_C2"
            },
            "fca_finish_verify": {
                "name": "归零检查",
                "map": "fca_finish_verify"
            },
            "fca_finish_uid": {
                "name": "归零检查人",
                "map": "_uid_C3"
            },
            "fca_audit_rpt": {
                "name": "实施审核意见",
                "map": "fca_audit_rpt"
            },
            "fca_audit_uid": {
                "name": "实施审核人",
                "map": "_uid_C4"
            },
            "fca_customer_cms": {
                "name": "顾客代表意见",
                "map": "fca_customer_cms"
            },
            "fca_customer_uid": {
                "name": "顾客代表人员",
                "map": "_uid_C5"
            }
        }
    },
    "step": [
        {
            "code": "_start",
            "name": "故障填报",
            "type": 1,
            "prev": "",
            "next": "R1",
            "attr": []
        },
        {
            "code": "R1",
            "name": "指定核实人员",
            "type": 2,
            "prev": "_start",
            "next": "R2",
            "attr": {
                "col_list": [
                    "frp_checker"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 7,
                    "val": ""
                }
            }
        },
        {
            "code": "R2",
            "name": "核实登记",
            "type": 2,
            "prev": "R1",
            "next": "R3",
            "attr": {
                "col_list": [
                    "frp_check_rpt"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 2,
                    "val": "frp_checker"
                }
            }
        },
        {
            "code": "R3",
            "name": "核实确认",
            "type": 2,
            "prev": "R2",
            "next": "R4",
            "attr": {
                "col_list": [
                    "frp_product_model"
                ],
                "can_revoke": 1,
                "auth_list": [
                    {
                        "obj_type": 2,
                        "obj_id": "1082"
                    }
                ],
                "filter_by": {
                    "type": 1,
                    "val": ""
                }
            }
        },
        {
            "code": "R4",
            "name": "是否设计所负责",
            "type": 3,
            "prev": "R3",
            "next": "R5,R6",
            "attr": {
                "expr_list": [
                    [
                        "",
                        "",
                        "frp_product_model",
                        "in",
                        [
                            "C",
                            "S"
                        ],
                        ""
                    ]
                ],
                "y_step": "R5",
                "n_step": "R6"
            }
        },
        {
            "code": "R5",
            "name": "设计所批办",
            "type": 2,
            "prev": "R4",
            "next": "R7",
            "attr": {
                "col_list": [
                    "frp_auditor"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1030"
                    }
                ],
                "filter_by": {
                    "type": 8,
                    "val": ""
                }
            }
        },
        {
            "code": "R6",
            "name": "质量部批办",
            "type": 2,
            "prev": "R4",
            "next": "R7",
            "attr": {
                "col_list": [
                    "frp_auditor"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1025"
                    }
                ],
                "filter_by": {
                    "type": 8,
                    "val": ""
                }
            }
        },
        {
            "code": "R7",
            "name": "审查登记",
            "type": 2,
            "prev": "R5,R6",
            "next": "R8",
            "attr": {
                "col_list": [
                    "frp_audit_rpt",
                    "run_fracas",
                    "fas_stru_id"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 2,
                        "obj_id": "1083"
                    },
                    {
                        "obj_type": 2,
                        "obj_id": "1086"
                    }
                ],
                "filter_by": {
                    "type": 2,
                    "val": "frp_auditor"
                },
                "data_check": [
                    {
                        "expr_list": [
                            [
                                "",
                                "",
                                "run_fracas",
                                "=",
                                "1",
                                ""
                            ],
                            [
                                "&",
                                "",
                                "fas_stru_id",
                                "n",
                                "",
                                ""
                            ]
                        ],
                        "msg": "需要运行FRACAS时，必须指定【分析部门】"
                    }
                ]
            }
        },
        {
            "code": "R8",
            "name": "是否运行FRACAS",
            "type": 3,
            "prev": "R7",
            "next": "R9,_end",
            "attr": {
                "expr_list": [
                    [
                        "",
                        "",
                        "run_fracas",
                        "=",
                        "1",
                        ""
                    ]
                ],
                "y_step": "R9",
                "n_step": "_end"
            }
        },
        {
            "code": "R9",
            "name": "审查确认",
            "type": 2,
            "prev": "R8",
            "next": "A1",
            "attr": {
                "col_list": null,
                "can_revoke": 1,
                "auth_list": [
                    {
                        "obj_type": 2,
                        "obj_id": "1082"
                    }
                ],
                "filter_by": {
                    "type": 1,
                    "val": ""
                }
            }
        },
        {
            "code": "A1",
            "name": "分析部门批办",
            "type": 2,
            "prev": "R9",
            "next": "A2",
            "attr": {
                "col_list": [
                    "fas_uid"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1030"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1080"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1081"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1082"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1083"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1084"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1085"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1086"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1087"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1089"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1090"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1091"
                    }
                ],
                "filter_by": {
                    "type": 3,
                    "val": "fas_stru_id"
                }
            }
        },
        {
            "code": "A2",
            "name": "故障分析登记",
            "type": 2,
            "prev": "A1",
            "next": "A3",
            "attr": {
                "col_list": [
                    "fas_reason_categ",
                    "fas_reason_other",
                    "fas_failure_categ",
                    "fas_failure_other",
                    "fas_implement_adv",
                    "fas_implement_other",
                    "fas_reason",
                    "fas_reason_files",
                    "fas_correct",
                    "fas_correct_files",
                    "fas_check_require"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 2,
                    "val": "fas_uid"
                },
                "data_check": [
                    {
                        "expr_list": [
                            [
                                "",
                                "",
                                "fas_reason_categ",
                                "=",
                                "H",
                                ""
                            ],
                            [
                                "&",
                                "",
                                "fas_reason_other",
                                "n",
                                "",
                                ""
                            ]
                        ],
                        "msg": "“原因分类”选择其他时，必须填写【其他原因描述】"
                    },
                    {
                        "expr_list": [
                            [
                                "",
                                "",
                                "fas_failure_categ",
                                "=",
                                "H",
                                ""
                            ],
                            [
                                "&",
                                "",
                                "fas_failure_other",
                                "n",
                                "",
                                ""
                            ]
                        ],
                        "msg": "“故障分类”选择其他时，必须填写【其他故障描述】"
                    },
                    {
                        "expr_list": [
                            [
                                "",
                                "",
                                "fas_implement_adv",
                                "%",
                                "H",
                                ""
                            ],
                            [
                                "&",
                                "",
                                "fas_implement_other",
                                "n",
                                "",
                                ""
                            ]
                        ],
                        "msg": "“实施建议”勾选其他时，必须填写【其他实施建议】"
                    }
                ]
            }
        },
        {
            "code": "A3",
            "name": "故障分析审查",
            "type": 2,
            "prev": "A2",
            "next": "C1",
            "attr": {
                "col_list": [
                    "fas_audit_rpt",
                    "fca_stru_id"
                ],
                "can_revoke": 1,
                "auth_list": null,
                "filter_by": {
                    "type": 5,
                    "val": "R7"
                }
            }
        },
        {
            "code": "C1",
            "name": "实施单位批办",
            "type": 2,
            "prev": "A3",
            "next": "C2",
            "attr": {
                "col_list": [
                    "fca_uid"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1030"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1080"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1081"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1082"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1083"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1084"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1085"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1086"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1087"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1089"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1090"
                    },
                    {
                        "obj_type": 1,
                        "obj_id": "1091"
                    }
                ],
                "filter_by": {
                    "type": 3,
                    "val": "fca_stru_id"
                }
            }
        },
        {
            "code": "C2",
            "name": "实施情况登记",
            "type": 2,
            "prev": "C1",
            "next": "C3",
            "attr": {
                "col_list": [
                    "fca_method",
                    "fca_method_verify",
                    "fca_lest_rpt"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 2,
                    "val": "fca_uid"
                }
            }
        },
        {
            "code": "C3",
            "name": "故障归零检查",
            "type": 2,
            "prev": "C2",
            "next": "C4",
            "attr": {
                "col_list": [
                    "fca_finish_verify"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 2,
                        "obj_id": "1080"
                    }
                ],
                "filter_by": {
                    "type": 7,
                    "val": ""
                }
            }
        },
        {
            "code": "C4",
            "name": "故障归零审查",
            "type": 2,
            "prev": "C3",
            "next": "C5",
            "attr": {
                "col_list": [
                    "fca_audit_rpt"
                ],
                "can_revoke": 0,
                "auth_list": null,
                "filter_by": {
                    "type": 5,
                    "val": "R7"
                }
            }
        },
        {
            "code": "C5",
            "name": "顾客代表确认",
            "type": 2,
            "prev": "C4",
            "next": "_end",
            "attr": {
                "col_list": [
                    "fca_customer_cms"
                ],
                "can_revoke": 0,
                "auth_list": [
                    {
                        "obj_type": 1,
                        "obj_id": "1092"
                    }
                ],
                "filter_by": {
                    "type": 6,
                    "val": ""
                }
            }
        },
        {
            "code": "_end",
            "name": "流程结束",
            "type": 9,
            "prev": "C5,R8",
            "next": "",
            "attr": []
        }
    ]
};






/***/ })
/******/ ]);