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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2018年1月4日 星期四
 * 工具库
 */
var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: 'clone',

        /**
         * 对象复制
         * @param {object} t1 
         */
        value: function clone(t1) {
            t1 = 'object' == (typeof t1 === 'undefined' ? 'undefined' : _typeof(t1)) ? t1 : {};
            var obj = {};
            return $.extend(true, obj, t1);
        }
        /**
         * 数据合并相同的元素
         * @param {*} array 
         */

    }, {
        key: 'ArrayMergeSameValue',
        value: function ArrayMergeSameValue(array) {
            if ('object' == (typeof array === 'undefined' ? 'undefined' : _typeof(array)) && array.length && array.length > 1) {
                var valueMap = {};
                var newArray = [];
                for (var i = 0; i < array.length; i++) {
                    if (valueMap[array[i]]) {
                        continue;
                    }
                    newArray.push(array[i]);
                    valueMap[array[i]] = true;
                }
                array = newArray;
            }
            return array;
        }
        /**
         * @param {array|object} obj 
         * @param {function} callback (k, v)
         */

    }, {
        key: 'each',
        value: function each(obj, callback) {
            if ('object' == (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) {
                if ($.isArray(obj)) {
                    for (var i = 0; i < obj.length; i++) {
                        if (false === callback(i, obj[i])) {
                            break;
                        }
                    }
                } else {
                    for (var k in obj) {
                        if (false === callback(k, obj[k])) {
                            break;
                        }
                    }
                }
            }
        }
    }]);

    return Util;
}();

exports.Util = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2018年1月5日 星期五
 * 基础节点类
 */
var NodeBase = function () {
    function NodeBase() {
        _classCallCheck(this, NodeBase);

        // 连接线起点获取终点
        this.fromLine = [];
        this.toLine = [];
    }
    // 记录连接线


    _createClass(NodeBase, [{
        key: 'recordLine',
        value: function recordLine(type, $node) {
            if ('from' == type) {
                this.fromLine.push($node);
            } else if ('to' == type) {
                this.toLine.push($node);
            }
        }
        /**
         * 同步处理取现
         * @param {function} callback 
         */

    }, {
        key: 'syncLineMove',
        value: function syncLineMove(callback) {
            if ('function' !== typeof callback) {
                callback = function callback(instance, type) {};
            }
            // 直线同步移动
            var fLines = this.fromLine;
            var tLines = this.toLine;
            // 起点列表处理
            for (var i = 0; i < fLines.length; i++) {
                var $fC = fLines[i].c;
                var $fPath = $fC.attr('path');
                callback($fC, 'from', fLines[i]);
            }
            // 终点列表处理
            for (var j = 0; j < tLines.length; j++) {
                var $tC = tLines[j].c;
                callback($tC, 'to', tLines[j]);
            }
        }
    }]);

    return NodeBase;
}();

