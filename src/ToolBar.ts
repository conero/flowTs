import { NodeQue } from "./NodeQue";
import ObjX from "./ObjX";
import { Util } from "./util";
import { cNode } from "./confNode";

/**
 * 2018年3月29日 星期四
 * 工具栏
 */

export default class ToolBar{
    private paper: RaphaelPaper
    option: rSu.bsMap       // 全局参数配置
    config: rSu.bsMap       // 工具栏接口配置 {option: config}
    private ndMer: rSu.NodeQue
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

    protected _tools: RaphaelElement[] = []     // 工具栏
    constructor(paper: RaphaelPaper, opt?: rSu.bsMap){
        this.rData = {
            cp: {x: 5, y: 5},
            th0: 23,            // 顶级标题高度
            th1: 23,            // 节点工具
            th2: 23,            // 联系工具
            nh: 0,              // 节点运行高度
            ch: 0,              // 连接节点运行高度
            cw: 75              // 整个容器的宽度
        }
        this.paper = paper
        this.ndMer = new NodeQue(this.paper)
        this.option = opt
        this.config = opt.toolBar || {}
        this.config.aUpSrc = ObjX.value(this.config, 'aUpSrc', 'arrow_up.png')
        this.config.aDownSrc = ObjX.value(this.config, 'aDownSrc', 'arrow_down.png')
        this._headBar()
        this._nodeBar()
        this._connBar()
    }
    /**
     * 标题栏
     */
    private _headBar(){
        var $this = this,
            {cp, cw, th0} = this.rData,
            {x, y} = cp,
            paper = this.paper,
            ist: RaphaelElement
        
        this.headElems = {}

        ist = paper.rect(x, y, cw, th0)
            .attr('fill', '#ffffff')
            .click(function(){
                let toggle = this.data('toggle')
                if(toggle != 'H'){
                    this.data('toggle', 'H')
                    $this.toggle('H')
                }else{
                    this.data('toggle', 'S')
                    $this.toggle('S')
                }
            })
        this.headElems['con'] = ist
        
        ist = paper.text(x + (cw/2), y+10, ObjX.value(this.config, 'title', '工具栏'))
        this.headElems['title'] = ist
    }
    /**
     * 节点栏
     */
    private _nodeBar(){
        var $this = this,
            {cp, cw, th1, nh} = this.rData,
            {x, y} = cp,
            {paper, ndMer, config} = this,
            ist: rSu.Node,
            tBodyNds: rSu.mapNode = {}         // 内部缓存的节点
            
        
        this.nodeElems = {}
        let menuSeting: any = config.menu || false          // 菜单设置性
        if(!menuSeting){        // 默认菜单项
            menuSeting = [
                'begin', 'task', 'sign', 'cond', 
                'subFlow', 'parallel', 'merge', 'end',
                'text'
            ]
            ;
        }

        y += th1
        // data: toggle => H/S
        this.nodeElems['title'] = paper.rect(x, y, cw, 23)
            .attr('fill', '#ffffff')
            .click(function(){
                // console.log(this)
                let toggle = this.data('toggle')
                let iconIst = $this.nodeElems['icon']
                if(toggle != 'H'){
                    this.data('toggle', 'H')
                    if(iconIst){
                        iconIst.attr('src', config.aDownSrc)
                    }
                    $this.tToggle('H')
                }else{
                    this.data('toggle', 'S')
                    if(iconIst){
                        iconIst.attr('src', config.aUpSrc)
                    }
                    $this.tToggle('S')
                }
            })
        this.nodeElems['icon'] = paper.image(config.aUpSrc, x+cw*0.7, y+1, 20, 20)

        nh = y        
        y += 23
        this.nodeElems['tBody'] = paper.rect(x, y, cw, 250)
            .attr('fill', '#ffffff')
        
        // 数据处理
        x += 32
        Util.each(menuSeting, (mk: string|number, row: any) => {
            if('object' != typeof row){
                mk = row
                row = {}
            }
            if(!cNode[mk]){
                return
            }
            // console.log(mk)
            y += 32
            let text = row.text || cNode[mk].text,
                cx = x,
                cy = y
            
            // 特殊坐标调整（坐标修正）
            if('parallel' == mk){
                cy += 5
                cx += 20
            }
            else if('merge' == mk){
                cy += 5
                cx += 20
            }

            ist = ndMer.make(<string>mk, {cx, cy, w: 40, h: 20, text: text})
                .creator()
            if(ist.label){
                ist.label.attr('fill', '#FF8C00')
                // ist.label.attr('fill', '#FFA500')
                
            }
            // 特殊节点处理
            if('text' == mk){
                ist.c.attr({
                    'font-size': 15,
                    'stroke': 'none'
                })
            }

            tBodyNds[<string>mk] = ist
        })

        this.tBodyNds = tBodyNds
        this.rData.nh = y - nh
        this.nodeElems['tBody'].attr('height', this.rData.nh)
    }
    /**
     * 连线栏
     */
    private _connBar(){
        var $this = this,
            {cp, cw, th2, ch, th0, th1, nh} = this.rData,
            {x, y} = cp,
            {paper, ndMer, config} = this,
            ist: rSu.Node,
            cBodyNds: rSu.mapNode = {}         // 内部缓存的节点
            
        this.connElems = {}
        // 连接线
        // data: toggle => H/S
        y += th0 + th1 + nh

        this.connElems['title'] = paper.rect(x, y, cw, th2)
            .attr('fill', '#ffffff')
            .click(function(){
                // console.log(this)
                let toggle = this.data('toggle')
                let iconIst = $this.connElems['icon']
                if(toggle != 'H'){
                    this.data('toggle', 'H')
                    if(iconIst){
                        iconIst.attr('src', config.aDownSrc)
                    }
                    $this.cToggle('H')
                }else{
                    this.data('toggle', 'S')
                    if(iconIst){
                        iconIst.attr('src', config.aUpSrc)
                    }
                    $this.cToggle('S')
                }
            })
        this.connElems['icon'] = paper.image(config.aUpSrc, x+cw*0.7, y+1, 20, 20)
        
        // y += 23
        ch = y
        y += th2
        let prevH = 60  // 预处理高度
        this.config['lnSeledBkg'] = this.config['lnSeledBkg'] || '#CCFF99'
        this.config['lnDefBkg'] = this.config['lnDefBkg'] || '#ffffff'
        let {lnDefBkg} = this.config

        this.connElems['lnCon'] = paper.rect(x, y, cw, prevH/2)
            .attr('fill', lnDefBkg)
            // .attr(conAttr)
        let ly = y + prevH/4*0.7,
            lx = x + 20
        ist = ndMer.make('ln', {
            P1: {x: lx-5, y: ly},
            P2: {x: lx+25, y: ly}
        })
            .creator()
        cBodyNds.ln = ist
        

        // 折线
        y += 20
        this.connElems['lnPolyCon'] = paper.rect(x, y, cw, prevH/2)
            .attr('fill', lnDefBkg)
            // .attr(conAttr)
        ly = y + prevH/4*0.7,
            lx = x + 20
        ist = ndMer.make('lnPoly', {
            P1: {x: lx-5, y: ly},            
            P2: {x: lx+20, y: ly + 4},
            h: 4
        })
            .creator()
        cBodyNds.lnPoly = ist

        this.cBodyNds = cBodyNds
        ch = y - ch
        this.connElems['lnCon'].attr('height', ch/2)
        this.connElems['lnPolyCon'].attr('height', ch/2)
    }
    /**
     * 连线框占据节点框
     */
    connSizeNode(backMk?: boolean){
        var {title, icon, lnCon, lnPolyCon} = this.connElems,
            {cp, cw, th2, ch, th0, th1, nh} = this.rData,
            {x, y} = cp,
            {ln, lnPoly} = this.cBodyNds

        y += backMk? th0 + th1 + nh: th0 + th1
        title.attr('y', y)
        icon.attr('y', y+1)
        
        y += th2
        let prevH = 60  // 预处理高度
        lnCon.attr('y', y)

        // 直线
        let ly = y + prevH/4*0.7,
            lx = x + 20
        ln.updAttr({
            P1: {x: lx-5, y: ly},
            P2: {x: lx+25, y: ly}
        })

        // 折线
        y += 20
        lnPolyCon.attr('y', y)
        ly = y + prevH/4*0.7,
            lx = x + 20
        lnPoly.updAttr({
            P1: {x: lx-5, y: ly},            
            P2: {x: lx+20, y: ly + 4},
            h: 4
        })
    }

