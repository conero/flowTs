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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__confNode__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NodeUtil__ = __webpack_require__(2);
/**
 * 2018年3月26日 星期一
 * 抽象节点
 */
///<reference path="../../index.d.ts"/>
///<reference path="../types/raphael.ts"/>
///<reference path="../types/jquery.ts"/>



/**
 * @export
 * @abstract
 * @class NodeAbstract
 */
var NodeAbstract = /** @class */ (function () {
    function NodeAbstract(paper, opt) {
        this.conLns = {
            from: [],
            to: []
        };
        this.tRElem = {};
        this._dataQueueDick = {};
        this.isSelEd = false;
        this.paper = paper;
        this.NodeType = null; // 节点类型
        // 传入属性时，设置目前的对象
        if (opt) {
            opt.bkgMagnetic = opt.bkgMagnetic || '#FF0000';
            var features = opt.features || {};
            this.opt = opt;
        }
        this._onInit();
    }
    /**
     * 特征值处理
     * @param {string|object} key
     * @param {*} value
     * @param {*} def  默认值，默认时会自动设置参数
     */
    NodeAbstract.prototype.feature = function (key, value, def) {
        var feature = this.opt.features || {};
        if (!value) {
            if ('object' == typeof key) {
                return null;
            }
            var gValue = feature[key] || null;
            if (def && !gValue) {
                feature[key] = def;
                this.opt.features = feature;
                return def;
            }
            return gValue;
        }
        else {
            if ('object' == typeof key) {
                feature = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].jsonMerge(feature, key);
            }
            else {
                feature[key] = value;
            }
            this.opt.features = feature;
            return this;
        }
    };
    /**
     * @param {string|number|object} key _code 特殊属性
     * @param {*} value
     */
    NodeAbstract.prototype.data = function (key, value) {
        var _this = this;
        if ('undefined' == typeof value) {
            if ('undefined' == typeof key) {
                return __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].clone(this._dataQueueDick);
            }
            else if ('object' == typeof key) {
                __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(key, function (k, v) {
                    _this._dataQueueDick[k] = v;
                });
                return this;
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
    Object.defineProperty(NodeAbstract.prototype, "name", {
        /**
         * 获取 name 做处理判断
         * @readonly
         * @type {string}
         * @memberof NodeAbstract
         */
        get: function () {
            var txt = this.opt.text || '';
            if (txt && txt.indexOf('\n') > -1) {
                txt = txt.replace(/\n/g, '');
            }
            return txt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeAbstract.prototype, "_key", {
        /**
         * 键值， { cNode } = confNode 映射
         * @readonly
         * @type {string}
         * @memberof NodeAbstract
         */
        get: function () {
            var nt = this.NodeType;
            if (nt.indexOf('_') > -1) {
                var aStr_1 = nt.split('_');
                __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(aStr_1, function (idx, v) {
                    if (idx > 0) {
                        v = v.substr(0, 1).toLocaleUpperCase() + v.substr(1);
                        aStr_1[idx] = v;
                    }
                });
                nt = aStr_1.join('');
            }
            return nt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeAbstract.prototype, "type", {
        /**
         * 获取类型
         * @readonly
         * @type {number}
         * @memberof NodeAbstract
         */
        get: function () {
            var code = this.code, attr = __WEBPACK_IMPORTED_MODULE_1__confNode__["a" /* cNode */][this._key], tp = attr ? attr.type : null;
            return tp;
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
        return __WEBPACK_IMPORTED_MODULE_2__NodeUtil__["a" /* default */].ps2Path(pQue, isClose);
    };
    /**
     * 点连线转换为字符串数组
     * @param {array} pQue
     * @param {bool} isClose
     * @returns {string}
     */
    NodeAbstract.prototype._ps2PathAttr = function (pQue, isClose) {
        return __WEBPACK_IMPORTED_MODULE_2__NodeUtil__["a" /* default */].ps2PathAttr(pQue, isClose);
    };
    /**
     * 连线处理(记录)
     * @param value 参数值
     * @param isEnd
     */
    NodeAbstract.prototype.line = function (value, isEnd) {
        if (isEnd) {
            this.conLns.to.push(value);
        }
        else {
            this.conLns.from.push(value);
        }
        return this;
    };
    /**
     * 移除连接线
     * @param type
     * @param code
     */
    NodeAbstract.prototype.rmLine = function (value, isEnd) {
        if (value) {
            if (isEnd) {
                var tLns_1 = [];
                __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(this.conLns.to, function (k, code) {
                    if (code != value) {
                        tLns_1.push(code);
                    }
                });
                this.conLns.to = tLns_1;
            }
            else {
                var fLns_1 = [];
                __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(this.conLns.from, function (k, code) {
                    if (code != value) {
                        fLns_1.push(code);
                    }
                });
                this.conLns.from = fLns_1;
            }
        }
        return this;
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
        this.clearTmpElem();
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
     * data => {afterUpd(x, y, $node), beforeMv($node)}
     * @returns
     * @memberof NodeAbstract
     */
    NodeAbstract.prototype.moveable = function (data) {
        var $this = this;
        data = 'object' == typeof data ? data : {};
        this.c.undrag();
        var tP = { cx: 0, cy: 0 }, cDnum = 2; // 当前变化的差值
        this.c.drag(function (dx, dy) {
            // 选中节点，未移动
            if (dx == dy && dy == 0) {
                return;
            }
            if (data.beforeMv && 'function' == typeof data.beforeMv) {
                // 阻止移动
                if (false === data.beforeMv($this)) {
                    return;
                }
            }
            dx += tP.cx;
            dy += tP.cy;
            // 结点偏移量检测
            // if(Math.abs(arguments[0]) < cDnum && Math.abs(arguments[1]) < cDnum){
            //     return
            // }
            $this.updAttr({ cx: dx, cy: dy });
            $this.select();
            if (data.afterUpd && 'function' == typeof data.afterUpd) {
                data.afterUpd(dx, dy, $this);
            }
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
     * 文本属性更新
     *
     * @param {string} [text]
     * @memberof NodeAbstract
     */
    NodeAbstract.prototype.updTextAttr = function (text) {
        var _a = this._getTextPnt(), x = _a.x, y = _a.y;
        if (this.label) {
            this.label.attr({
                x: x, y: y
            });
        }
        // 生成文本
        if (text) {
            if (this.label) {
                this.label.attr('text', text);
            }
            else {
                this.label = this.paper.text(x, y, text);
            }
        }
        return this;
    };
    /**
     * 获取处理以后的边框值
     */
    NodeAbstract.prototype.getBBox = function () {
        var _a = this.c.getBBox(), x = _a.x, y = _a.y, width = _a.width, height = _a.height, boxPadding = this.feature('boxPadding', null, 3);
        x -= boxPadding, y -= boxPadding;
        width += boxPadding * 2, height += boxPadding * 2;
        // 顺时针： 
        var mx = x + width / 2, xx = x + width, my = y + height / 2, xy = y + height, ps = {
            a: { x: x, y: y },
            b: { x: mx, y: y },
            c: { x: xx, y: y },
            d: { x: xx, y: my },
            e: { x: xx, y: xy },
            f: { x: mx, y: xy },
            g: { x: x, y: xy },
            h: { x: x, y: my } // H
        };
        var attr = { x: x, y: y, width: width, height: height };
        return { attr: attr, ps: ps };
    };
    /**
     * 获取 icon 坐标地址
     */
    NodeAbstract.prototype.getIconP = function () {
        var p = this._getTextPnt(), _a = this.opt, w = _a.w, h = _a.h;
        p.x -= w / 2 - 5;
        p.y -= h / 2 - 5;
        return p;
    };
    /**
     * 磁化核心，基于碰撞以后的坐标点
     * @param px
     * @param py
     */
    NodeAbstract.prototype.magnCore = function (px, py) {
        var bAttr = this.getBBox(), attr = bAttr.attr, ps = bAttr.ps, x = attr.x, y = attr.y, w = attr.width, h = attr.height;
        // a-h
        var pt, cx1 = x + w / 4, cx = x + w / 2, cx2 = x + w * (3 / 4), cy1 = y + h / 4, cy = y + h / 2, cy2 = y + h * (3 / 4), posi = null;
        if (px <= cx1 && py <= cy1) {
            pt = ps.a;
            posi = 'a';
        }
        else if ((px > cx1 && px < cx2) && py <= cy1) {
            pt = ps.b;
            posi = 'b';
        }
        else if ((px >= cx2) && py <= cy1) {
            pt = ps.c;
            posi = 'c';
        }
        else if ((px >= cx2) && (py > cy1 && py < cy2)) {
            pt = ps.d;
            posi = 'd';
        }
        else if ((px >= cx2) && py >= cy2) {
            pt = ps.e;
            posi = 'e';
        }
        else if ((px > cx1 && px < cx2) && py >= cy2) {
            pt = ps.f;
            posi = 'f';
        }
        else if ((px <= cx1) && py >= cy2) {
            pt = ps.g;
            posi = 'g';
        }
        else if ((px <= cx1) && (py > cy1 && py < cy2)) {
            pt = ps.h;
            posi = 'h';
        }
        // 数据测试
        this.clearTmpElem('mc');
        if (pt) {
            this.tRElem['mc'] = this.paper
                .circle(pt.x, pt.y, 3)
                .attr('fill', this.opt.bkgMagnetic)
                .data('pcode', this.code)
                .data('posi', posi);
        }
        var rElem;
        if (this.tRElem['mc']) {
            rElem = this.tRElem['mc'];
        }
        return rElem;
    };
    /**
     * [BUG20180417] 端点拖动以后报错： Uncaught TypeError: Cannot read property 'nextSibling' of null
     * 选中
     */
    NodeAbstract.prototype.select = function () {
        var selMk = false, bAttr = this.getBBox(), attr = bAttr.attr, ps = bAttr.ps, x = attr.x, y = attr.y, width = attr.width, height = attr.height, paper = this.paper, ist;
        this.removeBox();
        this.isSelEd = true;
        this.tRElem['box'] = paper.rect(x, y, width, height)
            .attr({
            'stroke': '#0033FF',
            'stroke-width': '0.8'
        });
        for (var key in ps) {
            var _a = ps[key], x_1 = _a.x, y_1 = _a.y;
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
        this.isSelEd = false;
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
        var _this = this;
        if ('object' == typeof type) {
            __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(type, function (i, t) {
                _this.background(t);
            });
            return;
        }
        if (type) {
            type = type.toLowerCase();
        }
        switch (type) {
            case 'magn': // 磁化背景色
                this.c.attr('fill', this.opt.bkgMagnetic);
                break;
            case 'text':
                if (!this.opt.bkgTxt) {
                    this.opt.bkgTxt = '#000000';
                }
                if (this.label) {
                    this.label.attr('fill', this.opt.bkgTxt);
                }
                break;
            case 'node':
            default:
                this.c.attr('fill', this.opt.bkg);
        }
        return this;
    };
    /**
     * 删除节点中的临时节点
     * @param key
     */
    NodeAbstract.prototype.clearTmpElem = function (key) {
        var _this = this;
        if (key) {
            var tArr_1 = [];
            if ('object' == typeof key) {
                tArr_1 = key;
            }
            else {
                tArr_1 = [key];
            }
            __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(this.tRElem, function (k, elem) {
                if ($.inArray(k, tArr_1) > -1) {
                    elem.remove();
                    delete _this.tRElem[k];
                }
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(this.tRElem, function (k, elem) {
                elem.remove();
                delete _this.tRElem[k];
            });
        }
        return this;
    };
    /**
     * 事件接口 [生成边框先关的点] 用于连线
     */
    NodeAbstract.prototype.onCreateBoxPnt = function (rElem) { };
    /**
     * 尺寸大小更新
     * @memberof NodeAbstract
     */
    NodeAbstract.prototype.onSize = function () { };
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
    /**
     * json 数据合并
     * @param bjson
     * @param mjson
     */
    Util.jsonMerge = function (bjson, mjson) {
        bjson = bjson ? bjson : {};
        Util.each(mjson, function (k, v) {
            bjson[k] = v;
        });
        return bjson;
    };
    /**
     * @param json
     */
    Util.jsonValues = function (json) {
        var value = [];
        Util.each(json, function (k, v) {
            value.push(v);
        });
        return value;
    };
    /**
     * 获取子数组
     * @param arr
     * @param start
     * @param end
     */
    Util.subArray = function (arr, start, end) {
        var nArr = [], len = arr.length;
        end = end ? end : arr.length - 1;
        start = start ? start : 0;
        if (end < 0) {
            end = len + end - 1;
        }
        for (var i = 0; i < len; i++) {
            // console.log(i >= start && i >= end, `${i} >= ${start} && ${i} >= ${end}`)
            if (i >= start && i <= end) {
                nArr.push(arr[i]);
            }
        }
        return nArr;
    };
    /**
     * 是否存在代码
     * @param v
     * @param arr
     */
    Util.inArray = function (v, arr) {
        arr = arr ? arr : [];
        for (var i = 0; i < arr.length; i++) {
            if (v == arr[i]) {
                return i;
            }
        }
        return -1;
    };
    /**
     * 数组合并
     * @param arrs
     */
    Util.MergeArr = function () {
        var arrs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arrs[_i] = arguments[_i];
        }
        var newArr = [];
        for (var i = 0; i < arrs.length; i++) {
            var arr = arrs[i];
            arr = 'object' == typeof arr ? arr : [arr];
            // let tArr: any[] = []
            // newArr = tArr.concat(newArr, arr)
            newArr = newArr.concat(arr);
        }
        return newArr;
    };
    return Util;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);

/**
 * 2018年4月13日 星期五
 * 节点计算算法
 */
var NodeUtil = /** @class */ (function () {
    function NodeUtil() {
    }
    /**
     * 两点转箭头，箭头生成算法
     * @param P1
     * @param P2
     * @param r
     * @param onlyMidPMk 仅仅中间坐标点
     */
    NodeUtil.ps2arrow = function (P1, P2, r, onlyMidPMk) {
        var atan = Math.atan2(P1.y - P2.y, P2.x - P1.x) * (180 / Math.PI);
        var centerX = P2.x - r * Math.cos(atan * (Math.PI / 180));
        var centerY = P2.y + r * Math.sin(atan * (Math.PI / 180));
        var x2 = centerX + r * Math.cos((atan + 120) * (Math.PI / 180));
        var y2 = centerY - r * Math.sin((atan + 120) * (Math.PI / 180));
        var x3 = centerX + r * Math.cos((atan + 240) * (Math.PI / 180));
        var y3 = centerY - r * Math.sin((atan + 240) * (Math.PI / 180));
        var pV1 = [P2], pV2 = [
            { x: x2, y: y2 },
            { x: x3, y: y3 },
            P2
        ];
        if (onlyMidPMk) {
            pV1 = pV2;
        }
        else {
            pV1 = pV1.concat(pV2);
        }
        return pV1;
    };
    /**
     * 获取两点间的距离
     */
    NodeUtil.getPLen = function (P1, P2) {
        return Math.pow((Math.pow((P1.x - P2.x), 2) + Math.pow((P1.y - P2.y), 2)), 1 / 2);
    };
    /**
     * 点转折线
     * @param P1 地点
     * @param P2 终点
     * @param isYFirst 先移动Y轴
     */
    NodeUtil.point2Poly = function (P1, P2, isYFirst) {
        var tP;
        if (P1.x != P2.x && P1.y != P2.y) {
            if (isYFirst) {
                tP = { x: P1.x, y: P2.y };
            }
            else {
                tP = { x: P2.x, y: P1.y };
            }
        }
        return tP;
    };
    /**
     * 点连线装换为path字符串
     * @param {array} pQue
     * @param {bool} isClose
     * @returns {string}
     */
    NodeUtil.ps2Path = function (pQue, isClose) {
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
     * 元素类型转节点
     * @param elem
     */
    NodeUtil.path2ps = function (elem) {
        var tPs = [];
        __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].each(elem.attr('path'), function (idx, row) {
            tPs.push({ x: row[1], y: row[2] });
        });
        return tPs;
    };
    /**
     * 点连线转换为字符串数组
     * @param {array} pQue
     * @param {bool} isClose
     * @returns {array} string[]
     */
    NodeUtil.ps2PathAttr = function (pQue, isClose) {
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
     * 获取中间点坐标
     * @param p0
     * @param p1
     */
    NodeUtil.middP = function (p0, p1) {
        return { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2 };
    };
    /**
     * 获取中间点坐标
     * @param p0
     * @param p1
     * @param type 类型 : ua/上角, la/下角
     */
    NodeUtil.polyP = function (p0, p1, type) {
        var p;
        type = type ? type.toLowerCase() : 'la';
        if (p0.x != p1.x && p0.y != p1.y) {
            if ('ua' == type) {
                p = { x: p1.x, y: p0.y };
            }
            else if ('la' == type) {
                p = { x: p0.x, y: p1.y };
            }
        }
        return p;
    };
    return NodeUtil;
}());
/* harmony default export */ __webpack_exports__["a"] = (NodeUtil);


/***/ }),
/* 3 */
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
    },
    text: {
        type: 9994,
        text: '文本'
    }
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeQue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ObjX__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__confNode__ = __webpack_require__(3);




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
        // 图标处理
        var hasIcon = false;
        if (!this.config.hasIcon && (this.config.aUpSrc || this.config.aDownSrc)) {
            hasIcon = true;
        }
        else {
            hasIcon = this.config.hasIcon || false;
        }
        this.config.aUpSrc = __WEBPACK_IMPORTED_MODULE_1__ObjX__["a" /* default */].value(this.config, 'aUpSrc', hasIcon ? 'arrow_up.png' : null);
        this.config.aDownSrc = __WEBPACK_IMPORTED_MODULE_1__ObjX__["a" /* default */].value(this.config, 'aDownSrc', hasIcon ? 'arrow_down.png' : null);
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
            .attr('fill', '#3A0088')
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
        this.headElems['icon'] = ist;
        ist = paper.text(x + (cw / 2), y + 10, __WEBPACK_IMPORTED_MODULE_1__ObjX__["a" /* default */].value(this.config, 'title', '工具栏'))
            .attr('fill', '#ffffff');
        this.headElems['title'] = ist;
    };
    /**
     * 节点栏
     */
    ToolBar.prototype._nodeBar = function () {
        var $this = this, _a = this.rData, cp = _a.cp, cw = _a.cw, th1 = _a.th1, nh = _a.nh, x = cp.x, y = cp.y, _b = this, paper = _b.paper, ndMer = _b.ndMer, config = _b.config, ist, tBodyNds = {}; // 内部缓存的节点
        this.nodeElems = {};
        var menuSeting = config.menu || false; // 菜单设置性
        if (!menuSeting) { // 默认菜单项
            menuSeting = [
                'begin', 'task', 'sign', 'cond',
                'subFlow', 'parallel', 'merge', 'end',
                'text'
            ];
        }
        y += th1;
        // data: toggle => H/S
        this.nodeElems['title'] = paper.rect(x, y, cw, 23)
            .attr('fill', '#E8CCFF')
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
        // 数据处理
        x += 32;
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(menuSeting, function (mk, row) {
            if ('object' != typeof row) {
                mk = row;
                row = {};
            }
            if (!__WEBPACK_IMPORTED_MODULE_3__confNode__["a" /* cNode */][mk]) {
                return;
            }
            // console.log(mk)
            y += 32;
            var text = row.text || __WEBPACK_IMPORTED_MODULE_3__confNode__["a" /* cNode */][mk].text, cx = x, cy = y;
            // 特殊坐标调整（坐标修正）
            if ('parallel' == mk) {
                cy += 5;
                cx += 20;
            }
            else if ('merge' == mk) {
                cy += 5;
                cx += 20;
            }
            ist = ndMer.make(mk, { cx: cx, cy: cy, w: 40, h: 20, text: text })
                .creator();
            if (ist.label) {
                ist.label.attr('fill', '#FF8C00');
                // ist.label.attr('fill', '#FFA500')
            }
            // 特殊节点处理
            if ('text' == mk) {
                ist.c.attr({
                    'font-size': 15,
                    'stroke': 'none'
                });
            }
            tBodyNds[mk] = ist;
        });
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
            .attr('fill', '#D1BBFF')
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
    /**
     * 工具栏显示
     */
    ToolBar.prototype.show = function () {
        this.toggle('S');
        this.cToggle('S');
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.headElems, function (k, elem) {
            elem.show();
        });
    };
    /**
     * 工具栏隐藏
     */
    ToolBar.prototype.hide = function () {
        this.toggle('H');
        this.cToggle('H');
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.headElems, function (k, elem) {
            elem.hide();
        });
    };
    return ToolBar;
}());
/* harmony default export */ __webpack_exports__["a"] = (ToolBar);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeQue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_NodeBegin__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_NodeTask__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_NodeAudit__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_NodeSign__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_NodeCond__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_NodeSubFlow__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__node_NodeParallel__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_NodeMerge__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__node_NodeEnd__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__node_NodeLn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_NodeLnPoly__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__node_NodeText__ = __webpack_require__(22);
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
            case 'Text':
                ist = new __WEBPACK_IMPORTED_MODULE_12__node_NodeText__["a" /* default */](paper, nOpt);
                break;
        }
        return ist;
    };
    return NodeQue;
}());



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_WorkerEditor__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ToolBar__ = __webpack_require__(4);
/**
 * 工作流程编辑器
 */



$(function(){
    // 数据缓存
    var strClsKey = 'test_flow',
        testFlowStr = localStorage.getItem(strClsKey),
        cacheDt = null
    try{
        if(testFlowStr){
            cacheDt = JSON.parse(testFlowStr)
        }
    }catch(e){}

    var $worker = new __WEBPACK_IMPORTED_MODULE_0__src_WorkerEditor__["a" /* default */]({
        dom: '#workflow',
        w: 900,
        // h: 600
        h: 570,
        data: cacheDt
        // , readonly : 'true'
        // , noToolBar: true
        // , disConnNode: true
        // noToolBar: true
        // , rCodes: ['A1', 'A6', 'A5', 'A7', 'A12', 'A10', 'A11*']
        // , rCodes: ['A1', 'A2', 'A3', 'A5', 'A13', 'A14', 'A2*']
        , rCodes: ['A1', 'A2', 'A3', 'A5', 'A6', 'A11', 'A15', 'A16', 'A18', 'A19', 'A20', 'A2*']

        // 事件绑定
        , bindOEvts: true
        , onKeydown: function(code, $self){
            // console.log(code)
            switch(code){
                case 83:
                    let data = $self.save()
                    localStorage.setItem(strClsKey, JSON.stringify(data))
                    alert('数据已经保存')
                    break
            }
        }
        // , icon: {}              // 配置空时加载默认
        , toolBar: {hasIcon: true}
        // , closeToolTip : true
        // , disSR: true      // 键值状态渲染
    })
    

    // 暴露用于测试
    window.cacheDt = cacheDt
    window.$worker = $worker
    // 应用
    new class App{
        constructor(){
            // console.log(8)
            this.domListener()
            this.title()
            // 剪切板处理
            try {
                this.clipBoard()
            } catch (error) {
                console.warn(error)
            }
            
        }
        title(){
            let version = __WEBPACK_IMPORTED_MODULE_0__src_WorkerEditor__["a" /* default */].version
            $('.srroo-top').text(`
            ${version.name} ${version.version} - ${version.release} / ${version.author}
            `)
        }
        domListener(){
            // 事件处理
            //this.keydownEvt()
        }
        keydownEvt(){
            $(document).keydown(function(key){
                // console.log(key)
                var code = key.keyCode
                // console.log(code)
                var nodeSelEd = $worker.select()
                if(key.shiftKey){
                    // 向上 ↑ + shift
                    if(38 == code){
                        if(nodeSelEd){
                            nodeSelEd.move2T()
                        }
                    }
                    // 向下 ↓
                    else if(40 == code){
                        if(nodeSelEd){
                            nodeSelEd.move2B()
                        }
                    }
                    // ←
                    else if(37 == code){
                        if(nodeSelEd){
                            nodeSelEd.move2L()
                        }
                    }
                    // →
                    else if(39 == code){
                        if(nodeSelEd){
                            nodeSelEd.move2R()
                        }
                    }
                    else if(86 == code){ // shitf + v 克隆
                        $worker.clone()
                    }
                    // shitf + D 删除
                    else if(68 == code){
                        $worker.remove()
                    }
                    else if(84 == code){  // shitf + T tab 循环
                        $worker.tab()
                    }
                    else if(107 == code){ // shitf + + tab 循环
                        if(nodeSelEd){
                            nodeSelEd.zoomOut()
                        }
                    }
                    else if(109 == code){ // shitf + - tab 循环
                        if(nodeSelEd){
                            nodeSelEd.zoomIn()
                        }
                    }
                    else if(83 == code){ // shitf + S 数据保存
                        let data = $worker.save()
                        localStorage.setItem(strClsKey, JSON.stringify(data))
                        alert('数据已经保存')
                    }
                    else if(65 == code){ // shift + A 全选择
                        $worker.allSelect()
                    }
                    else if(82 == code){    // shift + R 删除
                        $worker.allRemove()
                    }
                }
                
            })
        }
        clipBoard(){
            // 粘贴
            document.addEventListener('paste', (e) => {
                var str = e.clipboardData.getData('text/plain')
                if(str){
                    try {
                        var rs = JSON.parse(str)
                        if(rs.name == __WEBPACK_IMPORTED_MODULE_0__src_WorkerEditor__["a" /* default */].version.name){
                            $worker.paste(rs.data)
                        }
                    } catch (error) {
                        console.warn(error)
                    }
                }
            })
            // 复制
            document.addEventListener('copy', (e) => {
                var data = $worker.copy()
                if(data.length > 0){
                    var rs = {data, name: __WEBPACK_IMPORTED_MODULE_0__src_WorkerEditor__["a" /* default */].version.name}
                    e.clipboardData.setData('text/plain', JSON.stringify(rs));
                }
                //e.clipboardData.setData('text/plain', 'Hello, world!');
                //e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
                e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
            })
        }
    }
})

window.workerflow = __WEBPACK_IMPORTED_MODULE_0__src_WorkerEditor__["a" /* default */]

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__version__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ToolBar__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NodeQue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__confNode__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_NodeUtil__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__algo_LnPolyConnFn__ = __webpack_require__(24);
///<reference path='../index.d.ts' />
/**
 * 2018年3月1日 星期四
 * worker 工作流编辑器
 */
 // 助手方法







/**
 * 工作流编辑器轻量级
 */
var WorkerEditor = /** @class */ (function () {
    /**
     * @param {object} config 数据配置项
     */
    function WorkerEditor(config) {
        // 索引处理字典
        this.idxDick = {
            c: 0,
            n: 0,
            t: 0 // 文本
        };
        this.nodeDick = {};
        this.connDick = {};
        this.textDick = {};
        this.tmpNodeMap = {};
        this.tmpMapRElm = {};
        this.config = config; // 系统配置参数
        this.paper = __WEBPACK_IMPORTED_MODULE_0__helper__["a" /* default */].createInstance(config); // Raphael 对象        
        this.ndMer = new __WEBPACK_IMPORTED_MODULE_4__NodeQue__["a" /* NodeQue */](this.paper);
        // 配置参数处理
        this._configMergeToDefule();
        this._readonly();
        // 内部缓存数组件容器： 节点、连接线、独立文本
        this._cerateToolBar();
        // 数据加载
        if (config.data) {
            try {
                this.load(config.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        // 绑定协助事件
        if (this.config.bindOEvts) {
            this.operHelpEvts();
        }
        this._domListener();
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
     * 连线同步
     * @param x
     * @param y
     */
    WorkerEditor.prototype._lineMoveSync = function (x, y, node) {
        var conLns = node.conLns, from = conLns.from, to = conLns.to, $this = this;
        // 处理起点
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(from, function (k, v) {
            var fromLn = $this.connDick[v];
            if ('ln' == fromLn.NodeType) {
                var from_code = fromLn.data('from_code'), from_posi = fromLn.data('from_posi'), ps = node.getBBox().ps;
                fromLn.updAttr({ P1: ps[from_posi] });
            }
            else {
                var from_code = fromLn.data('from_code'), from_posi = fromLn.data('from_posi'), ps = node.getBBox().ps;
                fromLn.mvEndPoint(ps[from_posi]);
            }
        });
        // 处理终点
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(to, function (k, v) {
            var toLn = $this.connDick[v];
            if ('ln' == toLn.NodeType) {
                toLn.updAttr({ P2: { x: x, y: y } });
                var to_code = toLn.data('to_code'), to_posi = toLn.data('to_posi'), ps = node.getBBox().ps;
                toLn.updAttr({ P2: ps[to_posi] });
            }
            else {
                toLn.updAttr({ P2: { x: x, y: y } });
                var to_code = toLn.data('to_code'), to_posi = toLn.data('to_posi'), ps = node.getBBox().ps;
                toLn.mvEndPoint(ps[to_posi], true);
            }
        });
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
        // 事件绑定处理
        var $this = this, _a = $this.toolbarCtrl, tBodyNds = _a.tBodyNds, cBodyNds = _a.cBodyNds, connElems = _a.connElems, bkg = this.config.bkg || {};
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
                // 默认颜色，新增节点未运行状态
                ndOpt.bkg = bkg.urunNd || '#CDC5BF';
                ndAst = $this.ndMer
                    .make(key, ndOpt)
                    .creator();
            }, function () {
                ndAst.moveable({
                    beforeMv: function (node) {
                        if ($this.previewMk) {
                            return false;
                        }
                    },
                    afterUpd: function (x, y, node) {
                        $this._lineMoveSync(x, y, node);
                    }
                });
                $this._nodeBindEvt(ndAst);
                if ('text' == ndAst.NodeType) {
                    var tIdx = $this._order('t', 'T');
                    // 保存到字典中
                    ndAst.data('_code', tIdx);
                    $this.textDick[tIdx] = ndAst;
                }
                else {
                    var _index = $this._order('n', 'A');
                    // 保存到字典中
                    ndAst.data('_code', _index);
                    $this.nodeDick[_index] = ndAst;
                }
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
            var cSeledNode = $this.select();
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
        this._baseNodeBindEvt(node);
        var $this = this, _a = this, ndMer = _a.ndMer, config = _a.config, bkg = config.bkg || {};
        // 事件绑定处理
        var toBindNodeEvts = function (nd) {
            // 点击
            nd.c.click(function () {
                $this.removeAllSeled();
                nd.select();
                $this.onClick(nd);
            });
            // 双击
            nd.c.dblclick(function () {
                $this.onDbClick(nd);
            });
            //nd
            // 处理接口            
            nd.onCreateBoxPnt = function (pnt) {
                // 预览标识
                if ($this.previewMk || $this.config.disDragble) {
                    return null;
                }
                var tmpLnIst;
                // 开启连线模式时
                if ($this.lineCnMode && $this.lineCnMode.isSelEd) {
                    // 配置，禁止节点之间连线
                    if (config.disConnNode) {
                        return null;
                    }
                    var tmpP_1 = { x: 0, y: 0 };
                    pnt.drag(function (dx, dy) {
                        if (!tmpLnIst) {
                            console.log('选择框连线拖动出错！');
                            return;
                        }
                        dx += tmpP_1.x;
                        dy += tmpP_1.y;
                        var collNode = $this.collisionByP(dx, dy);
                        $this.allBackground();
                        if (collNode) {
                            var rElem = collNode.magnCore(dx, dy);
                            if (rElem) {
                                dx = rElem.attr('cx');
                                dy = rElem.attr('cy');
                                tmpLnIst.data('to_code', rElem.data('pcode'))
                                    .data('to_posi', rElem.data('posi'));
                            }
                            collNode.background('magn');
                        }
                        else {
                            tmpLnIst.data('to_code', null)
                                .data('to_posi', null);
                        }
                        if ($this.lineCnMode.type == 'ln') {
                            tmpLnIst.updAttr({
                                P2: { x: dx, y: dy }
                            });
                        }
                        else {
                            tmpLnIst.opt.MPs = []; // 删除中间代码
                            // (<any>tmpLnIst).getMiddP()
                            tmpLnIst.updAttr({
                                P2: { x: dx, y: dy }
                            });
                            // 折线连接线处理
                            Object(__WEBPACK_IMPORTED_MODULE_7__algo_LnPolyConnFn__["a" /* LnPolyConn */])(tmpLnIst, $this, collNode);
                        }
                    }, function () {
                        // 历史节点处理                            
                        $this.removeTmpNode('connLnIst');
                        // 删除所有联系那选中状态
                        $this.removeAllSeled('conn');
                        // 处理
                        tmpP_1.x = this.attr('cx');
                        tmpP_1.y = this.attr('cy');
                        var newOpt = {}, lx = tmpP_1.x, ly = tmpP_1.y;
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
                                //h: 4
                                r: 5
                            };
                        }
                        // 默认颜色，新增节点未运行状态
                        newOpt.bkg = bkg.urunNd || '#CDC5BF';
                        tmpLnIst = ndMer.make($this.lineCnMode.type, newOpt)
                            .creator()
                            .data('from_code', pnt.data('pcode'))
                            .data('from_posi', pnt.data('posi'));
                        $this.tmpNodeMap['connLnIst'] = tmpLnIst;
                    }, function () {
                        // 有效的连线保留，说明其连接成功
                        if (tmpLnIst.data('to_code') && tmpLnIst.data('to_posi')) {
                            var cIdx = $this._order('c', 'C'), fCode = tmpLnIst.data('from_code'), tCode = tmpLnIst.data('to_code');
                            tmpLnIst.data('_code', cIdx);
                            var fNd = $this.nodeDick[fCode];
                            var tNd = $this.nodeDick[tCode];
                            fNd.line(cIdx);
                            fNd.clearTmpElem('mc');
                            tNd.line(cIdx, true);
                            tNd.clearTmpElem('mc');
                            $this.allBackground();
                            // 记录到字典中
                            $this._lineBindEvt(tmpLnIst);
                            $this.connDick[cIdx] = tmpLnIst;
                            $this.tmpNodeMap['connLnIst'] = null;
                        }
                        $this.removeTmpNode('connLnIst');
                        // 
                        // $this.tmpNodeMap['connLnIst'] = tmpLnIst
                    });
                }
                // 节点方位拖动大小
                else if (!config.disEpDragble) {
                    var tp_1 = { x: 0, y: 0 }, attr_1 = { pcode: null, posi: null };
                    pnt.drag(function (dx, dy) {
                        dx += tp_1.x, dy += tp_1.y;
                        var cnode = attr_1.pcode ? $this.nodeDick[attr_1.pcode] : null;
                        if (cnode && attr_1.pcode && attr_1.posi) {
                            var opt = cnode.opt, cx = opt.cx, cy = opt.cy, h = opt.h, w = opt.w, boxPadding = cnode.feature('boxPadding');
                            // 数据申明
                            var yt = void 0, yb = void 0, xl = void 0, xr = void 0;
                            // 新值
                            var yt1 = void 0, yb1 = void 0, xl1 = void 0, xr1 = void 0;
                            var cx1 = void 0, cy1 = void 0, h1 = void 0, w1 = void 0;
                            switch (attr_1.posi) {
                                case 'a': // 左上角移动
                                    yt1 = dy + boxPadding;
                                    xl1 = dx + boxPadding;
                                    yb = cy + h / 2;
                                    xr = cx + w / 2;
                                    if (yt1 <= yb && xl1 <= xr) {
                                        h1 = Math.abs(yt1 - yb);
                                        w1 = Math.abs(xl1 - xr);
                                        cx1 = xl1 + w1 / 2;
                                        cy1 = yt1 + h1 / 2;
                                        cnode.updAttr({
                                            h: h1,
                                            w: w1,
                                            cx: cx1,
                                            cy: cy1
                                        });
                                    }
                                    break;
                                case 'b': // 上拉 
                                    yt1 = dy + boxPadding;
                                    yb = cy + h / 2;
                                    if (yt1 <= yb) {
                                        h1 = Math.abs(yb - yt1);
                                        cy1 = yt1 + h1 / 2;
                                        cnode.updAttr({
                                            h: h1,
                                            cy: cy1
                                        });
                                        // 同步更新边框，报错 [BUG]
                                        // cnode.select()
                                    }
                                    break;
                                case 'c': // 右上角
                                    yt1 = dy + boxPadding;
                                    xr1 = dx - boxPadding;
                                    yb = cy + h / 2;
                                    xl = cx - w / 2;
                                    if (yt1 <= yb && xr1 >= xl) {
                                        h1 = Math.abs(yt1 - yb);
                                        w1 = Math.abs(xr1 - xl);
                                        cx1 = xr1 - w1 / 2;
                                        cy1 = yt1 + h1 / 2;
                                        cnode.updAttr({
                                            h: h1,
                                            w: w1,
                                            cx: cx1,
                                            cy: cy1
                                        });
                                    }
                                    break;
                                case 'd': // 右拉
                                    xr1 = dx - boxPadding;
                                    xl = cx - w / 2;
                                    if (xr1 >= xl) {
                                        w1 = Math.abs(xl - xr1),
                                            cx1 = xr1 - w1 / 2;
                                        cnode.updAttr({
                                            w: w1,
                                            cx: cx1
                                        });
                                        // 同步更新边框，报错 [BUG]
                                        // cnode.select()
                                    }
                                    break;
                                case 'e': // 右下角
                                    yb1 = dy - boxPadding;
                                    xr1 = dx - boxPadding;
                                    yt = cy - h / 2;
                                    xl = cx - w / 2;
                                    if (yb1 >= yt && xr1 >= xl) {
                                        h1 = Math.abs(yb1 - yt);
                                        w1 = Math.abs(xr1 - xl);
                                        cx1 = xr1 - w1 / 2;
                                        cy1 = yb1 - h1 / 2;
                                        cnode.updAttr({
                                            h: h1,
                                            w: w1,
                                            cx: cx1,
                                            cy: cy1
                                        });
                                    }
                                    break;
                                case 'f': // 下拉
                                    yb1 = dy - boxPadding,
                                        yt = cy - h / 2;
                                    if (yb1 >= yt) {
                                        h1 = Math.abs(yt - yb1),
                                            cy1 = yb1 - h1 / 2;
                                        cnode.updAttr({
                                            h: h1,
                                            cy: cy1
                                        });
                                        // 同步更新边框，报错 [BUG]
                                        // cnode.select()
                                    }
                                    break;
                                case 'g': // 左下角
                                    yb1 = dy - boxPadding;
                                    xl1 = dx + boxPadding;
                                    yt = cy - h / 2;
                                    xr = cx + w / 2;
                                    if (yb1 >= yt && xl1 <= xr) {
                                        h1 = Math.abs(yb1 - yt);
                                        w1 = Math.abs(xl1 - xr);
                                        cx1 = xl1 + w1 / 2;
                                        cy1 = yb1 - h1 / 2;
                                        cnode.updAttr({
                                            h: h1,
                                            w: w1,
                                            cx: cx1,
                                            cy: cy1
                                        });
                                    }
                                    break;
                                case 'h': // 左拉
                                    xl1 = dx + boxPadding,
                                        xr = cx + w / 2;
                                    if (xl1 <= xr) {
                                        w1 = Math.abs(xr - xl1);
                                        cx1 = xl1 + w1 / 2;
                                        cnode.updAttr({
                                            w: w1,
                                            cx: cx1
                                        });
                                        // 同步更新边框，报错 [BUG]
                                        // cnode.select()
                                    }
                                    break;
                            }
                        }
                    }, function () {
                        // 处理
                        tp_1.x = this.attr('cx');
                        tp_1.y = this.attr('cy');
                        //console.log(this.data())
                        attr_1.pcode = this.data('pcode');
                        attr_1.posi = this.data('posi');
                    }, function () { });
                }
            };
            // 尺寸自适应
            nd.onSize = function () {
                var opt = this.opt;
                $this._lineMoveSync(opt.cx, opt.cy, this);
            };
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
     * 连接线事件绑定
     * @param ln
     */
    WorkerEditor.prototype._lineBindEvt = function (ln) {
        this._baseNodeBindEvt(ln);
        var $this = this;
        if (ln) {
            var bkg_1 = this.config.bkg || {};
            // 起点移动处理
            var startPFn_1 = function (elem) {
                var p1 = { x: 0, y: 0 };
                elem.drag(function (dx, dy) {
                    dx += p1.x;
                    dy += p1.y;
                    // 节点碰撞
                    var collNode = $this.collisionByP(dx, dy), fCode = ln.data('from_code'), lnCode = ln.code;
                    if (fCode) {
                        $this.nodeDick[fCode].rmLine(lnCode);
                    }
                    $this.allBackground();
                    if (collNode) {
                        var rElem = collNode.magnCore(dx, dy);
                        if (rElem) {
                            dx = rElem.attr('cx');
                            dy = rElem.attr('cy');
                            ln.data('from_code', rElem.data('pcode'))
                                .data('from_posi', rElem.data('posi'));
                        }
                        collNode.background('magn');
                        collNode.line(lnCode);
                    }
                    else {
                        ln.data('from_code', null)
                            .data('from_posi', null);
                    }
                    ln.updAttr({ P1: { x: dx, y: dy } });
                }, function () {
                    p1.x = this.attr('cx');
                    p1.y = this.attr('cy');
                }, function () { });
            };
            // 终点移动处理
            var endPFn_1 = function (elem) {
                var p1 = { x: 0, y: 0 };
                elem.drag(function (dx, dy) {
                    dx += p1.x;
                    dy += p1.y;
                    // 节点碰撞
                    var collNode = $this.collisionByP(dx, dy), fCode = ln.data('to_code'), lnCode = ln.code;
                    if (fCode) {
                        $this.nodeDick[fCode].rmLine(lnCode, true);
                    }
                    $this.allBackground();
                    if (collNode) {
                        var rElem = collNode.magnCore(dx, dy);
                        if (rElem) {
                            dx = rElem.attr('cx');
                            dy = rElem.attr('cy');
                            ln.data('to_code', rElem.data('pcode'))
                                .data('to_posi', rElem.data('posi'));
                        }
                        collNode.background('magn');
                        collNode.line(lnCode, true);
                    }
                    else {
                        ln.data('to_code', null)
                            .data('to_posi', null);
                    }
                    ln.updAttr({ P2: { x: dx, y: dy } });
                    // 折线
                    if ('ln_poly' == ln.NodeType) {
                        Object(__WEBPACK_IMPORTED_MODULE_7__algo_LnPolyConnFn__["a" /* LnPolyConn */])(ln, $this, collNode);
                    }
                }, function () {
                    p1.x = this.attr('cx');
                    p1.y = this.attr('cy');
                }, function () { });
            };
            if ('ln' == ln.NodeType) {
                ln.onCreateBoxPnt = function (pElem) {
                    // 预览标识，禁止拖动
                    if ($this.previewMk || $this.config.disDragble) {
                        return null;
                    }
                    var pcode = pElem.data('pcode'), posi = pElem.data('posi');
                    // 起点
                    if ('f' == posi) {
                        startPFn_1(pElem);
                    }
                    else if ('t' == posi) {
                        endPFn_1(pElem);
                    }
                };
                // 连线选中
                ln.c.click(function () {
                    $this.removeAllSeled();
                    ln.select();
                });
            }
            else {
                // 连线选中
                ln.c.click(function () {
                    $this.removeAllSeled();
                    ln.select();
                });
                // 边框点
                ln.onCreateBoxPnt = function (pElem) {
                    // 预览标识
                    if ($this.previewMk || $this.config.disDragble) {
                        return null;
                    }
                    var pcode = pElem.data('pcode'), posi = pElem.data('posi'), MPs = ln.opt.MPs, fMIdx = (2 + MPs.length) * 2 - 2, // 聚焦点最大索引
                    fMIdxStr = 'f' + fMIdx;
                    if ('f0' == posi) { // 起点
                        startPFn_1(pElem);
                    }
                    else if (fMIdxStr == posi) { // 终点
                        endPFn_1(pElem);
                    }
                    else { // 中间点
                        var tP_1 = { x: 0, y: 0 }, MPsTmp = [], MPsLn_1, // 中间点串联成的临时连线
                        fPQue_1 = {}, tElemKey_1 = 'ln_ploy_point', idx0_1 = -1, idx1_1 = -1;
                        pElem.drag(function (dx, dy) {
                            dx += tP_1.x;
                            dy += tP_1.y;
                            var MPsLnAttr = __WEBPACK_IMPORTED_MODULE_6__node_NodeUtil__["a" /* default */].path2ps(MPsLn_1), len = MPsLnAttr.length, fp = MPsLnAttr[0], tp = MPsLnAttr[len - 1];
                            var pAttr = [fp];
                            // 同 x/y 轴坐标
                            if (fp.x == tp.x || fp.y == tp.y) {
                                // 同 x 轴，向 y 方向移动
                                if (fp.x == tp.x) {
                                    pAttr.push({ x: dx, y: fp.y }, { x: dx, y: tp.y });
                                }
                                else {
                                    pAttr.push({ x: fp.x, y: dy }, { x: tp.x, y: dy });
                                }
                            }
                            else {
                                pAttr.push({ x: dx, y: fp.y }, { x: dx, y: dy }, { x: tp.x, y: dy });
                            }
                            pAttr.push(tp);
                            //    console.log(pAttr)
                            MPsLn_1.attr('path', __WEBPACK_IMPORTED_MODULE_6__node_NodeUtil__["a" /* default */].ps2Path(pAttr));
                        }, function () {
                            tP_1.x = this.attr('cx');
                            tP_1.y = this.attr('cy');
                            fPQue_1 = ln.getFocusPoint();
                            var idx = parseInt(posi.replace('f', ''));
                            idx0_1 = idx - 1;
                            idx1_1 = idx + 1;
                            var key0 = 'f' + idx0_1, key1 = 'f' + idx1_1;
                            var fp = fPQue_1[key0], mp = fPQue_1[posi], tp = fPQue_1[key1];
                            if ('f0' == key0) {
                                fp = __WEBPACK_IMPORTED_MODULE_6__node_NodeUtil__["a" /* default */].middP(fp, mp);
                            }
                            if (fMIdxStr == key1) {
                                tp = __WEBPACK_IMPORTED_MODULE_6__node_NodeUtil__["a" /* default */].middP(mp, tp);
                            }
                            MPsLn_1 = this.paper.path(__WEBPACK_IMPORTED_MODULE_6__node_NodeUtil__["a" /* default */].ps2Path([
                                fp,
                                mp,
                                tp
                            ]))
                                .attr('stroke', '#00FF00');
                            $this.rmTempElem(tElemKey_1);
                            $this.tmpMapRElm[tElemKey_1] = MPsLn_1;
                        }, function () {
                            var MPsLnAttr = __WEBPACK_IMPORTED_MODULE_6__node_NodeUtil__["a" /* default */].path2ps(MPsLn_1);
                            var pQue = [], isMkMPs = false; // 中间值产生成功
                            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(fPQue_1, function (k, p) {
                                var kIdx = parseInt(k.replace('f', ''));
                                if (kIdx >= idx0_1 && kIdx <= idx1_1) {
                                    if (!isMkMPs) {
                                        pQue = pQue.concat(pQue, MPsLnAttr);
                                        isMkMPs = true;
                                    }
                                }
                                else {
                                    pQue.push(p);
                                }
                            });
                            var nPMs = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].subArray(pQue, 1, -1);
                            ln.updAttr({
                                MPs: nPMs
                            });
                            ln.select();
                            $this.rmTempElem(tElemKey_1);
                        });
                    }
                };
            }
            // 公共鼠标选中事件
            ln.c.hover(function () {
                var _bkg = bkg_1.lnHover || '#FF0000', sWd = '4px';
                this.attr('stroke-width', sWd)
                    .attr('stroke', _bkg);
                // 箭体
                if (ln.inlineEle) {
                    ln.inlineEle
                        .attr('fill', _bkg)
                        .attr('stroke', _bkg)
                        .attr('stroke-width', sWd);
                }
            }, function () {
                var _bkg = ln.opt.bkg, sWd = '2px';
                this.attr('stroke-width', '2px')
                    .attr('stroke', ln.opt.bkg);
                // 箭体
                if (ln.inlineEle) {
                    ln.inlineEle.attr('fill', ln.opt.bkg);
                    ln.inlineEle.attr('stroke', ln.opt.bkg);
                }
            });
            // console.log(ln)
        }
    };
    /**
     * 基本节点时间绑定，用于外部处理以及所有节点需要的时间
     * @param nd
     */
    WorkerEditor.prototype._baseNodeBindEvt = function (nd) {
        this._nodeToolTip(nd);
    };
    /**
     * 序列号获取
     * @param {string} type 类型 [c, n, t]
     * @param {string} prev
     * @param {string} ref
     * @returns {string | number}
     * @private
     */
    WorkerEditor.prototype._order = function (type, prev, ref) {
        var newStr;
        prev = prev ? prev : '';
        if (type) {
            if ('undefined' != typeof this.idxDick[type]) {
                this.idxDick[type] += 1;
                newStr = ref ? ref : prev + this.idxDick[type];
                switch (type) {
                    case 'c':
                        if (this.connDick[newStr]) {
                            newStr = this._order(type, prev);
                        }
                        break;
                    case 'n':
                        if (this.nodeDick[newStr]) {
                            newStr = this._order(type, prev);
                        }
                        break;
                    case 't':
                        if (this.textDick[newStr]) {
                            newStr = this._order(type, prev);
                        }
                        break;
                }
            }
        }
        return newStr;
    };
    /**
     * dom 监听
     */
    WorkerEditor.prototype._domListener = function () {
        var dom = this.config.dom, $this = this;
        // 双击
        dom.find('svg').dblclick(function () {
            $this.removeAllSeled();
        });
    };
    /**
     * 节点title提示绑定，包括 node/text/conn
     * @param {rSu.Node} node
     */
    WorkerEditor.prototype._nodeToolTip = function (node) {
        if (!this.config.closeToolTip && node) {
            var $this_1 = this;
            node.c.hover(function () {
                var textTip = node.textTip;
                if (textTip) {
                    var offset = $this_1.getDomOffset();
                    $this_1.tooltip(textTip, this.attr('x') + offset.left + 20, this.attr('y') + offset.top + 2);
                }
            }, function () {
                $this_1.tooltip('');
            });
        }
    };
    /**
     * 只读属性
     */
    WorkerEditor.prototype._readonly = function () {
        if (this.config.readonly) {
            this.config.noToolBar = true;
            this.config.disEpDragble = true;
            this.config.disConnNode = true;
            this.config.disDragble = true;
        }
    };
    /**
     * 移除所有选中中元素
     */
    WorkerEditor.prototype.removeAllSeled = function (type) {
        var _this = this;
        // 删除所有节点
        var removeAllSeledNodeFn = function (dick) {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(dick, function (cd, ist) {
                if (ist.isSelEd) {
                    ist.removeBox();
                }
            });
        };
        type = type ? ('object' == typeof type ? type : [type]) : '';
        if (!type) {
            type = ['c', 't', 'n'];
        }
        //console.log(type)
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(type, function (idx, tp) {
            var dick = {};
            if ('c' == tp || 'conn' == tp) {
                dick = _this.connDick;
            }
            else if ('t' == tp || 'text' == tp) {
                dick = _this.textDick;
            }
            else {
                dick = _this.nodeDick;
            }
            removeAllSeledNodeFn(dick);
        });
        this.rmTempElem('allBorde');
    };
    /**
     * 全选
     */
    WorkerEditor.prototype.allSelect = function () {
        // 标记选中状态
        this.allNdSeled();
        // 预览模式
        if (this.previewMk) {
            return;
        }
        var _a = this.getAllSelPs(), x = _a.x, y = _a.y, w = _a.w, h = _a.h;
        var $this = this;
        // 生成全选遮挡层
        this.rmTempElem('allBorde');
        var tP = { x: 0, y: 0 }, pS = {};
        var allBorde = this.paper.rect(x, y, w, h)
            .attr('fill-opacity', 0.75)
            .attr('fill', '#9999FF')
            .dblclick(function () {
            $this.removeAllSeled();
        })
            .drag(function (dx, dy) {
            // 自身移动
            this.attr('x', tP.x + dx);
            this.attr('y', tP.y + dy);
            // 全部节点迁移
            // 等比例移动法
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each($this.nodeDick, function (k, node) {
                var nTp = pS[k];
                node.updAttr({
                    cx: nTp.x + dx,
                    cy: nTp.y + dy
                });
                node.select();
            });
            $this.allNdSeled('conn');
        }, function () {
            tP.x = this.attr('x');
            tP.y = this.attr('y');
            // 节点中心点坐标
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each($this.nodeDick, function (k, node) {
                var opt = node.opt;
                pS[k] = {
                    x: opt.cx,
                    y: opt.cy
                };
            });
        }, function () { });
        this.tmpMapRElm['allBorde'] = allBorde;
    };
    /**
     * 全选是相关端点
     */
    WorkerEditor.prototype.getAllSelPs = function () {
        // 获取所有节点边框
        var t = 0, b = 0, l = 0, r = 0;
        var boxPadding;
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (k, node) {
            var c = node.c, attr = node.getBBox().attr, x = attr.x, y = attr.y, width = attr.width, height = attr.height, t1 = y, b1 = y + height, l1 = x, r1 = x + width;
            if (!boxPadding)
                boxPadding = node.feature('boxPadding', null, 3);
            if (t == 0)
                t = t1;
            if (b == 0)
                b = b1;
            if (l == 0)
                l = l1;
            if (r == 0)
                r = r1;
            // 上边框
            if (t > t1)
                t = t1;
            // 下边框
            if (b < b1)
                b = b1;
            // 左边框
            if (l > l1)
                l = l1;
            // 右边框
            if (r < r1)
                r = r1;
        });
        var x1 = l, y1 = t, w1 = Math.abs(l - r), h1 = Math.abs(t - b);
        boxPadding = boxPadding * 2;
        var boxPadding2 = boxPadding * 2;
        return {
            x: x1 - boxPadding,
            y: y1 - boxPadding,
            w: w1 + boxPadding2,
            h: h1 + boxPadding2
        };
    };
    /**
     * 选中所有节点
     * @param type
     */
    WorkerEditor.prototype.allNdSeled = function (type) {
        var _this = this;
        if (type) {
            type = 'object' == typeof type ? type : [type];
        }
        else {
            type = ['c', 't', 'n'];
        }
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(type, function (idx, tp) {
            var dick = {};
            if ('c' == tp || 'conn' == tp) {
                dick = _this.connDick;
            }
            else if ('t' == tp || 'text' == tp) {
                dick = _this.textDick;
            }
            else {
                dick = _this.nodeDick;
            }
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(dick, function (k, node) {
                node.select();
            });
        });
    };
    // 删除所有节点
    WorkerEditor.prototype.rmAllNode = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (k, node) {
            _this.remove(node);
        });
    };
    // 删除所有连线
    WorkerEditor.prototype.rmAllLine = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.connDick, function (k, node) {
            _this.remove(node);
        });
    };
    // 删除所有文本
    WorkerEditor.prototype.rmAllText = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.textDick, function (k, node) {
            _this.remove(node);
        });
    };
    // 移除所有节点
    WorkerEditor.prototype.allRemove = function () {
        this.rmAllLine();
        this.rmAllNode();
        this.rmAllText();
    };
    /**
     * 设置统一变化管理
     */
    WorkerEditor.prototype.allBackground = function (type) {
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (i, v) {
            v.background(type);
        });
    };
    /**
     * 移除临时元素字典（支持模糊查询）
     * @param key
     * @param isLike 模糊查询
     */
    WorkerEditor.prototype.rmTempElem = function (key, isLike) {
        var _this = this;
        if (key && !isLike) {
            if (this.tmpMapRElm[key]) {
                this.tmpMapRElm[key].remove();
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.tmpMapRElm, function (k, elem) {
                if (isLike && key) {
                    if (k.indexOf(key) > -1) {
                        _this.rmTempElem(k);
                    }
                }
                else {
                    _this.rmTempElem(k);
                }
            });
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
                var NodeType = node.NodeType, value = node.code;
                if ('ln' == NodeType || 'ln_poly' == NodeType) { // 连线删除
                    var fCode = node.data('from_code'), tCode = node.data('to_code');
                    var fNodeIst = _this.nodeDick[fCode], tNodeIst = _this.nodeDick[tCode];
                    // 先删除节点后删除连线，连线不存在
                    if (fNodeIst) {
                        fNodeIst.rmLine(value);
                    }
                    if (tNodeIst) {
                        tNodeIst.rmLine(value, true);
                    }
                }
                node.delete();
                if (_this.nodeDick[value]) {
                    delete _this.nodeDick[value];
                }
                else if (_this.connDick[value]) {
                    delete _this.connDick[value];
                }
                else if (_this.textDick[value]) {
                    delete _this.textDick[value];
                }
                isSuccess = true;
                // 选择切换
                var lastElem = _this.last();
                if (lastElem) {
                    lastElem.select();
                }
            }
        };
        if (!code) {
            var _a = this.selectGroup(), node = _a.node, text = _a.text, conn = _a.conn;
            var eachNodeFn = function (rs) {
                __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(rs, function (i, nd) {
                    removeNode(nd);
                });
            };
            eachNodeFn(node);
            eachNodeFn(text);
            eachNodeFn(conn);
        }
        else if ('object' == typeof code) {
            removeNode(code);
        }
        else {
            removeNode(this.nodeDick[code]);
        }
        return isSuccess;
    };
    /**
     * 循环获取节点， tab 节点选择切换
     * @param {string|null} type 类型 c-conn, t-text
     */
    WorkerEditor.prototype.tab = function (type) {
        var _this = this;
        var cSelEd = this.select(), code = cSelEd ? cSelEd.code : null, findLastMk = false, // 找到最后一个
        successMk = false, // 匹配到标志
        nt = cSelEd ? cSelEd.NodeType : ''; // 节点类型
        // 节点选择处理函数            
        var handlerNodeSelFn = function (cd, node) {
            if (!cSelEd) {
                node.select();
                successMk = true;
                return false;
            }
            else {
                if (findLastMk) { // 正好遍历到
                    _this.removeAllSeled();
                    node.select();
                    successMk = true;
                    return false;
                }
                else if (code == node.code) {
                    findLastMk = true;
                }
            }
        };
        if ('c' == type) { // 连线
            if (nt && ('ln' != nt || 'ln_poly' != nt)) {
                this.removeAllSeled();
            }
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.connDick, function (cd, node) {
                return handlerNodeSelFn(cd, node);
            });
        }
        else if ('t' == type) {
            if (nt && ('text' != nt)) {
                this.removeAllSeled();
            }
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.textDick, function (cd, node) {
                return handlerNodeSelFn(cd, node);
            });
        }
        else {
            var isUnNode = false;
            if (nt) {
                if ('ln' == nt || 'ln_poly' == nt) {
                    isUnNode = true;
                }
                else if ('text' == nt) {
                    isUnNode = true;
                }
            }
            if (isUnNode) {
                this.removeAllSeled();
            }
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (cd, node) {
                return handlerNodeSelFn(cd, node);
            });
        }
        // 没有找到时从新开始，且存在元素
        if (findLastMk && !successMk) {
            this.removeAllSeled();
            this.tab(type);
        }
    };
    /**
     * 节点复制
     * @param {string} code
     */
    WorkerEditor.prototype.clone = function (code) {
        var node, newNode, $this = this;
        if (code && 'string' == typeof code) {
            node = this.nodeDick[code];
        }
        else if (code && 'object' == typeof code) {
            node = code;
        }
        else {
            node = this.select();
        }
        if (node) {
            var newOpt = $.extend(true, {}, node.opt), rate = 0.2;
            newOpt.cx += newOpt.w * rate;
            newOpt.cy += newOpt.h * rate;
            newNode = this.ndMer.make(node.NodeType, newOpt)
                .creator()
                .moveable({
                beforeMv: function (node) {
                    if ($this.previewMk) {
                        return false;
                    }
                },
                afterUpd: function (x, y, node) {
                    $this._lineMoveSync(x, y, node);
                }
            });
            // 切换选中状态
            this.removeAllSeled();
            newNode.select();
            this._nodeBindEvt(newNode);
            var ndType = newNode.NodeType;
            if ('text' == ndType) {
                var tIdx = this._order('t', 'T');
                newNode.data('_code', tIdx);
                this.textDick[tIdx] = newNode;
            }
            else {
                var _index = this._order('n', 'A');
                // 保存到字典中
                newNode.data('_code', _index);
                this.nodeDick[_index] = newNode;
            }
        }
        return newNode;
    };
    /**
     * 粘贴
     */
    WorkerEditor.prototype.paste = function (data) {
        var _this = this;
        var $this = this;
        data = 'object' == typeof data ? data : [];
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(data, function (i, dd) {
            var code = dd.code, opt = dd.opt, NodeType = dd.NodeType, type = dd.type, rate = 0.2;
            opt.cx += opt.w * rate;
            opt.cy += opt.h * rate;
            var newNode = _this.ndMer.make(NodeType, opt)
                .creator();
            if ('node' == type) {
                newNode.moveable({
                    beforeMv: function (node) {
                        if ($this.previewMk) {
                            return false;
                        }
                    },
                    afterUpd: function (x, y, node) {
                        $this._lineMoveSync(x, y, node);
                    }
                });
                var _index = _this._order('n', 'A', code);
                newNode.data('_code', _index);
                _this._nodeBindEvt(newNode);
                _this.nodeDick[_index] = newNode;
            }
            else if ('conn' == type) {
                var _index_1 = _this._order('c', 'C', code);
                newNode.data('_code', _index_1);
                // 连线处理
                __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(dd.data, function (k, v) {
                    var lnNode;
                    switch (k) {
                        case 'from_code':
                            lnNode = $this.nodeDick[v];
                            if (lnNode) {
                                lnNode.line(_index_1);
                            }
                            break;
                        case 'to_code':
                            lnNode = $this.nodeDick[v];
                            if (lnNode) {
                                lnNode.line(_index_1, true);
                            }
                            break;
                    }
                });
                _this._lineBindEvt(newNode);
                // 保存到字典中
                _this.connDick[_index_1] = newNode;
            }
            else if ('text' == type) {
                var _index = _this._order('t', 'T', code);
                newNode.data('_code', _index);
                _this.textDick[_index] = newNode;
            }
            newNode.data(dd.data);
        });
        return this;
    };
    /**
     * 获取赋值的结果数据
     * 复制
     */
    WorkerEditor.prototype.copy = function () {
        // >>>
        //>> [{code:code, opt: nodeOpt, cls: ''}]
        var data = [], bkg = this.config.bkg || {}, bkgUrunNd = bkg.urunNd || '#CDC5BF', bkgUrunTxt = bkg.urunTxt || '#000000', stateMask = false;
        var pushToData = function (code, type, node) {
            var opt = $.extend(true, {}, node.opt), NodeType = node.NodeType, dd = node.data();
            // 状态过滤-2018年5月22日 星期二
            if (dd.state && opt.bkg) {
                delete dd.state;
                // 节点生成
                opt.bkg = bkgUrunNd;
                opt.bkgTxt = bkgUrunTxt;
                stateMask = true;
            }
            else if (stateMask && 'conn' == type) {
                // 节点生成
                opt.bkg = bkgUrunNd;
            }
            // 数据推送到保存栈                
            data.push({
                code: code, opt: opt, NodeType: NodeType, type: type,
                data: dd
            });
        };
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (code, node) {
            if (node.isSelEd) {
                pushToData(code, 'node', node);
            }
        });
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.connDick, function (code, node) {
            if (node.isSelEd) {
                pushToData(code, 'conn', node);
            }
        });
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.textDick, function (code, node) {
            if (node.isSelEd) {
                pushToData(code, 'text', node);
            }
        });
        return data;
    };
    /**
     * 获取选中的实例(单节点)
     */
    WorkerEditor.prototype.select = function () {
        var selectedNode = null;
        // 节点扫描
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (k, node) {
            if (node.isSelEd) {
                selectedNode = node;
                return false;
            }
        });
        // 连线扫描
        if (!selectedNode) {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.connDick, function (k, node) {
                if (node.isSelEd) {
                    selectedNode = node;
                    return false;
                }
            });
        }
        // 扫描文本
        if (!selectedNode) {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.textDick, function (k, node) {
                if (node.isSelEd) {
                    selectedNode = node;
                    return false;
                }
            });
        }
        return selectedNode;
    };
    /**
     * 选中连接实例的点(分组，所有节点)
     * @returns {object} {type: node[]} -> {node: [], conn: [], text: []}
     */
    WorkerEditor.prototype.selectGroup = function () {
        var mNode = {
            node: [],
            conn: [],
            text: []
        };
        // 节点
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (cd, nd) {
            if (nd.isSelEd) {
                mNode.node.push(nd);
            }
        });
        // 连线
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.connDick, function (cd, nd) {
            if (nd.isSelEd) {
                mNode.node.push(nd);
            }
        });
        // 文本
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.textDick, function (cd, nd) {
            if (nd.isSelEd) {
                mNode.node.push(nd);
            }
        });
        return mNode;
    };
    /**
     * 获取节点属性
     * @memberof WorkerEditor
     */
    WorkerEditor.prototype.step = function (node) {
        var _this = this;
        node = node ? node : this.select();
        if ('object' != typeof node) {
            node = this.connDick[node];
        }
        var step, _srroo;
        if (node) {
            var conLns = node.conLns, from = conLns.from, to = conLns.to, fromQue_1 = [], toQue_1 = [];
            // 起点
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(from, function (idx, cc) {
                var cnIst = _this.connDick[cc];
                if (cnIst) {
                    var tCode = cnIst.data('to_code'), tPosi = cnIst.data('to_posi');
                    toQue_1.push(cnIst.data('to_code'));
                }
            });
            // 终点
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(to, function (idx, cc) {
                var cnIst = _this.connDick[cc];
                if (cnIst) {
                    var fCode = cnIst.data('from_code'), fPosi = cnIst.data('from_posi');
                    fromQue_1.push(cnIst.data('from_code'));
                }
            });
            step = {};
            // 正式数据
            step.code = node.code;
            step.name = node.name;
            step.type = node.type;
            step.next = toQue_1.join(',');
            step.prev = fromQue_1.join(',');
            // 坐标点属性值
            _srroo = {
                opt: node.opt,
                NodeType: node.NodeType,
                textTip: node.textTip
            };
            var nStep = this.onStep(node, step);
            if (nStep) {
                step = nStep;
            }
        }
        return {
            step: step,
            _srroo: _srroo
        };
    };
    /**
     * 保存，且获取数据
     *
     * @memberof WorkerEditor
     */
    WorkerEditor.prototype.save = function () {
        var _this = this;
        var stepStru = [], nodeSrroo = {}, line = {}, text = {}, _srroo = {};
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (code, node) {
            var stepData = _this.step(node);
            stepStru.push(stepData.step);
            nodeSrroo[code] = stepData._srroo;
        });
        // 连线
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.connDick, function (cd, ist) {
            line[cd] = {
                data: ist.data(),
                NodeType: ist.NodeType,
                opt: ist.opt,
                textTip: ist.textTip
            };
        });
        // 文本
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.textDick, function (cd, ist) {
            text[cd] = {
                data: ist.data(),
                NodeType: ist.NodeType,
                opt: ist.opt,
                textTip: ist.textTip
            };
        });
        _srroo = { node: nodeSrroo, line: line, text: text };
        return {
            step: stepStru,
            _srroo: _srroo
        };
    };
    /**
     * 数据加载
     * @param {any} data
     * @returns
     * @memberof WorkerEditor
     */
    WorkerEditor.prototype.load = function (data) {
        var _this = this;
        var $this = this, lineQue = {};
        var step = data.step, _srroo = data._srroo;
        // 文件加载以后才显示
        var config = this.config, rCodes = config.rCodes || null, bkg = config.bkg || {}, noIcon = 'undefined' == typeof config.icon, icon = config.icon || {};
        // 节点生成复原
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(_srroo.node, function (cd, nd) {
            // 节点生成
            nd.opt.bkg = bkg.urunNd || '#CDC5BF';
            nd.opt.bkgTxt = bkg.urunTxt || '#000000';
            var $node = _this.ndMer.make(nd.NodeType, nd.opt)
                .creator();
            // 禁止拖动     
            if (!config.disDragble) {
                $node.moveable({
                    beforeMv: function (node) {
                        if ($this.previewMk) {
                            return false;
                        }
                    },
                    afterUpd: function (x, y, node) {
                        $this._lineMoveSync(x, y, node);
                        // 图标处理，存在图片同步移动
                        var icon = $node.tRElem['icon'];
                        if (icon) {
                            var iconP = $node.getIconP();
                            icon.attr({
                                x: iconP.x,
                                y: iconP.y
                            });
                        }
                    }
                });
            }
            // 保存到字典中
            $node.data('_code', cd);
            // 悬停提示
            $node.textTip = nd.textTip || null;
            _this._nodeBindEvt($node);
            $this.nodeDick[cd] = $node;
        });
        // 连线生成处理
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(_srroo.line, function (cd, ln) {
            var _data = ln.data;
            var $ln = _this.ndMer.make(ln.NodeType, ln.opt)
                .creator();
            // 禁止拖动     
            if (!config.disDragble) {
                $ln.moveable({
                    beforeMv: function (node) {
                        if ($this.previewMk) {
                            return false;
                        }
                    },
                    afterUpd: function (x, y, node) {
                        $this._lineMoveSync(x, y, node);
                    }
                });
            }
            $ln.data('_code', cd);
            $ln.data(_data);
            var fCode = _data.from_code, tCode = _data.to_code;
            var fIst = _this.nodeDick[fCode], tIst = _this.nodeDick[tCode];
            _this._lineBindEvt($ln);
            _this.connDick[cd] = $ln;
            if (fIst) { // 起点
                fIst.line(cd);
            }
            if (tIst) { // 终点
                tIst.line(cd, true);
            }
            // 悬停提示
            $ln.textTip = ln.textTip || null;
        });
        // 文本生成
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(_srroo.text, function (cd, dd) {
            var _data = dd.data;
            var $ist = _this.ndMer.make(dd.NodeType, dd.opt)
                .creator();
            // 禁止拖动     
            if (!config.disDragble) {
                $ist.moveable({
                    beforeMv: function (node) {
                        if ($this.previewMk) {
                            return false;
                        }
                    },
                    afterUpd: function (x, y, node) {
                        $this._lineMoveSync(x, y, node);
                    }
                });
            }
            $ist.data('_code', cd);
            $ist.data(_data);
            _this._nodeBindEvt($ist);
            _this.textDick[cd] = $ist;
            // 悬停提示
            $ist.textTip = dd.textTip || null;
        });
        // 自动撑高
        if (!config.closeSize) {
            this.autoSize();
        }
        // 禁止状态渲染
        if (!config.disSR) {
            this.stateRender();
        }
        return this;
    };
    /**
     * 状态渲染
     */
    WorkerEditor.prototype.stateRender = function () {
        var _this = this;
        var config = this.config, rCodes = config.rCodes, $this = this;
        // 运行状态
        if (rCodes) {
            var bkg = config.bkg || {}, urunNd = bkg.urunNd || '#CDC5BF', urunTxt = bkg.urunNd || '#000000', runningNd_1 = bkg.runningNd || '#0000FF', runningTxt_1 = bkg.runningTxt || '#FFFFFF', ranNd_1 = bkg.ranNd || '#32CD32', ranTxt_1 = bkg.ranTxt || '#FFFFFF';
            var noIcon_1 = 'undefined' == typeof config.icon, icon = config.icon || {};
            // 字符串转数组类型
            if ('object' != typeof rCodes) {
                if (rCodes.indexOf(',') > -1) {
                    rCodes = rCodes.replace(/\s/g, '');
                    rCodes = rCodes.split(',');
                }
                else {
                    rCodes = [rCodes];
                }
            }
            // 生成图标
            var iconState_1 = icon.state || {};
            var createIconFn_1 = function (iconSrc, node) {
                if (noIcon_1) {
                    return;
                }
                var iconP = node.getIconP();
                if (iconP) {
                    var rect = 10;
                    node.tRElem['icon'] = _this.paper.image(iconSrc, iconP.x, iconP.y, rect, rect);
                }
            };
            // 变量连线，用于连线渲染
            var conRendMap_1 = {};
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.connDick, function (cd, ist) {
                var cData = ist.data(), from_code = cData.from_code, to_code = cData.to_code;
                if (!from_code || !to_code) {
                    return;
                }
                var crmKey = from_code + "_" + to_code;
                conRendMap_1[crmKey] = cd;
            });
            // console.log(conRendMap);
            // 渲染处理
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(rCodes, function (i, cd) {
                // 正在运行
                var isRunningMk = false;
                if (cd.indexOf('*') > -1) {
                    cd = cd.replace('*', '');
                    isRunningMk = true;
                }
                var node = _this.nodeDick[cd];
                if (!node) {
                    return;
                }
                // 节点渲染
                if (isRunningMk) { // 正在运行
                    node.data('state', 'isRunning');
                    node.opt.bkg = runningNd_1;
                    node.opt.bkgTxt = runningTxt_1;
                    node.background(['node', 'text']);
                    createIconFn_1(iconState_1.ran || 'state_ran.png', node);
                }
                else { // 已经运行
                    node.data('state', 'isRan');
                    node.opt.bkg = ranNd_1;
                    node.opt.bkgTxt = ranTxt_1;
                    node.background(['node', 'text']);
                    createIconFn_1(iconState_1.ran || 'state_ran.png', node);
                }
                // 徽标
                var iconImg = node.tRElem['icon'];
                if (iconImg) {
                    iconImg.hover(function () {
                        // f_in
                        var state = node.data('state');
                        var title = '';
                        switch (state) {
                            case 'isRan':
                                title = '已经运行';
                                break;
                            case 'isRunning':
                                title = '正在运行中';
                                break;
                        }
                        var offset = $this.getDomOffset();
                        $this.tooltip(title, this.attr('x') + offset.left + 20, this.attr('y') + offset.top + 2);
                    }, function () {
                        $this.tooltip('');
                    });
                }
                // 连线渲染
                var crmKey2 = i > 0 ? rCodes[i - 1] + "_" + cd : null, lnCd, lnIst;
                if (crmKey2 && (lnCd = conRendMap_1[crmKey2]) && (lnIst = _this.connDick[lnCd])) {
                    var bkgCol = isRunningMk ? runningNd_1 : ranNd_1;
                    lnIst.opt.bkg = bkgCol;
                    lnIst.c.attr('stroke', bkgCol);
                    // 箭头，箭体颜色一致性变化
                    if (lnIst.inlineEle) {
                        lnIst.inlineEle.attr('stroke', bkgCol);
                        lnIst.inlineEle.attr('fill', bkgCol);
                    }
                    // 直线箭体颜色
                    if ('ln' == lnIst.NodeType) {
                        lnIst.c.attr('fill', bkgCol);
                    }
                }
            });
        }
        return this;
    };
    /**
     * 移除临时节点
     * @param {string|array} value
     */
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
     * 通过点坐标计算相碰撞的元素
     */
    WorkerEditor.prototype.collisionByP = function (x, y) {
        var tmpNode;
        // 点坐标自动转换
        if ('object' == typeof x) {
            var nX = x.x, nY = x.y;
            x = nX;
            y = nY;
        }
        if (x && y) {
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (index, nd) {
                var boxdt = nd.getBBox(), attr = boxdt.attr, ps = boxdt.ps, width = attr.width, height = attr.height, x1 = attr.x, y1 = attr.y;
                if ((x >= x1 && x <= x1 + width) &&
                    (y >= y1 && y <= y1 + height)) {
                    tmpNode = nd;
                    return false;
                }
            });
        }
        return tmpNode;
    };
    /**
     * 预览，启动预览
     * @param disable 是否禁止
     */
    WorkerEditor.prototype.preview = function (disable) {
        if (disable) {
            if (this.toolbarCtrl) {
                this.toolbarCtrl.show();
            }
            this.previewMk = false;
        }
        else {
            // 隐藏工具栏
            if (this.toolbarCtrl) {
                this.toolbarCtrl.hide();
            }
            this.previewMk = true;
        }
    };
    /**
     * 悬停提示
     * @param text
     * @param x
     * @param y
     */
    WorkerEditor.prototype.tooltip = function (text, x, y) {
        var ctrl = $('.flowts-tip');
        if (!text) {
            if (ctrl.length > 0) {
                ctrl.hide();
            }
            return;
        }
        if (ctrl.length == 0) {
            ctrl = $('<div class="flowts-tip"></div>');
            $('body').append(ctrl);
        }
        ctrl.show();
        ctrl.html(text);
        if (x && y) {
            ctrl.css({
                top: y,
                left: x
            });
        }
    };
    /**
     * dom 坐标地址
     */
    WorkerEditor.prototype.getDomOffset = function () {
        var dom = this.config.dom;
        return {
            left: dom[0].offsetLeft,
            top: dom[0].offsetTop
        };
    };
    /**
     * 操作助手事件
     */
    WorkerEditor.prototype.operHelpEvts = function () {
        var config = this.config, dom = config.dom, $this = this;
        // tabindex ="0" 是元素可以聚焦，outline 取消边框
        dom.attr('tabindex', '0')
            .css({ 'outline': 'none' });
        dom.off('keydown').on('keydown', function (evt) {
            var code = evt.keyCode;
            // console.log(code)
            // shift + 
            if (evt.shiftKey) {
                // 基本操作
                if (68 == code) { // shift + D	删除当前的选择节点
                    $this.remove();
                }
                else if (84 == code) { // shitf + T tab 循环
                    $this.tab();
                }
                else if (67 == code) { // shift + C tab 循环 conn
                    $this.tab('c');
                }
                else if (76 == code) { // shift + L tab 循环 text/lable
                    $this.tab('t');
                }
                else if (65 == code) { // shift + A 全选择
                    $this.allSelect();
                }
                else if (82 == code) { // shift + R 删除
                    $this.allRemove();
                }
                else if (86 == code) { // shitf + v 克隆
                    $this.clone();
                }
                // 移动，方向移动：缩放
                else if ($.inArray(code, [38, 40, 37, 39, 107, 109]) > -1) {
                    var nodeSelEd = $this.select();
                    if (nodeSelEd) {
                        switch (code) {
                            case 38:
                                nodeSelEd.move2T();
                                break;
                            case 40:
                                nodeSelEd.move2B();
                                break;
                            case 37:
                                nodeSelEd.move2L();
                                break;
                            case 39:
                                nodeSelEd.move2R();
                                break;
                            case 107:
                                nodeSelEd.zoomOut();
                                break;
                            case 109:
                                nodeSelEd.zoomIn();
                                break;
                        }
                    }
                }
                else {
                    // 键盘
                    if (config.onKeydown && 'function' == typeof config.onKeydown) {
                        config.onKeydown(code, $this);
                    }
                }
            }
        });
    };
    /**
     * 错误连线
     * @param {boolean} noClear
     */
    WorkerEditor.prototype.errorLine = function (noClear) {
        var hasErr = false;
        if (!noClear) {
            this.removeAllSeled();
        }
        var cRecordM = {}; // 节点连线记录
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.connDick, function (code, node) {
            var data = node.data(), to_code = data.to_code, from_code = data.from_code;
            if (!to_code || !from_code) {
                node.select();
                hasErr = true;
            }
            else {
                // 重复的连线
                var key = from_code + "__" + to_code;
                if (cRecordM[key]) {
                    node.select();
                    hasErr = true;
                }
                else {
                    cRecordM[key] = true;
                }
            }
        });
        return hasErr;
    };
    /**
     * 获取的节点
     * @param {boolean} noClear
     */
    WorkerEditor.prototype.errorNode = function (noClear) {
        var _this = this;
        var hasErr = false;
        if (!noClear) {
            this.removeAllSeled();
        }
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (code, node) {
            var type = node.type;
            // 不是开始或者结束
            if (1 != type && 9 != type) {
                var data = _this.step(node), step = data.step;
                if (!step.next || !step.prev) {
                    node.select();
                    hasErr = true;
                }
            }
        });
        return hasErr;
    };
    /**
     * 显示所有错误
     */
    WorkerEditor.prototype.error = function () {
        var hasErr = false;
        this.removeAllSeled();
        hasErr = this.errorLine(true);
        var hasErr2 = this.errorNode(true);
        hasErr = hasErr ? hasErr : hasErr2;
        return hasErr;
    };
    Object.defineProperty(WorkerEditor.prototype, "maxHw", {
        /**
         * 获取节点最大的宽度
         */
        get: function () {
            var m = { h: 0, w: 0 };
            // 节点扫描
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.nodeDick, function (k, nd) {
                var box = nd.getBBox(), attr = box.attr, y = attr.y + attr.height, x = attr.x + attr.width;
                if (y > m.h) {
                    m.h = y;
                }
                if (x > m.w) {
                    m.w = x;
                }
            });
            // 文本扫描
            __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(this.textDick, function (k, nd) {
                var box = nd.getBBox(), attr = box.attr, y = attr.y + attr.height, x = attr.x + attr.width;
                if (y > m.h) {
                    m.h = y;
                }
                if (x > m.w) {
                    m.w = x;
                }
            });
            return m;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 尺寸自适应，为弥补不同画布之间尺寸不一致
     * @memberof WorkerEditor
     */
    WorkerEditor.prototype.autoSize = function () {
        var hw = this.maxHw, $svg = this.config.dom.find('svg'), cW = $svg.attr('width'), cH = $svg.attr('height'), dt = 5;
        var tSvg = this.config.dom.find('svg');
        if (cW < hw.w) {
            $svg.attr('width', hw.w + dt);
        }
        if (cH < hw.h) {
            $svg.attr('height', hw.h + dt);
        }
    };
    /**
     * 双击事件
     * @param node
     */
    WorkerEditor.prototype.onDbClick = function (node) { };
    /**
     * 点击事件
     * @param node
     */
    WorkerEditor.prototype.onClick = function (node) { };
    /**
     * 节点保存时处理事件
     * @param node
     * @return {object|null} 返回值时可以覆盖参数
     */
    WorkerEditor.prototype.onStep = function (node, data) {
        return data;
    };
    // 静态属性
    WorkerEditor.version = __WEBPACK_IMPORTED_MODULE_1__version__["a" /* LibVersion */];
    return WorkerEditor;
}());
/* harmony default export */ __webpack_exports__["a"] = (WorkerEditor);


