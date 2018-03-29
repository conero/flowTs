/**
 * 2018年3月24日 星期六
 * 库 类型申明
 */
///<reference path="./src/types/raphael.ts"/>

// 工作流数据结构 -------------------------------------------------------------------->

declare namespace  Flower{
    // 工作流-步骤-属性
    export interface StepAttr{
        col_list?: string[]
        can_revoke?: number
        auth_list?: any
        filter_by?: any
    }
    // 工作流-步骤-属性
    export interface StepStru{
        NodeType?: string
        opt?: rSu.NodeOpt
        c?: any
        label?: any
    }
    // 工作流-步骤 数据结构
    export interface StepStr{
        code?: string                // 代码
        name?: string                // 名称
        type?: number
        prev?: string
        next?: string
        attr?: StepAttr
        _struct?: StepStr
    }
}



// 工作流数据结构 --------------------------------------------------------------------||



// 图标界面 -------------------------------------------------------------------->

// 画布
declare namespace Dance {
    // 工具栏
    export interface Tool{
        containerIst?: any        
        startIst?: any
        startTxtIst?: any
        operaIst?: any
        operaTxtIst?: any
        judgeIst?: any
        judgeTxtIst?: any
        endIst?: any
        endTxtIst?: any
        arrowIst?: any
        arrowTxtIst?: any
        textInst?: any
    }
}
// 界面布局
declare namespace rSu{
    // 坐标点 x, y 轴坐标
    export interface P{
        x: number
        y: number
    }
    // 节点属性
    export interface NodeOpt{
        cx?: number             // 中心坐标点 x 轴坐标
        cy?: number             // 中心坐标点 y 轴坐标
        w?: number              // 容器的宽度
        h?: number              // 容器的高度
        text?: string           // 容器标签文字
        bkg?: string            // 底色
        [k: string]: any        // 支持其他，用于实现特殊节点和直线
    }
    // 基础字典
    export interface bsMap{
        [k: string]: any
        [i: number]: any
    }
    // 节点信息 -> class
    export interface Node{
        //--------> 属性
        fromLine: Node[]    // 起点连线
        toLine: Node[]      // 终点连线
        NodeType: string            // 节点类型
        opt: rSu.NodeOpt            // 节点选项
        label?: RaphaelElement      // 标签元素
        paper: RaphaelPaper         // Raphael 绘制对象器

        // 审核、合并
        xRate?: number           // 移除边框百分比
        inlinesEle?: RaphaelElement[]    // 合并
        inlineEle?: RaphaelElement       // 并行

        //--------> 方法
        // NodeAbstract => NodeAbstract
        // 节点生成器，外部可访问接口
        creator(opt?: rSu.NodeOpt): Node
        onDrag(): any
        // 获取两点间的距离
        getPLen(P1: rSu.P, P2: rSu.P): number
        delete(): boolean
        hide(): Node
        show(): Node
        moveable(): Node
        updAttr(nOpt?: rSu.NodeOpt): Node
    }
    // 节点队列 -> class
    export interface NodeQue{
        paper: RaphaelPaper
        make(NodeType: string, nOpt: rSu.NodeOpt): rSu.Node
    }
    // 工具栏
    export interface ToolBar{
        paper: RaphaelPaper
        option?: rSu.bsMap
    }
}

// 图标界面 --------------------------------------------------------------------||
