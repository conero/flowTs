/**
 * 2018年1月4日 星期四
 */

const {Config} = require('../webpack.setup')
module.exports = new Config({
        baseDir: 'tree/'
    })
    .js('base')
    .getJsFileList()