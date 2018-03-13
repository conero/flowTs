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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2018年1月7日 星期日
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 从 Worker.js 迁移过来的树形生成图；可用于生成家族树
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _TreeContainer = __webpack_require__(3);

var _TreeContainer2 = _interopRequireDefault(_TreeContainer);

var _util = __webpack_require__(0);

var _helper = __webpack_require__(8);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 工作流实例类
 */
var Tree = function () {
    /**
     * @param {object} option  工作流配置对象
     * @param {object} config  dom 等相关配置 *
     */
    function Tree(config, option) {
        _classCallCheck(this, Tree);

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
        this.Nodes = {};
        this.config = _util.Util.clone(config);
        this.$raphael = _helper2.default.createInstance(this.config);
        this.$flow = new _TreeContainer2.default(this.$raphael);
        this.setOption(option);
        this.draw();
        // console.log(this.config)
    }
    // 绘制工作流图


    _createClass(Tree, [{
        key: 'draw',
        value: function draw() {
            var _this = this;

            if (this.option) {
                var steps = this.option.nodes;
                // 生成代码索引
                this.codeIndex(steps);
                var config = this.config;
                var bkgdF = this.feature('background.female', 'rgb(190, 113, 82)');
                var bkgdM = this.feature('background.male', 'rgb(224, 223, 226)');
                this.createFeatureKey(bkgdF, bkgdM);
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
                    var nd;

                    var w = 100;
                    var sameClsNode = this.codeIndex(step.code);
                    var x0 = x;
                    // 只有一个父类
                    if (step.parent) {
                        if (step.parent.indexOf(',') == -1) {
                            var parentNd = this.getNodeByCode(step.parent);
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
                        var x1 = x0 - w / 2;
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
                    // 女
                    if (step.type == 'F') {
                        nd.c.attr('fill', bkgdF);
                    }
                    // 男
                    else {
                            nd.c.attr('fill', bkgdM);
                        }
                    y += cH / 2;

                    if (nd) {
                        this.Nodes[step.code] = nd;
                        this.line(nd);
                    }
                }
            }
        }
        // 生成属性键值

    }, {
        key: 'createFeatureKey',
        value: function createFeatureKey(mbkg, fbkg) {
            var x = 20,
                y = 20,
                w = 20,
                h = 20;
            var fk1 = this.$flow.operation(x, y, w, h, '男');
            fk1.c.attr('fill', fbkg);
            var fk2 = this.$flow.operation(x, y + (20 + w), w, h, '女');
            fk2.c.attr('fill', mbkg);
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
                    if (conf.line && conf.line == 'arrow') {
                        $nd.ToSyncArrow(dx, dy);
                    } else {
                        $nd.ToSyncLine(dx, dy);
                    }
                },
                // onstart
                function () {
                    var _x, _y;
                    if ('circle' == this.type) {
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
        // 连线

    }, {
        key: 'line',
        value: function line(nd) {
            var _this2 = this;

            var step = _util.Util.clone(nd.$step);
            if (step.parent) {
                step.parent = step.parent.replace(/\s/g, '');
            }
            if (step.parent) {
                var config = this.config;
                var makerLine = function makerLine(from, to) {
                    var $lineInstance;
                    var fromNd = _this2.getNodeByCode(from);
                    var toNd = _this2.getNodeByCode(to);
                    if (fromNd && toNd) {
                        var p1 = fromNd.getStlnP(),
                            p2 = toNd.getEnlnP();

                        if (config.line && 'arrow' == config.line) {
                            $lineInstance = _this2.$flow.arrow([p1.x, p1.y], [p2.x, p2.y], 4);
                            $lineInstance.c.attr('fill', 'rgb(14, 10, 10)');
                        } else {
                            $lineInstance = _this2.$flow.line([p1.x, p1.y], [p2.x, p2.y]);
                        }
                        fromNd.recordLine('from', $lineInstance);
                        // fromNd.recordLine('to', $lineInstance)
                        toNd.recordLine('to', $lineInstance);
                    }
                };
                var prev;
                if (step.parent.indexOf(',') > -1) {
                    prev = step.parent.split(',');
                } else {
                    prev = [step.parent];
                }
                for (var i = 0; i < prev.length; i++) {
                    makerLine(prev[i], step.code);
                }
            }
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
            if (this.Nodes[code]) {
                return this.Nodes[code];
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
                    if (!step.parent) {
                        clsMap[code] = 1;
                    } else {
                        var prev = step.parent.replace(/\s/g, '').split(',');
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
                                // 根据子级更新父级
                                if ('object' != _typeof(clsMap[code])) {
                                    var cls2 = clsMap[code];
                                    if (cls == 2 && clsMap[prevCode]) {
                                        clsMap[prevCode] = cls2 - 1;
                                        continue;
                                    }
                                    clsMap[code] = [cls2];
                                }
                                clsMap[code].push(cls);
                                clsMap[code] = _util.Util.ArrayMergeSameValue(clsMap[code]);
                            }
                        }
                    }
                }
                console.log(clsMap);
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
         * 获取特性
         * @param {*} key 
         * @param {*} def 
         */

    }, {
        key: 'feature',
        value: function feature(key, def) {
            def = def || null;
            var feature = this.option.feature;
            if (key && 'object' == (typeof feature === 'undefined' ? 'undefined' : _typeof(feature))) {
                key = key.replace(/\s/g, '').split('.');
                var tempData = _util.Util.clone(feature);
                _util.Util.each(key, function (idx, value) {
                    if (tempData && 'object' == (typeof tempData === 'undefined' ? 'undefined' : _typeof(tempData))) {
                        tempData = tempData[value] || def;
                    }
                    // 为空时
                    else if (!tempData) {
                            tempData = def;
                            return false;
                        }
                });
                def = tempData;
            }
            return def;
        }
    }]);

    return Tree;
}();

exports.default = Tree;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2018年1月8日 星期一
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 树形容器生成器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _util = __webpack_require__(0);

var _NodeOperation = __webpack_require__(4);

var _NodeOperation2 = _interopRequireDefault(_NodeOperation);

var _NodeLine = __webpack_require__(6);

var _NodeLine2 = _interopRequireDefault(_NodeLine);

var _NodeArrow = __webpack_require__(7);

var _NodeArrow2 = _interopRequireDefault(_NodeArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TreeContainer = function () {
  /**
   * @param {Raphael} paper 
   */
  function TreeContainer(paper) {
    _classCallCheck(this, TreeContainer);

    this.paper = paper;
  }
  /**
   * 操作节点
   */


  _createClass(TreeContainer, [{
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
  }]);

  return TreeContainer;
}();

exports.default = TreeContainer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NodeBase2 = __webpack_require__(5);

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

        _this.NodeType = 'opera';
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
            this.opt.cx = x;
            this.opt.cy = y;
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
/* 5 */
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
        this.NodeType = null; // 节点类型
    }
    /**
     * 记录连接线
     * @param {stirng} type 连接线类型
     * @param {this}  $node 节点实例
     */


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
         * 同步处理连线
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
        /**
         * 公共接口化
         * NodeBase struct to json 对象， 用于生产节点中 “struct” 的数据结构
         * @returns {object}
         */

    }, {
        key: 'toJson',
        value: function toJson() {
            var _struct = {
                NodeType: this.NodeType, // 节点类型
                opt: this.opt, // 数据属性
                c: {
                    attr: this.c.attr() // 容器属性值
                }
            };
            if (this.label) {
                // 节点标签
                _struct.label = {
                    attr: this.label.attr()
                };
            }
            return _struct;
        }
    }]);

    return NodeBase;
}();

exports.default = NodeBase;

/***/ }),
/* 6 */
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

        this.NodeType = 'line';
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
/* 7 */
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

        this.NodeType = 'arrow';
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
/* 8 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ })
/******/ ]);