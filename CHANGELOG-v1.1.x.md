## 更新日志

> ***V1.1.x/alpha-date*** alpha 类型模板
- ***V1.1.7/20180314***
- WorkerJs
    - src/WorkerEditor.js 工作流编辑器
        - (优化) removeBBox/getSelected 方法添加对“连线”的管理
        - (优化) 可删除当前选择的连线
        - (+) 工具栏通过配置项 ***noToolBar*** 控制显隐
        - (+) 工具栏添加 ***文本框*** ，实现文本框的拖动和点击切换控制

- ***V1.1.6/20180313***
- (概述) 工作流编辑器
    - 由于之前的版本使用 ***RaphaelElement.id*** 作为保存数据的 ***code*** 字段，造成历史保存的数据与现有数据id不可检测且冲突
    - 引入指定义 ***code*** 弥补 Element.id 操作的缺陷
    - 使用 ***code*** 与 id 相映射实现
- WorkerJs
    - src/WorkerEditor.js 工作流编辑器
        - (+) 添加 ***_lineTragEvent*** 方法，统一管理箭头直线拖动处理事件，整合原工具栏中的 箭头连线拖动
        - (+) 添加 ***_getOrderCode*** 内部code自动生成器，保持code唯一性
        - (+) 添加 ***code2Id*** code 与 id 映射处理
        - (优化) ***getNodeByCode*** 分离出方法 ***getNodeByEid***
        - (优化) ***loadStep*** 实现根据历史数据恢复工作流图，且与原绘制时的时间一直

- ***V1.1.5/20180311***
- WorkerJs
    - src/WorkerEditor.js 工作流编辑器
        - (+) 添加 ***getNodeByCode*** 方法以实现通过代码获取流程节点       #180309
        - (+) 添加 ***loadStep*** 方法，用于实现 ***历史数据*** 还原，已完成工作流程的编辑功能
        - (+) 添加 ***_bindEvent*** 方法，用于生成的节点，接口化绑定事件
- webpack
    - 使用 ***addOpt(opt)*** 方法支持，认为目录灵活扩展；用于外部项目即使编译文件
- BUG
    - 页面布局可能因为目标文件中的css样式而遭到破坏，与独立页面不一致 #BUG-180311

- ***V1.1.4/20180308***
- WorkerJs
    - src/WorkerEditor.js 工作流编辑器
        - 添加 ***onNodeClick*** 接口函数

- ***V1.1.3/20180307***
- WorkerJs
    - src/WorkerEditor.js 工作流编辑器
        - ***setOption*** 接口设置为本时同步“NodeBase” 属性值
        - ***getFlowJson*** 单节点数据流程结构，实现节点间“连接线”数据的获取
    - 包内引入 RaphaelJs 包，通过 npm
- NodeBase
    - (+) 添加 ***toJson*** 方法用于实现当前脚本中的图标实例
- webpack
    - webpack.config.js
        - Queue.js() 方法支持脚本别名编译，以及最后生成的 opt 回调，用于实现 umd 规范
        - 生成动态 version.js 文件用于显示当前库的版本号
- src
    - src/browser.workerflow.umd.js 添加 worker umd 风格发布版本，不予 Raphael 单文件集成
    - src/browser.workerflow.js 实现浏览端与 Raphael 继承的 worker 版本库

- ***V1.1.2/20180306***
- WorkerJs
    - src/WorkerEditor.js 工作流编辑器
        - 修复“连线”选中与拖动不一致，使用js回调内存保持的特性
        - (+) 实现连线与节点关联，关联以后两者实现同步拖动；连线与节点之间的关联特性为松散式，支持不同节点间的只有切换
        - (+) 实现“连线”端点与节点碰撞时，与“可连接点”进行磁化
- NodeBase
    - 修复 NodeBase 对象 move 操作时 opt 未同步


- ***V1.1.1/20180305***
- WorkerJs
    - src/WorkerEditor.js 工作流编辑器
        - 新增接口 ***setOption*** 实现文本等属性更新接口
        - 新增接口 ***getLastElem*** 用于获取最新的生成的节点
        - Bug 直线拖动时由于回调函数的影响，引起直线实际点击与选中不对应
        - 工具栏中添加“箭头” ： 实现箭头可拖动，点击时端点着重显示，端点和连线同步移动
        - 优化工具栏以前部件的拖动算法，实现部件轨迹联动
        - 库连线采用节点 “拖动和图形堆叠+节点磁性化”算法实现
- NodeBase
    - 新增公共属性 ***NodeType*** 使用判断节点的类型
        - arrow, bow, endpnt, judge, line, opera,        
- 系统
    - 更新日志从“README.md” 分离

- ***V1.1.0/20180302***
    - WorkerJs
        - (新增) src/WorkerEditor.js 工作流编辑器
            - 用于实现轻量级工作流编辑器，内部“私有”方法采用 “_"前缀 使之与接口化参数保持一致
            - 设计工具栏，节点类型底色实现默认 + 接口配置，以及拖动移动的节点底色保持一致性
            - 实现工具栏拖动新增工作流节点，且节点实现自由拖动，选中边框显示；节点点击自动切换
            - 提供程序接口功能，实现当前选择节点获取，节点移除，业务节点数据获取以及单节点业务逻辑数据格式
        - worker.js
            - 新增接口化函数 static editor(config) 以移动编辑器
    - test
        - 新增 editor 测试界面