exports.default = NodeBase;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
function defaultClearTimeout() {
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
})();
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
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
    while (len) {
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

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2018年1月5日 星期五
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 工作流处理包
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _flow = __webpack_require__(4);

var _util = __webpack_require__(0);

var _helper = __webpack_require__(11);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 工作流实例类
 */
var Worker = function () {
    /**
     * @param {object} option  工作流配置对象
     * @param {object} config  dom 等相关配置 *
     */
    function Worker(config, option) {
        _classCallCheck(this, Worker);

        // 开发环境检测
        if (process.env.NODE_ENV !== 'production') {
            if (!window.$) {
                console.warn('jQuery 依赖为安装，运行库将无法运行');
            }
            if (!window.Raphael) {
                console.warn('Raphael 依赖为安装，运行库将无法运行');
            }
        }
        this.$index = _helper2.default.getIndex();

        // 工作流实例
        this.config = _util.Util.clone(config);
        this.$raphael = _helper2.default.createInstance(this.config);
        this.$flow = new _flow.Flow(this.$raphael);
        this.setOption(option);

        // 数据实例处理
        this.leastLineQue = []; // 最后需要生成的连线，如用于这回的线段

        this.draw();
        // console.log(this.config)
    }
    /**
     * 代码索引 code <-> Nodes 索引字典
     * @param {*} key 
     * @param {*} value 
     */


    _createClass(Worker, [{
        key: 'cNodeMap',
        value: function cNodeMap(key, value) {
            var CodeNodeMaps = _helper2.default.src(this.$index, 'CodeNodeMaps');
            if (!CodeNodeMaps) {
                CodeNodeMaps = {};
            }
            if (key) {
                // 设置值
                if (value) {
                    CodeNodeMaps[key] = value;
                    _helper2.default.src(this.$index, 'CodeNodeMaps', CodeNodeMaps);
                    return this;
                } else {
                    return CodeNodeMaps[key] || false;
                }
            }
            return CodeNodeMaps;
        }
        // 绘制工作流图
        // 旧版流程布局算法

    }, {
        key: 'draw2',
        value: function draw2() {
            var _this = this;

            if (this.option) {
                var steps = this.option.step;
                // 生成代码索引
                this.codeIndex(steps);
                var config = this.config;
                // 起点中心坐标点 (x, y)
                var x = config.x || parseInt(config.w * 0.4);
                var y = config.y || 10;
                var cH = config.cH || 50; // 容器高度
                var dH = config.dH || 30; // 间距高度
                // 同级别节点字典
                var sameClsNodeMap = {};
                // 获取通节点指向的 Y 值
                var getSameClsNodeY = function getSameClsNodeY(_c) {
                    var _sameClsNode = _this.codeIndex(_c);
                    var y = null;
                    if (_sameClsNode && _sameClsNode.length > 0) {
                        _util.Util.each(_sameClsNode, function (index, value) {
                            if (sameClsNodeMap[value]) {
                                y = sameClsNodeMap[value].y;
                                return false;
                            }
                        });
                    }
                    return y;
                };
                /**
                 * 获取同一级别节点差集对比数
                 * @param {string} _c 
                 */
                var getSameClsDiffCount = function getSameClsDiffCount(_c) {
                    var _sameClsNode = _this.codeIndex(_c);
                    var _count = _sameClsNode.length;
                    var hasEd = 0;
                    _util.Util.each(_sameClsNode, function (index, value) {
                        if (sameClsNodeMap[value]) {
                            hasEd += 1;
                        }
                    });
                    return _count - hasEd;
                };

                // console.log(x ,y)
                for (var i = 0; i < steps.length; i++) {
                    var step = steps[i];
                    var code = step.code;
                    var name = step.name || code;
                    var nd = this.cNodeMap(code);
                    var hasNode = false;
                    if (nd) {
                        hasNode = true;
                    }
                    if (!hasNode) {
                        // 开始
                        if (1 == step.type) {
                            y += dH + cH / 2;
                            nd = this.$flow.endpoint(x, y, cH / 2, name);
                            nd.c.attr('fill', 'rgb(181, 216, 126)');
                            nd.$step = step;
                            this.drag(nd);
                            y += cH / 2;
                            // console.log(nd)
                        }
                        // 操作节点
                        else if (2 == step.type) {
                                var w = 100;
                                var sameClsNode = this.codeIndex(code);
                                var x0 = x;
                                // 只有一个父类
                                if (step.prev) {
                                    if (step.prev.indexOf(',') == -1) {
                                        var parentNd = this.getNodeByCode(step.prev);
                                        if (parentNd && parentNd.c) {
                                            // console.log(parentNd)
                                            x0 = this.getStandX(parentNd);
                                        }
                                    }
                                }
                                // 多个同级节点
                                if (sameClsNode && sameClsNode.length > 1) {
                                    var diffCtt = getSameClsDiffCount(code);
                                    var dW = 25;
                                    // 中心偏移量算法
                                    var smClsD = Math.ceil(sameClsNode.length / 2);
                                    var x1 = x0 + (dW + w) * (smClsD - diffCtt);
                                    var y1 = getSameClsNodeY(code);
                                    // console.log(sameClsNode)
                                    if (y1) {
                                        x1 = x0 + (dW + w) * (smClsD - diffCtt);
                                    } else {
                                        y += dH + cH / 2;
                                    }
                                    y1 = y1 ? y1 : y;
                                    nd = this.$flow.operation(x1, y1, w, cH, name);
                                    sameClsNodeMap[code] = {
                                        y: y
                                    };
                                } else {
                                    y += dH + cH / 2;
                                    nd = this.$flow.operation(x0, y, w, cH, name);
                                }
                                nd.$step = step;
                                this.drag(nd);
                                nd.c.attr('fill', 'rgb(224, 223, 226)');
                                y += cH / 2;
                            }
                            // 判断节点
                            else if (3 == step.type) {
                                    y += dH + cH / 2;
                                    nd = this.$flow.judge(x, y, w + 60, cH, name);
                                    nd.c.attr('fill', 'rgb(49, 174, 196)');
                                    nd.$step = step;
                                    this.drag(nd);
                                    // y += 80 + 20
                                    y += cH / 2;
                                }
                                // 结束
                                else if (9 == step.type) {
                                        y += dH + cH / 2;
                                        nd = this.$flow.endpoint(x, y, cH / 2, name);
                                        nd.c.attr('fill', 'rgb(34, 185, 41)');
                                        nd.$step = step;
                                        this.drag(nd);
                                    }
                    }

                    if (nd) {
                        if (!hasNode) {
                            this.cNodeMap(code, nd);
                            this.line(nd);
                            this._eventBind(nd);
                        } else {
                            this.line(nd, step);
                        }
                    }
                }
            }
        }
        // 自动检测高度，自适应

    }, {
        key: 'checkPaperHight',
        value: function checkPaperHight(y) {
            var svg = this.config.dom.find('svg');
            var height = svg.height();
            if (height < y + 180) {
                svg.css({ 'height': height + 80 });
            }
        }
        // 新的布局算法(优化)、20180109

    }, {
        key: 'draw',
        value: function draw() {
            var _this2 = this;

            this.getNodeCls();
            // clsCache
            var cc = _helper2.default.src(this.$index, '_nodeCls');

            var option = _util.Util.clone(this.option);
            var beta1 = 0.21; // 分栏系数

            var cH = this.conf('cH', 50),
                // 容器高度
            dH = this.conf('dH', 30),
                // 间距高度
            cnH = this.conf('h') // 总容器高度
            ,
                clsCount = cc.clsValue,
                sColumnMk = this.conf('sColumnMk', true);
            if (sColumnMk) {
                beta1 = 0.43;
            } else {
                beta1 = cH * (clsCount - 1) + dH * clsCount < cnH ? 0.43 : beta1;
            }
            var X = this.conf('x', parseInt(this.conf('w') * beta1)),
                bX = X,
                Y = this.conf('y', 10),
                bY = Y;

            var bkgOperCol = this.conf('bkgOperCol', 'rgb(224, 223, 226)'),
                bkgJudgeCol = this.conf('bkgJudgeCol', 'rgb(49, 174, 196)'),
                currentCode = this.conf('currentCode', false);

            /**
             * 是否为多级节点
             * @param {string} _c 
             */
            cc.isMuti = function (_c) {
                var _idx = cc.map[_c];
                var _cls = cc.mapDt[_idx];
                return _cls.length > 1;
            };
            /**
             * 获取多节点的 Y 坐标轴值
             * @param {*} _c 
             */
            cc.getMutiY = function (_c, def) {
                var _y = 0;
                def = def ? def : 0;
                var _idx = cc.map[_c];
                var _cls = cc.mapDt[_idx];
                if (_cls.length > 1) {
                    _util.Util.each(_cls, function (k, v) {
                        var _nd = _this2.getNodeByCode(v);
                        if (_nd) {
                            _y = _this2.getStandY(_nd);
                            return false;
                        }
                    });
                }
                _y = _y ? _y : def;
                return _y;
            };
            /**
             * 获取单级多节点统计量
             * @param {string} _c 
             */
            cc.getMutiCtt = function (_c) {
                var _idx = cc.map[_c];
                var _cls = cc.mapDt[_idx];
                var len = _cls.length;
                var hasEd = 0;
                if (len > 1) {
                    _util.Util.each(_cls, function (k, v) {
                        if (_this2.getNodeByCode(v)) {
                            hasEd += 1;
                        }
                    });
                }
                return {
                    len: len, hasEd: hasEd
                };
            };

            // console.log(clsCache)
            // var clsCacheMap = {}
            // 对象遍历            
            _util.Util.each(option.step, function (idx, node) {
                var type = node.type,
                    $node,
                    code = node.code,
                    name = node.name || code,
                    x,
                    y;
                // 单列自动增高                
                if (sColumnMk) {
                    _this2.checkPaperHight(bY);
                } else if (bY + 2 * cH > cnH) {
                    bY = Y;
                    bX += X;
                }
                switch (type) {
                    case 1:
                        //  开始
                        bY += dH;
                        $node = _this2.$flow.endpoint(bX, bY, cH / 2, name);
                        $node.c.attr('fill', _this2.conf('pkgStartCol', 'rgb(181, 216, 126)'));
                        break;
                    case 2:
                        // 操作
                        x = bX;
                        if (!cc.isMuti(code)) {
                            bY += 2 * dH + cH / 2;
                        } else {
                            var y = cc.getMutiY(code, null);
                            var cCdt = cc.getMutiCtt(code);
                            if (cCdt.len == 2) {
                                if (cCdt.hasEd > 0) {
                                    x += 50 + cH * 1.5;
                                }
                            } else if (cCdt.len > 2) {
                                var dW = 25;
                                // 中心偏移量算法
                                var smClsD = Math.ceil(cCdt.len / 2);
                                x = x + (dW + cH * 2) * (smClsD - (cCdt.len - cCdt.hasEd));
                            }
                            if (!y) {
                                bY += cc.getMutiY(code, 2 * dH + cH / 2);
                            } else {
                                bY = y;
                            }
                            // bY += cc.getMutiY(code, 2*dH + cH/2)
                        }
                        // console.log(x, bY)
                        // bY += 2*dH + cH/2               
                        // $node = this.$flow.operation(bX, bY, 100, cH, name)
                        $node = _this2.$flow.operation(x, bY, 100, cH, name);
                        $node.c.attr('fill', bkgOperCol);
                        break;
                    case 3:
                        // 判断
                        bY += 2 * dH + cH / 2;
                        $node = _this2.$flow.judge(bX, bY, 100, cH, name);
                        $node.c.attr('fill', bkgJudgeCol);
                        break;
                    case 9:
                        // 结束
                        bY += dH * 2 + cH / 2;
                        $node = _this2.$flow.endpoint(bX, bY, cH / 2, name);
                        $node.c.attr('fill', _this2.conf('bkgEndCol', 'rgb(34, 185, 41)'));
                        break;
                }
                // 拖动
                if ($node) {
                    $node.$step = node;
                    $node.c.data('_code', code); // 保存代码为属性
                    $node.c.data('_type', type);
                    _this2.cNodeMap(code, $node);
                    _this2.line($node);
                    _this2._eventBind($node);
                    _this2.drag($node);
                }
            });
            this.connectLeastLines();
        }
        // 节点级别

    }, {
        key: 'getNodeCls',
        value: function getNodeCls() {
            var option = _util.Util.clone(this.option);
            var clsValue = 0;
            var map = {};
            var mapDt = {};
            _util.Util.each(option.step, function (idx, node) {
                // console.log(node)
                var prev = node.prev,
                    code = node.code;
                if (prev) {
                    if (map[prev]) {
                        clsValue = map[prev];
                    }
                }
                clsValue += 1;
                map[code] = clsValue;
                if (!mapDt[clsValue]) {
                    mapDt[clsValue] = [code];
                } else {
                    mapDt[clsValue].push(code);
                }
            });
            // 数据缓存
            _helper2.default.src(this.$index, '_nodeCls', {
                map: map,
                mapDt: mapDt,
                clsValue: clsValue
            });
            // console.log(H.src(this.$index, '_nodeCls'))
        }
        // 移动处理

    }, {
        key: 'drag',
        value: function drag(nd) {
            // 不适用分割号时可能解析语句失败，报错
            var config = this.config;
            (function ($nd, conf) {
                var $c = $nd.c;
                var cDragDt = {};
                $c.drag(
                // onmove
                function (dx, dy) {
                    dx += cDragDt.x;
                    dy += cDragDt.y;
                    $nd.move(dx, dy);
                    // 直线同步移动
                    // if(conf.line && conf.line == 'arrow'){
                    if (conf.line && (conf.line == 'arrow' || conf.line == 'bow')) {
                        $nd.ToSyncArrow(dx, dy);
                    }
                    /*
                    // 箭体 2 , 暂时使用， arrow 的移动方法
                    else if(conf.line && conf.line == 'bow'){
                        $nd.ToSyncBow(dx, dy)
                    }
                    */
                    else {
                            $nd.ToSyncLine(dx, dy);
                        }
                },
                // onstart
                function () {
                    var _x, _y;
                    if ('ellipse' == this.type) {
                        _x = this.attr('cx');
                        _y = this.attr('cy');
                    } else if ('rect' == this.type) {
                        _x = this.attr('x');
                        _y = this.attr('y');
                    } else if ('path' == this.type) {
                        var _path = this.attr('path');
                        var sP1 = _path[0];
                        _x = sP1[1];
                        _y = sP1[2];
                    }
                    cDragDt.x = _x;
                    cDragDt.y = _y;
                },
                // onend
                function () {});
            })(nd, config);
        }
        /**
         * 连线
         * @param {NodeBase} nd 
         * @param {*} prefStep 
         */

    }, {
        key: 'line',
        value: function line(nd, prefStep) {
            var _this3 = this;

            var step = _util.Util.clone(nd.$step);
            if (step.prev) {
                step.prev = step.prev.replace(/\s/g, '');
            }
            if (step.prev) {
                var config = this.config;
                var rightAngle = 'undefined' == typeof config.rightAngle ? true : config.rightAngle;
                var bkgLineCol = this.conf('bkgLineCol', 'rgb(14, 10, 10)');

                var makerLine = function makerLine(from, to) {
                    var $lineInstance;
                    var fromNd = _this3.getNodeByCode(from);
                    var toNd = _this3.getNodeByCode(to);

                    // console.log(from, to)
                    // var t1 = false;
                    // if(from == 'G1' && to == 'B'){
                    //     console.log(fromNd, toNd)
                    //     t1 = true;
                    // }

                    // 节点已经生成时，否则保存起来，最后连接直线
                    if (fromNd && toNd) {
                        if (config.line && 'arrow' == config.line) {
                            var $p1 = fromNd.getStlnP();
                            var $p2 = toNd.getEnlnP();
                            $lineInstance = _this3.$flow.arrow([$p1.x, $p1.y], [$p2.x, $p2.y], config.arrowLen ? config.arrowLen : 4);
                            $lineInstance.position = { from: $p1.position, to: $p2.position };
                            $lineInstance.c.attr('fill', bkgLineCol);
                        } else if (config.line && 'bow' == config.line) {
                            var $p1 = fromNd.getStlnP();
                            var $p2 = toNd.getEnlnP();
                            var bowOption = {
                                queue: [{ x: $p1.x, y: $p1.y }, { x: $p2.x, y: $p2.y }]
                            };
                            $lineInstance = _this3.$flow.bow(bowOption);
                            $lineInstance.position = { from: $p1.position, to: $p2.position };
                            $lineInstance.arrow.attr({
                                'fill': bkgLineCol,
                                'stroke': bkgLineCol
                            });
                        } else {
                            var $p1 = fromNd.getStlnP();
                            var $p2 = toNd.getEnlnP();
                            if (rightAngle) {
                                $lineInstance = _this3.$flow.rightAngleLine({
                                    p1: { x: $p1.x, y: $p1.y },
                                    p2: { x: $p2.x, y: $p2.y }
                                });
                            } else {
                                $lineInstance = _this3.$flow.line([$p1.x, $p1.y], [$p2.x, $p2.y]);
                            }
                            $lineInstance.position = { from: $p1.position, to: $p2.position };
                        }
                        fromNd.recordLine('from', $lineInstance);
                        toNd.recordLine('to', $lineInstance);

                        var runIdx = _this3.nodeRunedMk(to);
                        if (runIdx && $lineInstance) {
                            var bkgRunedCol = _this3.conf('bkgRunedCol', 'rgb(255, 0, 0)');
                            // 连线
                            $lineInstance.c.attr({
                                //'fill': bkgRunedCol,
                                'stroke': bkgRunedCol
                            });
                            // 箭头类型
                            if ($lineInstance.arrow) {
                                $lineInstance.arrow.attr({
                                    'fill': bkgRunedCol,
                                    'stroke': bkgRunedCol
                                });
                            }
                            // 目标节点
                            toNd.c.attr({
                                'stroke': bkgRunedCol
                            });
                            // 不重复填充颜色
                            if (runIdx == 2) {
                                // 来源节点
                                fromNd.c.attr({
                                    'stroke': bkgRunedCol
                                });
                            }
                        }
                    } else {
                        _this3.leastLineQue.push({
                            from: from,
                            to: to
                        });
                    }
                };
                var prev;
                prefStep = prefStep ? prefStep : step;
                if (prefStep.prev.indexOf(',') > -1) {
                    prev = prefStep.prev.split(',');
                } else {
                    prev = [prefStep.prev];
                }
                for (var i = 0; i < prev.length; i++) {
                    makerLine(prev[i], prefStep.code);
                }
            }
        }
        /**
         * 连接最后生成的线段，通常用于回线/自折线
         */

    }, {
        key: 'connectLeastLines',
        value: function connectLeastLines() {
            var _this4 = this;

            // console.log(this.leastLineQue)
            var config = this.config;
            var rightAngle = 'undefined' == typeof config.rightAngle ? true : config.rightAngle;

            var bkgRunedCol = this.conf('bkgRunedCol', 'rgb(255, 0, 0)');
            var bkgLineCol = this.conf('bkgLineCol', 'rgb(14, 10, 10)');

            var makerLine = function makerLine(from, to) {
                var $lineInstance;
                var fromNd = _this4.getNodeByCode(from);
                var toNd = _this4.getNodeByCode(to);

                // console.log(from, to)
                // var t1 = false;
                // if(from == 'G1' && to == 'B'){
                //     console.log(fromNd, toNd)
                //     t1 = true;
                // }

                // 节点已经生成时，否则保存起来，最后连接直线
                if (fromNd && toNd) {
                    if (config.line && 'arrow' == config.line) {
                        var $p1 = fromNd.getStlnP();
                        var $p2 = toNd.getEnlnP();
                        $lineInstance = _this4.$flow.arrow([$p1.x, $p1.y], [$p2.x, $p2.y], config.arrowLen ? config.arrowLen : 4);
                        $lineInstance.position = { from: $p1.position, to: $p2.position };
                        $lineInstance.c.attr('fill', bkgLineCol);
                    } else if (config.line && 'bow' == config.line) {
                        var isJudge = 3 == fromNd.c.data('_type');
                        var $p1 = fromNd.getStlnP(isJudge ? 'A' : null);
                        var toPosi = false;
                        if (isJudge) {
                            toPosi = 2 == toNd.c.data('_type') ? 'L' : 'A';
                        }
                        var $p2 = toNd.getEnlnP(toPosi);
                        var bowOption = {
                            queue: [{ x: $p1.x, y: $p1.y },
                            // 直接写死了， 需要用程序计算 2018年1月23日 星期二 @issue/JC
                            { x: $p1.x - 50, y: $p1.y }, { x: $p1.x - 50, y: $p2.y }, { x: $p2.x, y: $p2.y }]
                        };
                        $lineInstance = _this4.$flow.bow(bowOption);
                        $lineInstance.position = { from: $p1.position, to: $p2.position };
                        $lineInstance.arrow.attr({
                            'fill': bkgLineCol,
                            'stroke': bkgLineCol
                        });
                    } else {
                        var $p1 = fromNd.getStlnP();
                        var $p2 = toNd.getEnlnP();
                        if (rightAngle) {
                            $lineInstance = _this4.$flow.rightAngleLine({
                                p1: { x: $p1.x, y: $p1.y },
                                p2: { x: $p2.x, y: $p2.y }
                            });
                        } else {
                            $lineInstance = _this4.$flow.line([$p1.x, $p1.y], [$p2.x, $p2.y]);
                        }
                        $lineInstance.position = { from: $p1.position, to: $p2.position };
                    }
                    fromNd.recordLine('from', $lineInstance);
                    toNd.recordLine('to', $lineInstance);

                    var runIdx = _this4.nodeRunedMk(to);
                    if (runIdx && $lineInstance) {
                        // 连线
                        $lineInstance.c.attr({
                            // 'fill': bkgRunedCol,
                            'stroke': bkgRunedCol
                        });

                        // 箭头类型
                        if ($lineInstance.arrow) {
                            $lineInstance.arrow.attr({
                                'fill': bkgRunedCol,
                                'stroke': bkgRunedCol
                            });
                        }

                        // 目标节点
                        toNd.c.attr({
                            'stroke': bkgRunedCol
                        });
                        // 不重复填充颜色
                        if (runIdx == 2) {
                            // 来源节点
                            fromNd.c.attr({
                                'stroke': bkgRunedCol
                            });
                        }
                    }
                }
                // else{
                //     this.leastLineQue.push({
                //         from,
                //         to
                //     })
                // }
            };

            _util.Util.each(this.leastLineQue, function (index, dd) {
                //console.log(dd)
                makerLine(dd.from, dd.to);
            });
        }
        /**
         * 设置配置文件信息
         * @param {*} option 
         */

    }, {
        key: 'setOption',
        value: function setOption(option) {
            if ('object' == (typeof option === 'undefined' ? 'undefined' : _typeof(option))) {
                this.option = _util.Util.clone(option);
            }
        }
        /**
         * 根据code获取节点信息
         * @param {string} code 
         */

    }, {
        key: 'getNodeByCode',
        value: function getNodeByCode(code) {
            var node = null;
            var value = this.cNodeMap(code);
            if (value) {
                node = value;
            }
            return node;
        }
        /**
         * 代码分级算法
         * @param {object} steps 
         */

    }, {
        key: 'codeIndex',
        value: function codeIndex(steps) {
            // 生成分级字典
            if ('object' == (typeof steps === 'undefined' ? 'undefined' : _typeof(steps))) {
                var clsMap = {};
                for (var i = 0; i < steps.length; i++) {
                    var step = steps[i];
                    var code = step.code;
                    // 第一级
                    if (!step.prev) {
                        clsMap[code] = 1;
                    } else {
                        var prev = step.prev.replace(/\s/g, '').split(',');
                        for (var j = 0; j < prev.length; j++) {
                            var prevCode = prev[j];
                            var cls = clsMap[prevCode] ? clsMap[prevCode] : 0;
                            // console.log(cls)
                            if ('object' == (typeof cls === 'undefined' ? 'undefined' : _typeof(cls)) && cls.length) {
                                cls = cls.length == 1 ? cls[0] : cls;
                            }
                            cls += 1;
                            if (!clsMap[code]) {
                                clsMap[code] = cls;
                            } else {
                                if ('object' != _typeof(clsMap[code])) {
                                    var cls2 = clsMap[code];
                                    clsMap[code] = [cls2];
                                }
                                clsMap[code].push(cls);
                                clsMap[code] = _util.Util.ArrayMergeSameValue(clsMap[code]);
                            }
                        }
                    }
                }
                // console.log(clsMap)
                _helper2.default.src(this.$index, 'clsMap', clsMap);
            } else if (steps) {
                var clsMap = _helper2.default.src(this.$index, 'clsMap');
                if (clsMap) {
                    var value = clsMap[steps] || null;
                    var List = [steps];
                    for (var k in clsMap) {
                        if (value == clsMap[k] && $.inArray(k, List) == -1) {
                            List.push(k);
                        }
                    }
                    return List;
                }
            }
        }
        /**
         * 节点表单x坐标
         * @param {NodeBase} nd 
         */

    }, {
        key: 'getStandX',
        value: function getStandX(nd) {
            var x = null;
            if (nd && nd.c) {
                var $c = nd.c;
                switch ($c.type) {
                    case 'circle':
                        x = $c.attr('cx');
                        break;
                    case 'rect':
                        x = $c.attr('x') + $c.attr('width') / 2;
                        break;
                    case 'path':
                        x = nd.opt.cx;
                        break;
                }
            }
            return x;
        }
        /**
         * 节点表单Y坐标
         * @param {NodeBase} nd 
         */

    }, {
        key: 'getStandY',
        value: function getStandY(nd) {
            var y = null;
            if (nd && nd.c) {
                var $c = nd.c;
                switch ($c.type) {
                    case 'circle':
                        y = $c.attr('cy');
                        break;
                    case 'rect':
                        y = $c.attr('y') + $c.attr('height') / 2;
                        break;
                    case 'path':
                        y = nd.opt.cy;
                        break;
                }
            }
            return y;
        }
        /**
         * 移除全部的边框
         */

    }, {
        key: 'removeBBox',
        value: function removeBBox() {
            var maps = this.cNodeMap();
            for (var k in maps) {
                var node = maps[k];
                if (node.bBox) {
                    node.bBox.remove();
                }
            }
        }
        /**
         * 事件绑定处理方法
         */

    }, {
        key: '_eventBind',
        value: function _eventBind(node) {
            var $this = this;
            // 点击处理
            node.c.click(function () {
                $this.removeBBox();
                if (node.bBox) {
                    node.bBox.remove();
                }
                var bt = this.getBBox();
                var dt = 5;
                node.bBox = node.instance.rect(bt.x - dt, bt.y - dt, bt.width + dt * 2, bt.height + dt * 2);
                node.bBox.attr({
                    'stroke': $this.conf('bkgNodeBox', 'rgb(15, 13, 105)')
                });
            });

            // 文本编辑器
            var hasTexteditor = this.conf('texteditor', false);
            var $label = node.label;
            if (hasTexteditor && $label) {
                // 双击事件
                var txtEditor = this.conf('texteditor');
                txtEditor = 'object' == (typeof txtEditor === 'undefined' ? 'undefined' : _typeof(txtEditor)) ? txtEditor : {};
                txtEditor.id = txtEditor.id ? txtEditor.id : 'worker-txteditor';
                txtEditor.class = txtEditor.class ? txtEditor.class : 'worker-txteditor-div';
                $label.dblclick(function () {
                    var text = $label.attr('text');
                    var $input = $('#' + txtEditor.id);
                    if ($input.length == 0) {
                        var texteditorHtml = '<div class="' + txtEditor.class + '">' + '<input type="text" id="' + txtEditor.id + '">' + '</div>';
                        $('body').append(texteditorHtml);
                        $input = $('#' + txtEditor.id);
                    }
                    $input.show();
                    $input.val(text);
                    $input.css({
                        'top': $label.attr('y'),
                        'left': $label.attr('x')
                    });
                    $input.focus();
                    $input.off('blur').on('blur', function () {
                        // $input.off('change').on('change', function(){
                        var dom = $(this);
                        var txt = dom.val();
                        if (txt) {
                            $label.attr('text', txt);
                        }
                        dom.hide();

                        // 自动适应文本的宽度
                        if ('function' == typeof node.resizeByText) {
                            node.resizeByText();
                        }
                    });
                });
            }
        }
        /**
         * 配置键获取
         * @param {string} key 
         * @param {*} def 
         */

    }, {
        key: 'conf',
        value: function conf(key, def) {
            def = def || null;
            if ('undefined' != typeof this.config[key]) {
                def = this.config[key];
            }
            return def;
        }
        /**
         * 是否为已经执行的节点
         * @param {string} code 
         * @returns {bool}
         */

    }, {
        key: 'nodeRunedMk',
        value: function nodeRunedMk(code) {
            var currentCode = this.conf('currentCode', false);
            if (currentCode) {
                var cc = _helper2.default.src(this.$index, '_nodeCls');
                var refIdx = cc.map[currentCode];
                var idx = cc.map[code];
                // console.log(refIdx, idx, code, idx <= refIdx)
                currentCode = idx <= refIdx ? idx : false;
            }
            return currentCode;
        }
    }]);

    return Worker;
}();

exports.default = Worker;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NodeJudge = exports.NodeOperation = exports.NodeEndpoint = exports.NodeArrow = exports.NodeLine = exports.Flow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2018年1月4日 星期四
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 工作流引擎, 基于 raphaelJs, 只用于绘制容器以及，拖动事件的相关算法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _util = __webpack_require__(0);

var _NodeEndpoint = __webpack_require__(5);

var _NodeEndpoint2 = _interopRequireDefault(_NodeEndpoint);

var _NodeOperation = __webpack_require__(6);

var _NodeOperation2 = _interopRequireDefault(_NodeOperation);

var _NodeJudge = __webpack_require__(7);

var _NodeJudge2 = _interopRequireDefault(_NodeJudge);

var _NodeLine = __webpack_require__(8);

var _NodeLine2 = _interopRequireDefault(_NodeLine);

var _NodeArrow = __webpack_require__(9);

var _NodeArrow2 = _interopRequireDefault(_NodeArrow);

var _NodeBow = __webpack_require__(10);

var _NodeBow2 = _interopRequireDefault(_NodeBow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flow = function () {
    /**
     * @param {Raphael} paper 
     */
    function Flow(paper) {
        _classCallCheck(this, Flow);

        this.paper = paper;
    }
    /**
     * 端点(圆别名) , 圆心 和 半径
     * @param {number} cx 
     * @param {number} cy 
     * @param {number} r 
     * @param {string|null} 文本框
     */


    _createClass(Flow, [{
        key: 'endpoint',
        value: function endpoint(cx, cy, r, text) {
            var nd = new _NodeEndpoint2.default(this.paper);
            nd.create(cx, cy, r, text);
            return nd;
        }
        /**
         * 判断节点
         */

    }, {
        key: 'judge',
        value: function judge(x, y, w, h, text) {
            var nd = new _NodeJudge2.default(this.paper);
            nd.create(x, y, w, h, text);
            return nd;
        }
        /**
         * 操作节点
         */

    }, {
        key: 'operation',
        value: function operation(x, y, w, h, text) {
            var nd = new _NodeOperation2.default(this.paper);
            nd.create(x, y, w, h, text);
            return nd;
        }
        /**
         * p1 -> p2 的连线
         * @param {*} p1 {x,y} 
         * @param {*} p2 
         */

    }, {
        key: 'line',
        value: function line(p1, p2) {
            var nd = new _NodeLine2.default(this.paper);
            nd.create(p1, p2);
            return nd;
        }
        /**
         * p1 -> p2 直角转线算啊分
         * @param {object} opt
         */

    }, {
        key: 'rightAngleLine',
        value: function rightAngleLine(opt) {
            var nd = new _NodeLine2.default(this.paper);
            nd.RightAngle(opt);
            return nd;
        }
        /**
         * p1 -> p2 的连线
         * @param {*} p1 {x,y} 
         * @param {*} p2 
         * @param {number} r
         */

    }, {
        key: 'arrow',
        value: function arrow(p1, p2, r) {
            var nd = new _NodeArrow2.default(this.paper);
            nd.create(p1, p2, r);
            return nd;
        }
        /**
         * 箭头
         * @param {object} opt 
         */

    }, {
        key: 'bow',
        value: function bow(opt) {
            var nd = new _NodeBow2.default(this.paper);
            nd.create(opt);
            return nd;
        }
        /**
         * 获取空节点对象
         * @param {NodeBase} type 
         */

    }, {
        key: 'getEmptyNode',
        value: function getEmptyNode(type) {
            var $node = null;
            switch (type) {
                case 'endpoint':
                    $node = new _NodeEndpoint2.default(this.paper);
                    break;
                case 'judge':
                    $node = new _NodeJudge2.default(this.paper);
                    break;
                case 'operation':
                    $node = new _NodeOperation2.default(this.paper);
                    break;
                case 'line':
                    $node = new _NodeLine2.default(this.paper);
                    break;
                case 'arrow':
                    $node = new _NodeArrow2.default(this.paper);
                    break;
            }
            return $node;
        }
    }]);

    return Flow;
}();

exports.Flow = Flow;
exports.NodeLine = _NodeLine2.default;
exports.NodeArrow = _NodeArrow2.default;
exports.NodeEndpoint = _NodeEndpoint2.default;
exports.NodeOperation = _NodeOperation2.default;
exports.NodeJudge = _NodeJudge2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _NodeBase2 = __webpack_require__(1);

var _NodeBase3 = _interopRequireDefault(_NodeBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 2018年1月5日 星期五
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 端点处理
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NodeEndpoint = function (_NodeBase) {
    _inherits(NodeEndpoint, _NodeBase);

    /**
     * 
     * @param {*} instance Raphael 实例
     */
    function NodeEndpoint(instance) {
        _classCallCheck(this, NodeEndpoint);

        var _this = _possibleConstructorReturn(this, (NodeEndpoint.__proto__ || Object.getPrototypeOf(NodeEndpoint)).call(this));

        _this.instance = instance;
        _this.opt = {};
        return _this;
    }
    /**
     * @param {object} opt / [cx, cy, r, text]
     */


    _createClass(NodeEndpoint, [{
        key: 'create',
        value: function create(opt) {
            // 解析类型
            if ('object' != (typeof opt === 'undefined' ? 'undefined' : _typeof(opt))) {
                var param = arguments;
                opt = {
                    cx: param[0],
                    cy: param[1],
                    r: param[2]
                };
                if (param[3]) {
                    opt.text = param[3];
                }
            }
            opt.h = opt.h ? opt.h : opt.r;
            this.minWidth = opt.r * 2;
            this.opt = opt;
            // 容器
            this.c = this.instance.ellipse(opt.cx, opt.cy, opt.r, opt.h); // 椭圆
            // 标签
            var label;
            if (opt.text) {
                label = this.instance.text(opt.cx, opt.cy, opt.text);
            } else {
                label = this.instance.text(opt.cx, opt.cy);
            }
            this.label = label;
            this.resizeByText();
        }
        /**
         * 根据文本宽度自动适应文本的宽度
         */

    }, {
        key: 'resizeByText',
        value: function resizeByText() {
            if (this.label) {
                var box = this.label.getBBox();
                var width = Math.ceil(box.width);
                var w = this.c.attr('rx');
                if (width < this.minWidth && w < this.minWidth) {
                    return;
                }
                // 保持最小宽度
                if (width < this.minWidth) {
                    width = this.minWidth;
                } else {
                    width += 2;
                }
                this.opt.r = width / 2;
                this.resizeByOpt();
            }
        }
        /**
         * 根据 opt 值的改变重调整容器形状大小
         */

    }, {
        key: 'resizeByOpt',
        value: function resizeByOpt() {
            var opt = this.opt;
            this.c.attr({
                cx: opt.cx,
                cy: opt.cy,
                rx: opt.r,
                ry: opt.h
            });
        }
        // 外部移动坐标处理， 

    }, {
        key: 'move',
        value: function move(x, y) {
            // 容器移动
            this.c.attr({
                cx: x,
                cy: y
            });
            // 文本联动
            this.label.attr({
                x: x, y: y
            });
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

    }, {
        key: 'ToSyncLine',
        value: function ToSyncLine(x, y) {
            var _this2 = this;

            this.syncLineMove(function (lnC, type, $ln) {
                var position = $ln.position;
                var methodName;
                if (type == 'from') {
                    var $fPath = lnC.attr('path');
                    methodName = 'get' + position.from + 'p';
                    var p1 = _this2[methodName](x, y);
                    $fPath[0] = ['M', p1.x, p1.y], lnC.attr('path', $fPath);
                } else if (type == 'to') {
                    var $tPath = lnC.attr('path');
                    methodName = 'get' + position.to + 'p';
                    var p2 = _this2[methodName](x, y);
                    $tPath[$tPath.length - 1] = ['L', p2.x, p2.y];
                    lnC.attr('path', $tPath);
                }
            });
        }
        // 箭头同步移动

    }, {
        key: 'ToSyncArrow',
        value: function ToSyncArrow(x, y) {
            var _this3 = this;

            this.syncLineMove(function (lnC, type, $ln) {
                var position = $ln.position;
                var methodName;
                if (type == 'from') {
                    methodName = 'get' + position.from + 'p';
                    var p1 = _this3[methodName](x, y);
                    $ln.updatePath([p1.x, p1.y]);
                } else if (type == 'to') {
                    methodName = 'get' + position.to + 'p';
                    var p2 = _this3[methodName](x, y);
                    $ln.updatePath(null, [p2.x, p2.y]);
                }
            });
        }
        // 获取连线的起点节点

    }, {
        key: 'getStlnP',
        value: function getStlnP(position) {
            position = position ? position : 'D';
            var methodName = 'get' + position + 'p';
            var p = this[methodName]();
            p.position = position;
            return p;
        }
        // 获取连线的终点节点

    }, {
        key: 'getEnlnP',
        value: function getEnlnP(position) {
            position = position ? position : 'B';
            var methodName = 'get' + position + 'p';
            var p = this[methodName]();
            p.position = position;
            return p;
        }
    }, {
        key: 'getAp',
        value: function getAp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x -= opt.r;
            return { x: x, y: y };
        }
    }, {
        key: 'getBp',
        value: function getBp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            y -= opt.r;
            return { x: x, y: y };
        }
    }, {
        key: 'getCp',
        value: function getCp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x += opt.r;
            return { x: x, y: y };
        }
    }, {
        key: 'getDp',
        value: function getDp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            y += opt.r;
            return { x: x, y: y };
        }
    }]);

    return NodeEndpoint;
}(_NodeBase3.default);

