# 更新日志


## ***V2.0.x/alpha-date*** alpha 类型模板

### ***V2.0.14/20180413***
- src/WorkerEditor.ts
    - ***getSelected*** 方法更名为 ***select*** 
    - ***remove*** 节点删除添加对选中的 ***连线*** 的删除控制
    - 实现连接线选中支持，使连线更加易于选中 ([BUG20180413]折线无效)
- src/node/NodeAbstract.ts
    - 删除与连线先关的旧版冗余程序
- src/node/NodeLnPoly.ts
    - 采用新的节点生成算法，即确定端点，以及默认中间连接点
    - (+) 实现 ***getFocusPoint*** 聚焦点坐标算法以及 ***select*** 尝试
- src/util.ts
    - (+) 新增方法 ***jsonValues*** 实现将json值转数组类型
- (+) 新增类 ***src/node/NodeUtil.ts*** 实现相关点坐标计算方法

### ***V2.0.13/20180412***
- src/WorkerEditor.ts
    - 实现节点连接线与节点同步移动算法
    - (+) 添加对 ***connDick/连接线字典*** 管理的方法，如删除全部连接线的选中特性
    - (+) 添加连接事件绑定方法 ***_lineBindEvt** ， 实现选中连接线端点重复与节点的之间的 ***解绑/绑定*** 算法
- src/node/NodeAbstract.ts 抽象节点
    - (+) 添加 ***feature*** 方法实现对节点特性参数的管理
    - (+) 添加 ***rmLine*** 方法用具解除节点与连线的绑定关系
- src/node/NodeLn.ts
    - (+) 添加 ***getFocusPoint*** 方法用于生成聚焦点坐标
    - (+) 添加 ***select*** 特定的节点选中方法

### ***V2.0.12/20180407***
- src/WorkerEditor.ts
    - (+) 添加方法 ***_lineMoveSync*** 用于节点移动时连线同步移动处理
    - 连线模式下：优化代码，完善代码之间关联属性
- NodeAbstract.ts 抽象节点
    - (优化) ***moveable*** 添加参数 ***data/json*** 用于外部处理节点移动的时间处理
        - 支持参数： data => {afterUpd(x, y)}
            
### ***V2.0.11/20180406***
- src/WorkerEditor.ts
    - (+) 添加属性 ***connDick*** ，以及利用新的序列生成器 ***idxDick***
        - 添加方法 _order 生成有效序列方法
    - (优化) 实现连线的 ***磁化*** 算法，节点采用 八点可连接点
        - 方法节点鼠标事件监测实现磁化，转而运用坐标点计算实现
        - (+) 添加 ***collisionByP*** 方法实现点坐标碰撞计算法则
- NodeAbstract.ts 抽象节点
    - 重构与连接线关联的数据结构
        - (+) 添加 ***line*** 用于配置新结构“线”连接计算
    - 选择边框点从 ***select*** 方法中分离，实现算法独立
        - (+) 添加 ***getBBox*** 方法实现边框数据计算
        - (+) 添加 ***magnCore*** 方法，实现基于 边框计算的节点连接点磁化
    - (+) 添加 ***clearTmpElem*** 方法，用于管理节点内部临时 RaphaelElement
    - (优化) 节点属性 opt 的值，bkg 属性默认更改

### ***V2.0.10/20180405***
- src/WorkerEditor.ts
    - 删除代码中多余的 ***interface***
    - 尝试使用节点的 ***hover*** 事件实现节点磁化处理
    - (+) 新增 ***removeTmpNode*** 方法用于删除内部临时的 ***rSu.Node*** 对象
- NodeAbstract.ts 抽象节点
    - (优化) ***data*** 方法可实现 key 传入空值以获取全部的属性值，方便数据测试
        
### ***V2.0.9/20180401***
- WorkerEditor.ts 工作流编辑器
    - (优化) 工具栏事件绑定时，一旦选中连线则重新生成被选中的节点的边框。使之不同拖动即可进行连线(“消除卡顿”)
    - (优化) 优化使之正在连线的连段仅仅一条，前版本无效
- (优化) NodeAbstract.ts 抽象节点
    - 节点选择边框 ***端点(可连接点)*** 添加 data 属性 *** {pcode: 节点代码, posi: 连接点位置(a-h)} ***
        
### ***V2.0.8/20180331***
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

### ***V2.0.7/20180330***
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


### ***V2.0.6/20180329***
- (+) src/NodeQue.ts 新增 ***节点队列*** 用于管理节点
- (+) src/ToolBar.ts 新增 ***工具栏*** 生成器
    - 将 工具栏从 WorkerEditor 类中移除，单独管理工具
    - 实现 ***工具栏*** 与 ***连接线*** 区分快，可点击显隐
- ***NodeAbstract*** 抽象节点实现节点的显示和隐藏函数
- 移除 v1.1.x 版本中多余的代码： 如 Node 以及测试脚本
- index.d.ts 添加 NodeQue 和 ToolBar 类结构，以及其他类型优化

### ***V2.0.5/20180328***
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

### ***V2.0.4/20180327***
- 节点
    - NodeAbstract 抽象节点
        - 添加 ***getPLen*** 基础方法
    - 实现支持底色可配置，以及默认添加
    - 实现 ***结束*** , ***直线*** , ***折线*** 生成算法

### ***V2.0.3/20180326***
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
    
### ***V2.0.2/20180324***
- (+) index.d.ts 新增申明文件
    - 删除源代码中重复的类型生成
- (+) 引入外部类型库 {https://github.com/DefinitelyTyped/DefinitelyTyped 下 types 文件夹}
    - types
        - jquery.ts
        - raphael.ts
- (-) 删除 src/rSu.d.ts 用 index.d.ts 代替

### ***V2.0.1/20180323***
- webpack
    - 修改 webpack.config.js 配置文件，用于测试 requirejs(AMD) 文件加载风格
        - [BUG] define 函数导入的文件包默认导出无效 #BUG180323
- 版本信息 ***version*** ts 化，主文件库中引入版本信息
- 移除原来非相关的测试文件

### ***V2.0.0/20180322***
- 使用 typescript 重写代码仓库
    - 修改 tsc 编译器提示的错误
    - 编写 interface 类型
        - Dance 容器布景
        - Flow 流程
        - rSu 
    - 导入外部
        - $
        - jQuery        

