## 更新日志


> ***V2.0.x/alpha-date*** alpha 类型模板
- ***V2.0.8/20180331***
    - (优化) WorkerEditor.ts 工作流编辑器
        - 改变原来节点容器，由 ***队里*** 替换为 ***字典*** ，更新容器的操作
        - 优化工具栏事件绑定处理方法
        - (+) 新增方法 ***clone*** 实现对节点的克隆
        - (+) 初步实现节点连接线，直线直接线
        - (+) 新增 ***last*** 方法，获取最新的节点
        - (+) 新增 ***tab*** 方法，实现tab循环
    - (优化) NodeAbstract.ts 抽象节点
        - (+) 新增 ***data*** 数据存储器方法
        - (+) 实现 ***delete*** 节点删除处理
        - (+) 新增 ***move*** 方向性移动方法
        - (+) 实现文本生成算法
        - (+) 实现放大或缩小算法
    - (优化) ToolBar.ts  工具栏
        - 删除 ***连接栏目*** 中 ***tBody*** 属性，用于实现连接线选中切换
    - index.d.ts 
        - ***rSu.Node*** 节点接口信息完善

- ***V2.0.7/20180330***
    - (+) src/ObjX.ts ObjX 做为 Object 类型的扩展，提供函数式简短调用
    - (优化) WorkerEditor.ts 工作流编辑器
        - (+) 新增接口 ***removeAllSeled*** 删除节点选择状态
        - (+) 新增接口 ***allSeled*** 节点全选    
        - 移除 ***Node*** ，引入 ***NodeQue*** 以替换管理
        - 删除 ***v1.1.x*** 版本中遗留代码
        - 经过 ***rSu.ToolBar/工具栏*** 独立化以后，调整界面中程序属性，以及删除类中独立的工具栏生成方法
    - (优化) ToolBar.ts  工具栏
        - (+) 新增方法 ***connSizeNode*** 由于节点收缩引入的位置改变
        - 引入指定 ***配置属性*** 来自 ***WorkerEditor*** 参数中的 config.toolBar 
        - 采用新的算法实现 工具栏，移除原方法 ***_create*** ，使节点可伸缩
        - 工具栏划分为 ***_headBar/头部*** , ***nodeBar/节点*** , ***connBar/连线***
    - (优化) NodeAbstract.ts 抽象节点        
        - (+) select 节点选择，实现节点边框加八点式坐标算法，坐标点用于实现新的连线算法
        - (+) removeBox 移除选中边框
        - (优化) 将节点中普通 ***moveable*** 方式放到该类中统一管理
        - (Future) 实现节点放大/缩小算法 ***zoomOut*** / ***zoomIn***
    - (优化) 节点
        - 删除部分 ***moveable*** 方法，调整 ***updAttr*** 方法统一返回 ***this***
    - index.d.ts 
        - (+) 添加接口 ***rSu.MapRElm*** RaphaelElement  object 对象
        - (+) 添加接口 ***rSu.mapNode*** Node object 对象
        - (+) 添加接口 ***rSu.ObjX*** ObjX object 对象
        - 完善 ***rSu.ToolBar*** 工具栏类属性


- ***V2.0.6/20180329***
    - (+) src/NodeQue.ts 新增 ***节点队列*** 用于管理节点
    - (+) src/ToolBar.ts 新增 ***工具栏*** 生成器
        - 将 工具栏从 WorkerEditor 类中移除，单独管理工具
        - 实现 ***工具栏*** 与 ***连接线*** 区分快，可点击显隐
    - ***NodeAbstract*** 抽象节点实现节点的显示和隐藏函数
    - 移除 v1.1.x 版本中多余的代码： 如 Node 以及测试脚本
    - index.d.ts 添加 NodeQue 和 ToolBar 类结构，以及其他类型优化

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

