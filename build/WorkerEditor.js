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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年3月26日 星期一
 * 抽象节点
 */
///<reference path="../../index.d.ts"/>
///<reference path="../types/raphael.ts"/>
var NodeAbstract = /** @class */ (function () {
    function NodeAbstract(paper, opt) {
        this.paper = paper;
        // 连接线起点获取终点
        this.fromLine = [];
        this.toLine = [];
        this.NodeType = null; // 节点类型
        // 传入属性时，设置目前的对象
        if (opt) {
            this.opt = opt;
        }
        this._onInit();
    }
    /**
     * 节点生成器，外部可访问接口
     * @param opt
     */
    NodeAbstract.prototype.creator = function (opt) {
        this._whenCreatorEvt();
    };
    /**
     * 点连线
     * @param {array} pQue
     * @param {bool} isClose
     * @returns {string}
     */
    NodeAbstract.prototype._ps2Path = function (pQue, isClose) {
        var path = '';
        for (var i = 0; i < pQue.length; i++) {
            path += (path ? 'L' : 'M') + pQue[i].x + ',' + pQue[i].y;
        }
        if (isClose) {
            path += 'Z';
        }
        return path;
    };
    /**
     * 创建事件时，处理事件
     */
    NodeAbstract.prototype._whenCreatorEvt = function () { };
    /**
     * 节点初始化 [接口]
     */
    NodeAbstract.prototype._onInit = function () { };
    /**
     * 节点拖动以后处理，调用拖动以后 [接口]
     */
    NodeAbstract.prototype.onDrag = function () { };
    /**
     * 记录连接线
     * @param {stirng} type 连接线类型
     * @param {this}  $node 节点实例
     */
    NodeAbstract.prototype.recordLine = function (type, $node) {
        if ('from' == type) {
            this.fromLine.push($node);
        }
        else if ('to' == type) {
            this.toLine.push($node);
        }
    };
    /**
     * 同步处理连线
     * @param {function} callback
     */
    NodeAbstract.prototype.syncLineMove = function (callback) {
        if ('function' !== typeof callback) {
            callback = function (instance, type) { };
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
    };
    /**
     * 公共接口化
     * NodeBase struct to json 对象， 用于生产节点中 “struct” 的数据结构
     * @returns {object}
     */
    NodeAbstract.prototype.toJson = function () {
        var _struct = {
            NodeType: this.NodeType,
            opt: this.opt,
            c: {
                attr: this.c.attr() // 容器属性值
            }
        };
        if (this.label) {
            _struct.label = {
                attr: this.label.attr()
            };
        }
        return _struct;
    };
    /**
     * 获取两点间的距离
     */
    NodeAbstract.prototype.getPLen = function (P1, P2) {
        return Math.pow((Math.pow((P1.x - P2.x), 2) + Math.pow((P1.y - P2.y), 2)), 1 / 2);
    };
    return NodeAbstract;
}());
/* harmony default export */ __webpack_exports__["a"] = (NodeAbstract);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年1月5日 星期五
 * 基础节点类
 */
var NodeBase = /** @class */ (function () {
    function NodeBase() {
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
    NodeBase.prototype.recordLine = function (type, $node) {
        if ('from' == type) {
            this.fromLine.push($node);
        }
        else if ('to' == type) {
            this.toLine.push($node);
        }
    };
    /**
     * 同步处理连线
     * @param {function} callback
     */
    NodeBase.prototype.syncLineMove = function (callback) {
        if ('function' !== typeof callback) {
            callback = function (instance, type) { };
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
    };
    /**
     * 公共接口化
     * NodeBase struct to json 对象， 用于生产节点中 “struct” 的数据结构
     * @returns {object}
     */
    NodeBase.prototype.toJson = function () {
        var _struct = {
            NodeType: this.NodeType,
            opt: this.opt,
            c: {
                attr: this.c.attr() // 容器属性值
            }
        };
        if (this.label) {
            _struct.label = {
                attr: this.label.attr()
            };
        }
        return _struct;
    };
    return NodeBase;
}());
/* harmony default export */ __webpack_exports__["a"] = (NodeBase);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeBase__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 2018年1月5日 星期五
 * 判断处理节点
 */

var NodeJudge = /** @class */ (function (_super) {
    __extends(NodeJudge, _super);
    /**
     *
     * @param {*} instance Raphael 实例
     */
    function NodeJudge(instance) {
        var _this = _super.call(this) || this;
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
    NodeJudge.prototype.onlyCell = function (cx, cy, w, h) {
        this.opt = { cx: cx, cy: cy, w: w, h: h };
        // 容器        
        var ap = this.getAp();
        var bp = this.getBp();
        var cp = this.getCp();
        var dp = this.getDp();
        return this.instance.path('M' + ap.x + ',' + ap.y +
            'L' + bp.x + ',' + bp.y +
            'L' + cp.x + ',' + cp.y +
            'L' + dp.x + ',' + dp.y +
            'Z');
    };
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */
    NodeJudge.prototype.create = function (opt) {
        this.opt = opt;
        this.minWidth = opt.w;
        // 容器        
        var ap = this.getAp();
        var bp = this.getBp();
        var cp = this.getCp();
        var dp = this.getDp();
        this.c = this.instance.path('M' + ap.x + ',' + ap.y +
            'L' + bp.x + ',' + bp.y +
            'L' + cp.x + ',' + cp.y +
            'L' + dp.x + ',' + dp.y +
            'Z');
        // 标签
        var label;
        if (opt.text) {
            label = this.instance.text(opt.cx, opt.cy, opt.text);
        }
        else {
            label = this.instance.text(opt.cx, opt.cy);
        }
        this.label = label;
        this.resizeByText();
    };
    /**
     * 根据文本宽度自动适应文本的宽度
     */
    NodeJudge.prototype.resizeByText = function () {
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
            }
            else {
                width += 25;
            }
            this.opt.w = width;
            this.resizeByOpt();
        }
    };
    /**
     * 根据 opt 值的改变重调整容器形状大小
     */
    NodeJudge.prototype.resizeByOpt = function () {
        var ap = this.getAp();
        var bp = this.getBp();
        var cp = this.getCp();
        var dp = this.getDp();
        this.c.attr('path', [
            ['M', ap.x, ap.y],
            ['L', bp.x, bp.y],
            ['L', cp.x, cp.y],
            ['L', dp.x, dp.y],
            ['Z']
        ]);
    };
    // 按照 A 点移动
    NodeJudge.prototype.move = function (x, y) {
        var ctP = this.getCpByAp(x, y);
        var bP = this.getBp(ctP.x, ctP.y);
        var cP = this.getCp(ctP.x, ctP.y);
        var dP = this.getDp(ctP.x, ctP.y);
        // 容器移动
        this.c.attr('path', [
            ['M', x, y],
            ['L', bP.x, bP.y],
            ['L', cP.x, cP.y],
            ['L', dP.x, dP.y],
            ['Z']
        ]);
        // 数据选项值更新
        this.opt.cx = ctP.x;
        this.opt.cy = ctP.y;
        // 文本移动
        this.label.attr(ctP);
    };
    // 直线同步移动
    NodeJudge.prototype.ToSyncLine = function (x, y) {
        var _this = this;
        var ctP = this.getCpByAp(x, y);
        this.syncLineMove(function (lnC, type, $ln) {
            var position = $ln.position;
            var methodName;
            if (type == 'from') {
                methodName = 'get' + position.from + 'p';
                var p1 = _this[methodName](ctP.x, ctP.y);
                var $fPath = lnC.attr('path');
                $fPath[0] = ['M', p1.x, p1.y];
                lnC.attr('path', $fPath);
            }
            else if (type == 'to') {
                methodName = 'get' + position.to + 'p';
                var p2 = _this[methodName](ctP.x, ctP.y);
                var $tPath = lnC.attr('path');
                $tPath[$tPath.length - 1] = ['L', p2.x, p2.y];
                lnC.attr('path', $tPath);
            }
        });
    };
    // 箭头同步器
    NodeJudge.prototype.ToSyncArrow = function (x, y) {
        var _this = this;
        var ctP = this.getCpByAp(x, y);
        this.syncLineMove(function (lnC, type, $ln) {
            var position = $ln.position;
            var methodName;
            if (type == 'from') {
                methodName = 'get' + position.from + 'p';
                var p1 = _this[methodName](ctP.x, ctP.y);
                $ln.updatePath([p1.x, p1.y]);
            }
            else if (type == 'to') {
                methodName = 'get' + position.to + 'p';
                var p2 = _this[methodName](ctP.x, ctP.y);
                $ln.updatePath(null, [p2.x, p2.y]);
            }
        });
    };
    // 获取连线的起点节点
    NodeJudge.prototype.getStlnP = function (position) {
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
    };
    // 获取连线的终点节点
    NodeJudge.prototype.getEnlnP = function (position) {
        position = position ? position : 'B';
        // var p = this.getBp()
        var methodName = 'get' + position + 'p';
        var p = this[methodName]();
        p.position = position;
        return p;
    };
    /**
     * 根据 A 点获取中心点
     */
    NodeJudge.prototype.getCpByAp = function (x, y) {
        var opt = this.opt;
        x += opt.w / 2;
        return { x: x, y: y };
    };
    // A 点
    NodeJudge.prototype.getAp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x -= (opt.w / 2);
        return { x: x, y: y };
    };
    NodeJudge.prototype.getBp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        y -= (opt.h / 2);
        return { x: x, y: y };
    };
    NodeJudge.prototype.getCp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x += (opt.w / 2);
        return { x: x, y: y };
    };
    NodeJudge.prototype.getDp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        y += (opt.h / 2);
        return { x: x, y: y };
    };
    /**
     * 是否为重合点
     * @param {object} p {x,y}
     * @param {string} type [from/to]
     * @returns {boolean}
     */
    NodeJudge.prototype.isCoincidence = function (p, type) {
        var successMK = false;
        if (p && 'object' == typeof p &&
            'undefined' != typeof p.x && 'undefined' != typeof p.y) {
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
    };
    return NodeJudge;
}(__WEBPACK_IMPORTED_MODULE_0__NodeBase__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeJudge);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_NodeJudge__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__flow__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__version__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_NodeBegin__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_NodeTask__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_NodeAudit__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_NodeSign__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_NodeCond__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_NodeSubFlow__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_NodeParallel__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_NodeMerge__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_NodeEnd__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__node_NodeLn__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__node_NodeLnPoly__ = __webpack_require__(24);
///<reference path='../index.d.ts' />
/**
 * 2018年3月1日 星期四
 * worker 工作流编辑器
 */
 // 助手方法














