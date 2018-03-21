/**
 * 2018年1月4日 星期四
 */

const {Config} = require('../webpack.setup')
module.exports = new Config({
        baseDir: 'flow/'
    })
    .js('base')
    .js('line')
    .js('dysteps')
    .js('self')
    .js('editor')   // 编辑器
    .getJsFileList()