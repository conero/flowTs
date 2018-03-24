/**
 * 2018年3月24日 星期六
 * 库 类型申明
 */


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
    // 坐标点
    export interface P{
        x: number
        y: number
    }
    // 节点属性
    export interface NodeOpt{
        cx?: number 
        cy?: number 
        w?: number 
        h?: number
        text?: string
    }
}

// 图标界面 --------------------------------------------------------------------||














