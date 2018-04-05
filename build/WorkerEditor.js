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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

/**
 * @export
 * @abstract
 * @class NodeAbstract
 */
var NodeAbstract = /** @class */ (function () {
    function NodeAbstract(paper, opt) {
        this.tRElem = {};
        this._dataQueueDick = {};
        this.isSelEd = false;
        this.paper = paper;
        // 连接线起点获取终点
        this.fromLine = [];
        this.toLine = [];
        this.NodeType = null; // 节点类型
        // 传入属性时，设置目前的对象
        if (opt) {
            opt.bkgMagnetic = opt.bkgMagnetic || '#FF0000';
            this.opt = opt;
        }
        this._onInit();
    }
    /**
     * @param {string|number} key _code 特殊属性
     * @param {*} value
     */
    NodeAbstract.prototype.data = function (key, value) {
        if ('undefined' == typeof value) {
            if ('undefined' == typeof key) {
                return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].clone(this._dataQueueDick);
            }
            return this._dataQueueDick[key];
        }
        else {
            this._dataQueueDick[key] = value;
            // 特殊处理，保持 code 只读，首次写入时保存
            if (!this._code && key == '_code') {
                this._code = value;
            }
        }
        return this;
    };
    Object.defineProperty(NodeAbstract.prototype, "code", {
        /**
         * 获取代码，使之只读
         */
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 节点生成器，外部可访问接口
     * @param opt
     */
    NodeAbstract.prototype.creator = function (opt) {
        this._whenCreatorEvt();
        return this;
    };
    /**
     * 点连线装换为path字符串
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
     * 点连线转换为字符串数组
     * @param {array} pQue
     * @param {bool} isClose
     * @returns {string}
     */
    NodeAbstract.prototype._ps2PathAttr = function (pQue, isClose) {
        var pArr = [];
        for (var i = 0; i < pQue.length; i++) {
            var cPArr = ['L'];
            if (pArr.length == 0) {
                cPArr[0] = 'M';
            }
            cPArr.push(pQue[i].x, pQue[i].y);
            pArr.push(cPArr);
        }
        if (isClose) {
            pArr.push(['Z']);
        }
        return pArr;
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
        if (this.label) { // 节点标签
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
    /**
     * 更新属性
     * @param nOpt
     */
    NodeAbstract.prototype._updAttr = function (nOpt) {
        for (var key in nOpt) {
            if ('undefined' != typeof this.opt[key]) {
                this.opt[key] = nOpt[key];
            }
        }
        return this;
    };
    /**
     * 获取文本所在的位置
     */
    NodeAbstract.prototype._getTextPnt = function () {
        var _a = this.opt, cx = _a.cx, cy = _a.cy, p = { x: cx + 1, y: cy + 1 };
        return p;
    };
    /**
     * 节点删除
     */
    NodeAbstract.prototype.delete = function () {
        this.c.remove();
        if (this.label) {
            this.label.remove();
        }
        if (this.inlineEle) {
            this.inlineEle.remove();
        }
        if (this.inlinesEle) {
            this.inlinesEle.forEach(function (ist) {
                ist.remove();
            });
        }
        this.removeBox();
    };
    /**
     * 隐藏
     */
    NodeAbstract.prototype.hide = function () {
        if (this.c) {
            this.c.hide();
        }
        if (this.label) {
            this.label.hide();
        }
        // 内部元素
        if (this.inlinesEle) {
            this.inlinesEle.forEach(function (nd) {
                nd.hide();
            });
        }
        if (this.inlineEle) {
            this.inlineEle.hide();
        }
        return this;
    };
    /**
     * 显示
     */
    NodeAbstract.prototype.show = function () {
        if (this.c) {
            this.c.show();
        }
        if (this.label) {
            this.label.show();
        }
        // 内部元素
        if (this.inlinesEle) {
            this.inlinesEle.forEach(function (nd) {
                nd.show();
            });
        }
        if (this.inlineEle) {
            this.inlineEle.show();
        }
        return this;
    };
    /**
     * 节点可移动处理
     * @returns
     * @memberof NodeAbstract
     */
    NodeAbstract.prototype.moveable = function () {
        var $this = this;
        this.c.undrag();
        var tP = { cx: 0, cy: 0 };
        this.c.drag(function (dx, dy) {
            dx += tP.cx;
            dy += tP.cy;
            $this.updAttr({ cx: dx, cy: dy });
            $this.select();
        }, function () {
            var _a = $this.opt, cx = _a.cx, cy = _a.cy;
            tP = { cx: cx, cy: cy };
        });
        return $this;
    };
    /**
     * 更新属性
     * @param nOpt
     */
    NodeAbstract.prototype.updAttr = function (nOpt) {
        return this;
    };
    /**
     * 事件接口 [生成边框先关的点] 用于连线
     */
    NodeAbstract.prototype.onCreateBoxPnt = function (rElem) { };
    /**
     * 选中
     */
    NodeAbstract.prototype.select = function () {
        var selMk = false, _a = this.c.getBBox(), x = _a.x, y = _a.y, width = _a.width, height = _a.height, paper = this.paper, ist;
        this.removeBox();
        this.isSelEd = true;
        x -= 4, y -= 4;
        width += 8, height += 8;
        this.tRElem['box'] = paper.rect(x, y, width, height)
            .attr({
            'stroke': '#0033FF',
            'stroke-width': '0.8'
        });
        // 顺时针： 
        var mx = x + width / 2, xx = x + width, my = y + height / 2, xy = y + height, ptQue = {
            a: { x: x, y: y },
            b: { x: mx, y: y },
            c: { x: xx, y: y },
            d: { x: xx, y: my },
            e: { x: xx, y: xy },
            f: { x: mx, y: xy },
            g: { x: x, y: xy },
            h: { x: x, y: my } // H
        };
        for (var key in ptQue) {
            var _b = ptQue[key], x_1 = _b.x, y_1 = _b.y;
            this.tRElem['__p' + key] = paper.circle(x_1, y_1, 2)
                .attr('fill', '#000000')
                .data('pcode', this.code)
                .data('posi', key);
            this.onCreateBoxPnt(this.tRElem['__p' + key]);
        }
        return this;
    };
    /**
     * 移除历史边框
     */
    NodeAbstract.prototype.removeBox = function () {
        if (!this.tRElem) {
            this.tRElem = {};
        }
        // 移除原边框，重新获取
        if (this.tRElem.box) {
            this.tRElem.box.remove();
            delete this.tRElem.box;
        }
        for (var key in this.tRElem) {
            if (key.indexOf('__p') > -1) {
                this.tRElem[key].remove();
                delete this.tRElem[key];
            }
        }
        return this;
    };
    /**
     * 放大
     * @param {number} rate 比例 0.05 [0-1]
     */
    NodeAbstract.prototype.zoomOut = function (rate) {
        rate = rate ? rate : 0.05;
        var _a = this, c = _a.c, opt = _a.opt;
        opt.w = opt.w * (1 + rate);
        opt.h = opt.h * (1 + rate);
        this.updAttr({
            w: opt.w,
            h: opt.h
        });
        this.select();
        return this;
    };
    /**
     * 首先
     * @param {number} rate 比例 0.05 [0-1]
     */
    NodeAbstract.prototype.zoomIn = function (rate) {
        rate = rate ? rate : 0.05;
        var _a = this, c = _a.c, opt = _a.opt;
        opt.w = opt.w * (1 - rate);
        opt.h = opt.h * (1 - rate);
        this.updAttr({
            w: opt.w,
            h: opt.h
        });
        this.select();
        return this;
    };
    /**
     * 方向移动
     * @param {number} rate 比例 0.05 [0-1]
     */
    NodeAbstract.prototype.move = function (type, rate) {
        rate = rate ? rate : 0.05;
        var opt = this.opt, uOpt;
        type = type ? type.toUpperCase() : type;
        switch (type) {
            case 'T':
                uOpt = { cy: opt.cy * (1 - rate) };
                break;
            case 'B':
                uOpt = { cy: opt.cy * (1 + rate) };
                break;
            case 'L':
                uOpt = { cx: opt.cx * (1 - rate) };
                break;
            case 'R':
                uOpt = { cx: opt.cx * (1 + rate) };
                break;
        }
        if (uOpt) {
            this.updAttr(uOpt);
            this.select();
        }
        return this;
    };
    /**
     * 上移
     * @param {number} rate 比例 0.05 [0-1]
     */
    NodeAbstract.prototype.move2T = function (rate) {
        this.move('T', rate);
        return this;
    };
    /**
     *
     * 下移
     * @param {number} rate 比例 0.05 [0-1]
     */
    NodeAbstract.prototype.move2B = function (rate) {
        this.move('B', rate);
        return this;
    };
    /**
     *
     * 下移
     * @param {number} rate 比例 0.05 [0-1]
     */
    NodeAbstract.prototype.move2L = function (rate) {
        this.move('L', rate);
        return this;
    };
    /**
     *
     * 下移
     * @param {number} rate 比例 0.05 [0-1]
     */
    NodeAbstract.prototype.move2R = function (rate) {
        this.move('R', rate);
        return this;
    };
    /**
     * 底色
     * @param {string} type 空便是默认底色，
     */
    NodeAbstract.prototype.background = function (type) {
        if (type) {
            type = type.toLowerCase();
        }
        switch (type) {
            case 'magn': // 磁化背景色
                this.c.attr('fill', this.opt.bkgMagnetic);
                break;
            default:
                console.log('52');
                this.c.attr('fill', this.opt.bkg);
        }
        return this;
    };
    return NodeAbstract;
}());
/* harmony default export */ __webpack_exports__["a"] = (NodeAbstract);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Util; });
///<reference path='../index.d.ts' />
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
    /**
     * 字符首字母大写切换，test_case => TestCase, longtext => Longtext
     * @param {string} str
     */
    Util.ucFirst = function (str, delimter) {
        delimter = delimter ? delimter : '_';
        var strQue = str.split(delimter);
        strQue.forEach(function (v, idx) {
            strQue[idx] = v.substr(0, 1).toUpperCase() + v.substr(1);
        });
        return strQue.join('');
    };
    /**
     * 判断是否是数组
     * @param {*} value
     */
    Util.isArray = function (value) {
        if ('object' == typeof value) {
            return value instanceof Array;
        }
        return false;
    };
    return Util;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeQue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_NodeBegin__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_NodeTask__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_NodeAudit__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_NodeSign__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_NodeCond__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_NodeSubFlow__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_NodeParallel__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_NodeMerge__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_NodeEnd__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_NodeLn__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_NodeLnPoly__ = __webpack_require__(18);
/**
 * 2018年3月29日 星期四
 * 节点队列
 */












//export 
var NodeQue = /** @class */ (function () {
    function NodeQue(paper) {
        this.paper = paper;
    }
    /**
     * 生成节点
     * @param NodeType
     * @param nOpt
     */
    NodeQue.prototype.make = function (NodeType, nOpt) {
        var name = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].ucFirst(NodeType), paper = this.paper;
        var ist;
        // var ist: any
        switch (name) {
            case 'Begin':
                ist = new __WEBPACK_IMPORTED_MODULE_1__node_NodeBegin__["a" /* default */](paper, nOpt);
                break;
            case 'Task':
                ist = new __WEBPACK_IMPORTED_MODULE_2__node_NodeTask__["a" /* default */](paper, nOpt);
                break;
            case 'Audit':
                ist = new __WEBPACK_IMPORTED_MODULE_3__node_NodeAudit__["a" /* default */](paper, nOpt);
                break;
            case 'Sign':
                ist = new __WEBPACK_IMPORTED_MODULE_4__node_NodeSign__["a" /* default */](paper, nOpt);
                break;
            case 'Cond':
                ist = new __WEBPACK_IMPORTED_MODULE_5__node_NodeCond__["a" /* default */](paper, nOpt);
                break;
            case 'SubFlow':
                ist = new __WEBPACK_IMPORTED_MODULE_6__node_NodeSubFlow__["a" /* default */](paper, nOpt);
                break;
            case 'Parallel':
                ist = new __WEBPACK_IMPORTED_MODULE_7__node_NodeParallel__["a" /* default */](paper, nOpt);
                break;
            case 'Merge':
                ist = new __WEBPACK_IMPORTED_MODULE_8__node_NodeMerge__["a" /* default */](paper, nOpt);
                break;
            case 'End':
                ist = new __WEBPACK_IMPORTED_MODULE_9__node_NodeEnd__["a" /* default */](paper, nOpt);
                break;
            case 'Ln':
                ist = new __WEBPACK_IMPORTED_MODULE_10__node_NodeLn__["a" /* default */](paper, nOpt);
                break;
            case 'LnPoly':
                ist = new __WEBPACK_IMPORTED_MODULE_11__node_NodeLnPoly__["a" /* default */](paper, nOpt);
                break;
        }
        return ist;
    };
    return NodeQue;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__version__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToolBar__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NodeQue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__confNode__ = __webpack_require__(20);
///<reference path='../index.d.ts' />
/**
 * 2018年3月1日 星期四
 * worker 工作流编辑器
 */
 // 助手方法





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
        this.nodeDick = {};
        this.tmpNodeMap = {};
        this.config = config; // 系统配置参数
        this.paper = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* default */].createInstance(config); // Raphael 对象        
        this.ndMer = new __WEBPACK_IMPORTED_MODULE_4__NodeQue__["a" /* NodeQue */](this.paper);
        // 配置参数处理
        this._configMergeToDefule();
        this._rIdx = 0; // 内部索引，用于生成代码
        this._code2EidDick = {}; // 内部代码与元素id的映射字段
        this._LineDragingP = null; // RaphaelElement 直线正在拖动记录点
        // 内部缓存数组件容器： 节点、连接线、独立文本
        this.lineQueues = []; // 连线记录器
        this.textQueues = [];
        this.tempNodes = []; // 临时节点集
        this.MagneticCore = null; // 连线磁化中心点，用于节点关联，单状态的结构 data: {type: from/to}        
        this._cerateToolBar();
        if (this.config.stepCfg) {
            try {
                // this.loadStep(this.config.stepCfg)
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
     * 工具栏处理器
     */
    WorkerEditor.prototype._cerateToolBar = function () {
        var _this = this;
        // 工具栏显示控制
        if (this.config.noToolBar) {
            return null;
        }
        this.toolbarCtrl = new __WEBPACK_IMPORTED_MODULE_3__ToolBar__["a" /* default */](this.paper, this.config);
        //console.log(this.toolbarCtrl)
        // 事件绑定处理
        var $this = this, _a = $this.toolbarCtrl, tBodyNds = _a.tBodyNds, cBodyNds = _a.cBodyNds, connElems = _a.connElems;
        // 节点拖动处理事件
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(tBodyNds, function (key, nd) {
            // 开始和结束不支持拖动
            // if(key == 'begin' || key == 'end'){
            //     return null
            // }
            var ndAst, tP = { x: 0, y: 0 };
            nd.c.drag(function (dx, dy) {
                dx += tP.x;
                dy += tP.y;
                if (ndAst) {
                    ndAst.updAttr({ cx: dx, cy: dy });
                }
            }, function () {
                var _a = nd.opt, cx = _a.cx, cy = _a.cy;
                tP.x = cx;
                tP.y = cy;
                cx += 25;
                var ndOpt = { cx: cx, cy: cy, w: 50, h: 40 };
                if (__WEBPACK_IMPORTED_MODULE_5__confNode__["a" /* cNode */][key]) {
                    ndOpt.text = __WEBPACK_IMPORTED_MODULE_5__confNode__["a" /* cNode */][key].text;
                }
                ndAst = $this.ndMer.make(key, ndOpt)
                    .creator()
                    .moveable();
                $this._nodeBindEvt(ndAst);
                var _index = $this._getOrderCode();
                // 保存到字典中
                ndAst.data('_code', _index);
                $this.nodeDick[_index] = ndAst;
            }, function () {
                console.log(this, '测试：end');
            });
        });
        // 连接线 -----------------
        var lnCon = connElems.lnCon, lnPolyCon = connElems.lnPolyCon, _b = $this.toolbarCtrl.config, lnSeledBkg = _b.lnSeledBkg, lnDefBkg = _b.lnDefBkg;
        // 内部属性标记
        lnCon.data('con', 'ln');
        lnPolyCon.data('con', 'lnPoly');
        // 清空连线选择状态
        this.lineCnMode = {
            isSelEd: false,
            type: null
        };
        var clearAllLinkSeled = function () {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(cBodyNds, function (key, nd) {
                nd.isSelEd = false;
            });
            _this.lineCnMode = {
                isSelEd: false,
                type: null
            };
            lnCon.attr('fill', lnDefBkg);
            lnPolyCon.attr('fill', lnDefBkg);
        };
        // 节点内部选择控制事件
        var afterLnCnnClickedEvt = function () {
            // 存在被选中的节点时，重新生成
            var cSeledNode = $this.getSelected();
            if (cSeledNode) {
                cSeledNode.select();
            }
        };
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(cBodyNds, function (key, nd) {
            //console.log(key, nd)
            // 点击事件
            nd.c.click(function () {
                var isSelEd = nd.isSelEd;
                clearAllLinkSeled();
                if (!isSelEd) {
                    nd.isSelEd = true;
                    $this.lineCnMode = {
                        isSelEd: true,
                        type: nd.NodeType
                    };
                    if (nd.NodeType == 'ln') {
                        lnCon.attr('fill', lnSeledBkg);
                    }
                    else {
                        lnPolyCon.attr('fill', lnSeledBkg);
                    }
                    afterLnCnnClickedEvt();
                }
            });
        });
        // 基于 WorkerEditor 属性
        var lnConClickEvt = function () {
            // 选中
            if (!$this.lineCnMode.isSelEd ||
                ($this.lineCnMode.isSelEd && this.data('con') != $this.lineCnMode.type)) {
                clearAllLinkSeled();
                this.attr('fill', lnSeledBkg);
                $this.lineCnMode = {
                    isSelEd: true,
                    type: this.data('con')
                };
                afterLnCnnClickedEvt();
            }
            else {
                clearAllLinkSeled();
            }
        };
        lnCon.click(lnConClickEvt);
        lnPolyCon.click(lnConClickEvt);
    };
    /**
     * 节点事件绑定
     * @param {rSu.Node} node 输入为空时绑定所有值
     */
    WorkerEditor.prototype._nodeBindEvt = function (node) {
        var $this = this, ndMer = this.ndMer;
        // 事件绑定处理
        var toBindNodeEvts = function (nd) {
            // 点击
            nd.c.click(function () {
                $this.removeAllSeled();
                nd.select();
            });
            //nd
            // 处理接口            
            nd.onCreateBoxPnt = function (pnt) {
                var tmpLnIst;
                // 开启连线模式时
                if ($this.lineCnMode.isSelEd) {
                    //console.log(pnt)
                    var tmpP = { x: 0, y: 0 };
                    pnt.drag(function (dx, dy) {
                        if (!tmpLnIst) {
                            console.log('选择框连线拖动出错！');
                            return;
                        }
                        dx += tmpP.x;
                        dy += tmpP.y;
                        if ($this.lineCnMode.type == 'ln') {
                            tmpLnIst.updAttr({
                                P2: { x: dx, y: dy }
                            });
                        }
                        else { }
                    }, function () {
                        // 历史节点处理
                        $this.removeTmpNode('connLnIst');
                        // tmpLnIst = $this.tmpNodeMap['connLnIst'] || null
                        // // 存在则清空以前未完成的
                        // if(tmpLnIst){
                        //     tmpLnIst.delete()
                        //     $this.tmpNodeMap['connLnIst'] = null
                        // }
                        // 处理
                        tmpP.x = this.attr('cx');
                        tmpP.y = this.attr('cy');
                        var newOpt = {}, lx = tmpP.x, ly = tmpP.y;
                        if ($this.lineCnMode.type == 'ln') {
                            newOpt = {
                                P1: { x: lx, y: ly },
                                P2: { x: lx + 10, y: ly + 5 }
                            };
                        }
                        else {
                            newOpt = {
                                P1: { x: lx, y: ly },
                                P2: { x: lx + 4, y: ly + 4 },
                                h: 4
                            };
                        }
                        tmpLnIst = ndMer.make($this.lineCnMode.type, newOpt)
                            .creator()
                            .data('from_code', pnt.data('pcode'))
                            .data('from_posi', pnt.data('posi'));
                        $this.tmpNodeMap['connLnIst'] = tmpLnIst;
                    }, function () {
                        //
                        console.log('END');
                        // 完成后删除
                        //tmpLnIst.delete()
                        $this.removeTmpNode('connLnIst');
                        // 
                        // $this.tmpNodeMap['connLnIst'] = tmpLnIst
                    });
                }
            };
            // hover 鼠标处理事件，用于连线
            nd.c.hover(
            // f_in
            function () {
                //console.log(this, 'In')
                var cLnIst = $this.tmpNodeMap['connLnIst'];
                if (cLnIst) {
                    // console.log(cLnIst.data())
                    nd.background('Magn');
                }
            }, 
            // f_out
            function () {
                console.log('Out');
                // let cLnIst = $this.tmpNodeMap['connLnIst']
                // if(cLnIst){
                //     // console.log(cLnIst.data())                        
                // }
                nd.background();
            });
        };
        if (node) {
            toBindNodeEvts(node);
        }
        else {
            for (var key in this.nodeDick) {
                toBindNodeEvts(this.nodeDick[key]);
            }
        }
    };
    /**
     * 移除所有选中中元素
     */
    WorkerEditor.prototype.removeAllSeled = function () {
        for (var key in this.nodeDick) {
            var nd = this.nodeDick[key];
            if (nd.isSelEd) {
                nd.removeBox();
                nd.isSelEd = false;
            }
        }
    };
    /**
     * 全选
     */
    WorkerEditor.prototype.allSelect = function () {
        for (var key in this.nodeDick) {
            var nd = this.nodeDick[key];
            nd.select();
        }
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
     * 获取最新的节点
     */
    WorkerEditor.prototype.last = function () {
        var lastNode = null;
        for (var key in this.nodeDick) {
            lastNode = this.nodeDick[key];
        }
        return lastNode;
    };
    /**
     * 删除节点
     */
    WorkerEditor.prototype.remove = function (code) {
        var _this = this;
        var isSuccess = false;
        // 删除节点
        var removeNode = function (node) {
            if (node) {
                code = node.code;
                node.delete();
                delete _this.nodeDick[code];
                isSuccess = true;
                // 选择切换
                var lastElem = _this.last();
                if (lastElem) {
                    lastElem.select();
                }
            }
        };
        if (!code) {
            removeNode(this.getSelected());
        }
        else {
            removeNode(this.nodeDick[code]);
        }
        return isSuccess;
    };
    /**
     * 循环获取节点， tab 节点选择切换
     */
    WorkerEditor.prototype.tab = function () {
        var cSelEd = this.getSelected(), code = cSelEd ? cSelEd.code : null, findLastMk = false, // 找到最后一个
        successMk = false; // 匹配到标志
        for (var key in this.nodeDick) {
            var nd = this.nodeDick[key];
            if (!cSelEd) { // 没有的从第一个开始
                nd.select();
                successMk = true;
                break;
            }
            else {
                if (findLastMk) { // 正好遍历到
                    this.removeAllSeled();
                    nd.select();
                    successMk = true;
                    break;
                }
                else if (code == nd.code) {
                    findLastMk = true;
                }
            }
        }
        // 没有找到时从新开始，且存在元素
        if (findLastMk && !successMk) {
            this.removeAllSeled();
            this.tab();
        }
    };
    /**
     * 节点复制
     * @param {string} code
     */
    WorkerEditor.prototype.clone = function (code) {
        var node, newNode;
        if (code && 'string' == typeof code) {
            node = this.nodeDick[code];
        }
        else if (code && 'object' == typeof code) {
            node = code;
        }
        else {
            node = this.getSelected();
        }
        if (node) {
            var newOpt = $.extend(true, {}, node.opt), rate = 0.2;
            newOpt.cx += newOpt.w * rate;
            newOpt.cy += newOpt.h * rate;
            newNode = this.ndMer.make(node.NodeType, newOpt)
                .creator()
                .moveable();
            // 切换选中状态
            this.removeAllSeled();
            newNode.select();
            this._nodeBindEvt(newNode);
            var _index = this._getOrderCode();
            // 保存到字典中
            newNode.data('_code', _index);
            this.nodeDick[_index] = newNode;
        }
        return newNode;
    };
    /**
     * // d2rw
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
     * d2rw
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
        // 通过id 获取 code
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
            if ('object' != typeof option) { // 默认为文本，快速设置文本
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
            var node = 'object' == typeof code ? code : this.paper.getById(code);
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
        for (var key in this.nodeDick) {
            if (this.nodeDick[key].isSelEd) {
                selectedNode = this.nodeDick[key];
                break;
            }
        }
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
                if (refId == cId) { // 跳过自身检测
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
    // removeTmpNode(value?: any){
    WorkerEditor.prototype.removeTmpNode = function (value) {
        var _this = this;
        if (value) {
            var queue = [];
            if ('object' == typeof value) {
                queue = value;
            }
            else {
                queue = [value];
            }
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(queue, function (k, v) {
                if (_this.tmpNodeMap[v]) {
                    _this.tmpNodeMap[v].delete();
                    delete _this.tmpNodeMap[v];
                }
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.tmpNodeMap, function (k, nd) {
                nd.delete();
                delete _this.tmpNodeMap[k];
            });
        }
        return this;
    };
    /**
     * 事件处理接口
     * @param {NodeBase} nodeIst
     */
    WorkerEditor.prototype.onNodeClick = function (nodeIst) { };
    // toolNodeIstQue: any[]     // 工具栏部件节点队列
    // 静态属性
    WorkerEditor.version = __WEBPACK_IMPORTED_MODULE_1__version__["a" /* LibVersion */];
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibVersion; });
var LibVersion = { "version": "2.0.10", "release": "20180405", "author": "Joshua Conero" };


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeQue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjX__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);



/**
 * 2018年3月29日 星期四
 * 工具栏
 */
var ToolBar = /** @class */ (function () {
    function ToolBar(paper, opt) {
        this._tools = []; // 工具栏
        this.rData = {
            cp: { x: 5, y: 5 },
            th0: 23,
            th1: 23,
            th2: 23,
            nh: 0,
            ch: 0,
            cw: 75 // 整个容器的宽度
        };
        this.paper = paper;
        this.ndMer = new __WEBPACK_IMPORTED_MODULE_0__NodeQue__["a" /* NodeQue */](this.paper);
        this.option = opt;
        this.config = opt.toolBar || {};
        this.config.aUpSrc = __WEBPACK_IMPORTED_MODULE_1__ObjX__["a" /* default */].value(this.config, 'aUpSrc', 'arrow_up.png');
        this.config.aDownSrc = __WEBPACK_IMPORTED_MODULE_1__ObjX__["a" /* default */].value(this.config, 'aDownSrc', 'arrow_down.png');
        this._headBar();
        this._nodeBar();
        this._connBar();
    }
    /**
     * 标题栏
     */
    ToolBar.prototype._headBar = function () {
        var $this = this, _a = this.rData, cp = _a.cp, cw = _a.cw, th0 = _a.th0, x = cp.x, y = cp.y, paper = this.paper, ist;
        this.headElems = {};
        ist = paper.rect(x, y, cw, th0)
            .attr('fill', '#ffffff')
            .click(function () {
            var toggle = this.data('toggle');
            if (toggle != 'H') {
                this.data('toggle', 'H');
                $this.toggle('H');
            }
            else {
                this.data('toggle', 'S');
                $this.toggle('S');
            }
        });
        this.headElems['con'] = ist;
        ist = paper.text(x + (cw / 2), y + 10, __WEBPACK_IMPORTED_MODULE_1__ObjX__["a" /* default */].value(this.config, 'title', '工具栏'));
        this.headElems['title'] = ist;
    };
    /**
     * 节点栏
     */
    ToolBar.prototype._nodeBar = function () {
        var $this = this, _a = this.rData, cp = _a.cp, cw = _a.cw, th1 = _a.th1, nh = _a.nh, x = cp.x, y = cp.y, _b = this, paper = _b.paper, ndMer = _b.ndMer, config = _b.config, ist, tBodyNds = {}; // 内部缓存的节点
        this.nodeElems = {};
        y += th1;
        // data: toggle => H/S
        this.nodeElems['title'] = paper.rect(x, y, cw, 23)
            .attr('fill', '#ffffff')
            .click(function () {
            // console.log(this)
            var toggle = this.data('toggle');
            var iconIst = $this.nodeElems['icon'];
            if (toggle != 'H') {
                this.data('toggle', 'H');
                if (iconIst) {
                    iconIst.attr('src', config.aDownSrc);
                }
                $this.tToggle('H');
            }
            else {
                this.data('toggle', 'S');
                if (iconIst) {
                    iconIst.attr('src', config.aUpSrc);
                }
                $this.tToggle('S');
            }
        });
        this.nodeElems['icon'] = paper.image(config.aUpSrc, x + cw * 0.7, y + 1, 20, 20);
        nh = y;
        y += 23;
        this.nodeElems['tBody'] = paper.rect(x, y, cw, 250)
            .attr('fill', '#ffffff');
        // 开始
        x += 20, y += 10;
        ist = ndMer.make('begin', { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        tBodyNds.begin = ist;
        // 任务
        y += 20;
        ist = ndMer.make('task', { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        tBodyNds.task = ist;
        // 审核
        y += 20;
        ist = ndMer.make('audit', { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        tBodyNds.audit = ist;
        // 会签
        y += 20;
        ist = ndMer.make('sign', { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        tBodyNds.sign = ist;
        // 判断
        y += 20;
        ist = ndMer.make('cond', { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        tBodyNds.cond = ist;
        // 子流程
        y += 20;
        ist = ndMer.make('subFlow', { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        tBodyNds.subFlow = ist;
        // 并行
        y += 30;
        ist = ndMer.make('parallel', { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        tBodyNds.parallel = ist;
        // 合并
        y += 20;
        ist = ndMer.make('merge', { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        tBodyNds.merge = ist;
        // 结束
        y += 20;
        ist = ndMer.make('end', { cx: x, cy: y, w: 16, h: 12 })
            .creator();
        tBodyNds.end = ist;
        this.tBodyNds = tBodyNds;
        this.rData.nh = y - nh;
        this.nodeElems['tBody'].attr('height', this.rData.nh);
    };
    /**
     * 连线栏
     */
    ToolBar.prototype._connBar = function () {
        var $this = this, _a = this.rData, cp = _a.cp, cw = _a.cw, th2 = _a.th2, ch = _a.ch, th0 = _a.th0, th1 = _a.th1, nh = _a.nh, x = cp.x, y = cp.y, _b = this, paper = _b.paper, ndMer = _b.ndMer, config = _b.config, ist, cBodyNds = {}; // 内部缓存的节点
        this.connElems = {};
        // 连接线
        // data: toggle => H/S
        y += th0 + th1 + nh;
        this.connElems['title'] = paper.rect(x, y, cw, th2)
            .attr('fill', '#ffffff')
            .click(function () {
            // console.log(this)
            var toggle = this.data('toggle');
            var iconIst = $this.connElems['icon'];
            if (toggle != 'H') {
                this.data('toggle', 'H');
                if (iconIst) {
                    iconIst.attr('src', config.aDownSrc);
                }
                $this.cToggle('H');
            }
            else {
                this.data('toggle', 'S');
                if (iconIst) {
                    iconIst.attr('src', config.aUpSrc);
                }
                $this.cToggle('S');
            }
        });
        this.connElems['icon'] = paper.image(config.aUpSrc, x + cw * 0.7, y + 1, 20, 20);
        // y += 23
        ch = y;
        y += th2;
        var prevH = 60; // 预处理高度
        this.config['lnSeledBkg'] = this.config['lnSeledBkg'] || '#CCFF99';
        this.config['lnDefBkg'] = this.config['lnDefBkg'] || '#ffffff';
        var lnDefBkg = this.config.lnDefBkg;
        this.connElems['lnCon'] = paper.rect(x, y, cw, prevH / 2)
            .attr('fill', lnDefBkg);
        // .attr(conAttr)
        var ly = y + prevH / 4 * 0.7, lx = x + 20;
        ist = ndMer.make('ln', {
            P1: { x: lx - 5, y: ly },
            P2: { x: lx + 25, y: ly }
        })
            .creator();
        cBodyNds.ln = ist;
        // 折线
        y += 20;
        this.connElems['lnPolyCon'] = paper.rect(x, y, cw, prevH / 2)
            .attr('fill', lnDefBkg);
        // .attr(conAttr)
        ly = y + prevH / 4 * 0.7,
            lx = x + 20;
        ist = ndMer.make('lnPoly', {
            P1: { x: lx - 5, y: ly },
            P2: { x: lx + 20, y: ly + 4 },
            h: 4
        })
            .creator();
        cBodyNds.lnPoly = ist;
        this.cBodyNds = cBodyNds;
        ch = y - ch;
        this.connElems['lnCon'].attr('height', ch / 2);
        this.connElems['lnPolyCon'].attr('height', ch / 2);
    };
    /**
     * 连线框占据节点框
     */
    ToolBar.prototype.connSizeNode = function (backMk) {
        var _a = this.connElems, title = _a.title, icon = _a.icon, lnCon = _a.lnCon, lnPolyCon = _a.lnPolyCon, _b = this.rData, cp = _b.cp, cw = _b.cw, th2 = _b.th2, ch = _b.ch, th0 = _b.th0, th1 = _b.th1, nh = _b.nh, x = cp.x, y = cp.y, _c = this.cBodyNds, ln = _c.ln, lnPoly = _c.lnPoly;
        y += backMk ? th0 + th1 + nh : th0 + th1;
        title.attr('y', y);
        icon.attr('y', y + 1);
        y += th2;
        var prevH = 60; // 预处理高度
        lnCon.attr('y', y);
        // 直线
        var ly = y + prevH / 4 * 0.7, lx = x + 20;
        ln.updAttr({
            P1: { x: lx - 5, y: ly },
            P2: { x: lx + 25, y: ly }
        });
        // 折线
        y += 20;
        lnPolyCon.attr('y', y);
        ly = y + prevH / 4 * 0.7,
            lx = x + 20;
        lnPoly.updAttr({
            P1: { x: lx - 5, y: ly },
            P2: { x: lx + 20, y: ly + 4 },
            h: 4
        });
    };
    /**
     * 标题栏显示与隐藏
     * @param {string} type 显示与隐藏， H/S
     * @param {boolean} includeTit 包含标题
     */
    ToolBar.prototype.tToggle = function (type, includeTit) {
        var tBodyNds = this.tBodyNds, nodeElems = this.nodeElems, tBody = nodeElems.tBody;
        if ('H' != type) {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(tBodyNds, function (k, nd) {
                nd.show();
            });
            if (includeTit) {
                nodeElems.title.show();
                nodeElems.icon.show();
            }
            if (tBody) {
                tBody.show();
            }
            this.connSizeNode(true);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(tBodyNds, function (k, nd) {
                nd.hide();
            });
            if (includeTit) {
                nodeElems.title.hide();
                nodeElems.icon.hide();
            }
            if (tBody) {
                tBody.hide();
            }
            this.connSizeNode();
        }
    };
    /**
     * 标题栏显示与隐藏
     * @param {string} type 显示与隐藏， H/S
     */
    ToolBar.prototype.cToggle = function (type, includeTit) {
        var cBodyNds = this.cBodyNds, connElems = this.connElems, lnCon = connElems.lnCon, lnPolyCon = connElems.lnPolyCon;
        if ('H' != type) {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(cBodyNds, function (k, nd) {
                nd.show();
            });
            if (includeTit) {
                connElems.title.show();
                connElems.icon.show();
            }
            if (lnCon) {
                lnCon.show();
            }
            if (lnPolyCon) {
                lnPolyCon.show();
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(cBodyNds, function (k, nd) {
                nd.hide();
            });
            if (includeTit) {
                connElems.title.hide();
                connElems.icon.hide();
            }
            if (lnCon) {
                lnCon.hide();
            }
            if (lnPolyCon) {
                lnPolyCon.hide();
            }
        }
    };
    /**
     * 显示与隐藏
     * @param {string} type
     */
    ToolBar.prototype.toggle = function (type) {
        this.tToggle(type, true);
        this.cToggle(type, true);
    };
    return ToolBar;
}());
/* harmony default export */ __webpack_exports__["a"] = (ToolBar);


/***/ }),
/* 8 */
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
        // 文字
        if (opt.text) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label = this.paper.text(x, y, opt.text);
        }
    };
    /**
     * 更新属性
     * @param nOpt
     */
    NodeBegin.prototype.updAttr = function (nOpt) {
        var opt = this._updAttr(nOpt)
            .opt;
        this.c.attr({
            cx: opt.cx,
            cy: opt.cy,
            rx: opt.w / 2,
            ry: opt.h / 2
        });
        // 文字
        if (this.label) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label.attr({
                x: x, y: y
            });
        }
        return this;
    };
    return NodeBegin;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeBegin);


/***/ }),
/* 9 */
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
        // 文字
        if (opt.text) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label = this.paper.text(x, y, opt.text);
        }
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
     * 更新属性
     * @param nOpt
     */
    NodeTask.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        var opt = this.opt2Attr();
        var cAttr = {
            x: opt.x,
            y: opt.y,
            width: opt.w,
            height: opt.h
        };
        this.c.attr(cAttr);
        // 文字
        if (this.label) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label.attr({
                x: x, y: y
            });
        }
        return this;
    };
    return NodeTask;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeTask);


/***/ }),
/* 10 */
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
        this.c = this.paper.path(this._ps2Path(pQue, true));
        this.c.attr('fill', bkg);
        // 文字
        if (nOpt.text) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label = this.paper.text(x, y, nOpt.text);
        }
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
    /**
     * 更新属性
     * @param nOpt
     */
    NodeAudit.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        var opt = this.opt2Attr();
        this.c.attr('path', this._ps2PathAttr(opt, true));
        // 文字
        if (this.label) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label.attr({
                x: x, y: y
            });
        }
        return this;
    };
    return NodeAudit;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeAudit);


