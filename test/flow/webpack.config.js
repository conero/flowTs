/**
 * 2018年1月4日 星期四
 */

const {Config} = require('../webpack.setup')
module.exports = new Config({
        baseDir: 'flow/'
    })
    .js('editor', 'js/{}editor')   // 编辑器
    .js('melemhtml', 'js/{}melemhtml')   // 编辑器
    .getJsFileList()