exports.default = NodeEndpoint;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NodeBase2 = __webpack_require__(1);

var _NodeBase3 = _interopRequireDefault(_NodeBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 2018年1月5日 星期五
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 操作处理节点
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NodeOperation = function (_NodeBase) {
    _inherits(NodeOperation, _NodeBase);

    /**
     * 
     * @param {*} instance Raphael 实例
     */
    function NodeOperation(instance) {
        _classCallCheck(this, NodeOperation);

        var _this = _possibleConstructorReturn(this, (NodeOperation.__proto__ || Object.getPrototypeOf(NodeOperation)).call(this));

        _this.instance = instance;
        _this.opt = {}; // 配置信息数据
        _this.bBox = null; // 边缘盒子数据示例
        return _this;
    }
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */


    _createClass(NodeOperation, [{
        key: 'create',
        value: function create(opt) {
            // 解析类型
            if ('object' != (typeof opt === 'undefined' ? 'undefined' : _typeof(opt))) {
                var param = arguments;
                opt = {
                    cx: param[0],
                    cy: param[1],
                    w: param[2],
                    h: param[3]
                };
                if (param[4]) {
                    opt.text = param[4];
                }
            }
            this.opt = opt;
            this.minWidth = opt.w; // 最小宽度
            // 容器        
            var ap = this.getAp();
            this.c = this.instance.rect(ap.x, ap.y, opt.w, opt.h);
            // 标签
            var label;
            if (opt.text) {
                label = this.instance.text(opt.cx, opt.cy, opt.text);
            } else {
                label = this.instance.text(opt.cx, opt.cy);
            }
            this.label = label;
            // 自动调整文本宽度
            this.resizeByText();
        }
        /**
         * 根据文本宽度自动适应文本的宽度
         */

    }, {
        key: 'resizeByText',
        value: function resizeByText() {
            if (this.label) {
                //console.log(this.label.getBBox())
                var box = this.label.getBBox();
                var width = Math.ceil(box.width);
                var w = this.c.attr('w');
                if (width < this.minWidth && w < this.minWidth) {
                    return;
                }
                // 保持最小宽度
                if (width < this.minWidth) {
                    width = this.minWidth;
                } else {
                    width += 10;
                }
                this.opt.w = width;
                var ap = this.getAp();
                this.c.attr({
                    width: width,
                    x: ap.x,
                    y: ap.y
                });
            }
        }

        // 外部移动坐标处理

    }, {
        key: 'move',
        value: function move(x, y) {
            var ctP = this.getCtpByAp(x, y);
            this.c.attr({
                x: x, y: y
            });
            this.label.attr(ctP);
        }
        // 直线同步移动

    }, {
        key: 'ToSyncLine',
        value: function ToSyncLine(x, y) {
            var _this2 = this;

            var ctP = this.getCtpByAp(x, y);
            // 直线同步移动
            this.syncLineMove(function (lnC, type, $ln) {
                var position = $ln.position,
                    methodName;
                if (type == 'from') {
                    var $fPath = lnC.attr('path');
                    methodName = 'get' + position.from + 'p';
                    var p1 = _this2[methodName](ctP.x, ctP.y);
                    $fPath[0] = ['M', p1.x, p1.y];
                    lnC.attr('path', $fPath);
                } else if (type == 'to') {
                    methodName = 'get' + position.to + 'p';
                    var p2 = _this2[methodName](ctP.x, ctP.y);
                    var $tPath = lnC.attr('path');
                    $tPath[$tPath.length - 1] = ['L', p2.x, p2.y];
                    lnC.attr('path', $tPath);
                }
            });
        }
        // 箭头同步移动

    }, {
        key: 'ToSyncArrow',
        value: function ToSyncArrow(x, y) {
            var _this3 = this;

            var ctP = this.getCtpByAp(x, y);
            this.syncLineMove(function (lnC, type, $ln) {
                var position = $ln.position,
                    methodName;
                if (type == 'from') {
                    methodName = 'get' + position.from + 'p';
                    var bP = _this3[methodName](ctP.x, ctP.y);
                    $ln.updatePath([bP.x, bP.y]);
                } else if (type == 'to') {
                    methodName = 'get' + position.to + 'p';
                    var dP = _this3[methodName](ctP.x, ctP.y);
                    $ln.updatePath(null, [dP.x, dP.y]);
                }
            });
        }
        // // 箭头v2 同步机制 移动
        // ToSyncBow(x, y){
        //     var ctP = this.getCtpByAp(x, y)
        //     this.syncLineMove((lnC, type, $ln) => {
        //         var position = $ln.position, methodName
        //         if(type == 'from'){
        //             methodName = 'get'+position.from+'p'
        //             var bP = this[methodName](ctP.x, ctP.y)         
        //             $ln.updatePath([bP.x, bP.y])
        //         }
        //         else if(type == 'to'){
        //             methodName = 'get'+position.to+'p'
        //             var dP = this[methodName](ctP.x, ctP.y)
        //             $ln.updatePath(null, [dP.x, dP.y])
        //         }
        //     })
        // }
        // 获取连线的起点节点

    }, {
        key: 'getStlnP',
        value: function getStlnP(position) {
            position = position ? position : 'Bt';
            var methodName = 'get' + position + 'p';
            var p = this[methodName]();
            p.position = position;
            return p;
        }
        // 获取连线的终点节点

    }, {
        key: 'getEnlnP',
        value: function getEnlnP(position) {
            position = position ? position : 'T';
            var methodName = 'get' + position + 'p';
            var p = this[methodName]();
            p.position = position;
            return p;
        }
        // 根据 A 点获取 中心点

    }, {
        key: 'getCtpByAp',
        value: function getCtpByAp(x, y) {
            var opt = this.opt;
            x += opt.w / 2;
            y += opt.h / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getAp',
        value: function getAp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x -= opt.w / 2;
            y -= opt.h / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getBp',
        value: function getBp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x -= opt.w / 2;
            y += opt.h / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getCp',
        value: function getCp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x += opt.w / 2;
            y += opt.h / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getDp',
        value: function getDp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x -= opt.w / 2;
            y += opt.h / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getTp',
        value: function getTp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            y -= opt.h / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getRp',
        value: function getRp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x += opt.w / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getBtp',
        value: function getBtp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            y += opt.h / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getLp',
        value: function getLp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x -= opt.w / 2;
            return { x: x, y: y };
        }
    }]);

    return NodeOperation;
}(_NodeBase3.default);

exports.default = NodeOperation;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NodeBase2 = __webpack_require__(1);

var _NodeBase3 = _interopRequireDefault(_NodeBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 2018年1月5日 星期五
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 判断处理节点
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var NodeJudge = function (_NodeBase) {
    _inherits(NodeJudge, _NodeBase);

    /**
     * 
     * @param {*} instance Raphael 实例
     */
    function NodeJudge(instance) {
        _classCallCheck(this, NodeJudge);

        var _this = _possibleConstructorReturn(this, (NodeJudge.__proto__ || Object.getPrototypeOf(NodeJudge)).call(this));

        _this.instance = instance;
        _this.opt = {}; // 配置信息数据
        return _this;
    }
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */


    _createClass(NodeJudge, [{
        key: 'create',
        value: function create(opt) {
            // 解析类型
            if ('object' != (typeof opt === 'undefined' ? 'undefined' : _typeof(opt))) {
                var param = arguments;
                opt = {
                    cx: param[0],
                    cy: param[1],
                    w: param[2],
                    h: param[3]
                };
                if (param[4]) {
                    opt.text = param[4];
                }
            }
            this.opt = opt;
            this.minWidth = opt.w;
            // 容器        
            var ap = this.getAp();
            var bp = this.getBp();
            var cp = this.getCp();
            var dp = this.getDp();
            this.c = this.instance.path('M' + ap.x + ',' + ap.y + 'L' + bp.x + ',' + bp.y + 'L' + cp.x + ',' + cp.y + 'L' + dp.x + ',' + dp.y + 'Z');
            // 标签
            var label;
            if (opt.text) {
                label = this.instance.text(opt.cx, opt.cy, opt.text);
            } else {
                label = this.instance.text(opt.cx, opt.cy);
            }
            this.label = label;
            this.resizeByText();
        }
        /**
         * 根据文本宽度自动适应文本的宽度
         */

    }, {
        key: 'resizeByText',
        value: function resizeByText() {
            if (this.label) {
                var box = this.label.getBBox();
                var width = Math.ceil(box.width);
                var w = this.c.attr('w');
                if (width < this.minWidth && w < this.minWidth) {
                    return;
                }
                // 保持最小宽度
                if (width < this.minWidth) {
                    width = this.minWidth;
                } else {
                    width += 25;
                }
                this.opt.w = width;
                this.resizeByOpt();
            }
        }
        /**
         * 根据 opt 值的改变重调整容器形状大小
         */

    }, {
        key: 'resizeByOpt',
        value: function resizeByOpt() {
            var ap = this.getAp();
            var bp = this.getBp();
            var cp = this.getCp();
            var dp = this.getDp();
            this.c.attr('path', [['M', ap.x, ap.y], ['L', bp.x, bp.y], ['L', cp.x, cp.y], ['L', dp.x, dp.y], ['Z']]);
        }
        // 按照 A 点移动

    }, {
        key: 'move',
        value: function move(x, y) {
            var ctP = this.getCpByAp(x, y);
            var bP = this.getBp(ctP.x, ctP.y);
            var cP = this.getCp(ctP.x, ctP.y);
            var dP = this.getDp(ctP.x, ctP.y);
            // 容器移动
            this.c.attr('path', [['M', x, y], ['L', bP.x, bP.y], ['L', cP.x, cP.y], ['L', dP.x, dP.y], ['Z']]);
            // 文本移动
            this.label.attr(ctP);
        }
        // 直线同步移动

    }, {
        key: 'ToSyncLine',
        value: function ToSyncLine(x, y) {
            var _this2 = this;

            var ctP = this.getCpByAp(x, y);
            this.syncLineMove(function (lnC, type, $ln) {
                var position = $ln.position;
                var methodName;
                if (type == 'from') {
                    methodName = 'get' + position.from + 'p';
                    var p1 = _this2[methodName](ctP.x, ctP.y);
                    var $fPath = lnC.attr('path');
                    $fPath[0] = ['M', p1.x, p1.y];
                    lnC.attr('path', $fPath);
                } else if (type == 'to') {
                    methodName = 'get' + position.to + 'p';
                    var p2 = _this2[methodName](ctP.x, ctP.y);
                    var $tPath = lnC.attr('path');
                    $tPath[$tPath.length - 1] = ['L', p2.x, p2.y];
                    lnC.attr('path', $tPath);
                }
            });
        }
        // 箭头同步器

    }, {
        key: 'ToSyncArrow',
        value: function ToSyncArrow(x, y) {
            var _this3 = this;

            var ctP = this.getCpByAp(x, y);
            this.syncLineMove(function (lnC, type, $ln) {
                var position = $ln.position;
                var methodName;
                if (type == 'from') {
                    methodName = 'get' + position.from + 'p';
                    var p1 = _this3[methodName](ctP.x, ctP.y);
                    $ln.updatePath([p1.x, p1.y]);
                } else if (type == 'to') {
                    methodName = 'get' + position.to + 'p';
                    var p2 = _this3[methodName](ctP.x, ctP.y);
                    $ln.updatePath(null, [p2.x, p2.y]);
                }
            });
        }
        // 获取连线的起点节点

    }, {
        key: 'getStlnP',
        value: function getStlnP(position) {
            // var position = 'D'
            position = position ? position : 'D';
            var methodName = 'get' + position + 'p';
            // var p = this.getDp()
            var p = this[methodName]();
            // 起点重合
            if (this.isCoincidence(p, 'from')) {
                p = this.getCp();
                position = 'C';
            }
            var nP = { x: p.x, y: p.y, position: position };
            return nP;
        }
        // 获取连线的终点节点

    }, {
        key: 'getEnlnP',
        value: function getEnlnP(position) {
            position = position ? position : 'B';
            // var p = this.getBp()
            var methodName = 'get' + position + 'p';
            var p = this[methodName]();
            p.position = position;
            return p;
        }
        /**
         * 根据 A 点获取中心点
         */

    }, {
        key: 'getCpByAp',
        value: function getCpByAp(x, y) {
            var opt = this.opt;
            x += opt.w / 2;
            return { x: x, y: y };
        }
        // A 点

    }, {
        key: 'getAp',
        value: function getAp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x -= opt.w / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getBp',
        value: function getBp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            y -= opt.h / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getCp',
        value: function getCp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            x += opt.w / 2;
            return { x: x, y: y };
        }
    }, {
        key: 'getDp',
        value: function getDp(x, y) {
            var opt = this.opt;
            x = x ? x : opt.cx;
            y = y ? y : opt.cy;
            y += opt.h / 2;
            return { x: x, y: y };
        }
        /**
         * 是否为重合点
         * @param {object} p {x,y}
         * @param {string} type [from/to]
         * @returns {boolean}
         */

    }, {
        key: 'isCoincidence',
        value: function isCoincidence(p, type) {
            var successMK = false;
            if (p && 'object' == (typeof p === 'undefined' ? 'undefined' : _typeof(p)) && 'undefined' != typeof p.x && 'undefined' != typeof p.y) {
                // 起点
                if ('from' == type) {
                    if (this.fromLine.length > 0) {
                        for (var i = 0; i < this.fromLine.length; i++) {
                            var $line = this.fromLine[i];
                            var path = $line.c.attr('path');
                            var pathArr = path[0];
                            if (pathArr[1] == p.x && pathArr[2] == p.y) {
                                successMK = true;
                                break;
                            }
                        }
                    }
                }
                // 终点
                else if ('to' == type) {
                        if (this.toLine.length > 0) {
                            for (var j = 0; j < this.toLine.length; j++) {
                                var $line = this.toLine[j];
                                var path = $line.c.attr('path');
                                var pathArr = path[path.length - 1];
                                if (pathArr[1] == p.x && pathArr[2] == p.y) {
                                    successMK = true;
                                    break;
                                }
                            }
                        }
                    }
            }
            return successMK;
        }
    }]);

    return NodeJudge;
}(_NodeBase3.default);

exports.default = NodeJudge;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2018年1月5日 星期五
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 连接类型： 连线
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeLine = function () {
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    function NodeLine(instance) {
        _classCallCheck(this, NodeLine);

        this.instance = instance;
        this.opt = {}; // 配置信息数据
        this.position = {}; // 连接点        
        /*
            {from: A/B/C/D, to: A/B/C/D}
        */

        this.rightAngle = false; // 直线直角连法
    }

    _createClass(NodeLine, [{
        key: 'create',
        value: function create(p1, p2) {
            this.opt = {
                p1: p1, p2: p2
            };
            this.c = this.instance.path('M' + p1[0] + ',' + p1[1] + 'L' + p2[0] + ',' + p2[1]);
        }
        /**
         * 直角连接法
         * @param {object} opt {p1{x,y}, p2, d}
         */

    }, {
        key: 'RightAngle',
        value: function RightAngle(opt) {
            this.opt = opt;
            this.rightAngle = true;
            var p1 = opt.p1,
                p2 = opt.p2,
                d0 = 20;
            if (opt.d) {
                d0 = opt.d;
            }
            var middlePathStr = '';
            if (p1.x != p2.x && p1.y != p2.y) {
                var d1 = p2.x - p1.x;
                middlePathStr = 'L' + (p1.x + d1 + d0 * (d1 > 0 ? 1 : -1)) + ',' + p1.y + 'L' + (p1.x + d1 + d0 * (d1 > 0 ? 1 : -1)) + ',' + p2.y + '';
            }

            this.c = this.instance.path('M' + p1.x + ',' + p1.y + middlePathStr + 'L' + p2.x + ',' + p2.y);
        }

        /**
         * 直接通过坐标点生成直线
         * @param {object} point 
         */

    }, {
        key: 'createByPoint',
        value: function createByPoint(point) {
            this.opt = point;
            var pathStr = '';
            _util.Util.each(this.opt.points, function (index, value) {
                if (value) {
                    pathStr += (pathStr ? 'L' : 'M') + value.x + ',' + value.y;
                }
            });
            this.c = this.instance.path(pathStr);
        }
    }]);

    return NodeLine;
}();

exports.default = NodeLine;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2018年1月6日 星期六
 * 连接类型： 箭头
 */

var NodeArrow = function () {
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    function NodeArrow(instance) {
        _classCallCheck(this, NodeArrow);

        this.instance = instance;
        this.opt = {}; // 配置信息数据
        this.position = {}; // 连接点
        /*
            {from: A/B/C/D, to: A/B/C/D}
        */
    }
    /**
     * 画箭头，p1 开始位置,p2 结束位置, r前头的边长
     * @param {*} p1 [x,y]
     * @param {*} p2 [x,y]
     * @param {*} r  
     */


    _createClass(NodeArrow, [{
        key: 'create',
        value: function create(p1, p2, r) {
            this.opt = {
                p1: p1, p2: p2, r: r
                // 非同 x 线
            };var points = this.getPoints();
            this.c = this.instance.path('M' + p1[0] + ',' + p1[1] + 'L' + p2[0] + ',' + p2[1] + 'L' + points.cP.x + ',' + points.cP.y + 'L' + points.dP.x + ',' + points.dP.y + 'L' + p2[0] + ',' + p2[1]);
        }
        // 获取点序列

    }, {
        key: 'getPoints',
        value: function getPoints(p1, p2, r) {
            var opt = this.opt;
            if (!p1) {
                p1 = opt.p1;
            }
            if (!p2) {
                p2 = opt.p2;
            }
            if (!r) {
                r = opt.r;
            }
            var atan = Math.atan2(p1[1] - p2[1], p2[0] - p1[0]) * (180 / Math.PI);

            var centerX = p2[0] - r * Math.cos(atan * (Math.PI / 180));
            var centerY = p2[1] + r * Math.sin(atan * (Math.PI / 180));

            var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
            var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

            var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
            var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));
            return {
                cP: { x: x2, y: y2 },
                dP: { x: x3, y: y3 }
            };
        }
        /**
         * 更细记录表
         * @param {*} p1 
         * @param {*} p2 
         * @param {*} r 
         */

    }, {
        key: 'updatePath',
        value: function updatePath(p1, p2, r) {
            var opt = this.opt;
            if (!p1) {
                p1 = opt.p1;
            }
            if (!p2) {
                p2 = opt.p2;
            }
            if (!r) {
                r = opt.r;
            }
            var points = this.getPoints(p1, p2, r);
            this.c.attr('path', [['M', p1[0], p1[1]], ['L', p2[0], p2[1]], ['L', points.cP.x, points.cP.y], ['L', points.dP.x, points.dP.y], ['L', p2[0], p2[1]]]);
            // 同步更新记录
            this.opt = {
                p1: p1, p2: p2, r: r
            };
        }
    }]);

    return NodeArrow;
}();