> ***V1.0.x/alpha-date*** alpha 类型模板
- ***V1.0.8/20180123***
    - workerJs
        - (新增) src/NodeBow(弓形连线) 箭头连节点实例 - “用于新增箭头连线算法过渡，已替换 NodeArrow”
            - 实例化与更新同函数处理
            - 提供外边松散式的接口点列表
        - NodeEndpoint 端点
            - 底层支持形状有原来的“圆”更变为“椭圆”，后者根据扩展性
        - NodeBase.js
            - 继承的节点，连接点实现外部参数
        - worker.js
            - 实现非直线时，自动适应计算规则，获取到“弓形”连接线
            - 实现回线时，规则路线话连接线
            - 容器文本宽度自适应实现的
            - 容器文本轻量级文本编辑器的实现
        
- ***V1.0.7/20180122***
    - workerJs
        - 逆向流程线生成实现，容器还未存在时放到最后生成
        - svg 适应性自动增高优化
    - 系统
        - 准备实现基于 gojs 的中间转化器流程代码

- ***V1.0.6/20180118***
    - workerJs
        - 自动撑高svg高度，以及兼容原“动态动态排版3列布局”
        - 运行状态属性区分,支持当前运行的步骤代码

- ***V1.0.5/20180109***
    - workerJs
        - 实现选择边缘边框显示,以及拖动是联动
        - 添加新增的布局算法：动态根据svg控件的高度自动分配新列(3列内)，高度足够时将居中排列
        - ***flow.js*** 新增 getEmptyNode 方法用于直接后去节点对象实例
        - NodeEndpoint 端点直线移动同步字段写错修复
    - treeJs 错误修复
        - 适应上一版中 ***直线/箭头*** 数据格式更改

- ***V1.0.4/20180108***
    - 简述
        - treeJs/workerJs 融合处理， 提取公共部分 ***H*** 静态类。两者通过文件引入
        - treeJs 布局，以及程序结构优化
        - workerJs 程序结构优化，flow中可到处节点控制器
            - 节点布局与连线适应多点切换
    - treeJs
        - 与 workerJs 差异化加大，渐进独立于应用项目
            - 节点只是用了 ***workerJs** 中的 “操作” 框图
            - 布线算法也发生很大的差异
            - 使用 ***src/TreeContainer*** 替代原 ***src/flow.js** 中的代码
        - 后期将使用 ***族代法*** 排列节点，节点序列上在原来的基础上可通过子集自适应排序
    - workerJs
        - 直线生成算法，添加可配置的 ***直角转为线生成算法***， 默认为是
    - 基础节点
        - 直线/箭头： 新增 ***position*** 属性，用于实现关联部件之间的直线联动
        - 直线联动算法： 只处理起点/终点；扩展原来的写法
        - 直线直角连接线生成算法编写与初始(不稳定版)
        - 内部 ***getStlnP*** / ***getEnlnP*** 方法的返回值有原来的 array 转变为 json
    - 系统
        - 添加 ***surongJs*** 使用实现，库所有图标生成器的索引

- ***V1.0.3/20180107***
    - todo
        - bug # NodeArrow.js 移动部件后在连接关联的部件，起点会回到最初点
            - 已修复 
    - src/util.js
        - 添加 ***ArrayMergeSameValue*** 数据合并相同的元素
        - 添加 ***each*** 数组/json 对象遍历函数
    - src/NodeArrow.js
        - 箭头更新后坐标移动同步实现
    - src/worker.js
        - 初步实现内部布局算法： 
            - 接收可配置参数： dH(登高距离差), cH(容器高度)
            - 级化排列算法
            - 子级并排布局
    - src/tree.js 
        - 新增(家族)树库，用于生产标准的树形排列图
    - test/webpack.setup.js
        - 新增测试直接 ***webpack*** 打包工具处理，可用于不同的测试项目脚本打包

- ***V1.0.2/180106***
    - 优化
        - 实现连接线箭头类型生成器
            - (添加) ***src/NodeArrow.js*** 
        - 实现连线可配置，现在直线或者箭头
        - 节点
            - 直线同步和箭头连接线同步分列，可供外部接口调用
- ***V1.0.1/180105***
    - webpack 
        - sass 环境安装
            - npm install sass-loader node-sass webpack --save-dev (尝试失败)
    - 实现
        - 系统库架构
            - flow.js 基础节点绘制、物理特性计算。可用于其他库处理
            - NodeBase.js 公共基础节点处理类， 分为： Endpoint(端点)/Judge(判断)/Operation(操作)
            - worker.js 业务逻辑处理库，与本节点相关
        - 系统实现
            - 绘制基本数据节点类型： 端点、 判断 、 操作
            - 几点间的连线实现
            - 拖动事件
                - 节点拖动以及与连接线联动
- ***V1.0.0/180104***
    - git 仓库初始化
    - webpack 打包工具配置