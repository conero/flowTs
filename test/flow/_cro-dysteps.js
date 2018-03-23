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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"../../src/worker\"");
/**
 * 2018年1月7日 星期日
 * 步骤动态配置
 */



$(function(){
    var $worker = new __WEBPACK_IMPORTED_MODULE_0__src_worker___default.a({
        dom: '#workflow',
        h: $(window).height() * 6,
        line: 'arrow'
    }, {
        step:[
            {code: 'A', type: 1},
            {code: 'B', type: 2, prev: 'A'},
            {code: 'C', type: 2, prev: 'B'},
            {code: 'D1', type: 2, prev: 'C'},
            {code: 'D2', name: 'D2 并列', type: 2, prev: 'C'},
            {code: 'D3', name: 'D3 并列', type: 2, prev: 'C'},
            {code: 'D4', name: 'D4 并列', type: 2, prev: 'C'},
            {code: 'D5', type: 2, prev: 'C'},
            {code: 'D6', type: 2, prev: 'C'},
            // {code: 'D7', type: 2, prev: 'C,F1'},         // 流程中退回的线条算法
            {code: 'D7', type: 2, prev: 'C'},


            {code: 'E1', type: 2, prev: 'D4'},
            {code: 'E2', type: 2, prev: 'D1'},
            {code: 'E3', type: 2, prev: 'D1'},
            {code: 'E4', type: 2, prev: 'D6'},
            
            {code: 'F1', type: 3, prev: 'E1,E3'},

            {code: 'G1', type: 3, prev: 'F1'},
            {code: 'G2', type: 2, prev: 'F1'},
            {code: 'H1', type: 2, prev: 'G2'},
            
            {code: 'J1', type: 2, prev: 'H1'},
            // 自连接测试 - BUG
            {code: 'J1', type: 2, prev: 'J1'},

            {code: 'K1', type: 2, prev: 'J1'},
            {code: 'O1', type: 9, prev: 'G1,K1,E4'},


        ]
    })
})

/***/ })
/******/ ]);