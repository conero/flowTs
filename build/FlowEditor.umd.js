(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("raphael"));
	else if(typeof define === 'function' && define.amd)
		define(["raphael"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("raphael")) : factory(root["raphael"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_13__) {
return /******/ (function(modules) { // webpackBootstrap
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NodeBase2 = __webpack_require__(0);

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

        _this.NodeType = 'judge';
        _this.instance = instance;
        _this.opt = {}; // 配置信息数据
        return _this;
    }
    /**
     * 仅仅生成容器并且返回对象
     * @param {number} cx 
     * @param {number} cy 
     * @param {number} w 
     * @param {number} h 
     * @returns RaphaelElement
     */


    _createClass(NodeJudge, [{
        key: 'onlyCell',
        value: function onlyCell(cx, cy, w, h) {
            this.opt = { cx: cx, cy: cy, w: w, h: h
                // 容器        
            };var ap = this.getAp();
            var bp = this.getBp();
            var cp = this.getCp();
            var dp = this.getDp();
            return this.instance.path('M' + ap.x + ',' + ap.y + 'L' + bp.x + ',' + bp.y + 'L' + cp.x + ',' + cp.y + 'L' + dp.x + ',' + dp.y + 'Z');
        }
        /**
         * @param {object} opt / [cx, cy, w, h, text]
         */

    }, {
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
            // 数据选项值更新
            this.opt.cx = ctP.x;
            this.opt.cy = ctP.y;
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _WorkerEditor = __webpack_require__(4);

var _WorkerEditor2 = _interopRequireDefault(_WorkerEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Raphael) {
    window.Raphael = Raphael;
    return _WorkerEditor2.default;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); /**
     * 2018年3月7日 星期三
     * 浏览器端，非 npm 管理引入包
     * Joshua Conero
     */

/*--
    Raphael 包与 worker 同文件打包时，umd 规范出错： eve is not defined // 2018年3月7日 星期三
--
*/

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2018年3月1日 星期四
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * worker 工作流编辑器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
// 助手方法


var _helper = __webpack_require__(5);

var _helper2 = _interopRequireDefault(_helper);

var _NodeJudge = __webpack_require__(2);

var _NodeJudge2 = _interopRequireDefault(_NodeJudge);

var _flow = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 配置参数常量 , type 1801 为特殊类型
var Conf = {
    start: {
        type: 1,
        text: '开始'
    },
    opera: {
        type: 2,
        text: '任务'
    },
    judge: {
        type: 3,
        text: '判断'
    },
    end: {
        type: 9,
        text: '结束'
    },
    arrow: {
        type: 1801,
        text: '箭头'
    },
    text: {
        type: 1802,
        text: '文本框',
        size: 10, // 默认大小
        selected: { // 选择属性
            'font-size': 20,
            'fill': 'red'
        },
        // 默认属性
        defAtrr: {
            'font-size': 10,
            'fill': 'black'
        }
    }
    /**
     * 工作流编辑器轻量级
     */
};
var WorkerEditor = function () {
    /**
     * @param {object} config 数据配置项
     */
    function WorkerEditor(config) {
        _classCallCheck(this, WorkerEditor);

        this.config = config; // 系统配置参数
        this.raphael = _helper2.default.createInstance(config); // Raphael 对象        
        // 配置参数处理
        this._configMergeToDefule();
        this._rIdx = 0; // 内部索引，用于生成代码
        this._code2EidDick = {}; // 内部代码与元素id的映射字段
        this._LineDragingP = null; // RaphaelElement 直线正在拖动记录点
        this.flow = new _flow.Flow(this.raphael); // 工作流程按钮
        // 内部缓存数组件容器： 节点、连接线、独立文本
        this.nodeQueues = []; // 运行节点数
        this.lineQueues = []; // 连线记录器
        this.textQueues = [];
        this.tempNodes = []; // 临时节点集
        this.MagneticCore = null; // 连线磁化中心点，用于节点关联，单状态的结构 data: {type: from/to}
        // 工具栏显示控制
        if (!this.config.noToolBar) {
            this._toolbar();
        }
        if (this.config.stepCfg) {
            try {
                this.loadStep(this.config.stepCfg);
            } catch (error) {
                console.log(error);
            }
        }
    }
    /**
     * 配置参数与默认参数和合并处理
     */


    _createClass(WorkerEditor, [{
        key: '_configMergeToDefule',
        value: function _configMergeToDefule() {
            // pkgClr 背景颜色
            var pkgClr = this.config.pkgClr || {};
            pkgClr.start = pkgClr.start || 'rgb(181, 216, 126)';
            pkgClr.opera = pkgClr.opera || 'rgb(224, 223, 226)';
            pkgClr.judge = pkgClr.judge || 'rgb(49, 174, 196)';
            pkgClr.end = pkgClr.end || 'rgb(34, 185, 41)';
            pkgClr.arrow = pkgClr.arrow || 'rgb(3, 84, 41)';
            pkgClr.NodeBox = pkgClr.NodeBox || 'rgb(15, 13, 105)';

            this.config.pkgClr = pkgClr;
            this.config.prefCode = this.config.prefCode || 'A'; // 内部代码前缀
            this.config.listener = this.config.listener || {}; // 监听事件

            this.config.noToolBar = this.config.noToolBar || false;
        }
        /**
         * 工具集按钮栏
         */

    }, {
        key: '_toolbar',
        value: function _toolbar() {
            // 工具栏参数信息
            var $tool = {};
            var raphael = this.raphael;
            var ctX = 5,
                ctY = 5,
                ctW = 75,
                ctH = 300,
                x = ctX,
                y = ctY,
                // 当前坐在的位置坐标
            config = this.config,
                pkgClr = config.pkgClr;

            // 拖动处理            
            // var dragHandlerEvnt = function(){}

            // 容器集
            $tool.containerIst = raphael.rect(ctX, ctY, ctW, ctH);
            $tool.containerIst.attr('fill', '#ffffff'); // 容器底色

            // 开始
            x += 20, y += 50;
            $tool.startIst = raphael.ellipse(x, y, 8, 6);
            $tool.startIst.attr('fill', pkgClr.start);
            $tool.startTxtIst = raphael.text(x + 30, y, Conf.start.text);

            // 流程
            y += 20;
            $tool.operaIst = raphael.rect(x - 8, y, 16, 12);
            $tool.operaIst.attr('fill', pkgClr.opera);
            $tool.operaTxtIst = raphael.text(x + 30, y + 4, Conf.opera.text);

            // 判断
            y += 30;
            $tool.judgeIst = new _NodeJudge2.default(raphael).onlyCell(x, y, 16, 12);
            $tool.judgeIst.attr('fill', pkgClr.judge);
            $tool.judgeTxtIst = raphael.text(x + 30, y, Conf.judge.text);

            // 结束
            y += 30;
            $tool.endIst = raphael.ellipse(x, y, 8, 6);
            $tool.endIst.attr('fill', pkgClr.end);
            $tool.endTxtIst = raphael.text(x + 30, y, Conf.end.text);

            // 箭头
            y += 30;
            $tool.arrowIst = this.flow.arrow([x - 5, y], [x + 10, y], 3);
            $tool.arrowIst.c.attr('fill', pkgClr.arrow);
            $tool.arrowTxtIst = raphael.text(x + 30, y, Conf.arrow.text);

            // 文本框
            y += 30;
            $tool.textInst = this.raphael.text(x + 10, y, Conf.text.text);

            this.$tool = $tool;
            this._toolbarDragEvt();
        }
        /**
         * 工具栏拖动处理
         */

    }, {
        key: '_toolbarDragEvt',
        value: function _toolbarDragEvt() {
            // console.log(this.$tool)
            var $this = this;
            var pkgClr = this.config.pkgClr;
            // 拖动处理    
            var dragHandlerEvnt = function dragHandlerEvnt(node, type) {
                $this.MagneticCore = null; // 移动工具栏时磁芯消失
                var cDragDt = {};
                node.drag(function (dx, dy) {
                    // moving
                    // console.log(type)
                    // console.log(dx, dy)
                    // cDragDt = {dx, dy}
                    dx += cDragDt.dx;
                    dy += cDragDt.dy;
                    var newElem = $this.getLastElem();
                    if (newElem) {
                        newElem.move(dx, dy);
                    }
                }, function () {
                    // start
                    // cDragDt = {dx: 0, dy: 0}
                    var _x, _y;
                    if (2 == type) {
                        _x = this.attr('x');
                        _y = this.attr('y');
                    } else if (3 == type) {
                        var tpPath = this.attr('path');
                        var tpPath0 = tpPath[0];
                        _x = tpPath0[1];
                        _y = tpPath0[2];
                    } else {
                        // console.log(this)
                        _x = this.attr('cx');
                        _y = this.attr('cy');
                    }

                    cDragDt.dx = _x + 5;
                    cDragDt.dy = _y + 10;

                    // cDragDt.x = _x
                    // cDragDt.y = _y
                    // console.log(cDragDt)
                    $this._createNode(cDragDt, type);
                }, function () {// end
                    // if(cDragDt.dx < 75 || cDragDt.dy < 50){
                    //     return null
                    // }
                    // $this._createNode(cDragDt, type)
                });
            };
            // 开始
            dragHandlerEvnt(this.$tool.startIst, Conf.start.type);
            dragHandlerEvnt(this.$tool.startTxtIst, Conf.start.type);

            // 流程
            dragHandlerEvnt(this.$tool.operaIst, Conf.opera.type);
            dragHandlerEvnt(this.$tool.operaTxtIst, Conf.opera.type);

            // 判断
            dragHandlerEvnt(this.$tool.judgeIst, Conf.judge.type);
            dragHandlerEvnt(this.$tool.judgeTxtIst, Conf.judge.type);

            // 结束
            dragHandlerEvnt(this.$tool.endIst, Conf.end.type);
            dragHandlerEvnt(this.$tool.endTxtIst, Conf.end.type);

            // 特殊部件生成器
            // dragHandlerEvnt(this.$tool.arrowIst, Conf.arrow.type)
            // console.log(this.$tool.arrowIst)
            // this.$tool.arrowIst.c.drag()
            var arrowDragHandler = function arrowDragHandler(ist) {
                var cDragDt = { x: 0, y: 0 };
                var innerTmpArror = null;
                ist.drag(function (x, y) {
                    x += cDragDt.x;
                    y += cDragDt.y;
                    if (innerTmpArror) {
                        innerTmpArror.updatePath([x, y], [x + 50, y]);
                    }
                }, function () {
                    if ('text' == ist.type) {
                        cDragDt.x = ist.attr('x');
                        cDragDt.y = ist.attr('y');
                    } else {
                        var pathA1 = ist.attr('path');
                        pathA1 = pathA1[0];
                        cDragDt.x = pathA1[1];
                        cDragDt.y = pathA1[2];
                    }
                    // 生成连线
                    innerTmpArror = $this.flow.arrow([cDragDt.x, cDragDt.y], [cDragDt.x + 50, cDragDt.y], 5);
                    innerTmpArror.c.attr('fill', pkgClr.arrow);
                    $this._lineTragEvent(innerTmpArror);
                    $this.lineQueues.push(innerTmpArror);
                }, function () {});
                // })()
            };
            arrowDragHandler(this.$tool.arrowIst.c);
            arrowDragHandler(this.$tool.arrowTxtIst);

            // 文字拖动
            (function () {
                var _dragDt = { x: 0, y: 0 };
                var tmpTxtInst = null; // 临时文本
                $this.$tool.textInst.drag(function (x, y) {
                    x += _dragDt.x;
                    y += _dragDt.y;
                    if (tmpTxtInst) {
                        tmpTxtInst.attr({ x: x, y: y });
                    }
                }, function () {
                    _dragDt.x = this.attr('x') + 5;
                    _dragDt.y = this.attr('y') + 5;
                    tmpTxtInst = $this.raphael.text(_dragDt.x, _dragDt.y, '文本框');
                    $this._textBindEvent(tmpTxtInst);
                    $this.textQueues.push(tmpTxtInst);
                }, function () {});
            })();
        }
        /**
         * 获取
         */

    }, {
        key: '_getOrderCode',
        value: function _getOrderCode() {
            this._rIdx += 1;
            var code = this.config.prefCode + this._rIdx;
            // 判断序列号是否已经存在
            if (this._code2EidDick[code]) {
                code = this._getOrderCode();
            }
            return code;
        }
        /**
         * 移除全部的边框
         */

    }, {
        key: 'removeBBox',
        value: function removeBBox() {
            this.MagneticCore = null;
            // 系统节点
            var nodes = this.nodeQueues;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.bBox) {
                    node.bBox.remove();
                    node.bBox = null; // 清空 bBox 
                }
            }
            // 临时节点
            var tempNodes = this.tempNodes;
            for (var j = 0; j < tempNodes.length; j++) {
                var tNode = tempNodes[j];
                tNode.remove();
            }
            // 直线选中删除
            var lines = this.lineQueues;
            for (var k = 0; k < lines.length; k++) {
                var line = lines[k];
                if (lines.selectEdMk) {
                    line.selectEdMk = false;
                }
            }
            this.removeIntersectMk();
            this.tempNodes = [];
        }
        /**
         * 删除节点, 为空是删除当前选中的节点
         * @param {RaphaelElement|string|null} code 
         */

    }, {
        key: 'removeNode',
        value: function removeNode(code) {
            if (!code) {
                code = this.getSelected();
            }
            if (code) {
                var node = 'object' == (typeof code === 'undefined' ? 'undefined' : _typeof(code)) ? code : this._code2EidDick[code] ? this.raphael.getById(this._code2EidDick[code]) : this.raphael.getById(code);
                if ('object' == (typeof node === 'undefined' ? 'undefined' : _typeof(node))) {
                    // 删除实体数据
                    var id = node.id; // id 数据
                    var isConnectMk = false; // 是否为连接线
                    if (node.NodeType == 'arrow') {
                        isConnectMk = true;
                    }
                    if (node.bBox) {
                        node.bBox.remove();
                        node.bBox = null;
                    }
                    // 文本
                    if (node.label) {
                        node.label.remove();
                        node.label = null;
                    }
                    // 连线选择标识
                    if (node.selectEdMk) {
                        node.selectEdMk = false;
                    }
                    node.c.remove();
                    node = null; // 覆盖并或删除数据
                    // 清除连接线中的缓存器
                    if (isConnectMk) {
                        var lines = this.lineQueues;
                        var newLineQ = [];
                        for (var x = 0; x < lines.length; x++) {
                            var line = lines[x];
                            if (id == line.c.id) {
                                continue;
                            }
                            newLineQ.push(line);
                        }
                        this.lineQueues = newLineQ;
                    } else {
                        // 删除内部对象缓存的数据
                        var nodes = this.nodeQueues;
                        var nodeStack = [];
                        for (var i = 0; i < nodes.length; i++) {
                            var $node = nodes[i];
                            // 清除已经删除节点的缓存数据
                            if (id == $node.c.id) {
                                continue;
                            }
                            nodeStack.push($node);
                        }
                        this.nodeQueues = nodeStack;
                    }

                    // 删除边框以及选中标识
                    this.removeBBox();
                    return true;
                }
            }
            return false;
        }
        /**
         * 移除碰撞属性
         */

    }, {
        key: 'removeIntersectMk',
        value: function removeIntersectMk() {
            var nodes = this.nodeQueues;
            var IntersectEl = null;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node._IntersectMk) {
                    node._IntersectMk = false;
                    var _type = node.NodeType;
                    var pkgClr = this.config.pkgClr;
                    if (pkgClr[_type]) {
                        node.c.attr('fill', pkgClr[_type]);
                    } else {
                        _type = node.c.data('type');
                        if (1 == _type) {
                            node.c.attr('fill', pkgClr.start);
                        } else if (9 == _type) {
                            node.c.attr('fill', pkgClr.end);
                        }
                    }
                    IntersectEl = node;
                }
            }
            return IntersectEl;
        }
        /**
         * 移除连接检测线，用于连接线与节点关联时删除就的关联
         * @param {NodeBase} lineIst 
         * @param {string} type from/to
         * @returns {bool}
         */

    }, {
        key: 'removeConLine',
        value: function removeConLine(lineIst, type) {
            var isSuccess = false;
            if (lineIst && type) {
                var nodes = this.nodeQueues;
                var refId = lineIst.c.id;
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    var lineType = type + 'Line';
                    // 只检测为数组的类型
                    if (node[lineType] && node[lineType].length) {
                        var lineQues = node[lineType];
                        var nLineQues = [];
                        for (var j = 0; j < lineQues.length; j++) {
                            var lineQue = lineQues[j];
                            if (refId != lineQue.c.id) {
                                nLineQues.push(lineQue);
                            }
                        }
                        node[lineType] = nLineQues;
                    }
                }
            }
            return isSuccess;
        }
        /**
         * 通过节点代码获取节点
         * @param {string} code  NodeBase.c.data('code')
         * @returns {NodeBase|null}
         */

    }, {
        key: 'getNodeByCode',
        value: function getNodeByCode(code) {
            var nodeIst = null;
            var nodes = this.nodeQueues;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.c.data('code') == code) {
                    nodeIst = node;
                    break;
                }
            }
            return nodeIst;
        }
        /**
        * 通过节点代码获取节点
        * @param {string} code  NodeBase.c.id
        * @returns {NodeBase|null}
        */

    }, {
        key: 'getNodeByEid',
        value: function getNodeByEid(code) {
            var nodeIst = null;
            var nodes = this.nodeQueues;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.c.id == code) {
                    nodeIst = node;
                    break;
                }
            }
            return nodeIst;
        }
        /**
         * 代码与id对应，不同时传入值；设置字典
         * @param {string|null} code 
         * @param {string|null} id 
         * @returns {string|null|this}
         */

    }, {
        key: 'code2Id',
        value: function code2Id(code, id) {
            // 通过 code 获取 Id
            if (code && !id) {
                return this._code2EidDick[code] || null;
            }
            // 通过id 获取 code
            else if (id && !code) {
                    var dick = this._code2EidDick;
                    for (var prefCode in dick) {
                        if (id == dick[prefCode]) {
                            return prefCode;
                        }
                    }
                    return null;
                } else if (id && code) {
                    this._code2EidDick[code] = id;
                    return this;
                }
        }
        /**
         * 设置指定/当前选择节点对象属性
         * @param {object} option {text}
         * @param {RaphaelElement|string|null} code REle.id
         * @returns {bool}
         */

    }, {
        key: 'setOption',
        value: function setOption(option, code) {
            var isSuccess = false;
            if (option) {
                if ('object' != (typeof option === 'undefined' ? 'undefined' : _typeof(option))) {
                    // 默认为文本，快速设置文本
                    option = { text: option };
                }
                if (!code) {
                    code = this.getSelected();
                }
                var node = 'object' == (typeof code === 'undefined' ? 'undefined' : _typeof(code)) ? code : this.getNodeByCode(code);
                // 文本属性
                if (node && option.text) {
                    if (node.label) {
                        node.label.attr('text', option.text);
                        node.opt = node.opt || {};
                        node.opt.text = option.text; // NodeBase 的文本属性值
                        // 自动适应文本的宽度
                        if ('function' == typeof node.resizeByText) {
                            node.resizeByText();
                        }
                    }
                }
            }
            return isSuccess;
        }
        /**
         * 赋值节点，为空是复制当前选中的节点
         * @param {RaphaelElement|string|null} code 
         */

    }, {
        key: 'cloneNode',
        value: function cloneNode(code) {
            if (!code) {
                code = this.getSelected();
            }
            if (code) {
                var node = 'object' == (typeof code === 'undefined' ? 'undefined' : _typeof(code)) ? code : this.raphael.getById(code);
                if ('object' == (typeof node === 'undefined' ? 'undefined' : _typeof(node))) {
                    // 删除实体数据
                    var id = node.id; // id 数据
                    node.c.clone();
                    node.label.clone();
                    return true;
                }
            }
            return false;
        }
        /**
         * 获取被选中的节点，只能一个
         * @returns {NodeBase}
         */

    }, {
        key: 'getSelected',
        value: function getSelected() {
            var nodes = this.nodeQueues;
            var selectedNode = null;
            // 节点扫描
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.bBox) {
                    selectedNode = node;
                    break;
                }
            }
            //console.log(this.lineQueues, selectedNode)
            if (!selectedNode) {
                // 连线扫描
                var lines = this.lineQueues;
                for (var j = 0; j < lines.length; j++) {
                    var line = lines[j];
                    if (line.selectEdMk) {
                        selectedNode = line;
                    }
                }
            }
            return selectedNode;
        }
        /**
         * 获取最新生成的节点
         * @returns {NodeBase}
         */

    }, {
        key: 'getLastElem',
        value: function getLastElem() {
            var lastElem = null;
            var nodes = this.nodeQueues;
            if (nodes.length > 0) {
                lastElem = nodes[nodes.length - 1];
            }
            return lastElem;
        }
        /**
         * 获取工作流步骤,用于保存工作流的数据结构
         * @returns {array}
         */

    }, {
        key: 'getFlowStep',
        value: function getFlowStep() {
            var step = [];
            var nodes = this.nodeQueues;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var stepAttr = this.getFlowJson(node);
                step.push(stepAttr);
            }
            return step;
        }
        /**
         * 获取节点业务需求的数据结构
         * @param {NodeBase|null} node 节点实例， 为空时为当前选中的节点
         * @returns {object|null}
         */

    }, {
        key: 'getFlowJson',
        value: function getFlowJson(node) {
            if (!node) {
                node = this.getSelected();
            }
            var fjson = {};
            if (node) {
                var label = node.label || null;
                var c = node.c;
                fjson = {
                    name: label ? label.attr('text') : '',
                    code: c.data('code'),
                    type: c.data('type'),
                    _struct: node.toJson()
                    // 终点
                };var toLines = node.toLine;
                var toLineArr = [];
                for (var j = 0; j < toLines.length; j++) {
                    var code = this.getLineCntCode('from', toLines[j].c.id, node);
                    if (code) {
                        toLineArr.push(code);
                    }
                }
                fjson.prev = toLineArr.length > 0 ? toLineArr.join(',') : '';

                // 终点
                var fromLines = node.fromLine;
                var fromLineArr = [];
                for (var k = 0; k < fromLines.length; k++) {
                    var code = this.getLineCntCode('to', fromLines[k].c.id, node);
                    if (code) {
                        fromLineArr.push(code);
                    }
                }
                fjson.next = fromLineArr.length > 0 ? fromLineArr.join(',') : '';
            } else {
                fjson = null;
            }
            return fjson;
        }
        /**
         * 获取连接线端点的节点代码
         * @param {string} type from/to
         * @param {string} lineId 直线代码
         * @param {NodeBase|null|string} refIst 参照id/NodeBase attr= {code}
         * @returns {string}
         */

    }, {
        key: 'getLineCntCode',
        value: function getLineCntCode(type, lineId, refIst) {
            var code = null;
            if (type && lineId) {
                var nodes = this.nodeQueues;
                var refId = null;
                if (refIst) {
                    refId = 'string' == typeof refIst ? refIst : refIst.c.data('code');
                }
                var typeName = type + 'Line';
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    var cId = node.c.data('code');
                    if (refId == cId) {
                        // 跳过自身检测
                        continue;
                    }
                    var typeLines = node[typeName];
                    for (var j = 0; j < typeLines.length; j++) {
                        var typeLine = typeLines[j];
                        if (lineId == typeLine.c.id) {
                            return cId;
                        }
                    }
                }
            }
            return code;
        }
        /**
         * 获取碰撞的元素
         * @param {object} point {x, y} 坐标点
         * @returns {RapaelElement|null}
         */

    }, {
        key: 'getIntersectElem',
        value: function getIntersectElem(point) {
            var itsctEl = null;
            if ('object' == (typeof point === 'undefined' ? 'undefined' : _typeof(point))) {
                var nodes = this.nodeQueues;
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    var type = node.NodeType;
                    if ('endpnt' == type) {
                        var $c = node.c;
                        var cx = $c.attr('cx'),
                            cy = $c.attr('cy'),
                            rx = $c.attr('rx'),
                            ry = $c.attr('ry');
                        if (
                        // x
                        point.x >= cx - rx && point.x <= cx + rx &&
                        // y
                        point.y >= cy - ry && point.y <= cy + ry) {
                            itsctEl = node;
                            break;
                        }
                    } else if ('opera' == type) {
                        var $c = node.c,
                            x = $c.attr('x'),
                            y = $c.attr('y'),
                            w = $c.attr('width'),
                            h = $c.attr('height');
                        if (
                        // x
                        point.x >= x && point.x <= x + w &&
                        // y
                        point.y >= y && point.y <= y + h) {
                            itsctEl = node;
                            break;
                        }
                    } else if ('judge' == type) {
                        var $opt = node.opt,
                            cx = $opt.cx,
                            cy = $opt.cy,
                            h = $opt.h,
                            w = $opt.w;
                        if (
                        // x
                        point.x >= cx - w / 2 && point.x <= cx + w / 2 &&
                        // y
                        point.y >= cy - h / 2 && point.y <= cy + h / 2) {
                            itsctEl = node;
                            break;
                        }
                    }
                    //console.log(node)
                }
            }
            return itsctEl;
        }
        /**
         * 加载流程数据,用于修改时加载历史数据
         * @param {object|null} steps 
         */

    }, {
        key: 'loadStep',
        value: function loadStep(steps) {
            if ('object' == (typeof steps === 'undefined' ? 'undefined' : _typeof(steps))) {
                // 连接性先关联信息: {id:{}}
                var lineCntMapInfo = {},
                    pkgClr = this.config.pkgClr;
                // 记录连线端点信息                
                var recordLMapFn = function recordLMapFn(_from, _to) {
                    if (_from.indexOf(',') == -1) {
                        var _toQus = _to.indexOf(',') == -1 ? [_to] : _to.split(',');
                        for (var x1 = 0; x1 < _toQus.length; x1++) {
                            var ftK = _from + '__' + _toQus[x1];
                            if (!lineCntMapInfo[ftK]) {
                                lineCntMapInfo[ftK] = true;
                            }
                        }
                    } else if (_to.indexOf(',') == -1) {
                        var _fromQus = _from.indexOf(',') == -1 ? [_from] : _from.split(',');
                        for (var x2 = 0; x2 < _fromQus.length; x2++) {
                            var ftK = _fromQus[x2] + '__' + _to;
                            if (!lineCntMapInfo[ftK]) {
                                lineCntMapInfo[ftK] = true;
                            }
                        }
                    }
                };
                // 遍历节点
                for (var i = 0; i < steps.length; i++) {
                    var step = steps[i];
                    var _struct = step._struct,
                        opt = _struct.opt,
                        config = this.config,
                        pkgClr = config.pkgClr;
                    var type = step.type;
                    var nodeIst = null;
                    if (1 == type || 9 == type) {
                        nodeIst = this.flow.endpoint(opt.cx, opt.cy, opt.r, opt.text);
                        if (1 == type) {
                            nodeIst.c.attr('fill', pkgClr.start);
                        } else {
                            nodeIst.c.attr('fill', pkgClr.end);
                        }
                    } else if (2 == type) {
                        nodeIst = this.flow.operation(opt.cx, opt.cy, opt.w, opt.h, opt.text);
                        nodeIst.c.attr('fill', pkgClr.opera);
                    } else if (3 == type) {
                        nodeIst = this.flow.judge(opt.cx, opt.cy, opt.w, opt.h, opt.text);
                        nodeIst.c.attr('fill', pkgClr.judge);
                    }
                    if (nodeIst) {
                        var code = step.code || nodeIst.c.data('code');
                        var instId = nodeIst.c.id;
                        if (!code) {
                            code = this._getOrderCode();
                        }
                        nodeIst.c.data('code', code);
                        this._code2EidDick[code] = instId;
                        nodeIst.c.data('type', type);
                        this._bindEvent(nodeIst);
                        this.nodeQueues.push(nodeIst);

                        // 连线缓存器
                        var prev = step.prev || null; // to
                        if (prev) {
                            recordLMapFn(prev, code);
                        }
                        var next = step.next || null; // from
                        if (next) {
                            recordLMapFn(code, next);
                        }

                        // lineCntMapInfo[instId] = lineCntMapInfo[instId] || {}                    
                        // var prev = step.prev || null    // to
                        // if(prev){
                        //     var prevQu = lineCntMapInfo[instId].to || []
                        //     if(prev.indexOf(',') > -1){
                        //         prevQu = [].concat(prevQu, prev.split(','))
                        //     }else{
                        //         prevQu.push(prev)
                        //     }
                        //     lineCntMapInfo[instId].to = prevQu
                        // }
                        // var next = step.next || null    // from
                        // if(next){
                        //     var nextQu = lineCntMapInfo[instId].from || []
                        //     if(next.indexOf(',') > -1){
                        //         nextQu = [].concat(nextQu, next.split(','))
                        //     }else{
                        //         nextQu.push(next)
                        //     }
                        //     lineCntMapInfo[instId].from = nextQu
                        // }
                    }
                }
                // console.log(lineCntMapInfo)

                for (var lnstr in lineCntMapInfo) {
                    var lnstrQus = lnstr.split('__');
                    var fCodeNd = this.getNodeByCode(lnstrQus[0]);
                    var tCodeNd = this.getNodeByCode(lnstrQus[1]);
                    //console.log(fCodeNd, tCodeNd)
                    var p1 = fCodeNd.getStlnP();
                    var p2 = tCodeNd.getEnlnP();
                    // console.log(p1, p2)
                    var innerTmpArror = this.flow.arrow([p1.x, p1.y], [p2.x, p2.y], 5);
                    // 连线实体关联，起点
                    if (!innerTmpArror.position) {
                        innerTmpArror.position = {};
                    }
                    innerTmpArror.position['from'] = p1.position;
                    fCodeNd.recordLine('from', innerTmpArror);
                    tCodeNd.recordLine('to', innerTmpArror);
                    innerTmpArror.position['to'] = p2.position;

                    innerTmpArror.c.attr('fill', pkgClr.arrow);
                    this._lineTragEvent(innerTmpArror);
                    this.lineQueues.push(innerTmpArror);
                }
            }
            // console.log(this._code2EidDick)
            // console.log(steps)
            // console.log(lineCntMapInfo)
            //console.log(this.getFlowStep())
            return this;
        }
        /**
         * 创建节点数
         * @param {object} cDragDt 当前节点拖动的参数
         * @param {number|string} type 节点类型
         */

    }, {
        key: '_createNode',
        value: function _createNode(tbDragDt, type) {
            var $this = this,
                nodeIst = null,
                config = this.config,
                pkgClr = config.pkgClr;
            switch (type) {
                case 1:
                    nodeIst = this.flow.endpoint(tbDragDt.dx, tbDragDt.dy, 10, '开始');
                    nodeIst.c.attr('fill', pkgClr.start);
                    break;
                case 2:
                    nodeIst = this.flow.operation(tbDragDt.dx, tbDragDt.dy, 50, 40, '操作流程');
                    nodeIst.c.attr('fill', pkgClr.opera);
                    break;
                case 3:
                    nodeIst = this.flow.judge(tbDragDt.dx, tbDragDt.dy, 50, 40, '流程判断');
                    nodeIst.c.attr('fill', pkgClr.judge);
                    break;
                case 9:
                    nodeIst = this.flow.endpoint(tbDragDt.dx, tbDragDt.dy, 10, '结束');
                    nodeIst.c.attr('fill', pkgClr.end);
                    break;
            }
            if (nodeIst) {
                // 保存节点实例
                var code = code = this._getOrderCode();
                nodeIst.c.data('code', code);
                this._code2EidDick[code] = nodeIst.c.id;
                nodeIst.c.data('type', type);
                this._bindEvent(nodeIst);
                this.nodeQueues.push(nodeIst);
            }
        }
        /**
         * 节点绑定事件
         * @param {NodeBase} nodeIst 
         */

    }, {
        key: '_bindEvent',
        value: function _bindEvent(nodeIst) {
            if (nodeIst) {
                // 保存节点实例
                var $this = this,
                    config = this.config,
                    pkgClr = config.pkgClr;
                // 节点拖动
                (function () {
                    var cDragDt = {};
                    nodeIst.c.drag(function (dx, dy) {
                        dx += cDragDt.x;
                        dy += cDragDt.y;
                        nodeIst.move(dx, dy);
                        nodeIst.ToSyncArrow(dx, dy);
                    }, function () {
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
                        // console.log(cDragDt)
                    }, function () {
                        cDragDt = { x: 0, y: 0 };
                    });
                    // console.log(nodeIst)
                    // console.log(nodeIst.c)
                })();

                // 节点点击处理
                nodeIst.c.click(function () {
                    $this.removeBBox();
                    // if(nodeIst.bBox){
                    //     nodeIst.bBox.remove()
                    // }
                    var bt = this.getBBox();
                    var dt = 5;
                    nodeIst.bBox = nodeIst.instance.rect(bt.x - dt, bt.y - dt, bt.width + dt * 2, bt.height + dt * 2);
                    nodeIst.bBox.attr({
                        'stroke': pkgClr.NodeBox
                    });
                    $this.onNodeClick(nodeIst);
                });
            }
        }
        /**
         * 直线拖动
         * @param {RapaelElement} lineInst 
         */

    }, {
        key: '_lineTragEvent',
        value: function _lineTragEvent(lineInst) {
            if (!lineInst || 'object' != (typeof lineInst === 'undefined' ? 'undefined' : _typeof(lineInst))) {
                return false;
            }
            var $this = this;
            (function (TmpArrIst) {
                TmpArrIst.c.click(function () {
                    $this.removeBBox(); // 移除当前的节点的外部边框
                    // 选中标识符号
                    TmpArrIst.selectEdMk = true;

                    var opt = TmpArrIst.opt;
                    var color = '#000000';
                    var pR = 3; // 半径                        
                    // console.log('*', innerTmpArror)
                    // console.log(innerTmpArror.c.id, 'click')
                    // 起始节点
                    var arrowLineP1 = $this.raphael.circle(opt.p1[0], opt.p1[1], pR);
                    arrowLineP1.attr('fill', color);

                    // 结束节点
                    var arrowLineP2 = $this.raphael.circle(opt.p2[0], opt.p2[1], pR);
                    arrowLineP2.attr('fill', color);

                    var lineEndPointMoveEvt = function lineEndPointMoveEvt(LIst, isEnd) {
                        var aCDt = { ax: 0, ay: 0
                            // console.log(arrowLineP1)
                        };LIst.drag(function (ax, ay) {
                            ax += aCDt.ax;
                            ay += aCDt.ay;
                            var hasIntersectElem = $this.getIntersectElem({ x: ax, y: ay });
                            if (hasIntersectElem) {
                                // 碰撞时，使用连接端点
                                $this.removeIntersectMk();
                                hasIntersectElem.c.attr('fill', '#FF0000');
                                hasIntersectElem._IntersectMk = true;
                                var CntLinePnt;
                                if (isEnd) {
                                    CntLinePnt = hasIntersectElem.getEnlnP();
                                } else {
                                    CntLinePnt = hasIntersectElem.getStlnP();
                                }
                                // console.log(CntLinePnt, hasIntersectElem)
                                ax = CntLinePnt.x;
                                ay = CntLinePnt.y;
                                // 关联
                                var position = isEnd ? 'to' : 'from';
                                $this.removeConLine(TmpArrIst, position);
                                hasIntersectElem.recordLine(position, TmpArrIst);
                                if (!TmpArrIst.position) {
                                    TmpArrIst.position = {};
                                }
                                TmpArrIst.position[position] = CntLinePnt.position;
                            }
                            //console.log(hasIntersectElem)
                            var mmgntcIst = this; // 磁芯点
                            // var id = this.id
                            if (isEnd) {
                                TmpArrIst.updatePath(null, [ax, ay]);
                                mmgntcIst.data('type', 'to');
                                // TmpArrIst.position.to = id
                            } else {
                                TmpArrIst.updatePath([ax, ay]);
                                mmgntcIst.data('type', 'from');
                                // TmpArrIst.position.from = id
                            }
                            $this.MagneticCore = mmgntcIst; // 保存正在移动的磁芯点
                            this.attr({
                                cx: ax,
                                cy: ay
                            });
                        }, function () {
                            aCDt.ax = this.attr('cx');
                            aCDt.ay = this.attr('cy');
                        }, function () {
                            // if(aCDt.ax < 75 || aCDt.ay < 50){
                            //     return null
                            // }
                            // LIst.updatePath([aCDt.ax, aCDt.ay])
                            // arrowLineP1.attr({
                            //     x: aCDt.ax,
                            //     y: aCDt.ay
                            // })
                            $this.MagneticCore = null; // 拖动完成以后
                        });
                    };

                    lineEndPointMoveEvt(arrowLineP1);
                    lineEndPointMoveEvt(arrowLineP2, true);
                    // 临时数据节点
                    $this.tempNodes.push(arrowLineP1, arrowLineP2);
                });
            })(lineInst);
            return true;
        }
        /**
         * 文本拖动，独立文本
         * @param {RapaelElement} textElem 
         */

    }, {
        key: '_textBindEvent',
        value: function _textBindEvent(textElem) {
            var $this = this;
            // 拖动
            (function (textIst) {
                var _dragDt = { x: 0, y: 0 };
                textIst.drag(function (x, y) {
                    x += _dragDt.x;
                    y += _dragDt.y;
                    textIst.attr({ x: x, y: y });
                }, function () {
                    _dragDt.x = textIst.attr('x');
                    _dragDt.y = textIst.attr('y');
                }, function () {});
            })(textElem);
            // 点击处理
            textElem.click(function () {
                // this.attr('font-size', '100rem')
                // this.attr('font-size', '1.23em')
                $this._removeTxtSelect();
                this.attr(Conf.text.selected);
                this.data('selectMk', true);
            });
        }
        /**
         * 移除文本选中状态
         */

    }, {
        key: '_removeTxtSelect',
        value: function _removeTxtSelect() {
            var texts = this.textQueues;
            for (var i = 0; i < texts.length; i++) {
                var text = texts[i];
                if (text.data('selectMk')) {
                    text.attr(Conf.text.defAtrr);
                    text.data('selectMk', false);
                }
            }
        }
        /**
         * 事件处理接口
         * @param {NodeBase} nodeIst 
         */

    }, {
        key: 'onNodeClick',
        value: function onNodeClick(nodeIst) {}
    }]);

    return WorkerEditor;
}();

