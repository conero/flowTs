# transition 过渡计划

## 系统可用节点
- NodeAbstract 抽象节点
    - NodeBegin 开始
    - NodeTask 任务
    - NodeAudit 审核
    - NodeSign 会签
    - NodeCond 条件判断(NodeCondition)
    - NodeSubFlow 子流程
    - NodeParallel 并行
    - NodeMerge 并行
    - NodeEnd 结束
    - NodePolyLn 折线
    - NodeLn 直线
- 节点选择边框点
    - 圆形 circle ， data 参数值包括 {pcode: 节点代码, posi: 连接点位置(a-h)}

## 基本算法或概念
- 基于节点中心点移动算法    

## workerflow 配置参数
```js
    new workerflow(config)
    config = {
        dom: ''
        w: ''
        h: ''
        // 工具栏相关配置
        toolBar: {
            title: 'string  默认: 工具栏',
            aUpSrc: '箭头向下图片地址：默认 arrow_up.png',
            aDownSrc: '箭头向上图片地址：默认 arrow_down.png',
            lnSeledBkg: ' 选择颜色码'
            lnDefBkg: ' 默认颜色码'
        }
    }
```