exports.default = NodeArrow;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2018年1月23日 星期二
 * 弓形箭头
 */
/**
 * 
 * 
 * @class NodeBow
/**
 * 
 * 
 * @class NodeBow
 */
var NodeBow = function () {
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    function NodeBow(instance) {
        _classCallCheck(this, NodeBow);

        this.instance = instance;
        this.opt = {}; // 配置信息数据
        this.position = {}; // 连接点
        /*
            {from: A/B/C/D, to: A/B/C/D}
            this.arrow = 箭头实例
            this.body = 箭体实例
        */
    }
    /**
     * 弓形箭头创建
     * @param {*} opt   {r: 直径, queue:[点队列]}
     */


    _createClass(NodeBow, [{
        key: 'create',
        value: function create(opt) {
            this.opt = opt;
            this.queueCheck();
            this.bodySharp();
            this.arrowSharp();
        }
        /**
         * 箭头
         */

    }, {
        key: 'arrowSharp',
        value: function arrowSharp() {
            var opt = this.opt;
            var pointQue = opt.queue;
            var r = opt.r ? opt.r : 5;
            var len = pointQue.length;
            var p2 = pointQue[len - 1];
            var p1 = pointQue[len - 2];

            // 系统
            var atan = Math.atan2(p1.y - p2.y, p2.x - p1.x) * (180 / Math.PI);
            var centerX = p2.x - r * Math.cos(atan * (Math.PI / 180));
            var centerY = p2.y + r * Math.sin(atan * (Math.PI / 180));

            var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
            var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));

            var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
            var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));

            if (!this.arrow) {
                this.arrow = this.instance.path('M' + p2.x + ',' + p2.y +
                // 箭头体
                'L' + x2 + ',' + y2 + 'L' + x3 + ',' + y3 + 'L' + p2.x + ',' + p2.y);
            } else {
                this.arrow.attr('path', [['M', p2.x, p2.y],
                // 箭头体
                ['L', x2, y2], ['L', x3, y3], ['L', p2.x, p2.y]]);
            }
        }
        /**
         * 键体
         */

    }, {
        key: 'bodySharp',
        value: function bodySharp() {
            var queue = this.opt.queue;
            var pathStr = '';
            var pathArr = [];
            var hasInstance = false,
                isM = true;
            hasInstance = this.c ? true : false;

            for (var i = 0; i < queue.length; i++) {
                var que = queue[i];
                if (hasInstance) {
                    if (isM) {
                        if (pathArr.length > 0) {
                            isM = false;
                        }
                    }
                    pathArr.push([isM ? 'M' : 'L', que.x, que.y]);
                } else {
                    pathStr += (pathStr ? 'L' : 'M') + ',' + que.x + ',' + que.y;
                }
            }
            if (hasInstance) {
                this.c.attr('path', pathArr);
            } else {
                this.c = this.instance.path(pathStr);
            }
        }
        /**
         * 点队列检测
         */

    }, {
        key: 'queueCheck',
        value: function queueCheck() {
            var queue = this.opt.queue;
            // 双点检测  “ 7 形 ”
            if (queue.length == 2) {
                var middlePoint = [];
                var p1 = queue[0],
                    p2 = queue[1];
                if (p1.x < p2.x) {
                    middlePoint.push({ x: p2.x, y: p1.y });
                } else if (p1.x > p2.x) {
                    // 20 @issue 需要可配置接口
                    middlePoint.push({ x: p1.x, y: p2.y - 20 });
                    middlePoint.push({ x: p2.x, y: p2.y - 20 });
                }
                this.opt.queue = [p1].concat(middlePoint, p2);
            }
        }
        /**
         * 更细记录表
         * @param {*} p1 
         * @param {*} p2 
         * @param {*} r 
         */

    }, {
        key: 'updatePath',
        value: function updatePath(p1, p2, r) {
            var opt = this.opt;
            if (p1) {
                opt.queue[0] = { x: p1[0], y: p1[1] };
            }
            if (p2) {
                var len = opt.queue.length - 1;
                opt.queue[len] = { x: p2[0], y: p2[1] };
            }

            // 自适应的星形状变化
            this.queueCheck();
            this.bodySharp();
            this.arrowSharp();
        }
    }]);

    return NodeBow;
}();

