## 更新日志


> ***V2.0.x/alpha-date*** alpha 类型模板
- ***V2.0.5/20180328***
    - WorkerEditor
        - (+) 添加方法 ***newNode*** 实现对节点进行示例化
        - 工具栏实现工具栏拖动，拖动后生成相应的图标
            - [BUG180328001] 拖动时，生产新的节点，但是生成以后拖动事件失效，无法达到 v1.1.x 版本的效果
    - Node/节点
        - path 中原点连接语句采用通用的方法 ***_ps2Path***
        - NodeAnstract
            - (+) 新增方法 *** protected _ps2PathAttr *** 方法，实现与 _ps2Path 对应的节点容器的属性更新器
            - (+) 添加新的方法 ***moveable(实现可拖动)*** , ***updAttr(属性更细)*** , ***delete(珊瑚)*** 公共节点方法
        - 节点实现 ***可拖动*** 算法
            - [BUG180328002] 拖动节点时，为实现简化与原 v1.1.x 版本中代码简化，造成拖动根据绝对地址，遂非全屏是拖动效果与现实不一致
    - Util
        - (+) 添加方法 ***ucFirst*** 实现首字母大小写
    - 依赖
        - tsc @2.7.2 -> 2.8.1
- ***V2.0.4/20180327***
    - 节点
        - NodeAbstract 抽象节点
            - 添加 ***getPLen*** 基础方法
        - 实现支持底色可配置，以及默认添加
        - 实现 ***结束*** , ***直线*** , ***折线*** 生成算法

- ***V2.0.3/20180326***
    - 页面搭建，新增节点类型
        - (+) src/node/NodeAbstract.ts 新增 ***节点*** 抽象基类
            - (+) NodeBegin.ts ***开始*** 实现节点图片绘制算法
            - (+) NodeTask.ts ***任务*** 实现节点图片绘制算法
            - (+) NodeAudit.ts ***审核*** 实现节点图片绘制算法
            - (+) NodeSign.ts ***会签*** 实现节点图片绘制算法
            - (+) NodeCond.ts ***判断*** 实现节点图片绘制算法
            - (+) NodeSubFlow.ts ***子流程*** 实现节点图片绘制算法
            - (+) NodeParallel.ts  ***并行*** 实现节点图片绘制算法
            - (+) NodeMerge.ts ***合并*** 实现节点图片绘制算法
            - (+) 其他节点脚本模板：NodeEnd.ts, NodeLn.ts, NodePolyLn.ts
    - src/WorkerEditor.ts 
        - 搭建和测试 工具栏
    
- ***V2.0.2/20180324***
    - (+) index.d.ts 新增申明文件
        - 删除源代码中重复的类型生成
    - (+) 引入外部类型库 {https://github.com/DefinitelyTyped/DefinitelyTyped 下 types 文件夹}
        - types
            - jquery.ts
            - raphael.ts
    - (-) 删除 src/rSu.d.ts 用 index.d.ts 代替

- ***V2.0.1/20180323***
    - webpack
        - 修改 webpack.config.js 配置文件，用于测试 requirejs(AMD) 文件加载风格
            - [BUG] define 函数导入的文件包默认导出无效 #BUG180323
    - 版本信息 ***version*** ts 化，主文件库中引入版本信息
    - 移除原来非相关的测试文件

- ***V2.0.0/20180322***
    - 使用 typescript 重写代码仓库
        - 修改 tsc 编译器提示的错误
        - 编写 interface 类型
            - Dance 容器布景
            - Flow 流程
            - rSu 
        - 导入外部
            - $
            - jQuery        