    /**
     * 标题栏显示与隐藏
     * @param {string} type 显示与隐藏， H/S
     * @param {boolean} includeTit 包含标题
     */
    tToggle(type?:string, includeTit?: boolean){
        var tBodyNds = this.tBodyNds,
            nodeElems = this.nodeElems,
            {tBody} = nodeElems
        if('H' != type){
            Util.each(tBodyNds, (k: number, nd: rSu.Node) => {
                nd.show()
            })
            if(includeTit){
                nodeElems.title.show()
                nodeElems.icon.show()
            }
            if(tBody){
                tBody.show()
            }
            this.connSizeNode(true)
        }
        else{
            Util.each(tBodyNds, (k: number, nd: rSu.Node) => {
                nd.hide()
            })
            if(includeTit){
                nodeElems.title.hide()
                nodeElems.icon.hide()
            }
            if(tBody){
                tBody.hide()
            }
            this.connSizeNode()
        }
    }
    /**
     * 标题栏显示与隐藏
     * @param {string} type 显示与隐藏， H/S
     */
    cToggle(type?:string, includeTit?: boolean){
        var cBodyNds = this.cBodyNds,
            connElems = this.connElems,
            {lnCon, lnPolyCon} = connElems
        if('H' != type){
            Util.each(cBodyNds, (k: number, nd: rSu.Node) => {
                nd.show()
            })
            if(includeTit){
                connElems.title.show()
                connElems.icon.show()
            }
            if(lnCon){
                lnCon.show()
            }
            if(lnPolyCon){
                lnPolyCon.show()
            }
        }
        else{
            Util.each(cBodyNds, (k: number, nd: rSu.Node) => {
                nd.hide()
            })
            if(includeTit){
                connElems.title.hide()
                connElems.icon.hide()
            }
            if(lnCon){
                lnCon.hide()
            }
            if(lnPolyCon){
                lnPolyCon.hide()
            }
        }
    }
    /**
     * 显示与隐藏
     * @param {string} type 
     */
    toggle(type?: string){
        this.tToggle(type, true)
        this.cToggle(type, true)
    }
}