/***/ }),
/* 8 */
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

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(9)))

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LibVersion; });
var LibVersion = { "version": "2.2.7", "release": "20180522", "author": "Joshua Conero", "name": "zmapp-workflow-ts" };


/***/ }),
/* 11 */
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
        this.opt.bkg = this.opt.bkg || '#851E07';
        var opt = this.opt;
        this.c = this.paper.ellipse(opt.cx, opt.cy, opt.w / 2, opt.h / 2);
        this.c.attr('fill', opt.bkg);
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
        this.updTextAttr(nOpt.text); // 文字
        this.onSize();
        return this;
    };
    return NodeBegin;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeBegin);


/***/ }),
/* 12 */
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
        this.opt.bkg = this.opt.bkg || '#88EEEA';
        var attr = this.opt2Attr(), opt = this.opt, bkg = opt.bkg;
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
        this.updTextAttr(nOpt.text); // 文字
        this.onSize();
        return this;
    };
    /**
     * 获取 icon 坐标地址
     */
    NodeTask.prototype.getIconP = function () {
        var p, _a = this.opt, cx = _a.cx, cy = _a.cy, w = _a.w, h = _a.h;
        var d = 2;
        var x = cx - w / 2 + d, y = cy - h / 2 + d;
        p = { x: x, y: y };
        return p;
    };
    return NodeTask;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeTask);


