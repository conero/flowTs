# 更新日志



## V3.0.x

**<font color="red">@todo</font>**

- 依赖更新
  - webpack      （_**<font color="blue">#DONE</font>**_）
  - typescript    （_**<font color="blue">#DONE</font>**_）
- 工具栏
  - 实现漂浮状态，即固定在制定个的位置
- 节点
  - 拖动时，如到底部页面随之进行变动
  - [BUG] “字和节点”事件监听不一致, 导致选中字的时候拖动等无效
  - [BUG] 节点变形时其边界描点未联动
- <s>移除对 *jQuery* 依赖,减少程序耦合性</s>



### v3.0.0/alpha-todo

> **<font color="red">@todo</font>**

- 依赖升级
  - *babel-loader*     @7.1.5->8.0.5
  - *css-loader*     @0.28.7->2.1.0
  - *node-sass*     @4.7.2->4.11.0
  - *sass-loader*     @6.0.6->7.1.0
  - *style-loader*     @0.19.1->0.23.1
  - *ts-loader*          @4.4.2->5.3.3
  - *typescript*        @2.9.2->3.2.2
  - *webpack*         @4.15.1->4.28.1
  - *webpack-cli*     @3.0.8->3.2.1
- *`wp4-msr`依赖包更换为由 npm 管理下载的地址，使开发者拉取更加方便*
  - 调整由此变化引起的改动，`webpack.config.js` 模板文件
- 调整库对 *jQuery* 依赖的调整，但是未移除，考虑到实际项目的使用
- 添加文件 *WeScreen* 用于工作流屏幕管理




## V2.2.x

### ***V2.2.11/20180710***
- src/ToolBar.ts
  - (优化) 优化代码使之更加符合 *typescript* 语言特性
  - (修复) 修复工具栏显示隐藏时，折线坐标服务其他工具；删除中间点 使之保持一致
  - (+) 添加 *_lnPolyConXyCrt* / *_lnConXyCrt* 方法分布用于生成折线、直线坐标点生成规则
- src/WorkerEditor.ts
  - (优化) 优化代码使之更加符合 *typescript* 语言特性
  - (优化) *operHelpEvts* 转移到 *src/WePlg.ts* 中
- (+) src/WePlg.ts 新增WEditor插件
  - (优化) 内部事件绑定除了根据 *bindOEvts* 开启外，也可根据 *onKeydown* 事件存在性判断；以及绑定事件用户自定义优先化，可中断

### ***V2.2.10/20180709***
- src/WorkerEditor.ts
    - (+) 添加方法 *getNdType* 用于识别节点的类型是否为text/conn/node
    - (优化) *operHelpEvts* 方法添加 *delete* 为节点删除快捷键；“shift+E” 错误检测
    - (优化) *remove* 删除节点是同事删除与之相连的连线
    - (优化) *_lineMoveSync* 如果处理的连线为折线的话，自动做折线算法适应
    - (修复) 修复 *_nodeBindEvt* 磁化端点样式清理不彻底的问题，采用内部缓存值处理

### ***V2.2.9/20180709***
- webpack 升级
    - 系统打包工具由 v3 升级到 v4
    - 采用新的 wp4-msr 包实现 webpack4打包工具
    - package.json 系统以及先关的文件处理

### ***V2.2.8/20180620***
- src/WorkerEditor.ts
    - (+) 添加接口 *onNodeResize*， 用于实现拖动以后svg屏幕自动撑宽

### ***V2.2.7/20180522***
- src/WorkerEditor.ts
    - (+) 添加 **disSR** 属性，用于关闭不自动进行状态渲染
    - (优化) **copy** 过滤状态属性，如：运行状态
    - (优化) “直线” 进行状态渲染时，箭体颜色一致
- src/node/NodeAbstract.ts
    - (优化) **moveable** 过滤移动增量为0的移动，房租选择时触发移动事件   
- src/algo/LnPolyConnFn.ts    
    - (+) **cSR.agentNodeCnP** 实现代理转折算法
    - (+) **LnPolyConn** 优化自节点连线算法

### ***V2.2.6/20180517***
- src/WorkerEditor.ts
    - (+) **selectGroup** 新增方法实现 “分组选择” 模块
    - (+) **stateRender** 新增状态渲染方法，实现状态的文本选中；以及优化 **load** 方法
    - (+) **_readonly** 新增只读状态，实现工作流程图只读处理
    - (+) 配置文件 **readonly** 属性，实现工作流只读
    - (优化) **errorLine** 方法将重复连接的直线作为错误判断条件
    - (优化) **remove** 方法删除所有已经选中的节点，不再仅仅单单一个实例
    - (修复) **_cerateToolBar** 工具栏节点拖动生成时与节点一致性

### ***V2.2.5/20180513***
- src/WorkerEditor.ts
    - (+) **_baseNodeBindEvt** 新增方法用户实现公共节点(包括节点、连线和文本)事件绑定
    - (+) **_nodeToolTip** 显示悬停提示文本
    - (+) **closeToolTip** 参数实现关闭悬停文本，默认开启
    - (优化) **error/errorLine/errorNode** 方法返回 “bool”
    - (优化) **_lineBindEvt** 优化折线拖动以后重新选中，修复拖动后选中点与实际不一致