// 什么jQuery/RaphaelJs
// declare var $: any;
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
        size: 10,
        selected: {
            'font-size': 20,
            'fill': 'red'
        },
        // 默认属性
        defAtrr: {
            'font-size': 10,
            'fill': 'black'
        }
    }
};
/**
 * 工作流编辑器轻量级
 */
var WorkerEditor = /** @class */ (function () {
    /**
     * @param {object} config 数据配置项
     */
    function WorkerEditor(config) {
        this.config = config; // 系统配置参数
        this.raphael = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* default */].createInstance(config); // Raphael 对象        
        // 配置参数处理
        this._configMergeToDefule();
        this._rIdx = 0; // 内部索引，用于生成代码
        this._code2EidDick = {}; // 内部代码与元素id的映射字段
        this._LineDragingP = null; // RaphaelElement 直线正在拖动记录点
        this.flow = new __WEBPACK_IMPORTED_MODULE_2__flow__["a" /* Flow */](this.raphael); // 工作流程按钮
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
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    /**
     * 配置参数与默认参数和合并处理
     */
    WorkerEditor.prototype._configMergeToDefule = function () {
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
    };
    /**
     * 工具集按钮栏
     */
    WorkerEditor.prototype._toolbar = function () {
        // 工具栏参数信息
        var $tool = {};
        var raphael = this.raphael;
        var ctX = 5, ctY = 5, ctW = 75, ctH = 300, x = ctX, y = ctY, // 当前坐在的位置坐标
        config = this.config, pkgClr = config.pkgClr;
        // 拖动处理            
        // var dragHandlerEvnt = function(){}
        // 容器集
        $tool.containerIst = raphael.rect(ctX, ctY, ctW, ctH);
        $tool.containerIst.attr('fill', '#ffffff'); // 容器底色
        // 开始
        x += 20, y += 50;
        new __WEBPACK_IMPORTED_MODULE_4__node_NodeBegin__["a" /* default */](raphael, { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        // 任务
        y += 20;
        new __WEBPACK_IMPORTED_MODULE_5__node_NodeTask__["a" /* default */](raphael, { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        // 审核
        y += 20;
        new __WEBPACK_IMPORTED_MODULE_6__node_NodeAudit__["a" /* default */](raphael, { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        // 会签
        y += 20;
        new __WEBPACK_IMPORTED_MODULE_7__node_NodeSign__["a" /* default */](raphael, { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        // 判断
        y += 20;
        new __WEBPACK_IMPORTED_MODULE_8__node_NodeCond__["a" /* default */](raphael, { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        // 子流程
        y += 20;
        new __WEBPACK_IMPORTED_MODULE_9__node_NodeSubFlow__["a" /* default */](raphael, { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        // 并行
        y += 30;
        new __WEBPACK_IMPORTED_MODULE_10__node_NodeParallel__["a" /* default */](raphael, { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        // 合并
        y += 20;
        new __WEBPACK_IMPORTED_MODULE_11__node_NodeMerge__["a" /* default */](raphael, { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        // 结束
        y += 20;
        new __WEBPACK_IMPORTED_MODULE_12__node_NodeEnd__["a" /* default */](raphael, { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        // 直线
        y += 20;
        new __WEBPACK_IMPORTED_MODULE_13__node_NodeLn__["a" /* default */](raphael, {
            P1: { x: x - 5, y: y },
            P2: { x: x + 10, y: y }
        })
            .creator();
        // 折线
        y += 20;
        new __WEBPACK_IMPORTED_MODULE_14__node_NodeLnPoly__["a" /* default */](raphael, {
            P1: { x: x - 5, y: y },
            P2: { x: x + 10, y: y + 4 },
            h: 4
        })
            .creator();
        // ~~ 历史代码
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
        $tool.judgeIst = (new __WEBPACK_IMPORTED_MODULE_1__node_NodeJudge__["a" /* default */](raphael)).onlyCell(x, y, 16, 12);
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
    };
    /**
     * 工具栏拖动处理
     */
    WorkerEditor.prototype._toolbarDragEvt = function () {
        // console.log(this.$tool)
        var $this = this;
        var pkgClr = this.config.pkgClr;
        // 拖动处理    
        var dragHandlerEvnt = function (node, type) {
            $this.MagneticCore = null; // 移动工具栏时磁芯消失
            var cDragDt = { dx: 0, dy: 0 };
            node.drag(function (dx, dy) {
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
                // cDragDt = {dx: 0, dy: 0}
                var _x, _y;
                if (2 == type) {
                    _x = this.attr('x');
                    _y = this.attr('y');
                }
                else if (3 == type) {
                    var tpPath = this.attr('path');
                    var tpPath0 = tpPath[0];
                    _x = tpPath0[1];
                    _y = tpPath0[2];
                }
                else {
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
            }, function () {
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
        var arrowDragHandler = function (ist) {
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
                }
                else {
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
            }, function () {
            });
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
            }, function () { });
        })();
    };
    /**
     * 获取
     */
    WorkerEditor.prototype._getOrderCode = function () {
        this._rIdx += 1;
        var code = this.config.prefCode + this._rIdx;
        // 判断序列号是否已经存在
        if (this._code2EidDick[code]) {
            code = this._getOrderCode();
        }
        return code;
    };
    /**
     * 移除全部的边框
     */
    WorkerEditor.prototype.removeBBox = function () {
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
        this.removeTempNodes();
        // 直线选中删除
        var lines = this.lineQueues;
        for (var k = 0; k < lines.length; k++) {
            var line = lines[k];
            if (lines.selectEdMk) {
                line.selectEdMk = false;
            }
        }
        // 移除配置属性
        this.removeIntersectMk();
        // 删除文本选中状态
        this._removeTxtSelect();
        this.tempNodes = [];
    };
    /**
     * 删除临时节点
     * @returns {this}
     */
    WorkerEditor.prototype.removeTempNodes = function () {
        // 临时节点
        var tempNodes = this.tempNodes;
        for (var j = 0; j < tempNodes.length; j++) {
            var tNode = tempNodes[j];
            tNode.remove();
        }
    };
    /**
     * 删除节点, 为空是删除当前选中的节点
     * @param {RaphaelElement|string|null} code
     */
    WorkerEditor.prototype.removeNode = function (code) {
        if (!code) {
            code = this.getSelected();
        }
        if (code) {
            var node = 'object' == typeof code ? code :
                (this._code2EidDick[code] ? this.raphael.getById(this._code2EidDick[code]) : this.raphael.getById(code));
            if ('object' == typeof node) {
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
                }
                else {
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
    };
    /**
     * 移除碰撞属性
     */
    WorkerEditor.prototype.removeIntersectMk = function () {
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
                }
                else {
                    _type = node.c.data('type');
                    if (1 == _type) {
                        node.c.attr('fill', pkgClr.start);
                    }
                    else if (9 == _type) {
                        node.c.attr('fill', pkgClr.end);
                    }
                }
                IntersectEl = node;
            }
        }
        return IntersectEl;
    };
    /**
     * 移除连接检测线，用于连接线与节点关联时删除就的关联
     * @param {NodeBase} lineIst
     * @param {string} type from/to
     * @returns {bool}
     */
    WorkerEditor.prototype.removeConLine = function (lineIst, type) {
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
    };
    /**
     * 删除所有对象
     * @returns {this}
     */
    WorkerEditor.prototype.removeAll = function () {
        this.removeAllText();
        this.removeAllLine();
        this.removeAllNode();
        return this;
    };
    /**
     * 删除所有节点
     * @returns {this}
     */
    WorkerEditor.prototype.removeAllNode = function () {
        this.removeBBox();
        var nodes = this.nodeQueues;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.label) {
                node.label.remove();
            }
            node.c.remove();
        }
        this.nodeQueues = [];
        return this;
    };
    /**
     * 删除所有直线
     * @returns {this}
     */
    WorkerEditor.prototype.removeAllLine = function () {
        this.removeBBox();
        var lines = this.lineQueues;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            line.c.remove();
        }
        this.lineQueues = [];
        return this;
    };
    /**
     * 删除所有文本
     * @returns {this}
     */
    WorkerEditor.prototype.removeAllText = function () {
        this.removeBBox();
        var texts = this.textQueues;
        for (var i = 0; i < texts.length; i++) {
            var text = texts[i];
            text.remove();
        }
        this.textQueues = [];
        return this;
    };
    /**
     * 通过节点代码获取节点
     * @param {string} code  NodeBase.c.data('code')
     * @returns {NodeBase|null}
     */
    WorkerEditor.prototype.getNodeByCode = function (code) {
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
    };
    /**
    * 通过节点代码获取节点
    * @param {string} code  NodeBase.c.id
    * @returns {NodeBase|null}
    */
    WorkerEditor.prototype.getNodeByEid = function (code) {
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
    };
    /**
     * 代码与id对应，不同时传入值；设置字典
     * @param {string|null} code
     * @param {string|null} id
     * @returns {string|null|this}
     */
    WorkerEditor.prototype.code2Id = function (code, id) {
        // 通过 code 获取 Id
        if (code && !id) {
            return this._code2EidDick[code] || null;
        }
        else if (id && !code) {
            var dick = this._code2EidDick;
            for (var prefCode in dick) {
                if (id == dick[prefCode]) {
                    return prefCode;
                }
            }
            return null;
        }
        else if (id && code) {
            this._code2EidDick[code] = id;
            return this;
        }
    };
    /**
     * 设置指定/当前选择节点对象属性
     * @param {object} option {text}
     * @param {RaphaelElement|string|null} code REle.id
     * @returns {bool}
     */
    WorkerEditor.prototype.setOption = function (option, code) {
        var isSuccess = false;
        if (option) {
            if ('object' != typeof option) {
                option = { text: option };
            }
            if (!code) {
                code = this.getSelected();
            }
            var node = 'object' == typeof code ? code : this.getNodeByCode(code);
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
    };
    /**
     * 赋值节点，为空是复制当前选中的节点
     * @param {RaphaelElement|string|null} code
     */
    WorkerEditor.prototype.cloneNode = function (code) {
        if (!code) {
            code = this.getSelected();
        }
        if (code) {
            var node = 'object' == typeof code ? code : this.raphael.getById(code);
            if ('object' == typeof node) {
                // 删除实体数据
                var id = node.id; // id 数据
                node.c.clone();
                node.label.clone();
                return true;
            }
        }
        return false;
    };
    /**
     * 获取被选中的节点，只能一个
     * @returns {NodeBase}
     */
    WorkerEditor.prototype.getSelected = function () {
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
    };
    /**
     * 获取最新生成的节点
     * @returns {NodeBase}
     */
    WorkerEditor.prototype.getLastElem = function () {
        var lastElem = null;
        var nodes = this.nodeQueues;
        if (nodes.length > 0) {
            lastElem = nodes[nodes.length - 1];
        }
        return lastElem;
    };
    /**
     * 获取工作流步骤,用于保存工作流的数据结构
     * @returns {array}
     */
    WorkerEditor.prototype.getFlowStep = function () {
        var step = [];
        var nodes = this.nodeQueues;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            var stepAttr = this.getFlowJson(node);
            step.push(stepAttr);
        }
        return step;
    };
    /**
     * 获取节点业务需求的数据结构
     * @param {NodeBase|null} node 节点实例， 为空时为当前选中的节点
     * @returns {object|null}
     */
    WorkerEditor.prototype.getFlowJson = function (node) {
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
            };
            // 终点
            var toLines = node.toLine;
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
        }
        else {
            fjson = null;
        }
        return fjson;
    };
    /**
     * 获取连接线端点的节点代码
     * @param {string} type from/to
     * @param {string} lineId 直线代码
     * @param {NodeBase|null|string} refIst 参照id/NodeBase attr= {code}
     * @returns {string}
     */
    WorkerEditor.prototype.getLineCntCode = function (type, lineId, refIst) {
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
    };
    /**
     * 获取碰撞的元素
     * @param {object} point {x, y} 坐标点
     * @returns {RapaelElement|null}
     */
    WorkerEditor.prototype.getIntersectElem = function (point) {
        var itsctEl = null;
        if ('object' == typeof point) {
            var nodes = this.nodeQueues;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var type = node.NodeType;
                if ('endpnt' == type) {
                    var $c = node.c;
                    var cx = $c.attr('cx'), cy = $c.attr('cy'), rx = $c.attr('rx'), ry = $c.attr('ry');
                    if (
                    // x
                    (point.x >= (cx - rx) && point.x <= (cx + rx))
                        // y
                        &&
                            (point.y >= (cy - ry) && point.y <= (cy + ry))) {
                        itsctEl = node;
                        break;
                    }
                }
                else if ('opera' == type) {
                    var $c = node.c, x = $c.attr('x'), y = $c.attr('y'), w = $c.attr('width'), h = $c.attr('height');
                    if (
                    // x
                    (point.x >= x && point.x <= (x + w))
                        // y
                        &&
                            (point.y >= y && point.y <= (y + h))) {
                        itsctEl = node;
                        break;
                    }
                }
                else if ('judge' == type) {
                    var $opt = node.opt, cx = $opt.cx, cy = $opt.cy, h = $opt.h, w = $opt.w;
                    if (
                    // x
                    (point.x >= (cx - w / 2) && point.x <= (cx + w / 2))
                        // y
                        &&
                            (point.y >= (cy - h / 2) && point.y <= (cy + h / 2))) {
                        itsctEl = node;
                        break;
                    }
                }
                //console.log(node)
            }
        }
        return itsctEl;
    };
    /**
     * 加载流程数据,用于修改时加载历史数据
     * @param {object|null} steps
     */
    WorkerEditor.prototype.loadStep = function (steps) {
        if ('object' == typeof steps) {
            // 连接性先关联信息: {id:{}}
            var lineCntMapInfo = {}, pkgClr = this.config.pkgClr;
            // 记录连线端点信息                
            var recordLMapFn = function (_from, _to) {
                if (_from.indexOf(',') == -1) {
                    var _toQus = _to.indexOf(',') == -1 ? [_to] : _to.split(',');
                    for (var x1 = 0; x1 < _toQus.length; x1++) {
                        var ftK = _from + '__' + _toQus[x1];
                        if (!lineCntMapInfo[ftK]) {
                            lineCntMapInfo[ftK] = true;
                        }
                    }
                }
                else if (_to.indexOf(',') == -1) {
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
                var _struct = step._struct, opt = _struct.opt, config = this.config, pkgClr = config.pkgClr;
                var type = step.type;
                var nodeIst = null;
                if (1 == type || 9 == type) {
                    nodeIst = this.flow.endpoint(opt.cx, opt.cy, opt.r, opt.text);
                    if (1 == type) {
                        nodeIst.c.attr('fill', pkgClr.start);
                    }
                    else {
                        nodeIst.c.attr('fill', pkgClr.end);
                    }
                }
                else if (2 == type) {
                    nodeIst = this.flow.operation(opt.cx, opt.cy, opt.w, opt.h, opt.text);
                    nodeIst.c.attr('fill', pkgClr.opera);
                }
                else if (3 == type) {
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
    };
    /**
     * 创建节点数
     * @param {object} cDragDt 当前节点拖动的参数
     * @param {number|string} type 节点类型
     */
    WorkerEditor.prototype._createNode = function (tbDragDt, type) {
        var $this = this, nodeIst = null, config = this.config, pkgClr = config.pkgClr;
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
            var code = this._getOrderCode();
            nodeIst.c.data('code', code);
            this._code2EidDick[code] = nodeIst.c.id;
            nodeIst.c.data('type', type);
            this._bindEvent(nodeIst);
            this.nodeQueues.push(nodeIst);
        }
    };
    /**
     * 节点绑定事件
     * @param {NodeBase} nodeIst
     */
    WorkerEditor.prototype._bindEvent = function (nodeIst) {
        if (nodeIst) {
            var $this = this, config = this.config, pkgClr = config.pkgClr;
            // 节点拖动
            (function () {
                var cDragDt = { x: 0, y: 0 };
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
                    }
                    else if ('rect' == this.type) {
                        _x = this.attr('x');
                        _y = this.attr('y');
                    }
                    else if ('path' == this.type) {
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
    };
    /**
     * 直线拖动
     * @param {RapaelElement} lineInst
     */
    WorkerEditor.prototype._lineTragEvent = function (lineInst) {
        if (!lineInst || 'object' != typeof lineInst) {
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
                // tsc isEnd 可选参数
                var lineEndPointMoveEvt = function (LIst, isEnd) {
                    var aCDt = { ax: 0, ay: 0 };
                    // console.log(arrowLineP1)
                    LIst.drag(function (ax, ay) {
                        ax += aCDt.ax;
                        ay += aCDt.ay;
                        var hasIntersectElem = $this.getIntersectElem({ x: ax, y: ay });
                        if (hasIntersectElem) {
                            $this.removeIntersectMk();
                            hasIntersectElem.c.attr('fill', '#FF0000');
                            hasIntersectElem._IntersectMk = true;
                            var CntLinePnt;
                            if (isEnd) {
                                CntLinePnt = hasIntersectElem.getEnlnP();
                            }
                            else {
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
                        }
                        else {
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
    };
    /**
     * 文本拖动，独立文本
     * @param {RapaelElement} textElem
     */
    WorkerEditor.prototype._textBindEvent = function (textElem) {
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
            }, function () { });
        })(textElem);
        // 点击处理
        textElem.click(function () {
            // this.attr('font-size', '100rem')
            // this.attr('font-size', '1.23em')
            // $this._removeTxtSelect()
            $this.removeBBox();
            this.attr(Conf.text.selected);
            this.data('selectMk', true);
        });
    };
    /**
     * 移除文本选中状态
     */
    WorkerEditor.prototype._removeTxtSelect = function () {
        var texts = this.textQueues;
        for (var i = 0; i < texts.length; i++) {
            var text = texts[i];
            if (text.data('selectMk')) {
                text.attr(Conf.text.defAtrr);
                text.data('selectMk', false);
            }
        }
    };
    /**
     * 事件处理接口
     * @param {NodeBase} nodeIst
     */
    WorkerEditor.prototype.onNodeClick = function (nodeIst) { };
    // 静态属性
    WorkerEditor.version = __WEBPACK_IMPORTED_MODULE_3__version__["a" /* LibVersion */];
    return WorkerEditor;
}());
/* harmony default export */ __webpack_exports__["default"] = (WorkerEditor);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * 2018年1月8日 星期一
 * 内部处理类，从 worker.js/flow.js 内部分离
 */
// 实例索引序列
var instanceIndex = 0;
var instanceSource = {}; // 实列资源队列
// 内部协助函数(私有)
var H = /** @class */ (function () {
    function H() {
    }
    /**
     * 内部函数生成实例
     * @param {*} config
     */
    H.createInstance = function (config) {
        config = 'object' == typeof config ? config : {};
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
            // config.w = parseInt(width * 1.1)
            config.w = $(window).width() * 1.1;
        }
        if (!config.h) {
            config.h = $(window).height() * 1.1;
        }
        return Raphael(config.dom.get(0), config.w, config.h);
    };
    H.onMoveEvt = function () { };
    H.onStartEvt = function () { };
    H.onEndEvt = function () { };
    /**
     * 内部索引序列
     */
    H.getIndex = function () {
        instanceIndex += 1;
        return instanceIndex;
    };
    /**
     * 内部资源处理
     * @param {number} index
     * @param {string|null} key
     * @param {*} value
     */
    H.src = function (index, key, value) {
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
    };
    return H;
}());
/* harmony default export */ __webpack_exports__["a"] = (H);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(5)))

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Flow; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_NodeEndpoint__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_NodeOperation__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_NodeJudge__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_NodeLine__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_NodeArrow__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_NodeBow__ = __webpack_require__(12);
/* unused harmony reexport NodeLine */
/* unused harmony reexport NodeArrow */
/* unused harmony reexport NodeEndpoint */
/* unused harmony reexport NodeOperation */
/* unused harmony reexport NodeJudge */






var Flow = /** @class */ (function () {
    /**
     * @param {Raphael} paper
     */
    function Flow(paper) {
        this.paper = paper;
    }
    /**
     * 端点(圆别名) , 圆心 和 半径
     * @param {number} cx
     * @param {number} cy
     * @param {number} r
     * @param {string|null} 文本框
     */
    Flow.prototype.endpoint = function (cx, cy, r, text) {
        var nd = new __WEBPACK_IMPORTED_MODULE_0__node_NodeEndpoint__["a" /* default */](this.paper);
        nd.create({ cx: cx, cy: cy, r: r, text: text });
        return nd;
    };
    /**
     * 判断节点
     */
    Flow.prototype.judge = function (cx, cy, w, h, text) {
        var nd = new __WEBPACK_IMPORTED_MODULE_2__node_NodeJudge__["a" /* default */](this.paper);
        nd.create({ cx: cx, cy: cy, w: w, h: h, text: text });
        return nd;
    };
    /**
     * 操作节点
     */
    Flow.prototype.operation = function (cx, cy, w, h, text) {
        var nd = new __WEBPACK_IMPORTED_MODULE_1__node_NodeOperation__["a" /* default */](this.paper);
        nd.create({ cx: cx, cy: cy, w: w, h: h, text: text });
        return nd;
    };
    /**
     * p1 -> p2 的连线
     * @param {*} p1 {x,y}
     * @param {*} p2
     */
    Flow.prototype.line = function (p1, p2) {
        var nd = new __WEBPACK_IMPORTED_MODULE_3__node_NodeLine__["a" /* default */](this.paper);
        nd.create(p1, p2);
        return nd;
    };
    /**
     * p1 -> p2 直角转线算啊分
     * @param {object} opt
     */
    Flow.prototype.rightAngleLine = function (opt) {
        var nd = new __WEBPACK_IMPORTED_MODULE_3__node_NodeLine__["a" /* default */](this.paper);
        nd.RightAngle(opt);
        return nd;
    };
    /**
     * p1 -> p2 的连线
     * @param {*} p1 [x,y]
     * @param {*} p2
     * @param {number} r
     */
    Flow.prototype.arrow = function (p1, p2, r) {
        var nd = new __WEBPACK_IMPORTED_MODULE_4__node_NodeArrow__["a" /* default */](this.paper);
        nd.create(p1, p2, r);
        return nd;
    };
    /**
     * 箭头
     * @param {object} opt
     */
    Flow.prototype.bow = function (opt) {
        var nd = new __WEBPACK_IMPORTED_MODULE_5__node_NodeBow__["a" /* default */](this.paper);
        nd.create(opt);
        return nd;
    };
    /**
     * 获取空节点对象
     * @param {string} nType
     */
    Flow.prototype.getEmptyNode = function (nType) {
        var $node = null;
        switch (nType) {
            case 'endpoint':
                $node = new __WEBPACK_IMPORTED_MODULE_0__node_NodeEndpoint__["a" /* default */](this.paper);
                break;
            case 'judge':
                $node = new __WEBPACK_IMPORTED_MODULE_2__node_NodeJudge__["a" /* default */](this.paper);
                break;
            case 'operation':
                $node = new __WEBPACK_IMPORTED_MODULE_1__node_NodeOperation__["a" /* default */](this.paper);
                break;
            case 'line':
                $node = new __WEBPACK_IMPORTED_MODULE_3__node_NodeLine__["a" /* default */](this.paper);
                break;
            case 'arrow':
                $node = new __WEBPACK_IMPORTED_MODULE_4__node_NodeArrow__["a" /* default */](this.paper);
                break;
        }
        return $node;
    };
    return Flow;
}());








/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeBase__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NodeEndpoint = /** @class */ (function (_super) {
    __extends(NodeEndpoint, _super);
    /**
     *
     * @param {*} instance Raphael 实例
     */
    function NodeEndpoint(instance) {
        var _this = _super.call(this) || this;
        _this.NodeType = 'endpnt';
        _this.instance = instance;
        _this.opt = {};
        return _this;
    }
    /**
     * @param {object} opt / {cx, cy, r, text}
     */
    NodeEndpoint.prototype.create = function (opt) {
        // 解析类型
        if ('object' != typeof opt) {
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
        }
        else {
            label = this.instance.text(opt.cx, opt.cy);
        }
        this.label = label;
        this.resizeByText();
    };
    /**
     * 根据文本宽度自动适应文本的宽度
     */
    NodeEndpoint.prototype.resizeByText = function () {
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
            }
            else {
                width += 2;
            }
            this.opt.r = width / 2;
            this.resizeByOpt();
        }
    };
    /**
     * 根据 opt 值的改变重调整容器形状大小
     */
    NodeEndpoint.prototype.resizeByOpt = function () {
        var opt = this.opt;
        this.c.attr({
            cx: opt.cx,
            cy: opt.cy,
            rx: opt.r,
            ry: opt.h
        });
    };
    // 外部移动坐标处理， 
    NodeEndpoint.prototype.move = function (x, y) {
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
    };
    // 直线同步移动
    NodeEndpoint.prototype.ToSyncLine = function (x, y) {
        var _this = this;
        this.syncLineMove(function (lnC, type, $ln) {
            var position = $ln.position;
            var methodName;
            if (type == 'from') {
                var $fPath = lnC.attr('path');
                methodName = 'get' + position.from + 'p';
                var p1 = _this[methodName](x, y);
                $fPath[0] = ['M', p1.x, p1.y],
                    lnC.attr('path', $fPath);
            }
            else if (type == 'to') {
                var $tPath = lnC.attr('path');
                methodName = 'get' + position.to + 'p';
                var p2 = _this[methodName](x, y);
                $tPath[$tPath.length - 1] = ['L', p2.x, p2.y];
                lnC.attr('path', $tPath);
            }
        });
    };
    // 箭头同步移动
    NodeEndpoint.prototype.ToSyncArrow = function (x, y) {
        var _this = this;
        this.syncLineMove(function (lnC, type, $ln) {
            var position = $ln.position;
            var methodName;
            if (type == 'from') {
                methodName = 'get' + position.from + 'p';
                var p1 = _this[methodName](x, y);
                $ln.updatePath([p1.x, p1.y]);
            }
            else if (type == 'to') {
                methodName = 'get' + position.to + 'p';
                var p2 = _this[methodName](x, y);
                $ln.updatePath(null, [p2.x, p2.y]);
            }
        });
    };
    // 获取连线的起点节点
    NodeEndpoint.prototype.getStlnP = function (position) {
        position = position ? position : 'D';
        var methodName = 'get' + position + 'p';
        var p = this[methodName]();
        p.position = position;
        return p;
    };
    // 获取连线的终点节点
    NodeEndpoint.prototype.getEnlnP = function (position) {
        position = position ? position : 'B';
        var methodName = 'get' + position + 'p';
        var p = this[methodName]();
        p.position = position;
        return p;
    };
    NodeEndpoint.prototype.getAp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x -= opt.r;
        return { x: x, y: y };
    };
    NodeEndpoint.prototype.getBp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        y -= opt.r;
        return { x: x, y: y };
    };
    NodeEndpoint.prototype.getCp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x += opt.r;
        return { x: x, y: y };
    };
    NodeEndpoint.prototype.getDp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        y += opt.r;
        return { x: x, y: y };
    };
    return NodeEndpoint;
}(__WEBPACK_IMPORTED_MODULE_0__NodeBase__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeEndpoint);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeBase__ = __webpack_require__(1);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 2018年1月5日 星期五
 * 操作处理节点
 */

var NodeOperation = /** @class */ (function (_super) {
    __extends(NodeOperation, _super);
    /**
     *
     * @param {*} instance Raphael 实例
     */
    function NodeOperation(instance) {
        var _this = _super.call(this) || this;
        _this.NodeType = 'opera';
        _this.instance = instance;
        _this.opt = {}; // 配置信息数据
        _this.bBox = null; // 边缘盒子数据示例
        return _this;
    }
    /**
     * @param {object} opt / [cx, cy, w, h, text]
     */
    NodeOperation.prototype.create = function (opt) {
        this.opt = opt;
        this.minWidth = opt.w; // 最小宽度
        // 容器        
        var ap = this.getAp();
        this.c = this.instance.rect(ap.x, ap.y, opt.w, opt.h);
        // 标签
        var label;
        if (opt.text) {
            label = this.instance.text(opt.cx, opt.cy, opt.text);
        }
        else {
            label = this.instance.text(opt.cx, opt.cy);
        }
        this.label = label;
        // 自动调整文本宽度
        this.resizeByText();
    };
    /**
     * 根据文本宽度自动适应文本的宽度
     */
    NodeOperation.prototype.resizeByText = function () {
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
            }
            else {
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
    };
    // 外部移动坐标处理
    NodeOperation.prototype.move = function (x, y) {
        var ctP = this.getCtpByAp(x, y);
        this.c.attr({
            x: x, y: y
        });
        this.label.attr(ctP);
        this.opt.cx = x;
        this.opt.cy = y;
    };
    // 直线同步移动
    NodeOperation.prototype.ToSyncLine = function (x, y) {
        var _this = this;
        var ctP = this.getCtpByAp(x, y);
        // 直线同步移动
        this.syncLineMove(function (lnC, type, $ln) {
            var position = $ln.position, methodName;
            if (type == 'from') {
                var $fPath = lnC.attr('path');
                methodName = 'get' + position.from + 'p';
                var p1 = _this[methodName](ctP.x, ctP.y);
                $fPath[0] = ['M', p1.x, p1.y];
                lnC.attr('path', $fPath);
            }
            else if (type == 'to') {
                methodName = 'get' + position.to + 'p';
                var p2 = _this[methodName](ctP.x, ctP.y);
                var $tPath = lnC.attr('path');
                $tPath[$tPath.length - 1] = ['L', p2.x, p2.y];
                lnC.attr('path', $tPath);
            }
        });
    };
    // 箭头同步移动
    NodeOperation.prototype.ToSyncArrow = function (x, y) {
        var _this = this;
        var ctP = this.getCtpByAp(x, y);
        this.syncLineMove(function (lnC, type, $ln) {
            var position = $ln.position, methodName;
            if (type == 'from') {
                methodName = 'get' + position.from + 'p';
                var bP = _this[methodName](ctP.x, ctP.y);
                $ln.updatePath([bP.x, bP.y]);
            }
            else if (type == 'to') {
                methodName = 'get' + position.to + 'p';
                var dP = _this[methodName](ctP.x, ctP.y);
                $ln.updatePath(null, [dP.x, dP.y]);
            }
        });
    };
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
    NodeOperation.prototype.getStlnP = function (position) {
        position = position ? position : 'Bt';
        var methodName = 'get' + position + 'p';
        var p = this[methodName]();
        p.position = position;
        return p;
    };
    // 获取连线的终点节点
    NodeOperation.prototype.getEnlnP = function (position) {
        position = position ? position : 'T';
        var methodName = 'get' + position + 'p';
        var p = this[methodName]();
        p.position = position;
        return p;
    };
    // 根据 A 点获取 中心点
    NodeOperation.prototype.getCtpByAp = function (x, y) {
        var opt = this.opt;
        x += opt.w / 2;
        y += opt.h / 2;
        return { x: x, y: y };
    };
    NodeOperation.prototype.getAp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x -= opt.w / 2;
        y -= opt.h / 2;
        return { x: x, y: y };
    };
    NodeOperation.prototype.getBp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x -= opt.w / 2;
        y += opt.h / 2;
        return { x: x, y: y };
    };
    NodeOperation.prototype.getCp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x += opt.w / 2;
        y += opt.h / 2;
        return { x: x, y: y };
    };
    NodeOperation.prototype.getDp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x -= opt.w / 2;
        y += opt.h / 2;
        return { x: x, y: y };
    };
    NodeOperation.prototype.getTp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        y -= opt.h / 2;
        return { x: x, y: y };
    };
    NodeOperation.prototype.getRp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x += opt.w / 2;
        return { x: x, y: y };
    };
    NodeOperation.prototype.getBtp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        y += opt.h / 2;
        return { x: x, y: y };
    };
    NodeOperation.prototype.getLp = function (x, y) {
        var opt = this.opt;
        x = x ? x : opt.cx;
        y = y ? y : opt.cy;
        x -= opt.w / 2;
        return { x: x, y: y };
    };
    return NodeOperation;
}(__WEBPACK_IMPORTED_MODULE_0__NodeBase__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeOperation);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(10);
/**
 * 2018年1月5日 星期五
 * 连接类型： 连线
 */

var NodeLine = /** @class */ (function () {
    /**
     *
     * @param {*} instance Raphael 实例
     */
    function NodeLine(instance) {
        this.NodeType = 'line';
        this.instance = instance;
        this.opt = {}; // 配置信息数据
        this.position = {}; // 连接点
        /*
            {from: A/B/C/D, to: A/B/C/D}
        */
        this.rightAngle = false; // 直线直角连法
    }
    NodeLine.prototype.create = function (p1, p2) {
        this.opt = {
            p1: p1, p2: p2
        };
        this.c = this.instance.path('M' + p1[0] + ',' + p1[1] +
            'L' + p2[0] + ',' + p2[1]);
    };
    /**
     * 直角连接法
     * @param {object} opt {p1{x,y}, p2, d}
     */
    NodeLine.prototype.RightAngle = function (opt) {
        this.opt = opt;
        this.rightAngle = true;
        var p1 = opt.p1, p2 = opt.p2, d0 = 20;
        if (opt.d) {
            d0 = opt.d;
        }
        var middlePathStr = '';
        if (p1.x != p2.x && p1.y != p2.y) {
            var d1 = p2.x - p1.x;
            middlePathStr =
                'L' + (p1.x + d1 + d0 * (d1 > 0 ? 1 : -1)) + ',' + p1.y +
                    'L' + (p1.x + d1 + d0 * (d1 > 0 ? 1 : -1)) + ',' + p2.y +
                    '';
        }
        this.c = this.instance.path('M' + p1.x + ',' + p1.y +
            middlePathStr +
            'L' + p2.x + ',' + p2.y);
    };
    /**
     * 直接通过坐标点生成直线
     * @param {object} point
     */
    NodeLine.prototype.createByPoint = function (point) {
        this.opt = point;
        var pathStr = '';
        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(this.opt.points, function (index, value) {
            if (value) {
                pathStr += (pathStr ? 'L' : 'M') + value.x + ',' + value.y;
            }
        });
        this.c = this.instance.path(pathStr);
    };
    return NodeLine;
}());
/* harmony default export */ __webpack_exports__["a"] = (NodeLine);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Util; });
var Util = /** @class */ (function () {
    function Util() {
    }
    /**
     * 对象复制
     * @param {object} t1
     */
    Util.clone = function (t1) {
        t1 = 'object' == typeof t1 ? t1 : {};
        var obj = {};
        return $.extend(true, obj, t1);
    };
    /**
     * 数据合并相同的元素
     * @param {*} array
     */
    Util.ArrayMergeSameValue = function (array) {
        if ('object' == typeof array && array.length && array.length > 1) {
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
    };
    /**
     * @param {array|object} obj
     * @param {function} callback (k, v)
     */
    Util.each = function (obj, callback) {
        if ('object' == typeof obj) {
            if ($.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    if (false === callback(i, obj[i])) {
                        break;
                    }
                }
            }
            else {
                for (var k in obj) {
                    if (false === callback(k, obj[k])) {
                        break;
                    }
                }
            }
        }
    };
    return Util;
}());



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
///<reference path='../../index.d.ts' />
/**
 * 2018年1月6日 星期六
 * 连接类型： 箭头
 */
var NodeArrow = /** @class */ (function () {
    /**
     *
     * @param {*} instance Raphael 实例
     */
    function NodeArrow(instance) {
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
    NodeArrow.prototype.create = function (p1, p2, r) {
        this.opt = {
            p1: p1, p2: p2, r: r
        };
        // 非同 x 线
        var points = this.getPoints();
        this.c = this.instance.path('M' + p1[0] + ',' + p1[1] +
            'L' + p2[0] + ',' + p2[1] +
            'L' + points.cP.x + ',' + points.cP.y +
            'L' + points.dP.x + ',' + points.dP.y +
            'L' + p2[0] + ',' + p2[1]);
    };
    // 获取点序列
    NodeArrow.prototype.getPoints = function (p1, p2, r) {
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
    };
    /**
     * 更细记录表
     * @param {*} p1
     * @param {*} p2
     * @param {*} r
     */
    NodeArrow.prototype.updatePath = function (p1, p2, r) {
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
        this.c.attr('path', [
            ['M', p1[0], p1[1]],
            ['L', p2[0], p2[1]],
            ['L', points.cP.x, points.cP.y],
            ['L', points.dP.x, points.dP.y],
            ['L', p2[0], p2[1]]
        ]);
        // 同步更新记录
        this.opt = {
            p1: p1, p2: p2, r: r
        };
    };
    return NodeArrow;
}());
/* harmony default export */ __webpack_exports__["a"] = (NodeArrow);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年1月23日 星期二
 * 弓形箭头
 */
/**
 *
 *
 * @class NodeBow
 */
var NodeBow = /** @class */ (function () {
    /**
     *
     * @param {*} instance Raphael 实例
     */
    function NodeBow(instance) {
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
    NodeBow.prototype.create = function (opt) {
        this.opt = opt;
        this.queueCheck();
        this.bodySharp();
        this.arrowSharp();
    };
    /**
     * 箭头
     */
    NodeBow.prototype.arrowSharp = function () {
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
                'L' + x2 + ',' + y2 +
                'L' + x3 + ',' + y3 +
                'L' + p2.x + ',' + p2.y);
        }
        else {
            this.arrow.attr('path', [
                ['M', p2.x, p2.y],
                // 箭头体
                ['L', x2, y2],
                ['L', x3, y3],
                ['L', p2.x, p2.y]
            ]);
        }
    };
    /**
     * 键体
     */
    NodeBow.prototype.bodySharp = function () {
        var queue = this.opt.queue;
        var pathStr = '';
        var pathArr = [];
        var hasInstance = false, isM = true;
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
            }
            else {
                pathStr += (pathStr ? 'L' : 'M') + ',' + que.x + ',' + que.y;
            }
        }
        if (hasInstance) {
            this.c.attr('path', pathArr);
        }
        else {
            this.c = this.instance.path(pathStr);
        }
    };
    /**
     * 点队列检测
     */
    NodeBow.prototype.queueCheck = function () {
        var queue = this.opt.queue;
        // 双点检测  “ 7 形 ”
        if (queue.length == 2) {
            var middlePoint = [];
            var p1 = queue[0], p2 = queue[1];
            if (p1.x < p2.x) {
                middlePoint.push({ x: p2.x, y: p1.y });
            }
            else if (p1.x > p2.x) {
                // 20 @issue 需要可配置接口
                middlePoint.push({ x: p1.x, y: p2.y - 20 });
                middlePoint.push({ x: p2.x, y: p2.y - 20 });
            }
            this.opt.queue = [p1].concat(middlePoint, p2);
        }
    };
    /**
     * 更细记录表
     * @param {*} p1
     * @param {*} p2
     * @param {*} r
     */
    NodeBow.prototype.updatePath = function (p1, p2, r) {
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
    };
    return NodeBow;
}());
/* harmony default export */ __webpack_exports__["a"] = (NodeBow);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibVersion; });
var LibVersion = { "version": "2.0.4", "release": "20180327", "author": "Joshua Conero" };


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/**
 * 2018年3月26日 星期一
 * 开始
 */