/***/ }),
/* 13 */
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
        this.opt.bkg = this.opt.bkg || '#88EEEA';
        var pQue = this.opt2Attr(), nOpt = this.opt;
        this.c = this.paper.path(this._ps2Path(pQue, true));
        this.c.attr('fill', nOpt.bkg);
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
        this.updTextAttr(nOpt.text); // 文字        
        this.onSize();
        return this;
    };
    return NodeAudit;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeAudit);


/***/ }),
/* 14 */
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
        this.opt.bkg = this.opt.bkg || '#88EEEA';
        var pQue = this.opt2Attr(), opt = this.opt, bkg = opt.bkg;
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
        this.updTextAttr(nOpt.text); // 文字
        this.onSize();
        return this;
    };
    return NodeSign;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeSign);


/***/ }),
/* 15 */
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
        this.opt.bkg = this.opt.bkg || '#88EEEA';
        var pQue = this.opt2Attr(), opt = this.opt;
        this.c = this.paper.path(this._ps2Path(pQue, true));
        this.c.attr('fill', opt.bkg);
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
        this.updTextAttr(nOpt.text); // 文字
        this.onSize();
        return this;
    };
    return NodeCond;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeCond);


/***/ }),
/* 16 */
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
        this.opt.bkg = this.opt.bkg || '#88EEEA';
        var _a = this.opt2Attr(), cAttr = _a.cAttr, lLine = _a.lLine, rLine = _a.rLine, opt = this.opt, bkg = opt.bkg;
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
        this.updTextAttr(nOpt.text); // 文字
        this.onSize();
        return this;
    };
    return NodeSubFlow;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeSubFlow);


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
        this.opt.bkg = this.opt.bkg || '#88EEEA';
        var attrs = this.opt2Attr(), opt = this.opt, bkg = opt.bkg;
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
        this.onSize();
        return this;
    };
    return NodeParallel;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeParallel);