exports.default = NodeBow;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2018年1月8日 星期一
 * 内部处理类，从 worker.js/flow.js 内部分离
 */
// 实例索引序列
var instanceIndex = 0;
var instanceSource = {}; // 实列资源队列

// 内部协助函数(私有)

var H = function () {
    function H() {
        _classCallCheck(this, H);
    }

    _createClass(H, null, [{
        key: 'createInstance',

        /**
         * 内部函数生成实例
         * @param {*} config 
         */
        value: function createInstance(config) {
            config = 'object' == (typeof config === 'undefined' ? 'undefined' : _typeof(config)) ? config : {};
            if (!config.dom) {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn('[Worker] 配置文件无效，缺少 config.dom');
                }
            }
            // 生成 HTML
            if ('string' == typeof config.dom) {
                config.dom = $(config.dom);
            }
            if (!config.w) {
                config.w = parseInt($(window).width() * 1.1);
            }
            if (!config.h) {
                config.h = parseInt($(window).height() * 1.1);
            }
            return Raphael(config.dom.get(0), config.w, config.h);
        }
    }, {
        key: 'onMoveEvt',
        value: function onMoveEvt() {}
    }, {
        key: 'onStartEvt',
        value: function onStartEvt() {}
    }, {
        key: 'onEndEvt',
        value: function onEndEvt() {}
        /**
         * 内部索引序列
         */

    }, {
        key: 'getIndex',
        value: function getIndex() {
            instanceIndex += 1;
            return instanceIndex;
        }
        /**
         * 内部资源处理
         * @param {number} index 
         * @param {string|null} key 
         * @param {*} value 
         */

    }, {
        key: 'src',
        value: function src(index, key, value) {
            if (!instanceSource[index]) {
                instanceSource[index] = {};
            }
            var dd = instanceSource[index];
            if ('undefined' == typeof key) {
                return dd;
            }
            if ('undefined' == typeof value) {
                return dd[key] || null;
            }
            dd[key] = value;
        }
    }]);

    return H;
}();

exports.default = H;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
/******/ ]);