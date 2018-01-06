/**
 * 2018年1月5日 星期五
 * 工作流处理包
 */
import flow from './flow'
import {Util} from './util'

// 内部协助函数(私有)
class H{
    /**
     * 内部函数生成实例
     * @param {*} config 
     */
    static createInstance(config){
        config = 'object' == typeof config? config:{}
        if(!config.dom){
            if(process.env.NODE_ENV !== 'production'){
                console.warn('[Worker] 配置文件无效，缺少 config.dom')
            }
        }
        // 生成 HTML
        if('string' == typeof config.dom){
            config.dom = $(config.dom)
        }
        if(!config.w){
            config.w = parseInt($(window).width() * 1.1)
        }
        if(!config.h){
            config.h = parseInt($(window).height() * 1.1)
        }
        return Raphael(config.dom.get(0), config.w, config.h)
    }
    static onMoveEvt(){}
    static onStartEvt(){}
    static onEndEvt(){}
}

/**
 * 工作流实例类
 */
class Worker{
    /**
     * @param {object} option  工作流配置对象
     * @param {object} config  dom 等相关配置 *
     */
    constructor(config, option){
        // 开发环境检测
        if (process.env.NODE_ENV !== 'production') {
            if(!window.$){
                console.warn('jQuery 依赖为安装，运行库将无法运行')
            }
            if(!window.Raphael){
                console.warn('Raphael 依赖为安装，运行库将无法运行')
            }
        }
        // 工作流实例
        this.Nodes = {}
        this.config = Util.clone(config)
        this.$raphael = H.createInstance(this.config)
        this.$flow = new flow(this.$raphael)        
        this.setOption(option)
        this.draw()
        // console.log(this.config)
    }
    // 绘制工作流图
    draw(){
        if(this.option){            
            var steps = this.option.step
            var config = this.config
            var x = config.x || parseInt(config.w * 0.4)
            var y = config.y || 10
            // console.log(x ,y)
            for(var i=0; i<steps.length; i++){
                var step = steps[i]
                var nd
                // 开始
                if(1 == step.type){      
                    var r = 30
                    y += r
                    nd = this.$flow.endpoint(x, y, r, step.name)
                    nd.c.attr('fill', 'rgb(181, 216, 126)')
                    nd.$step = step
                    this.drag(nd)
                    // console.log(nd)
                }
                // 操作节点
                else if(2 == step.type){                    
                    y += 100
                    var w = 100, h = 50
                    // console.log(x, y, w, h, step.name)
                    nd = this.$flow.operation(x, y, w, h, step.name)
                    nd.$step = step
                    this.drag(nd)
                    nd.c.attr('fill', 'rgb(224, 223, 226)')
                }
                // 判断节点
                else if(3 == step.type){
                    y += 100
                    nd = this.$flow.judge(x, y, w+60, h+10, step.name)
                    nd.c.attr('fill', 'rgb(49, 174, 196)')
                    nd.$step = step
                    this.drag(nd)
                    // y += 80 + 20
                    y += 60
                    
                }
                // 结束
                else if(9 == step.type){
                    var r = 30
                    y += r + 60
                    nd = this.$flow.endpoint(x, y, r, step.name)
                    nd.c.attr('fill', 'rgb(34, 185, 41)')
                    nd.$step = step
                    this.drag(nd)
                }

                if(nd){
                    this.Nodes[step.code] = nd
                    this.line(nd)
                }
            }
        }
    }
    // 移动处理
    drag(nd){
        (function($nd){
            var $c = $nd.c
            var cDragDt = {}
            $c.drag(
                // onmove
                function(dx, dy){
                    dx += cDragDt.x
                    dy += cDragDt.y
                    $nd.move(dx, dy)
                },
                // onstart
                function(){
                    var _x, _y
                    if('circle' == this.type){
                        _x = this.attr('cx')
                        _y = this.attr('cy')
                    }
                    else if('rect' == this.type){
                        _x = this.attr('x')
                        _y = this.attr('y')
                    }
                    else if('path' == this.type){
                        var _path = this.attr('path')
                        var sP1 = _path[0]
                        _x = sP1[1]
                        _y = sP1[2]
                    }
                    cDragDt.x = _x
                    cDragDt.y = _y
                },
                // onend
                function(){}
            )
        })(nd)
    }
    // 连线
    line(nd){
        var step = Util.clone(nd.$step)
        if(step.prev){
            step.prev = step.prev.replace(/\s/g, '')
        }
        if(step.prev){            
            var makerLine = (from, to) => {
                var $lineInstance
                var fromNd = this.getNodeByCode(from)
                var toNd = this.getNodeByCode(to)
                if(fromNd && toNd){
                    $lineInstance = this.$flow.line(fromNd.getStlnP(), toNd.getEnlnP())
                    fromNd.recordLine('from', $lineInstance)
                    // fromNd.recordLine('to', $lineInstance)
                    toNd.recordLine('to', $lineInstance)
                }
            }
            var prev
            if(step.prev.indexOf(',') > -1){
                prev = step.prev.split(',')
            }else{
                prev = [step.prev]
            }
            for(var i=0; i<prev.length; i++){
                makerLine(prev[i], step.code)
            }
        }

    }
    /**
     * 设置配置文件信息
     * @param {*} option 
     */
    setOption(option){
        if('object' == typeof option){
            this.option = Util.clone(option)
        }
    }
    getNodeByCode(code){
        var node = null
        if(this.Nodes[code]){
            return this.Nodes[code]
        }
        return node
    }
}


export default Worker