/***/ }),
/* 18 */
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
        this.opt.bkg = this.opt.bkg || '#88EEEA';
        var attrs = this.opt2Attr(), opt = this.opt, bkg = opt.bkg;
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
        this.onSize();
        return this;
    };
    return NodeMerge;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeMerge);


/***/ }),
/* 19 */
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
        this.opt.bkg = this.opt.bkg || '#2EF25F';
        var opt = this.opt;
        this.c = this.paper.ellipse(opt.cx, opt.cy, opt.w / 2, opt.h / 2);
        this.c.attr('fill', this.opt.bkg);
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
        this.updTextAttr(nOpt.text); // 文字
        this.onSize();
        return this;
    };
    return NodeEnd;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeEnd);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(1);
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
        this.opt.bkg = this.opt.bkg || 'rgb(3, 84, 41)';
        var opt = this.opt, bkg = opt.bkg;
        this.c = this.paper.path(this._ps2Path(this.opt2Attr()))
            .attr('stroke-width', '2px')
            .attr('fill', this.opt.bkg)
            .attr('stroke', this.opt.bkg);
    };
    /**
     * 生成器 nOpt: {P1: rSu.P, P2: rSu.P, r?: number}
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
    /**
     * 特殊的连接方式
     */
    NodeLn.prototype.select = function () {
        var _this = this;
        var fP = this.getFocusPoint();
        this.removeBox();
        this.isSelEd = true;
        __WEBPACK_IMPORTED_MODULE_1__util__["a" /* Util */].each(fP, function (k, p) {
            var tPIst = _this.paper.circle(p.x, p.y, 3)
                .attr('fill', _this.feature('focusPBkg', null, '#990000'))
                .data('pcode', _this.code)
                .data('posi', k);
            _this.tRElem['__p' + k] = tPIst;
            _this.onCreateBoxPnt(_this.tRElem['__p' + k]);
        });
        return this;
    };
    /**
     * 获取聚焦点
     * f/m/t
     */
    NodeLn.prototype.getFocusPoint = function () {
        var _a = this.opt, P1 = _a.P1, P2 = _a.P2, len = this.getPLen(P1, P2), tP = this.c.getPointAtLength(len / 2);
        return {
            f: P1,
            m: { x: tP.x, y: tP.y },
            t: P2
        };
    };
    return NodeLn;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeLn);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NodeUtil__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(1);
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
        this.opt.bkg = this.opt.bkg || 'rgb(3, 84, 41)';
        var opt = this.opt, bkg = opt.bkg, _a = this.opt2Attr(), pQue = _a.pQue, arrowPs = _a.arrowPs;
        var sWd = '2px';
        this.c = this.paper.path(this._ps2Path(pQue))
            .attr('stroke-width', sWd)
            .attr('stroke', this.opt.bkg);
        // console.log(pQue, arrowPs)
        this.inlineEle = this.paper.path(this._ps2Path(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].jsonValues(arrowPs)));
        this.inlineEle
            .attr('fill', this.opt.bkg)
            .attr('stroke', this.opt.bkg)
            .attr('stroke-width', sWd);
    };
    /**
     * 选项转属性
     * @param nOpt
     */
    NodeLnPoly.prototype.opt2Attr = function (nOpt) {
        var pQue = [];
        var opt = nOpt ? nOpt : this.opt, P1 = opt.P1, P2 = opt.P2, l = this.getLen(), rX = opt.rX || 0.35, r = opt.r || (l * (1 - rX) * 0.2), MPs = opt.MPs || [];
        pQue = [P1]; // 起点
        // 中间点计算
        if (MPs.length > 0) { // 使用默认的点列
            // 起点与第一个相邻点非折线时，纠正
            if (MPs[0].x != P1.x && MPs[0].y != P1.y) {
                var p1Ng = this.getMiddP(P1, MPs[0]);
                MPs = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].MergeArr([p1Ng], MPs);
            }
            // 起点与第一个相邻点非折线时，纠正
            var last = MPs.length - 1;
            if (MPs[last].x != P2.x && MPs[last].y != P2.y) {
                var p2Ng = this.getMiddP(MPs[last], P2);
                MPs = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].MergeArr(MPs, [p2Ng]);
            }
            pQue = pQue.concat(MPs);
            this.opt.MPs = MPs;
        }
        else {
            var x1 = P1.x, y1 = P1.y, x2 = P2.x, y2 = P2.y;
            var delMps = this.getMiddP(P1, P2);
            if (delMps) {
                MPs.push(delMps);
                pQue.push(delMps);
                this.opt.MPs = MPs;
            }
        }
        pQue.push(P2); // 终点
        // 箭头坐标
        var arrowPs = {};
        if (pQue.length > 1) {
            var pQLen = pQue.length - 1;
            arrowPs = __WEBPACK_IMPORTED_MODULE_1__NodeUtil__["a" /* default */].ps2arrow(pQue[pQLen - 1], pQue[pQLen], r);
        }
        return { pQue: pQue, arrowPs: arrowPs };
    };
    /**
     * 获取中间点
     * @param P0
     * @param P1
     */
    NodeLnPoly.prototype.getMiddP = function (P0, P1) {
        var p;
        if (P0.x != P1.x && P0.y != P1.y) {
            p = { x: P0.x, y: P1.y };
        }
        return p;
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
        var _a = this.opt2Attr(), pQue = _a.pQue, arrowPs = _a.arrowPs;
        this.c.attr('path', this._ps2PathAttr(pQue));
        this.inlineEle.attr('path', this._ps2PathAttr(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].jsonValues(arrowPs)));
        return this;
    };
    /**
     * 特殊的连接方式
     */
    NodeLnPoly.prototype.select = function () {
        var _this = this;
        var fP = this.getFocusPoint();
        this.removeBox();
        this.isSelEd = true;
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(fP, function (k, p) {
            var tPIst = _this.paper.circle(p.x, p.y, 3)
                .attr('fill', _this.feature('focusPBkg', null, '#990000'))
                .data('pcode', _this.code)
                .data('posi', k);
            _this.tRElem['__p' + k] = tPIst;
            _this.onCreateBoxPnt(_this.tRElem['__p' + k]);
        });
        return this;
    };
    /**
     * 获取聚焦点
     * f/m/t
     */
    NodeLnPoly.prototype.getFocusPoint = function () {
        this._mpsMerge();
        var _a = this.opt, P1 = _a.P1, P2 = _a.P2, MPs = this.opt.MPs || [];
        var psMap = {
            f: P1
        };
        // 个数统计
        var num = 0;
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(MPs, function (k, p) {
            var kStr = 'm' + k;
            psMap[kStr] = p;
            num = k;
        });
        psMap.t = P2;
        // 中间点        
        var psValue = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].jsonValues(psMap), psCtt = psValue.length, // 节点统计个数
        fPsDick = {}; // 聚焦点坐标字典
        var fIdx = -1; // 聚焦点索引
        for (var i = 0; i < psCtt - 1; i++) {
            num += 1;
            var kStr = 'm' + num, pV1 = psValue[i], pV2 = psValue[i + 1];
            fIdx += 1;
            fPsDick['f' + fIdx] = pV1;
            fIdx += 1; // 中间点 ~ 中点坐标公式
            fPsDick['f' + fIdx] = __WEBPACK_IMPORTED_MODULE_1__NodeUtil__["a" /* default */].middP(pV1, pV2);
        }
        fIdx += 1;
        fPsDick['f' + fIdx] = psValue[psCtt - 1];
        return fPsDick;
    };
    /**
     * 2018年5月12日 星期六: 左右相等检测法
     * 中间点合并
     */
    NodeLnPoly.prototype._mpsMerge = function () {
        var opt = this.opt, MPs = opt.MPs, nMPs = [], dt = 1;
        var MPsLen = MPs.length;
        __WEBPACK_IMPORTED_MODULE_2__util__["a" /* Util */].each(MPs, function (i, p) {
            var afterP = i == 0 ? opt.P1 : MPs[i - 1];
            var nextP = i == MPsLen - 1 ? opt.P2 : MPs[i + 1];
            // 左右相等检测是否坐标同直线
            if ((Math.abs(afterP.x - p.x) <= dt && Math.abs(nextP.x - p.x) <= dt) ||
                (Math.abs(afterP.y - p.y) <= dt && Math.abs(nextP.y - p.y) <= dt)) {
                return;
            }
            nMPs.push(p);
        });
        this.updAttr({
            MPs: nMPs
        });
    };
    /**
     * 端点移动
     * @param {rSu.P} p 移动的节点
     * @param {bool} isEnd 是否为终点
     */
    NodeLnPoly.prototype.mvEndPoint = function (p, isEnd) {
        var tP;
        var pathArr = this.c.attr('path'), opt = this.opt;
        if (isEnd) { // 终点
            var pA0 = pathArr[pathArr.length - 2], p0 = {
                x: pA0[1],
                y: pA0[2]
            };
            tP = this.getMiddP(p0, opt.P2);
            if (tP) {
                opt.MPs = opt.MPs ? opt.MPs : [];
                if (opt.MPs.length > 0) {
                    opt.MPs[opt.MPs.length - 1] = tP;
                }
            }
            else {
                opt.MPs = [];
            }
            opt.P2 = p;
        }
        else { // 起点
            var pA0 = pathArr[1], p0 = {
                x: pA0[1],
                y: pA0[2]
            };
            tP = this.getMiddP(opt.P1, p0);
            if (tP) {
                opt.MPs = opt.MPs ? opt.MPs : [];
                if (opt.MPs.length > 0) {
                    opt.MPs[0] = tP;
                }
            }
            else {
                opt.MPs = [];
            }
            opt.P1 = p;
        }
        this.updAttr(opt);
    };
    return NodeLnPoly;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeLnPoly);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NodeAbstract__ = __webpack_require__(0);
