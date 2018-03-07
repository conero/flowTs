/**
 * 2018年3月7日 星期三
 * 浏览器端，非 npm 管理引入包
 * Joshua Conero
 */

// Raphael 依赖包 
// import Raphael from 'raphael'
// window.Raphael = Raphael
// require('raphael')
// node_modules/webpack/bin/webpack.js

import Raphael from '../node_modules/raphael/raphael'
import Worker from './worker'


window.Workflow = Worker