- src/util.ts
    - (+) **MergeArr** 实现数组合并
- src/node/NodeAbstract.ts
    - (+) 添加属性 **textTip**， 实现悬停文本提示    
- src/node/NodeLnPoly.ts
    - (优化) **_mpsMerge** 方法使用“左右坐标点检测法”以判断坐标是否为重复中间点
    - (优化) **opt2Attr** 优化端点和中间点连线，不为直线时则修复


### ***V2.2.4/20180512***
- src/WorkerEditor.ts
    - **autoSize** 方法优化并测试通过，可达到功能要求
- src/node/NodeLnPoly.ts
    - (+) 添加 **_mpsMerge** 方法，实现中间合并相同中间点

### ***V2.2.3/20180511***
- src/WorkerEditor.ts
    - (+) **errorLine/errorNode** 添加连线或者节点错误检测，错误时选中；**error** 快捷方法
    - (+) **maxHw** 实现动态计算最大宽度和高度
    - (+) **autoSize** 新增方法，用于实现自动适应 svg 图的最大高度以及宽度
    - (修复) **magnCore** 修复算法错误，使其磁化正常
    - (优化) “_nodeBindEvt” 使用 **LnPolyConnFn** 函数实现折线案例枚举方案，以及“连线”终点拖动时调用算法
- src/node/NodeUtil
    - (+) 新增 **polyP** 方法用于获取折线端点    
- (PLAN-NEXT-2.3.4)
    - “autoSize” 调试该方法，其实使其可用
    - “折线” 选择是做“中间点合并处理”

### ***V2.2.2/20180510***
- src/WorkerEditor.ts
    - (优化) 不设置 **icon** 徽标时，默认不显示节点徽标；设置时且为空时采用默认图标    
- src/ToolBar.ts
    - (+) 新增参数 **hasIcon** 即 “(WorkerEditor) Ist.config.toolBar.hasIcon” 不设置图标时，默认图标不生成
    - (优化) 优化框架标题，设置更改工具栏配色

### ***V2.2.1/20180508***
- src/WorkerEditor.ts
    - (+) 新增 **tooltip** 方法实现文本悬停提示
    - (+) 给徽标添加悬停提示文本，通过 **hover** 事件
    - (+) 添加配置参数 **bkg.lnHover** 连线聚焦时背景色
    - (优化) **load** 删除历史中的过渡代码
    - (优化) **copy** / **paste** 复制和粘贴方法，复制时添加 连线“data”；粘贴时连线与节点相关数据联动

### ***V2.2.0/20180507***
- src/WorkerEditor.ts
    - (优化) **_lineBindEvt** 方法实现 “连线” 聚焦时，颜色、箭体等样式变化一致性控制
    - (优化) **load** 方法，节点背景色采用 “状态” 图形描述法，且添加 **icon** 图标
    - (+) 添加 **previewMk** 属性，开启时“节点禁止拖动”，以及隐藏编辑器。使用 **preview** 方法管理
    - (+) 添加 **rmAllText** 方法，且修复全部移除忽略文本
    - (+) 新增 **_domListener** 实现，双击页面dom移除全部选中状态
- src/ToolBar.ts
    - (+) 新增 **show/hide** 方法用于显示隐藏工具栏    
- src/node/NodeAbstract.ts
    - (+) 新增接口 **onInit** 用于在生成时调用，仅仅一次(程序更改用 “onSize”)
    - (+) **moveable** 方法，参数添加 “beforeMv($node)” 回调函数用于关闭节点拖动
    - (+) 新增 **getIconP** 方法，用于获取 icon 徽标坐标点
    - (优化) **background** 方法优化，可接收多参数
    - 节点
        - NodeLnPoly
            - (修复) 修复箭体算法偏差，造成折线拐弯后处理事件无效 
- src/util.ts
    - (+) 新增 **inArray** 方法，尽量避免jQuery数据处理方法，以及期减少外部库依赖

## **V2.1.x** 系列版本

### ***V2.1.7/20180427***
- src/WorkerEditor.ts
    - 数据保存，将视图相关的结构参数与节点属性分离；实现视图数据和外部需要的数据进行处理
        - ***save*** 和 ***step*** 方法 优化
        - ***load*** 方法，提供兼容上一次保存的数据结构方法(后期将删除)
    - (优化) ***_order*** 新增参照代码，如果不存在则用此代码
    - (+) ***copy*** 方法实现节点复制，支持跨页面操作
    - (+) ***paste*** 方法实现节点粘贴，支持跨页面操作

### ***V2.1.6/20180424***
- src/WorkerEditor.ts
    - (+) ***_lineBindEvt*** 折线引入试验中的“中间点拖动算法”
    - (优化) ***tab*** 方法使 “节点”/“连线”/“文本” 之间平缓切换
- src/util.ts 
    - (+) ***subArray*** 获取数组子数组   