/**
 * 2018年4月19日 星期四
 * 文本节点
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

var NodeText = /** @class */ (function (_super) {
    __extends(NodeText, _super);
    function NodeText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeText.prototype._onInit = function () {
        this.NodeType = 'text';
    };
    NodeText.prototype._whenCreatorEvt = function () {
        var opt = this.opt, cx = opt.cx, cy = opt.cy, text = opt.text;
        this.c = this.paper.text(cx, cy, text);
    };
    /**
     * 更新属性
     * @param nOpt
     */
    NodeText.prototype.updAttr = function (nOpt) {
        this._updAttr(nOpt);
        var opt = this.opt;
        this.c.attr({
            x: opt.cx,
            y: opt.cy,
            text: opt.text
        });
        return this;
    };
    return NodeText;
}(__WEBPACK_IMPORTED_MODULE_0__NodeAbstract__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = (NodeText);


/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = LnPolyConn;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_NodeUtil__ = __webpack_require__(2);
/**
 * 折线连线处理算法，函数
 */

/**
 * 内部私有类，用于数据处理
 * 2018年5月22日 星期二
 */
var cSR = /** @class */ (function () {
    function cSR() {
    }
    /**
     * 代理节点连接点
     * @param nd 节点
     * @param posi 位置
     * @param opt 选项 {dn: number, box: rSu.BoxAttr}
     */
    cSR.agentNodeCnP = function (nd, posi, opt) {
        opt = 'object' == typeof opt ? opt : {};
        var p, dtNum = opt.dn || 20 // 相差值
        , box = opt.box || nd.getBBox(), ps = box.ps, tP;
        switch (posi) {
            case 'b': // 正上
                tP = ps.b;
                p = { x: tP.x, y: tP.y - dtNum };
                break;
            case 'd': // 正右
                tP = ps.d;
                p = { x: tP.x + dtNum, y: tP.y };
                break;
            case 'f': // 正下
                tP = ps.f;
                p = { x: tP.x, y: tP.y + dtNum };
                break;
            case 'h': // 正左
                tP = ps.h;
                p = { x: tP.x - dtNum, y: tP.y };
                break;
        }
        return p;
    };
    return cSR;
}());
/**
 * @export
 * @param {rSu.Node} ln
 * @param {rSu.WEditor} work
 * @param {rSu.Node} [tNd]
 */
function LnPolyConn(ln, work, tNd) {
    var data = ln.data(), from_code = data.from_code, to_code = data.to_code, fPosi = data.from_posi, tPosi = data.to_posi;
    // 没有终点节点，自动从连线中获取
    if (!tNd) {
        tNd = work.nodeDick[to_code];
    }
    var fNd = work.nodeDick[from_code];
    if (tNd && tNd.code == fNd.code) { // 自身连接
        var AncpOpt = {
            box: fNd.getBBox()
        };
        var ap1 = cSR.agentNodeCnP(fNd, fPosi, AncpOpt), ap2 = cSR.agentNodeCnP(fNd, tPosi, AncpOpt);
        var apMd = void 0;
        // = (ap1 && ap2)? NodeUtil.polyP(ap1, ap2, 'ua') : null
        if ((fPosi == 'f' && (tPosi == 'd' || tPosi == 'h'))
            || (fPosi == 'b' && (tPosi == 'h' || tPosi == 'd'))) {
            // 上角拐
            apMd = __WEBPACK_IMPORTED_MODULE_0__node_NodeUtil__["a" /* default */].polyP(ap1, ap2, 'ua');
        }
        else if (((fPosi == 'h' || fPosi == 'd') && tPosi == 'f')
        // || (fPosi == 'b' && (tPosi == 'h' || tPosi == 'd'))
        ) {
            // 下角拐
            apMd = __WEBPACK_IMPORTED_MODULE_0__node_NodeUtil__["a" /* default */].polyP(ap1, ap2, 'la');
        }
        // console.log(ap1, apMd, ap2);
        if (apMd) {
            ln.updAttr({
                MPs: [ap1, apMd, ap2]
            });
        }
    }
    else if (tNd) {
        var fNd_1 = work.nodeDick[from_code], P1 = ln.opt.P1, // 连线起点
        P2 = ln.opt.P2, // 连接终点
        fOpt = fNd_1.opt, tOpt = tNd.opt, dtX = 10, // X 轴偏差
        dtY = 10, // Y 轴偏差
        MPs = [], tx = void 0, ty = void 0;
        // console.log(tPosi, fPosi)
        // 侧面连接线
        if ('d' == fPosi || 'h' == fPosi) {
            // 同X轴
            if (Math.abs(fOpt.cx - tOpt.cx) <= dtX) {
                // console.log(fPosi, tPosi)
                // 同向
                var _dx = ('d' == fPosi ? 1 : -1) * (dtX + 20);
                if (fPosi == tPosi) {
                    tx = P1.x + _dx;
                    MPs.push({ x: tx, y: P1.y }, { x: tx, y: P2.y });
                    ln.updAttr({
                        P2: P2,
                        MPs: MPs
                    });
                }
            }
            // 数据接入点
            else if ('b' == tPosi) {
                var p = __WEBPACK_IMPORTED_MODULE_0__node_NodeUtil__["a" /* default */].polyP(P1, P2, 'ua');
                if (p) {
                    MPs.push(p);
                    ln.updAttr({
                        P2: P2,
                        MPs: MPs
                    });
                }
            }
            // 终点结与侧边
            else if ('d' == fPosi || 'h' == fPosi) {
                var _dx = (('d' == tPosi) ? 1 : -1) * (dtX + 20), pE = { x: P2.x + _dx, y: P2.y }, p = __WEBPACK_IMPORTED_MODULE_0__node_NodeUtil__["a" /* default */].polyP(P1, pE, 'ua');
                if (p) {
                    MPs.push(p, pE);
                    ln.updAttr({
                        P2: P2,
                        MPs: MPs
                    });
                }
            }
        }
    }
}


/***/ })
/******/ ]);