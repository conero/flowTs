/**
 * declear 申明接口类型
 * 2018年3月22日 星期四
 * Joshua Conero
 */

// jQuery
declare var $:any

// RaphaelJs
declare var Raphael: any


// 工作流数据结构 -------------------------------------------------------------------->

declare namespace  Flow{
    // 工作流-步骤-属性
    interface FlowStepAttr{
        col_list?: string[]
        can_revoke?: number
        auth_list?: any
        filter_by?: any
    }
    // 工作流-步骤-属性
    interface FlowStepStru{
        NodeType?: string
        opt?: rSu.NodeOpt
        c?: any
        label: any
    }
    // 工作流-步骤 数据结构
    interface FlowStepStr{
        code?: string                // 代码
        name?: string                // 名称
        type?: number
        prev?: string
        next?: string
        attr?: FlowStepAttr
        _struct?: FlowStepStru
    }
}



// 工作流数据结构 --------------------------------------------------------------------||



// 图标界面 -------------------------------------------------------------------->

// 画布
declare namespace Dance {
    // 工具栏
    interface Tool{
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
    interface P{
        x: number
        y: number
    }
    // 节点属性
    interface NodeOpt{
        cx?: number 
        cy?: number 
        w?: number 
        h?: number
        text?: string
    }
}

// 图标界面 --------------------------------------------------------------------||














