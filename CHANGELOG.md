## 更新日志

> ***V2.0.x/alpha-date*** alpha 类型模板
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

