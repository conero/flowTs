/**
 * 2018年4月19日 星期四
 * 文本节点
 */

import NodeAbstract from "./NodeAbstract";
export default class NodeText extends NodeAbstract{
    protected _onInit(){
        this.NodeType = 'text'
    }
    protected _whenCreatorEvt(){
        let {opt} = this.opt,
            {cx, cy, text} = opt
        this.c = this.paper.text(cx, cy, text)
    }
    /**
     * 更新属性
     * @param nOpt 
     */
    updAttr(nOpt: rSu.NodeOpt): rSu.Node{
        this._updAttr(nOpt)
        let opt = this.opt
        this.c.attr({
            x: opt.cx,
            y: opt.cy,
            text: opt.text
        })
        return <rSu.Node>this
    }
}