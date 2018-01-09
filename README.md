# zmapp-workflow (工作流)
- 2018年1月4日 星期四
- Joshua Conero

## 基于jQuery/Raphael 库
> 矢量图处理库


## src
- 基本文件介绍
    - flow.js   工作流容器生成算法，可迁移至其他的项目中
    - worker.js 实际工作流的相关控制，与业务紧密联系
    - util.js 内部项目使用的助手函数

worker
```javascript
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
    pkgStartCol: '起始节点'
    pkgOperCol: '操作节点'
    pkgJudgeCol: '判断节点'
    pkgEndCol: '结束节点'
    currentCode: '当前项目节点'
}
```
worker.js 内联数据对象
```javascript
{
    CodeNodeMaps: {}    // 代码节点搜索字典
    clsMap:{}           // 级别索引字典
}
```


tree
```javascript
var option = {
    feature: {} // 特征
    nodes:[{}]  // 节点信息
}
```

## flow 节点类型
> 所有节点都由： 容器(container/c), 标签组成(label)
- endpoint  端点



## 更新日志
> ***V1.0.x/alpha-date*** alpha 类型模板
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