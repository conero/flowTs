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
    - NodeLnPoly 折线
    - NodeLn 直线

- 节点选择边框点
    - 圆形 circle ， data 参数值包括 {pcode: 节点代码, posi: 连接点位置(a-h)}
- 特征值
    - boxPadding 3  内边距
    
### NodeLn 直线

- 特殊连接点: 三点连线式
    - F/from,M/middle,T/to

- 特征值
```js
{
    focusPBkg: '#990000   聚焦点底色'
}        
```

- 属性参数
```js
{
    P1: {x, y},             // 起点
    P2: {x, y},             // 终点
    r: number,
}
```

### NodeLnPoly 折线
- 特殊连接点
    - F/from, T/to

- 属性参数
```js
{
    P1: {x, y},             // 起点
    P2: {x, y},             // 终点
    MPs: {x, y}[]           // 中间对列表
    r: number,
}    
```

- hover 事件
    - 起点到第二个点之间触发有效，否则无效 [BUG]
     

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
        },
        data: 'obejct'  // 保存的历史数据
        curCode: 'string|string[]'   // 显示当前到的节点代码
    }
```

```js
// config.data 格式
{
    step: []    // 步骤信息
    _srroo: {
        line: {}    // 连接线
    }
}
```
## src/WorkerEditor.ts 编辑器
- 属性说明
    - tmpNodeMap 临时字典
        ```js
        {
            connLnIst: rSu.Node     // 当前正在连接的直线/折线实例， 直线保存起点和终点
                // 节点属性 Node.data => {from_code: '代码', from_posi: '连线的位置', to_code: '终点节点代码', to_posi: '连接点位置' }
        }
        ```

### NodeAbstract
- 边框选择点( ***rSu.Node.select()*** )
    - 特定属性： *** {pcode, posi} ***
- 属性值
    - tRElem
        - 注册用户: 
        ```js
        {
            box:  '边框实例',
            __pa: '边框节点实例 __p{key} '
            mc: '磁性连接点'
        }
        ```    


### RaphaelJs
- 鼠标移入移出检测
    - mouseover/mouseout