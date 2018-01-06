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
            } else if ('to' == $node) {
                this.toLine.push($node);
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

var _flow2 = _interopRequireDefault(_flow);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    }]);

    return H;
}();

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
        // 工作流实例
        this.Nodes = {};
        this.config = _util.Util.clone(config);
        this.$raphael = H.createInstance(this.config);
        this.$flow = new _flow2.default(this.$raphael);
        this.setOption(option);
        this.draw();
        // console.log(this.config)
    }
    // 绘制工作流图


    _createClass(Worker, [{
        key: 'draw',
        value: function draw() {
            if (this.option) {
                var steps = this.option.step;
                var config = this.config;
                var x = config.x || parseInt(config.w * 0.4);
                var y = config.y || 10;
                // console.log(x ,y)
                for (var i = 0; i < steps.length; i++) {
                    var step = steps[i];
                    var nd;
                    // 开始
                    if (1 == step.type) {
                        var r = 30;
                        y += r;
                        nd = this.$flow.endpoint(x, y, r, step.name);
                        nd.c.attr('fill', 'rgb(181, 216, 126)');
                        nd.$step = step;
                        this.drag(nd);
                        // console.log(nd)
                    }
                    // 操作节点
                    else if (2 == step.type) {
                            y += 100;
                            var w = 100,
                                h = 50;
                            // console.log(x, y, w, h, step.name)
                            nd = this.$flow.operation(x, y, w, h, step.name);
                            nd.$step = step;
                            this.drag(nd);
                            nd.c.attr('fill', 'rgb(224, 223, 226)');
                        }
                        // 判断节点
                        else if (3 == step.type) {
                                y += 100;
                                nd = this.$flow.judge(x, y, w + 60, h + 10, step.name);
                                nd.c.attr('fill', 'rgb(49, 174, 196)');
                                nd.$step = step;
                                this.drag(nd);
                                // y += 80 + 20
                                y += 60;
                            }
                            // 结束
                            else if (9 == step.type) {
                                    var r = 30;
                                    y += r + 60;
                                    nd = this.$flow.endpoint(x, y, r, step.name);
                                    nd.c.attr('fill', 'rgb(34, 185, 41)');
                                    nd.$step = step;
                                    this.drag(nd);
                                }

                    if (nd) {
                        this.Nodes[step.code] = nd;
                        this.line(nd);
                    }
                }
            }
        }
        // 移动处理

    }, {
        key: 'drag',
        value: function drag(nd) {
            (function ($nd) {
                var $c = $nd.c;
                var cDragDt = {};
                $c.drag(
                // onmove
                function (dx, dy) {
                    dx += cDragDt.x;
                    dy += cDragDt.y;
                    $nd.move(dx, dy);
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
            })(nd);
        }
        // 连线

    }, {
        key: 'line',
        value: function line(nd) {
            var _this = this;

            var step = _util.Util.clone(nd.$step);
            if (step.prev) {
                step.prev = step.prev.replace(/\s/g, '');
            }
            if (step.prev) {
                var makerLine = function makerLine(from, to) {
                    var $lineInstance;
                    var fromNd = _this.getNodeByCode(from);
                    var toNd = _this.getNodeByCode(to);
                    if (fromNd && toNd) {
                        $lineInstance = _this.$flow.line(fromNd.getStlnP(), toNd.getEnlnP());
                        fromNd.recordLine('from', $lineInstance);
                        fromNd.recordLine('to', $lineInstance);
                    }
                };
                var prev;
                if (step.prev.indexOf(',') > -1) {
                    prev = step.prev.split(',');
                } else {
                    prev = [step.prev];
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
    }, {
        key: 'getNodeByCode',
        value: function getNodeByCode(code) {
            var node = null;
            if (this.Nodes[code]) {
                return this.Nodes[code];
            }
            return node;
        }
    }]);

    return Worker;
}();

exports.default = Worker;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  }]);

  return Flow;
}();

exports.default = Flow;

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
            this.opt = opt;
            // 容器
            this.c = this.instance.circle(opt.cx, opt.cy, opt.r);
            // 标签
            var label;
            if (opt.text) {
                label = this.instance.text(opt.cx, opt.cy, opt.text);
            } else {
                label = this.instance.text(opt.cx, opt.cy);
            }
            this.label = label;
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
            // 直线同步移动
            var fLines = this.fromLine;
            var tLines = this.toLine;
            var dP = this.getDp(x, y);
            for (var i = 0; i < fLines.length; i++) {
                var $fC = fLines[i].c;
                var $fPath = $fC.attr('path');
                $fC.attr('path', [['M', dP.x, dP.y], $fPath[1]]);
            }
            var bP = this.getBp(x, y);
            for (var j = 0; j < tLines.length; j++) {
                var $tC = fLines[i].c;
                var $tPath = $tC.attr('path');
                $tC.attr('path', [$tPath[0], ['L', dP.x, dP.y]]);
            }
        }
        // 获取连线的起点节点

    }, {
        key: 'getStlnP',
        value: function getStlnP() {
            var p = this.getBp();
            return [p.x, p.y];
        }
        // 获取连线的终点节点

    }, {
        key: 'getEnlnP',
        value: function getEnlnP() {
            var p = this.getDp();
            return [p.x, p.y];
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
            x += opt.r;
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
        // 获取连线的起点节点

    }, {
        key: 'getStlnP',
        value: function getStlnP() {
            var p = this.getTp();
            return [p.x, p.y];
        }
        // 获取连线的终点节点

    }, {
        key: 'getEnlnP',
        value: function getEnlnP() {
            var p = this.getBtp();
            return [p.x, p.y];
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
            y += opt.h / 2;
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
        // 获取连线的起点节点

    }, {
        key: 'getStlnP',
        value: function getStlnP() {
            var p = this.getAp();
            return [p.x, p.y];
        }
        // 获取连线的终点节点

    }, {
        key: 'getEnlnP',
        value: function getEnlnP() {
            var p = this.getDp();
            return [p.x, p.y];
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 2018年1月5日 星期五
 * 连接类型： 连线
 */

var NodeLine = function () {
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    function NodeLine(instance) {
        _classCallCheck(this, NodeLine);

        this.instance = instance;
        this.opt = {}; // 配置信息数据
    }

    _createClass(NodeLine, [{
        key: 'create',
        value: function create(p1, p2) {
            this.opt = {
                p1: p1, p2: p2
            };
            this.c = this.instance.path('M' + p1[0] + ',' + p1[1] + 'L' + p2[0] + ',' + p2[1]);
        }
    }]);

    return NodeLine;
}();

exports.default = NodeLine;

/***/ })
/******/ ]);