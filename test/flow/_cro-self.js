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
 * 2018年1月22日 星期一
 * 工作流，部件自回线
 */


$(function(){
    // 有回路线
    function baseT1(){
        var $worker = new __WEBPACK_IMPORTED_MODULE_0__src_worker___default.a({
            dom: '#workflow',
            rightAngle: false,
            // line: 'arrow'
            line: 'bow'
            ,currentCode: 'H1'
            // currentCode: 'H1'
        }, {
            step:[
                {code: 'A', type: 1},
                {code: 'B', type: 2, prev: 'A, G1'},
                {code: 'C', type: 3, prev: 'B'},

                {code: 'D1', type: 2, prev: 'C'},

                {code: 'D2', type: 2, prev: 'C'},
                // {code: 'E2', type: 2, prev: 'D2'},

                {code: 'E1', type: 2, prev: 'D1'},
                {code: 'F1', type: 2, prev: 'E1'},
                {code: 'G1', type: 3, prev: 'F1'},
                {code: 'H1', type: 2, prev: 'G1'},
                {code: 'I1', type: 2, prev: 'H1'},
                {code: 'J1', type: 2, prev: 'I1'},

                {code: 'O1', type: 9, prev: 'J1,D2'}
            ]
        })
    }
    baseT1()
})

/***/ })
/******/ ]);