/***/ }),
/* 11 */
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
        this.c = this.paper.path(this._ps2Path(pQue, true));
        this.c.attr('fill', bkg);
        // 文字
        if (opt.text) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label = this.paper.text(x, y, opt.text);
        }
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
    /**
     * 更新属性
     * @param nOpt
     */
    NodeSign.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        var opt = this.opt2Attr();
        this.c.attr('path', this._ps2PathAttr(opt, true));
        // 文字
        if (this.label) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label.attr({
                x: x, y: y
            });
        }
        return this;
    };
    return NodeSign;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeSign);


/***/ }),
/* 12 */
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
        this.c = this.paper.path(this._ps2Path(pQue, true));
        this.c.attr('fill', bkg);
        // 文字
        if (opt.text) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label = this.paper.text(x, y, opt.text);
        }
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
    /**
     * 更新属性
     * @param nOpt
     */
    NodeCond.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        var opt = this.opt2Attr();
        this.c.attr('path', this._ps2PathAttr(opt, true));
        // 文字
        if (this.label) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label.attr({
                x: x, y: y
            });
        }
        return this;
    };
    return NodeCond;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeCond);


/***/ }),
/* 13 */
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
        this.NodeType = 'sub_flow';
        this.xRate = 0.15;
    };
    /**
     * 生成器处理事件
     */
    NodeSubFlow.prototype._whenCreatorEvt = function () {
        var _a = this.opt2Attr(), cAttr = _a.cAttr, lLine = _a.lLine, rLine = _a.rLine, opt = this.opt, bkg = opt.bkg || '#88EEEA';
        this.c = this.paper.rect(cAttr.x, cAttr.y, cAttr.w, cAttr.h);
        this.c.attr('fill', bkg);
        this.inlinesEle = [
            this.paper.path(this._ps2Path(lLine)),
            this.paper.path(this._ps2Path(rLine))
        ];
        // 文字
        if (opt.text) {
            var _b = this._getTextPnt(), x = _b.x, y = _b.y;
            this.label = this.paper.text(x, y, opt.text);
        }
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
    /**
     * 更新属性
     * @param nOpt
     */
    NodeSubFlow.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        var _a = this.opt2Attr(), cAttr = _a.cAttr, lLine = _a.lLine, rLine = _a.rLine;
        this.c.attr({
            x: cAttr.x, y: cAttr.y, width: cAttr.w, height: cAttr.h
        });
        this.inlinesEle[0].attr('path', this._ps2PathAttr(lLine));
        this.inlinesEle[1].attr('path', this._ps2PathAttr(rLine));
        // 文字
        if (this.label) {
            var _b = this._getTextPnt(), x = _b.x, y = _b.y;
            this.label.attr({
                x: x, y: y
            });
        }
        return this;
    };
    return NodeSubFlow;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeSubFlow);