- src/node/NodeAbstract.ts
    - (优化) ***_ps2Path/_ps2PathAttr*** 实际实现代码转移到 “NodeUtil”，减少代码冗余
- src/node/NodeLnPoly.ts
    - (优化) ***getFocusPoint*** 代码优化

### ***V2.1.5/20180423***
- src/WorkerEditor.ts
    - (修复) ***remove*** 先删除节点后删除连线，连线端点节点不存在报错
    - (优化) ***直线*** 端点移动，以及实现折线端点移动算法
    - (优化) ***tab*** 方法实现 ***连线/文本*** 等 tab 循环选中
    - (优化) ***operHelpEvts*** 方法新增 “shift+C/L” 快捷键
- src/node/NodeLnPoly.ts
    - (优化) ***getFocusPoint*** 方法采用 “中点坐标公式” 算法生成焦点
    - (修复) ***mvEndPoint*** 端点移动折线未完全达到直角走法

### ***V2.1.4/20180420***
- src/WorkerEditor.ts
    - (+) 添加配置属性 ***disConnNode/禁止连接节点***，***onKeydown*** 开启事件的绑定
    - (+) 实现文本节点的生成，以及优化编辑器中相关的处理，如节点全选以及删除等控制；添加 ***textDick/文本字典*** 属性用于存储数据
    - (修复) ***_order*** 方法序列唯一性判断无效
    - (修复) ***step*** 方法属性生成时， next/prev 值颠倒
    - (优化) ***removeAllSeled*** 方法，统筹考虑 “节点、连线、文本”选中
    - (移除) ***_getOrderCode*** 方法，统一使用 ***_order*** 方法生成序列
- src/ToolBar.ts
    - 工具栏实现可配置显示等管理    

### ***V2.1.3/20180419***
- src/WorkerEditor.ts
    - (+) 添加配置参数 ***bindOEvts*** 用于绑定操作事件
    - (+) 添加 ***operHelpEvts*** 方法，实现 “shift+”辅助快捷键，需要通过 bindOEvts 参数开启
        - 包括基本，操作，方位移动和缩放
- src/node/
    - (+) 添加 ***文本/text*** 节点，主要是使之与其他节点配合使用        

### ***V2.1.2/20180418***
- src/WorkerEditor.ts
    - ***step*** 方法参数可为空，为空时为当前选中的节点，便于测试
    - ***load*** 方法在节点加载完成以后，通过参数 ***rCodes*** 参数配置当前所在位置
        - 改变 ***v1.x*** 系列中，通过单个节点计算运行的路径
    - (+) 添加 ***onStep*** 事件，以实现外部保存是附加数据到保存的数据结构中
- 其他
    - 删除 ***Transition.md*** 文档，标志支持看正式通过了 v2 系列的过渡期

### ***V2.1.1/20180417***
- src/WorkerEditor.ts
    - (优化) 节点端点移动实现 ***斜角*** 方向移动，支持参数配置
    - (优化) ***allSelect*** 选择时添加遮蔽层，实现全部联合移动
    - (+) 添加属性 ***tmpMapRElm*** ，且使用 ***rmTempElem*** 方法对其进行管理
    - (+) 添加方法 ***getAllSelPs*** 实现所有节点选择时端点坐标生成算法
    - (+) 添加方法 ***rmAllNode*** 实现所有节点移除，且分别单独实现 ***节点*** 和 ***连线*** 全删除方法
    - (+) 添加接口 ***onDbClick/onClick*** 用于实现外部接口调用
- 节点
    - (优化) 执行 ***updAttr*** 方法是调用， ***onSize*** 接口

### ***V2.1.0/20180416***
- src/WorkerEditor.ts
    - 删除历史版本中冗余代码
    - 实现 ***节点方位拖拉*** 放大功能
    - (+) 新增 ***step*** 方法用于获取节点数据值
    - (+) 新增 ***save*** 方法用于获取全部节点数据，以及记录连接线信息用于数据复原
    - (+) 新增 ***load*** 方法实现历史数据节点复原
    - (优化) 修复节点 ***移动/缩放*** 与 连接线不同步的问题
- src/node/NodeAbstract.ts
    - (+) 只读属性 ***name/type/_key*** ，使用快捷读取节点属性值。 其中 ***name*** 会自动清除数据文本中的空格 “\n”
    - (+) 新增 ***updTextAttr*** 方法用于实现节点统一的文本更新
    - (+) 特性值新增 ***boxPadding/选中边框内边距*** 默认 3
    - (+) 新增接口 ***onSize*** 方法，用于实现内存尺寸改变地外部引起的事件调用

## ***V2.0.x***

### ***V2.0.15/20180415***
- src/WorkerEditor.ts
    - ***折线*** 节点移动保持折线的属性，实现走直线；实现端点移动的，折线直线路径调用
- src/node/NodeLnPoly.ts
    - 将 ***getFocusPoint*** 方法中任意两点，获取中间点实现直线移动方法移出；***getMiddP*** 
    - (+) ***mvEndPoint*** 实现端点移动的方法


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

