## 更新日志

> ***V2.0.x/alpha-date*** alpha 类型模板
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

