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
    // 点坐标字典
    export interface MapP{
        [k: string]: rSu.P
    }
    // RaphaelElement map 类型
    export interface MapRElm{
        [key: string]: RaphaelElement
    }
    // Node map 类型
    export interface mapNode{
        [key: string]: Node
    }    
    // 节点属性
    export interface NodeOpt{
        cx?: number             // 中心坐标点 x 轴坐标
        cy?: number             // 中心坐标点 y 轴坐标
        w?: number              // 容器的宽度
        h?: number              // 容器的高度
        text?: string           // 容器标签文字
        bkg?: string            // 底色，具有默认色
        bkgTxt?: string         // 字体颜色
        bkgMagnetic?: string     // 磁化底色，具有默认底色
        features?: bsMap        // 特征属性
        // 连线特殊选项
        P1?: rSu.P              // 连线起点
        P2?: rSu.P              // 连线终点， NodeLn
        MPs?: rSu.P[]           // 连线中间点， NodeLnPoly
        /**
         **/
        [k: string]: any        // 支持其他，用于实现特殊节点和直线
    }
    // 基础字典
    export interface bsMap{
        [k: string]: any
        [i: number]: any
    }
    export interface pMap{
        [K: string]: rSu.P
        [K: number]: rSu.P
    }
    // 边框属性
    export interface BoxAttr{
        attr: {
            x?: number
            y?: number
            width?: number
            height?: number
        },
        ps: rSu.bsMap
    }
    // 节点属性参数
    export interface Step{
        code: string    // 代码
        type: number    // 乐行
        name: string    // 文本/标签
        prev: string    // 父节点
        next: string    // 子节点
    }
    // 节点信息 -> class
    export interface Node{
        //--------> 属性
        NodeType: string            // 节点类型
        opt: rSu.NodeOpt            // 节点选项
        label?: RaphaelElement      // 标签元素
        paper: RaphaelPaper         // Raphael 绘制对象器
        c: RaphaelElement
        isSelEd: boolean            // 选中标记
        conLns: {                   // 新的连线数结构
            from?: string[]    // [{code: {posi: ''}}]    // [{code: string}] 
            to?: string[]
        }

        // 审核、合并
        xRate?: number           // 移除边框百分比
        inlinesEle?: RaphaelElement[]    // 合并
        inlineEle?: RaphaelElement       // 并行
        tRElem: rSu.MapRElm        // 临时类集合
        textTip?: string             // 悬停提示
        
        readonly code?: string                    // 只读属性
        readonly type?: number                    // 只读属性
        readonly name?: string

        sets?: RaphaelSet                         // 组合集合

        //--------> 方法
        // NodeAbstract => NodeAbstract
        // 节点生成器，外部可访问接口
        creator(opt?: rSu.NodeOpt): Node
        onDrag(): any
        onSize(): void
        // 获取两点间的距离
        getPLen(P1: rSu.P, P2: rSu.P): number
        delete(): void
        hide(): Node
        show(): Node
        moveable(data?: rSu.bsMap): rSu.Node
        updAttr(nOpt?: rSu.NodeOpt): Node
        updTextAttr(text?: string): rSu.Node
        getBBox(): BoxAttr
        getIconP(): rSu.P
        select(): Node  // 选中节点        
        magnCore(px: number, py: number): RaphaelElement
        onCreateBoxPnt(rElem: RaphaelElement): void     // 事件接口 [生成边框先关的点] 用于连线
        removeBox(): Node // 移除元素边框
        zoomOut(rate?: number): Node // 放大
        zoomIn(rate?: number): Node // 缩小
        data(key?:any, value?:any): any // 数据存储器
        feature(key: string|rSu.bsMap, value?: any, def?: any): rSu.Node|any    // // 特性参数操作
        move(type?: string, rate?: number): rSu.Node    // 方向性移动
        move2T(rate?: number): rSu.Node
        move2B(rate?: number): rSu.Node
        move2L(rate?: number): rSu.Node
        move2R(rate?: number): rSu.Node
        background(type?: string|string[]): rSu.Node // 底色处理
        clearTmpElem(key?: string|Array<string>): rSu.Node   
        line(value: string, isEnd?: boolean): rSu.Node     // 节点连接
        rmLine(value: string, isEnd?: boolean): rSu.Node    // 移除连线节点

        // 特殊节点
            // > NodeLnPoly
        // getMiddP(P0: rSu.P, P1: rSu.P): rSu.P

    }
    // 节点队列 -> class
    export interface NodeQue{
        paper: RaphaelPaper
        make(NodeType: string, nOpt: rSu.NodeOpt): rSu.Node
    }
    // 工具栏
    export interface ToolBar{
        option: rSu.bsMap
        config: rSu.bsMap

        cc: JQuery              // 所在容器
        headElems: rSu.MapRElm  // 头部元素集合
        nodeElems: rSu.MapRElm  // 节点元素集合
        connElems: rSu.MapRElm  // 连接元素集合
        rData: {      // 运行处理时间
            [k: string]: any
            cp: rSu.P                // 中心点坐标
            th0: number,             // 顶级标题高度
            th1: number,             // 节点工具
            th2: number,             // 联系工具
            nh: number,              // 节点运行高度
            ch: number,              // 连接节点运行高度
            cw: number               // 整个容器的宽度
        }
        // title node 基本标题框节点
        // 标题容器中的节点数
        tBodyNds: rSu.mapNode

        // 连接线
        // 标题容器中的节点数
        cBodyNds: rSu.mapNode

        /**
         * 连线框占据节点框
         */
        connSizeNode(backMk?: boolean): any        
    }
    // 自定义型 object 对象
    export interface ObjX{
        get(key: any, def?:any): any
        set(key: any, value: any): this
        value(json: rSu.bsMap, key: any, def?: any): any
    }
    // 工作流编辑器
    export interface WEditor{
        config: rSu.bsMap
        paper: RaphaelPaper
        nodeDick: rSu.mapNode       // 节点字典
        connDick: rSu.mapNode       // 连线字典 c{index}
        textDick: rSu.mapNode       // 文本字典 t{index}

        allRemove(): void
        removeAllSeled(type?: string|string[]): any
        remove(code?: string| rSu.Node): void
        tab(type?: string): void
        allSelect(): any
        getAllSelPs(): any
        allNdSeled(type?: string | string[]): any
        last(): rSu.Node
        clone(code?: string | rSu.Node): rSu.Node
        copy(): rSu.bsMap[]
        select(): rSu.Node
        step(node?: string | rSu.Node): rSu.bsMap
        collisionByP(x: number|rSu.NodeOpt, y?: number): rSu.Node
        tooltip(text: string, x?: number, y?: number): any
        error(): boolean
        errorNode(noClear?: boolean): boolean
        errorLine(noClear?: boolean): boolean

    }
}

// 图标界面 --------------------------------------------------------------------||