exports.default = WorkerEditor;

/***/ }),
/* 5 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
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
/* 7 */
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


var _util = __webpack_require__(1);

var _NodeEndpoint = __webpack_require__(8);

var _NodeEndpoint2 = _interopRequireDefault(_NodeEndpoint);

var _NodeOperation = __webpack_require__(9);

var _NodeOperation2 = _interopRequireDefault(_NodeOperation);

var _NodeJudge = __webpack_require__(2);

var _NodeJudge2 = _interopRequireDefault(_NodeJudge);

var _NodeLine = __webpack_require__(10);

var _NodeLine2 = _interopRequireDefault(_NodeLine);

var _NodeArrow = __webpack_require__(11);

var _NodeArrow2 = _interopRequireDefault(_NodeArrow);

var _NodeBow = __webpack_require__(12);

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
         * @param {*} p1 [x,y]
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

var _NodeBase2 = __webpack_require__(0);

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

        _this.NodeType = 'endpnt';
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
            // 同步属性
            this.opt.cx = x;
            this.opt.cy = y;
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NodeBase2 = __webpack_require__(0);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2018年1月5日 星期五
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 连接类型： 连线
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _util = __webpack_require__(1);

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
/* 11 */
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
/* 12 */
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

        this.NodeType = 'bow';
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
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ })
/******/ ]);
});