///<reference path="../../index.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NodeBegin = /** @class */ (function (_super) {
    __extends(NodeBegin, _super);
    function NodeBegin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeBegin.prototype._onInit = function () {
        this.NodeType = 'begin';
    };
    /**
     * 生成器处理事件
     */
    NodeBegin.prototype._whenCreatorEvt = function () {
        var opt = this.opt, bkg = opt.bkg || '#851E07';
        this.c = this.paper.ellipse(opt.cx, opt.cy, opt.w / 2, opt.h / 2);
        this.c.attr('fill', bkg);
    };
    return NodeBegin;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeBegin);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/**
 * 2018年3月26日 星期一
 * 任务节点
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NodeTask = /** @class */ (function (_super) {
    __extends(NodeTask, _super);
    function NodeTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeTask.prototype._onInit = function () {
        this.NodeType = 'task';
    };
    /**
     * 生成器处理事件
     */
    NodeTask.prototype._whenCreatorEvt = function () {
        var attr = this.opt2Attr(), opt = this.opt, bkg = opt.bkg || '#88EEEA';
        this.c = this.paper.rect(attr.x, attr.y, attr.w, attr.h);
        this.c.attr('fill', bkg);
    };
    /**
     * 通过选项映射到节点属性
     */
    NodeTask.prototype.opt2Attr = function (nOpt) {
        var opt = nOpt ? nOpt : this.opt, x = opt.cx - opt.w / 2, y = opt.cy - opt.h / 2, w = opt.w, h = opt.h;
        return {
            x: x, y: y, w: w, h: h
        };
    };
    /**
     * 拖动处理事件
     */
    NodeTask.prototype.drag = function () {
        var $this = this;
        this.c.drag(function (dx, dy) {
            return {};
        }, function (x, y) {
            return {};
        }, function () {
            return {};
        });
    };
    return NodeTask;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeTask);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/**
 * 2018年3月26日 星期一
 * 审核节点
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NodeAudit = /** @class */ (function (_super) {
    __extends(NodeAudit, _super);
    function NodeAudit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeAudit.prototype._onInit = function () {
        this.NodeType = 'audit';
        this.xRate = 0.20;
    };
    NodeAudit.prototype._whenCreatorEvt = function () {
        var pQue = this.opt2Attr(), nOpt = this.opt, bkg = nOpt.bkg || '#88EEEA';
        this.c = this.paper.path('M' + pQue[0].x + ',' + pQue[0].y +
            'L' + pQue[1].x + ',' + pQue[1].y +
            'L' + pQue[2].x + ',' + pQue[2].y +
            'L' + pQue[3].x + ',' + pQue[3].y +
            'Z');
        this.c.attr('fill', bkg);
    };
    /**
     * 选项与节点属性的映射
     * @param {obejct|null} opt  选项属性
     * @returns {array} 选项表
     */
    NodeAudit.prototype.opt2Attr = function (opt) {
        var nopt = opt ? opt : this.opt, cx = nopt.cx, cy = nopt.cy, w = nopt.w, h = nopt.h, xRate = this.xRate;
        return [
            {
                x: cx - w / 2,
                y: cy - h / 2
            },
            {
                x: (cx + w / 2) + (w * xRate),
                y: cy - h / 2
            },
            {
                x: cx + w / 2,
                y: cy + h / 2
            },
            {
                x: (cx - w / 2) - (w * xRate),
                y: cy + h / 2
            }
        ];
    };
    return NodeAudit;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeAudit);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/**
 * 2018年3月26日 星期一
 * 会签
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NodeSign = /** @class */ (function (_super) {
    __extends(NodeSign, _super);
    function NodeSign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeSign.prototype._onInit = function () {
        this.NodeType = 'sign';
        this.xRate = 0.20;
    };
    NodeSign.prototype._whenCreatorEvt = function () {
        var pQue = this.opt2Attr(), opt = this.opt, bkg = opt.bkg || '#88EEEA';
        this.c = this.paper.path('M' + pQue[0].x + ',' + pQue[0].y +
            'L' + pQue[1].x + ',' + pQue[1].y +
            'L' + pQue[2].x + ',' + pQue[2].y +
            'L' + pQue[3].x + ',' + pQue[3].y +
            'Z');
        this.c.attr('fill', bkg);
    };
    /**
     * 选项与节点属性的映射
     * @param {obejct|null} opt  选项属性
     * @returns {array} 选项表
     */
    NodeSign.prototype.opt2Attr = function (opt) {
        var nopt = opt ? opt : this.opt, cx = nopt.cx, cy = nopt.cy, w = nopt.w, h = nopt.h, xRate = this.xRate;
        return [
            {
                x: cx - w / 2 - w * xRate,
                y: cy - h / 2
            },
            {
                x: (cx + w / 2) + (w * xRate),
                y: cy - h / 2
            },
            {
                x: cx + w / 2,
                y: cy + h / 2
            },
            {
                x: cx - w / 2,
                y: cy + h / 2
            }
        ];
    };
    return NodeSign;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeSign);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/**
 * 2018年3月26日 星期一
 * 条件判断节点
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NodeCond = /** @class */ (function (_super) {
    __extends(NodeCond, _super);
    function NodeCond() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeCond.prototype._onInit = function () {
        this.NodeType = 'cond';
    };
    NodeCond.prototype._whenCreatorEvt = function () {
        var pQue = this.opt2Attr(), opt = this.opt, bkg = opt.bkg || '#88EEEA';
        this.c = this.paper.path('M' + pQue[0].x + ',' + pQue[0].y +
            'L' + pQue[1].x + ',' + pQue[1].y +
            'L' + pQue[2].x + ',' + pQue[2].y +
            'L' + pQue[3].x + ',' + pQue[3].y +
            'Z');
        this.c.attr('fill', bkg);
    };
    /**
     * 选项与节点属性的映射
     * @param {obejct|null} opt  选项属性
     * @returns {array} 选项表
     */
    NodeCond.prototype.opt2Attr = function (opt) {
        var nOpt = opt ? opt : this.opt, cx = nOpt.cx, cy = nOpt.cy, w = nOpt.w, h = nOpt.h;
        return [
            {
                x: cx,
                y: cy - h / 2
            },
            {
                x: cx + w / 2,
                y: cy
            },
            {
                x: cx,
                y: cy + h / 2
            },
            {
                x: cx - w / 2,
                y: cy
            }
        ];
    };
    return NodeCond;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeCond);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/**
 * 2018年3月26日 星期一
 * 子流程
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NodeSubFlow = /** @class */ (function (_super) {
    __extends(NodeSubFlow, _super);
    function NodeSubFlow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeSubFlow.prototype._onInit = function () {
        this.NodeType = 'subflow';
        this.xRate = 0.15;
    };
    /**
     * 生成器处理事件
     */
    NodeSubFlow.prototype._whenCreatorEvt = function () {
        var attrs = this.opt2Attr(), attr = attrs.cAttr, lLine = attrs.lLine, rLine = attrs.rLine, opt = this.opt, bkg = opt.bkg || '#88EEEA';
        this.c = this.paper.rect(attr.x, attr.y, attr.w, attr.h);
        this.c.attr('fill', bkg);
        this.inlineEle = [
            this.paper.path('M' + lLine[0].x + ',' + lLine[0].y +
                'L' + lLine[1].x + ',' + lLine[1].y),
            this.paper.path('M' + rLine[0].x + ',' + rLine[0].y +
                'L' + rLine[1].x + ',' + rLine[1].y)
        ];
    };
    /**
     * 通过选项映射到节点属性
     */
    NodeSubFlow.prototype.opt2Attr = function (nOpt) {
        var opt = nOpt ? nOpt : this.opt, x = opt.cx - opt.w / 2, y = opt.cy - opt.h / 2, w = opt.w, h = opt.h, xRate = this.xRate;
        return {
            cAttr: {
                x: x, y: y, w: w, h: h
            },
            lLine: [
                { x: x + w * xRate, y: y },
                { x: x + w * xRate, y: y + h }
            ],
            rLine: [
                { x: x + w - w * xRate, y: y },
                { x: x + w - w * xRate, y: y + h }
            ]
        };
    };
    return NodeSubFlow;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeSubFlow);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 2018年3月26日 星期一
 * 并行
 */

var NodeParallel = /** @class */ (function (_super) {
    __extends(NodeParallel, _super);
    function NodeParallel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeParallel.prototype._onInit = function () {
        this.NodeType = 'parallel';
        this.xRate = 0.20;
    };
    NodeParallel.prototype._whenCreatorEvt = function () {
        var attrs = this.opt2Attr(), opt = this.opt, bkg = opt.bkg || '#88EEEA';
        this.c = this.paper.path(this._ps2Path(attrs.cAttr, true));
        this.c.attr('fill', bkg);
        this.inlineEle = this.paper.path(this._ps2Path(attrs.inLine));
    };
    /**
     * 通过选项映射到节点属性
     */
    NodeParallel.prototype.opt2Attr = function (nOpt) {
        var opt = nOpt ? nOpt : this.opt, x = opt.cx - opt.w / 2, y = opt.cy - opt.h / 2, w = opt.w, h = opt.h, xRate = this.xRate, rW = w * (1 - xRate * 2); // 内矩形宽度
        return {
            cAttr: [
                {
                    x: x - rW / 2, y: y - h / 2
                },
                {
                    x: x + rW / 2, y: y - h / 2
                },
                {
                    x: x + w / 2, y: y
                },
                {
                    x: x + rW / 2, y: y + h / 2
                },
                {
                    x: x - rW / 2, y: y + h / 2
                },
                {
                    x: x - w / 2, y: y
                }
            ],
            inLine: [
                { x: x - rW / 2 - rW * 0.1, y: y },
                { x: x + rW / 2 + rW * 0.1, y: y }
            ]
        };
    };
    return NodeParallel;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeParallel);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/**
 * 2018年3月26日 星期一
 * 合并
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NodeMerge = /** @class */ (function (_super) {
    __extends(NodeMerge, _super);
    function NodeMerge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeMerge.prototype._onInit = function () {
        this.NodeType = 'merge';
        this.xRate = 0.20;
    };
    NodeMerge.prototype._whenCreatorEvt = function () {
        var attrs = this.opt2Attr(), opt = this.opt, bkg = opt.bkg || '#88EEEA';
        this.c = this.paper.path(this._ps2Path(attrs.cAttr, true));
        this.c.attr('fill', bkg);
        this.inlinesEle = [
            this.paper.path(this._ps2Path(attrs.vLine)),
            this.paper.path(this._ps2Path(attrs.hLine))
        ];
    };
    /**
     * 通过选项映射到节点属性
     */
    NodeMerge.prototype.opt2Attr = function (nOpt) {
        var opt = nOpt ? nOpt : this.opt, x = opt.cx - opt.w / 2, y = opt.cy - opt.h / 2, w = opt.w, h = opt.h, xRate = this.xRate, rW = w * (1 - xRate * 2); // 内矩形宽度
        return {
            cAttr: [
                {
                    x: x - rW / 2, y: y - h / 2
                },
                {
                    x: x + rW / 2, y: y - h / 2
                },
                {
                    x: x + w / 2, y: y
                },
                {
                    x: x + rW / 2, y: y + h / 2
                },
                {
                    x: x - rW / 2, y: y + h / 2
                },
                {
                    x: x - w / 2, y: y
                }
            ],
            vLine: [
                { x: x, y: y - h / 2 * 0.80 },
                { x: x, y: y + h / 2 * 0.80 }
            ],
            hLine: [
                { x: x - rW / 2 - rW * 0.1, y: y },
                { x: x + rW / 2 + rW * 0.1, y: y }
            ]
        };
    };
    return NodeMerge;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeMerge);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 2018年3月26日 星期一
 * 结束
 */

var NodeEnd = /** @class */ (function (_super) {
    __extends(NodeEnd, _super);
    function NodeEnd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeEnd.prototype._onInit = function () {
        this.NodeType = 'end';
    };
    /**
     * 生成器处理事件
     */
    NodeEnd.prototype._whenCreatorEvt = function () {
        var opt = this.opt, bkg = opt.bkg || '#2EF25F';
        this.c = this.paper.ellipse(opt.cx, opt.cy, opt.w / 2, opt.h / 2);
        this.c.attr('fill', bkg);
    };
    return NodeEnd;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeEnd);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 2018年3月26日 星期一
 * 直线
 */

var NodeLn = /** @class */ (function (_super) {
    __extends(NodeLn, _super);
    function NodeLn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeLn.prototype._onInit = function () {
        this.NodeType = 'line';
    };
    NodeLn.prototype._whenCreatorEvt = function () {
        var opt = this.opt, bkg = opt.bkg || 'rgb(3, 84, 41)';
        this.c = this.paper.path(this._ps2Path(this.opt2Attr()));
        this.c.attr('fill', bkg);
    };
    /**
     * 生成器
     */
    NodeLn.prototype.opt2Attr = function (nOpt) {
        var opt = nOpt ? nOpt : this.opt, P1 = opt.P1, P2 = opt.P2, r = opt.r || this.getLen() * 0.2;
        var atan = Math.atan2(P1.y - P2.y, P2.x - P1.x) * (180 / Math.PI);
        var centerX = P2.x - r * Math.cos(atan * (Math.PI / 180));
        var centerY = P2.y + r * Math.sin(atan * (Math.PI / 180));
        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));
        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));
        return [
            P1,
            P2,
            { x: x2, y: y2 },
            { x: x3, y: y3 },
            P2
        ];
    };
    /**
     * 获取两点间的距离
     */
    NodeLn.prototype.getLen = function (nOpt) {
        var opt = nOpt ? nOpt : this.opt, P1 = opt.P1, P2 = opt.P2;
        return this.getPLen(P1, P2);
    };
    return NodeLn;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeLn);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 2018年3月26日 星期一
 * 折线
 */

var NodeLnPoly = /** @class */ (function (_super) {
    __extends(NodeLnPoly, _super);
    function NodeLnPoly() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeLnPoly.prototype._onInit = function () {
        this.NodeType = 'polyln';
    };
    NodeLnPoly.prototype._whenCreatorEvt = function () {
        console.log(this.opt2Attr());
        this.c = this.paper.path(this._ps2Path(this.opt2Attr()));
    };
    NodeLnPoly.prototype.opt2Attr = function (nOpt) {
        var opt = nOpt ? nOpt : this.opt, P1 = opt.P1, P2 = opt.P2, h = opt.h || 4, rX = opt.rX || 0.35, l = this.getLen(), r = opt.r || (l * (1 - rX) * 0.2);
        var nP1 = { x: P1.x + l * rX, y: P1.y + h };
        // 箭头计算
        var atan = Math.atan2(nP1.y - P2.y, P2.x - nP1.x) * (180 / Math.PI);
        var centerX = P2.x - r * Math.cos(atan * (Math.PI / 180));
        var centerY = P2.y + r * Math.sin(atan * (Math.PI / 180));
        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));
        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));
        return [
            P1,
            { x: P1.x + l * rX, y: P1.y },
            nP1,
            nP1,
            P2,
            { x: x2, y: y2 },
            { x: x3, y: y3 },
            P2
        ];
    };
    /**
     * 获取两点间的距离
     */
    NodeLnPoly.prototype.getLen = function (nOpt) {
        var opt = nOpt ? nOpt : this.opt, P1 = opt.P1, P2 = opt.P2;
        return this.getPLen(P1, P2);
    };
    return NodeLnPoly;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeLnPoly);


/***/ })
/******/ ]);
//# sourceMappingURL=WorkerEditor.js.map