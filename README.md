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
    dH: 'Number 间距高度'
    cH: '容器高度'
}
```

## flow 节点类型
> 所有节点都由： 容器(container/c), 标签组成(label)
- endpoint  端点



## 更新日志
> ***V1.0.3/alpha-date*** alpha 类型模板
- ***V1.0.3/20180107***
    - todo
        - bug # NodeArrow.js 移动部件后在连接关联的部件，起点会回到最初点

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