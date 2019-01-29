import { NodeQue } from "./NodeQue";
import ObjX from "./ObjX";
import { Util } from "./util";
import { cNode } from "./confNode";


// 工具命令
const ElToolbar = 'el_toolbar'
const CgTleCFill = 'beige'
const CgTleTFill = 'red'

// date:   2019年1月29日 星期二
// author: By Joshua Conero
// 1. 通过，[ToolBar] 父级 div 与 [工作流编辑] div 分离的目的实现对 [ToolBar] 的固定
// 
// 
// 2. [ToolBar] 的设计
// 基本架构图
//     cc: JQuery   工具栏容器
//    
//     |--------------------|
//     |-- ccTle(容器标题) --|
//     |--------------------|
//     |-- ccBox(工具容器) --|
//     |--------------------|



/**
 * 2018年3月29日 星期四
 * 工具栏
 */
export default class ToolBar{
    private paper: RaphaelPaper
    private ndMer: rSu.NodeQue

    option: rSu.bsMap       // 全局参数配置
    config: rSu.bsMap       // 工具栏接口配置 {option: config}
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

    cc: JQuery                      // 所在容器
    ccBox: RaphaelSet
    ccTle: RaphaelSet
    // cc 的属性
    ccAttr: {
        show: {
            w: number,
            h: number
        },
        hide:{
            w: number,
            h: number            
        }
    }

    protected _tools: RaphaelElement[] = []     // 工具栏
    /**
     * @param {rSu.bsMap} opt
     */
    constructor(opt?: rSu.bsMap){
        // cc 参数化默认设置
        this.ccAttr = {
            show: {w:0, h:0},
            hide: {w:0, h:0}
        }
        this.rData = {
            cp: {x: 5, y: 5},
            th0: 23,            // 顶级标题高度
            th1: 23,            // 节点工具
            th2: 23,            // 联系工具
            nh: 0,              // 节点运行高度
            ch: 0,              // 连接节点运行高度
            cw: 75              // 整个容器的宽度
        }
        // this.paper = paper
        // this.ndMer = new NodeQue(this.paper)
        this.option = opt
        this.config = opt.toolBar || {}       
        
        // 工具栏元素处理
        this._createCCElement()
        // 属性初始化
        this.tBodyNds = <any>[]
        this.connElems = {}
        this.cBodyNds = {}
        this.tBodyNds = {}

        this._drawCCNodes()
    }
    
    /**
     * 折线坐标点生成器
     * @param {number} x
     * @param {number} y
     * @param {number} lx
     * @param {number} ly
     * @returns {{P1: {x: number; y: number}; P2: {x: number; y: number}; h: number}}
     * @private
     */
    private _lnPolyConXyCrt(x: number, y: number, lx: number, ly: number){
        let polyAttr = {
            P1: {x: lx-50, y: ly-5},
            P2: {x: lx+2, y: ly + 2},
            h: 4
        }
        return polyAttr
    }

    /**
     * 直线坐标点生成器
     * @param {number} x
     * @param {number} y
     * @param {number} lx
     * @param {number} ly
     * @returns {{P1: {x: number; y: number}; P2: {x: number; y: number}}}
     * @private
     */
    private _lnConXyCrt(x: number, y: number, lx: number, ly: number){
        let lnAttr = {
            P1: {x: lx-50, y: ly},
            P2: {x: lx+2, y: ly}
        }
        return lnAttr
    }
    /**
     * 连线框占据节点框
     * @param {boolean} backMk
     */
    connSizeNode(backMk?: boolean){
        let {title, icon, lnCon, lnPolyCon} = this.connElems,
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
        ln.updAttr(this._lnConXyCrt(x, y, lx, ly))

        // 折线
        y += 20
        lnPolyCon.attr('y', y)
        ly = y + prevH/4*0.7,
            lx = x + 20
        lnPoly.opt.MPs = []
        lnPoly.updAttr(this._lnPolyConXyCrt(x, y, lx, ly))
    }
    /**
     * 工具栏显示
     * @memberof ToolBar
     */
    show(){
        this.cc.show()             
    }

    /**
     * 工具栏隐藏
     * @memberof ToolBar
     */
    hide(){
        this.cc.hide()        
    }

    /**
     * 无配置文件式自动生成
     * @private
     * @memberof ToolBar
     */
    private _withoutElCfgThenCrtEl(){
        let {option} = this;
        if(option.dom && !option[ElToolbar]){
            let $dom = option.dom;
            this.option[ElToolbar] = $dom.before('<div></div>');
            console.log(new Date());
        }
    }