/***/ }),
/* 14 */
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
    /**
     * 更新属性
     * @param nOpt
     */
    NodeParallel.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        var _a = this.opt2Attr(), cAttr = _a.cAttr, inLine = _a.inLine;
        this.c.attr('path', this._ps2PathAttr(cAttr, true));
        this.inlineEle.attr('path', this._ps2PathAttr(inLine));
        return this;
    };
    return NodeParallel;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeParallel);


/***/ }),
/* 15 */
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
    /**
     * 更新属性
     * @param nOpt
     */
    NodeMerge.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        var _a = this.opt2Attr(), cAttr = _a.cAttr, vLine = _a.vLine, hLine = _a.hLine;
        this.c.attr('path', this._ps2PathAttr(cAttr, true));
        this.inlinesEle[0].attr('path', this._ps2PathAttr(vLine));
        this.inlinesEle[1].attr('path', this._ps2PathAttr(hLine));
        return this;
    };
    return NodeMerge;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeMerge);


/***/ }),
/* 16 */
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
        // 文字
        if (opt.text) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label = this.paper.text(x, y, opt.text);
        }
    };
    /**
     * 更新属性
     * @param nOpt
     */
    NodeEnd.prototype.updAttr = function (nOpt) {
        var opt = this._updAttr(nOpt)
            .opt;
        this.c.attr({
            cx: opt.cx,
            cy: opt.cy,
            rx: opt.w / 2,
            ry: opt.h / 2
        });
        // 文字
        if (this.label) {
            var _a = this._getTextPnt(), x = _a.x, y = _a.y;
            this.label.attr({
                x: x, y: y
            });
        }
        return this;
    };
    return NodeEnd;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeEnd);


