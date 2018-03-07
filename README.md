# zmapp-workflow (工作流)
- 2018年1月4日 星期四
- Joshua Conero

## 基于jQuery/Raphael 库
> 矢量图处理库


## src
- 基本文件介绍
    - flow.js   工作流容器生成算法，可迁移至其他的项目中
    - worker.js 实际工作流的相关控制，与业务紧密联系
        - WorkerEditor.js 轻量级工作流编辑器
    - util.js 内部项目使用的助手函数

### worker
```javascript
// 配置信息
var config = {
    w: '宽度*'
    h: '高度*'
    x: '起点坐标 +'
    y: '起点坐标 +'
    line: 'arrow'   // 箭头类型，默认为直线
    arrowLen: 'Number 箭头侧长，默认 4 '
    dH: 'Number 间距高度'
    cH: '容器高度'
    rightAngle: 'boolean 直角转算法 默认 true'    
    bkgNodeBox: '编辑底色，bkg-node-box'
    bkgStartCol: '起始节点'
    bkgOperCol: '操作节点'
    bkgJudgeCol: '判断节点'
    bkgEndCol: '结束节点'
    bkgRunedCol:'已经执行的节点底色'
    bkgLineCol: '连线底色'
    currentCode: '当前项目节点',
    sColumnMk: 'boolean true/false， false 根据高度，自动分列(最多3列)'
}

// 数据流程配置
var option = {
    step:[
        // 步骤流
        {
            prev: ''        // 用于实现正向流
            next: ''        // 用于实现逆向箭头
        }
    ]
}
```



worker.js 内联数据对象
```javascript
{
    CodeNodeMaps: {}    // 代码节点搜索字典
    clsMap:{}           // 级别索引字典
}
```

#### WorkerEditor 工作流编辑器

> 用于维护工作流的结构图形， 可新增、编辑流程图

- WorkerEditor 实例化
```javascript
    // config json 配置项
    worker.editor({
        dom: 'string|jquery',
        pkgClr: {   // 背景颜色
            start: 'rgb(181, 216, 126)',
            opera: 'rgb(224, 223, 226)',
            judge: 'rgb(49, 174, 196)',
            end: 'rgb(34, 185, 41)',
            NodeBox: '节点外部边界, rgb(15, 13, 105)'
        },
        // 监听事件
        listener: {}
    })
```
- toolbar 工具栏
    - start 开始
    - opera 流程
    - judge 判断
    - end 结束
    - → 箭头
    - 文本 
- Api
    - removeBBox 删除被选中节点的边框，去除选中
    - removeNode(code)  删除工作中指定的项目节点或者当前选中节点，接收节点id/节点对象
    - getSelected() 获取当前选中节点
    - getFlowStep() 获取工作流中节点步骤数据，用于保存当前的工作流
    - getFlowJson(code) 获取指定节点的json数据对象
- 连线
    - lineQueues 内部缓存器 
- NodeBase 动态属性
    - _IntersectMk  碰撞标识 bool    
    - c
        - data
            - type: 与工作流类型相匹配
- 保存的数据结构
```js
var step = 
[{
    "code" : "",            // RaphaelElement.id
    "name" : "故障填报",     // 文本名称
    "type" : "1 类型",       // 节点类型
    "prev" : "",             // 连线源头
    "next" : "R1",           // 连线终点，支持过节点
    "attr" : [],              // 属性值
    "_struct": {}            // 结构体
}]
```

### tree
```javascript
var option = {
    feature: {} // 特征
    nodes:[{}]  // 节点信息
}
```

### GoJs 节点转换处理器
- 基于 Gojs 的转换器实现
- test/gojs


## flow 节点类型
> 所有节点都由： 容器(container/c), 标签组成(label)
- endpoint  端点