    /**
     * 工具栏元素生成器
     * @memberof ToolBar
     */
    private _createCCElement(){
        let {option} = this
        this._withoutElCfgThenCrtEl()
        if(option[ElToolbar]){
            let el: JQuery = option[ElToolbar];
            if('object' !== typeof el){
                el = $(el)
            }
            el.html('');
            el.css({
                float: 'left',
                position: 'fixed',
                // backgroundColor: 'fuchsia',
                // minHeight: '500px',
                maxHeight: '500px',
                padding: 0,
                // cursor: 'move',
                // paddingTop: 10,
                zIndex: 2
            })
            el.attr({
                draggable: 'true'
            })
            this.paper = Raphael(<any>el.get(0))

            // ******************** 工具栏拖动效果实现/BEGIN ***************************
            let dragPst: rSu.P = {x: 0, y: 0}
            // 拖动开始
            el.on('dragstart', function(e: JQueryEventObject){
                // console.log(e, ':dragstart');
                dragPst.x = e.screenX
                dragPst.y = e.screenY
            })

            // 可以移动事件绑定
            el.on('dragend', function(e: JQueryEventObject){
                // el.css({
                //     left: e.pageX + 'px',
                //     top: e.pageY + 'px'
                // })

                // @todos need to learning more about HTML5 DRAG AND DROP
                // el.css({
                //     left: e.pageX,
                //     top: e.pageY
                // })

                // let scrollCate = document.documentElement
                
                // console.log([scrollCate.scrollLeft, scrollCate.scrollTop]);
                
                // console.log(e);
                
                // el.css({
                //     left: e.pageX + scrollCate.scrollLeft,
                //     top: e.pageY + scrollCate.scrollTop
                // })
                // el.css({
                //     left: e.screenX + scrollCate.scrollLeft,
                //     top: e.screenY + scrollCate.scrollTop
                // })
                // console.log(dragPst);
                el.css({
                    left: e.screenX,
                    top: e.screenY
                })
                // console.log(e.screenX, e.screenY);
                
            })
            
            // ******************** 工具栏拖动效果实现/END ***************************
            // 容器
            this.cc = el
        }
        this.ndMer = new NodeQue(this.paper)        
    }    
    /**
     * 工具栏生成算法
     * @memberof ToolBar
     */
    private _drawCCNodes(){
        let $this = this;
        let p = this.paper
        // 工具栏控件
        let tBar = p.set()
        let w = 80, x = 2, y = 2, h = 30;
        let bsAttr = {x, y, w, h}
        
        // 标题
        let tle = p.set()
        tle.push(
            p.rect(x, y, w, h, 5),
            p.text(x+35, y+18, '工具栏')
        )
        tle.attr({
            fill: CgTleCFill,
            class: '-we-tool-bar-tle'
        })
        tle[1].attr("fill", CgTleTFill)        
        
        // 容器
        y += h
        let box = p.rect(x, y, w, h, 2)
        box.attr('fill', 'azure')
        let boxs = p.set()
        boxs.push(box)
        
        // 可选部件
        let config = this.config
        let menuSeting: any = config.menu || false          // 菜单设置性
        if(!menuSeting){        // 默认菜单项
            menuSeting = [
                'begin', 'task', 'sign', 'cond', 
                'subFlow', 'parallel', 'merge', 'end',
                'text'
            ]
            ;
        }

        // --------------------------------- [节点/begin] -----------------------------
        // 内用填充
        let ist: rSu.Node,
            ndMer = this.ndMer,
            tBodyNds = this.tBodyNds
        
        x += w/2

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
            
            // box 高度自适应
            if(parseInt(box.attr("height")) < y){
                box.attr("height", y)
            }
            
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
            if(ist.sets){
                ist.sets.attr('calss', '-we-tb-tle-node')
            }else{
                ist.c.attr('class', '-we-tb-tle-node')
                if(ist.label){
                    ist.label.attr('class', '-we-tb-tle-node')
                }
            }

            // 特殊节点处理
            if('text' == mk){
                ist.c.attr({
                    'font-size': 15,
                    'stroke': 'none'
                })
            }
            tBodyNds[<string>mk] = ist
            boxs.push(ist)
        })
        this.tBodyNds = tBodyNds;
        // --------------------------------- [节点/end] -----------------------------

        // 连接线
        // --------------------------------- [连线/begin] -----------------------------
        // y += 23
        let ch = h,
            th2 = 20
        let cBodyNds = this.cBodyNds
        ch = y
        y += th2
        let prevH = 60  // 预处理高度
        this.config['lnSeledBkg'] = this.config['lnSeledBkg'] || '#CCFF99'
        this.config['lnDefBkg'] = this.config['lnDefBkg'] || '#ffffff'
        let {lnDefBkg} = this.config

        this.connElems['lnCon'] = p.rect(bsAttr.x, y, w, prevH/2)
            .attr('fill', lnDefBkg)
            // .attr(conAttr)
        let ly = y + prevH/4*0.7,
            lx = x + 20
        ist = ndMer.make('ln', this._lnConXyCrt(bsAttr.x, y, lx, ly))
            .creator()
        cBodyNds.ln = ist
        boxs.push(this.connElems['lnCon'])

        // 折线
        y += 20
        this.connElems['lnPolyCon'] = p.rect(bsAttr.x, y, w, prevH/2)
            .attr('fill', lnDefBkg)
            // .attr(conAttr)
        ly = y + prevH/4*0.7,
            lx = x + 20
        ist = ndMer.make('lnPoly', this._lnPolyConXyCrt(bsAttr.x, y, lx, ly))
            .creator()
        cBodyNds.lnPoly = ist
        boxs.push(this.connElems['lnPolyCon'])

        this.cBodyNds = cBodyNds
        ch = y - ch
        this.connElems['lnCon'].attr('height', ch/2)
        this.connElems['lnPolyCon'].attr('height', ch/2)

        // --------------------------------- [连线/end] -----------------------------
        this.ccBox = boxs
        this.ccTle = tle
        tBar.push(
            tle,
            box
        )
        
        // 记录显示的尺寸
        this.ccAttr.show = {w:w+10, h: y+30} 

        // ------------------------------- [事件绑定/begin] ---------------------
        tle.click(function(evt: MouseEvent){
            $this.toggleTools()            
        })
        // ------------------------------- [事件绑定/end] ---------------------

        // 添加样式
        $('text.-we-tool-bar-tle').css({
            'font-size': '1.13em'
            , 'position': 'fixed'
            , top: 0
            , right: 0
        })
        $('.-we-tb-tle-node').css({
            'position': 'fixed'
        })
        // $('.-we-tool-bar-tle').css({
        //     'cursor': 'move'
        // })
        // $('.-we-tb-tle-node').css({
        //     'cursor': 'move'
        // })
        
        let $cc = this.cc;
        $cc.css({
            'width': bsAttr.w
        })        
        // 显示，并自动适应svg视图的宽度   
        this.toggleTools('show') 
    }
    /**
     * 工具集显示和隐藏
     * @param {string} [tp]
     * @memberof ToolBar
     */
    toggleTools(tp?: string){
        let tle = this.ccTle
        let dk = '_inner_toggle', 
            dc = tle[0],
            dv = tle[0].data(dk)
        let boxs = this.ccBox  
        
        // 类型强制
        if(tp){
            dv = (tp === 'show')? 'hide':'show'            
        }

        if('hide' === dv){
            boxs.show()
            dc.data(dk, 'show')
                            
            tle[0].attr({
                r: 5,
                fill: CgTleCFill
            })
            tle[1].attr({
                fill: CgTleTFill
            })

            // 尺寸变化
            if(this.ccAttr.show.w > 0){
                this.paper.setSize(this.ccAttr.show.w, this.ccAttr.show.h)
                this.cc.css({
                    width: this.ccAttr.show.w,
                    height: this.ccAttr.show.h
                })
            }
            // $this.paper.setSize($this.ccAttr.show.w, $this.ccAttr.show.h)
        }else{
            boxs.hide()
            dc.data(dk, 'hide')
            tle[0].attr({
                r: 20,
                fill: 'lime'
            })
            tle[1].attr({
                fill: 'CadetBlue'
            })
            // console.log($this.ccAttr.hide);
            if(this.ccAttr.hide.w == 0){
                this.ccAttr.hide = {w: tle[0].attr('width'), h:tle[0].attr('height')}
            }             
            // 尺寸变化
            if(this.ccAttr.hide.w > 0){
                this.paper.setSize(this.ccAttr.hide.w+5, this.ccAttr.hide.h+5)
                this.cc.css({
                    width: this.ccAttr.hide.w+5,
                    height: this.ccAttr.hide.h+5
                })
            }            
        }
        this.onClick(this, dv)
    }

    /**
     * 点击事件绑定
     * @memberof ToolBar
     */
    onClick(tb: rSu.ToolBar, type?: string){}
}