/***/ }),
/* 17 */
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
        this.NodeType = 'ln';
        // 箭头最大长度
        this.data('maxR', 5);
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
        var opt = nOpt ? nOpt : this.opt, P1 = opt.P1, P2 = opt.P2, r = opt.r || this.getLen() * 0.2, maxR = this.data('maxR');
        if (r > maxR) {
            r = maxR;
        }
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
     * 更新属性
     * @param nOpt
     */
    NodeLn.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        this.c.attr('path', this._ps2PathAttr(this.opt2Attr()));
        return this;
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
/* 18 */
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
        this.NodeType = 'ln_poly';
    };
    NodeLnPoly.prototype._whenCreatorEvt = function () {
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
    /**
     * 更新属性
     * @param nOpt
     */
    NodeLnPoly.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        this.c.attr('path', this._ps2PathAttr(this.opt2Attr()));
        return this;
    };
    return NodeLnPoly;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeLnPoly);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 2018年3月30日 星期五
 * Object 类型扩展类
 */
var ObjX = /** @class */ (function () {
    function ObjX(jsonObj) {
        if ('object' == typeof jsonObj && !(jsonObj instanceof Array)) {
            this.jsonObj = jsonObj;
        }
        else {
            this.jsonObj = {};
        }
    }
    /**
     * 参数获取
     * @param key
     * @param def
     */
    ObjX.prototype.get = function (key, def) {
        if ('undefined' != typeof this.jsonObj[key]) {
            return this.jsonObj[key];
        }
        else {
            return def;
        }
    };
    // 设置值
    ObjX.prototype.set = function (key, value) {
        this.jsonObj[key] = value;
        return this;
    };
    // 获取值
    ObjX.value = function (json, key, def) {
        if ('object' == typeof json) {
            return 'undefined' == typeof json[key] ? def : json[key];
        }
        return def;
    };
    return ObjX;
}());
/* harmony default export */ __webpack_exports__["a"] = (ObjX);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cNode; });
/**
 * 节点常量配置
 */
// 1-开始、2-任务、3-判断、4-审核、5-会签、4-并行、5-合并、8-子流程、9-结束
var cNode = {
    begin: {
        type: 1,
        text: '开始'
    },
    task: {
        type: 2,
        text: '任务'
    },
    cond: {
        type: 3,
        text: '判断'
    },
    audit: {
        type: 4,
        text: '审核'
    },
    sign: {
        type: 5,
        text: '会签'
    },
    parallel: {
        type: 6,
        text: '并行'
    },
    merge: {
        type: 7,
        text: '合并'
    },
    subFlow: {
        type: 8,
        text: '子流程'
    },
    end: {
        type: 9,
        text: '结束'
    }
};


/***/ })
/******/ ]);
//# sourceMappingURL=WorkerEditor.js.map