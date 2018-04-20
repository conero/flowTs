/**
 * 节点常量配置
 */
// 1-开始、2-任务、3-判断、4-审核、5-会签、4-并行、5-合并、8-子流程、9-结束
export var cNode: rSu.bsMap = {
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
    text: { // 特殊文本
        type: 9994,
        text: '文本'
    }
}