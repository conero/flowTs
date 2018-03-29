import { NodeQue } from "./NodeQue";

/**
 * 2018年3月29日 星期四
 * 工具栏
 */

export default class ToolBar{
    paper: RaphaelPaper
    option: rSu.bsMap
    ndMer: rSu.NodeQue
    // title node 基本标题框节点
    protected tNodes: {
        [k: string]: RaphaelElement
    } = {}
    // 标题容器中的节点数
    protected tBodyNds: rSu.Node[]

    // 连接线
    protected cNodes:{
        [k: string]: RaphaelElement
    } = {}
    // 标题容器中的节点数
    protected cBodyNds: rSu.Node[]


    protected _tools: RaphaelElement[] = []     // 工具栏
    constructor(paper: RaphaelPaper, opt?: rSu.bsMap){
        this.paper = paper
        this.ndMer = new NodeQue(this.paper)
        this.option = opt
        this._create()
    }
    /**
     * 生成工具栏
     */
    private _create(){
        // console.log(this.paper)
         // 工具栏参数信息
         var $tool: Dance.Tool = {},
            $this = this,
            // tNodes: RaphaelElement[] = []
            // 节点缓存器
            tNodes: {
                [k: string]: RaphaelElement
            } = {},
            tBodyNds: rSu.Node[] = []         // 内部缓存的节点

            // 节点缓存器
            , cNodes: {
                [k: string]: RaphaelElement
            } = {},
            cBodyNds: rSu.Node[] = []         // 内部缓存的节点

         var raphael = this.paper
         var ctX = 5, 
             ctY = 5,
             ctW = 75,
             ctH = 300,
             x = ctX, y = ctY,            // 当前坐在的位置坐标
             config = this.option,
             pkgClr = config.pkgClr,
             ist: rSu.Node,
             ndMer = this.ndMer
         
         // 拖动处理            
         // var dragHandlerEvnt = function(){}
 
         // 容器集
        //  $tool.containerIst = raphael.rect(ctX, ctY, ctW, ctH)
        //  $tool.containerIst.attr('fill', '#ffffff')      // 容器底色
        
        // data: toggle => H/S
        tNodes['title'] = raphael.rect(x, y, ctW, 23)
            .attr('fill', '#ffffff')
            .click(function(){
                // console.log(this)
                let toggle = this.data('toggle')
                let iconIst = tNodes['icon'],
                    tBody = tNodes['tBody']
                if(toggle != 'H'){
                    this.data('toggle', 'H')
                    if(iconIst){
                        iconIst.attr('src', './arrow_down.png')
                    }
                    if(tBody){
                        tBody.hide()
                    }
                    $this.tToggle('H')
                }else{
                    this.data('toggle', 'S')
                    if(iconIst){
                        iconIst.attr('src', './arrow_up.png')
                    }
                    if(tBody){
                        tBody.show()
                    }
                    $this.tToggle('S')
                }
            })
        tNodes['icon'] = raphael.image('./arrow_up.png', x+1, y+1, 20, 20)

        y += 23
        tNodes['tBody'] = raphael.rect(x, y, ctW, 250)
            .attr('fill', '#ffffff')
        
        // 开始
        x += 20, y += 50
        ist = ndMer.make('begin', {cx: x, cy: y, w: 16, h: 12})
            .creator()
        tBodyNds.push(ist)

        // 任务
        y += 20
        ist = ndMer.make('task', {cx: x, cy: y, w: 16, h: 12})
            .creator()
        tBodyNds.push(ist)
        
        // 审核
        y += 20
        ist = ndMer.make('audit', {cx: x, cy: y, w: 16, h: 12})
            .creator()
        tBodyNds.push(ist)

        // 会签
        y += 20
        ist = ndMer.make('sign', {cx: x, cy: y, w: 16, h: 12})
            .creator()
        tBodyNds.push(ist)
       
        // 判断
        y += 20
        ist = ndMer.make('cond', {cx: x, cy: y, w: 16, h: 12})
            .creator()
        tBodyNds.push(ist)

        // 子流程
        y += 20
        ist = ndMer.make('subFlow', {cx: x, cy: y, w: 16, h: 12})
            .creator()
        tBodyNds.push(ist)

        // 并行
        y += 30
        ist = ndMer.make('parallel', {cx: x, cy: y, w: 16, h: 12})
            .creator()
        tBodyNds.push(ist)
       
        // 合并
        y += 20
        ist = ndMer.make('merge', {cx: x, cy: y, w: 16, h: 12})
            .creator()
        tBodyNds.push(ist)
      
        // 结束
        y += 20
        ist = ndMer.make('end', {cx: x, cy: y, w: 16, h: 12})
            .creator()
        tBodyNds.push(ist)

        this.tNodes = tNodes
        this.tBodyNds = tBodyNds

        // 连接线
        
        // data: toggle => H/S
        x = x - 20,
        y += 10
        cNodes['title'] = raphael.rect(x, y, ctW, 23)
            .attr('fill', '#ffffff')
            .click(function(){
                // console.log(this)
                let toggle = this.data('toggle')
                let iconIst = cNodes['icon'],
                    cBody = cNodes['tBody']
                if(toggle != 'H'){
                    this.data('toggle', 'H')
                    if(iconIst){
                        iconIst.attr('src', './arrow_down.png')
                    }
                    if(cBody){
                        cBody.hide()
                    }
                    $this.cToggle('H')
                }else{
                    this.data('toggle', 'S')
                    if(iconIst){
                        iconIst.attr('src', './arrow_up.png')
                    }
                    if(cBody){
                        cBody.show()
                    }
                    $this.cToggle('S')
                }
            })
        cNodes['icon'] = raphael.image('./arrow_up.png', x+1, y+1, 20, 20)
        
        y += 23
        cNodes['tBody'] = raphael.rect(x, y, ctW, 80)
            .attr('fill', '#ffffff')
        
        x = x + 20
        // 直线
        y += 20
        ist = ndMer.make('ln', {
            P1: {x: x-5, y},
            P2: {x: x+10, y}
        })
            .creator()
        cBodyNds.push(ist)

        // 折线
        y += 20
        ist = ndMer.make('lnPoly', {
            P1: {x: x-5, y},            
            P2: {x: x+10, y: y + 4},
            h: 4
        })
            .creator()
        cBodyNds.push(ist)

        this.cNodes = cNodes
        this.cBodyNds = cBodyNds

    }
    /**
     * 标题栏显示与隐藏
     * @param {string} type 显示与隐藏， H/S
     */
    tToggle(type?:string){
        var tBodyNds = this.tBodyNds
        if('H' != type){
            tBodyNds.forEach((nd) => {
                nd.show()
            })
        }
        else{
            tBodyNds.forEach((nd) => {
                nd.hide()
            })
        }
    }
    /**
     * 标题栏显示与隐藏
     * @param {string} type 显示与隐藏， H/S
     */
    cToggle(type?:string){
        var cBodyNds = this.cBodyNds
        if('H' != type){
            cBodyNds.forEach((nd) => {
                nd.show()
            })
        }
        else{
            cBodyNds.forEach((nd) => {
                nd.hide()
            })
        }
    }

}