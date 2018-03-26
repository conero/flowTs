

/**
 * 2018年3月26日 星期一
 * 开始
 */
///<reference path="../../index.d.ts"/>

import NodeAbstract from "./NodeAbstract"
export default class NodeBegin extends NodeAbstract{
    protected _onInit(){
        this.NodeType = 'begin'
    }
    /**
     * 生成器处理事件
     */
    protected _whenCreatorEvt(){
        var opt = this.opt
        this.c = this.paper.ellipse(opt.cx, opt.cy, opt.w/2, opt.h/2)
    }
}