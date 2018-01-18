/**
 * 2018年1月5日 星期五
 * 工作流处理包
 */
import {Flow} from './flow'
import {Util} from './util'
import H from './helper'

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
        this.$index = H.getIndex()
        
        // 工作流实例
        this.config = Util.clone(config)
        this.$raphael = H.createInstance(this.config)
        this.$flow = new Flow(this.$raphael)        
        this.setOption(option)
        this.draw()
        // console.log(this.config)
    }
    /**
     * 代码索引 code <-> Nodes 索引字典
     * @param {*} key 
     * @param {*} value 
     */
    cNodeMap(key, value){
        var CodeNodeMaps = H.src(this.$index, 'CodeNodeMaps')
        if(!CodeNodeMaps){
            CodeNodeMaps = {}
        }
        if(key){
            // 设置值
            if(value){
                CodeNodeMaps[key] = value
                H.src(this.$index, 'CodeNodeMaps', CodeNodeMaps)
                return this
            }else{
                return CodeNodeMaps[key] || false
            }
        }
        return CodeNodeMaps
    }
    // 绘制工作流图
    // 旧版流程布局算法
    draw2(){
        if(this.option){            
            var steps = this.option.step
            // 生成代码索引
            this.codeIndex(steps)
            var config = this.config
            // 起点中心坐标点 (x, y)
            var x = config.x || parseInt(config.w * 0.4)
            var y = config.y || 10
            var cH = config.cH || 50    // 容器高度
            var dH = config.dH || 30    // 间距高度
            // 同级别节点字典
            var sameClsNodeMap = {}
            // 获取通节点指向的 Y 值
            var getSameClsNodeY = (_c) =>{
                var _sameClsNode = this.codeIndex(_c)
                var y = null
                if(_sameClsNode && _sameClsNode.length > 0){
                    Util.each(_sameClsNode, (index, value)=>{
                        if(sameClsNodeMap[value]){
                            y = sameClsNodeMap[value].y
                            return false
                        }
                    })
                }
                return y
            }
            /**
             * 获取同一级别节点差集对比数
             * @param {string} _c 
             */
            var getSameClsDiffCount = (_c) =>{
                var _sameClsNode = this.codeIndex(_c)
                var _count = _sameClsNode.length
                var hasEd = 0
                Util.each(_sameClsNode, (index, value)=>{
                    if(sameClsNodeMap[value]){
                        hasEd += 1
                    }
                })
                return (_count - hasEd)
            }

            // console.log(x ,y)
            for(var i=0; i<steps.length; i++){
                var step = steps[i]
                var code = step.code
                var name = step.name || code
                var nd = this.cNodeMap(code)
                var hasNode = false
                if(nd){
                    hasNode = true
                }
                if(!hasNode){
                    // 开始
                    if(1 == step.type){      
                        y += (dH + cH/2)
                        nd = this.$flow.endpoint(x, y, cH/2, name)
                        nd.c.attr('fill', 'rgb(181, 216, 126)')
                        nd.$step = step
                        this.drag(nd)
                        y += cH/2
                        // console.log(nd)
                    }
                    // 操作节点
                    else if(2 == step.type){     
                        var w = 100
                        var sameClsNode = this.codeIndex(code)
                        var x0 = x
                        // 只有一个父类
                        if(step.prev){
                            if(step.prev.indexOf(',') == -1){
                                var parentNd = this.getNodeByCode(step.prev)
                                if(parentNd && parentNd.c){
                                    // console.log(parentNd)
                                    x0 = this.getStandX(parentNd)
                                }
                            }
                        }
                        // 多个同级节点
                        if(sameClsNode && sameClsNode.length > 1){
                            var diffCtt = getSameClsDiffCount(code)      
                            var dW = 25                  
                            // 中心偏移量算法
                            var smClsD = Math.ceil(sameClsNode.length/2)
                            var x1 = x0 + (dW + w)*(smClsD - diffCtt)
                            var y1 = getSameClsNodeY(code)
                            // console.log(sameClsNode)
                            if(y1){
                                x1 = x0 + (dW + w)*(smClsD - diffCtt)
                            }else{
                                y += dH + cH/2
                            }
                            y1 = y1? y1: y
                            nd = this.$flow.operation(x1, y1, w, cH, name)
                            sameClsNodeMap[code] = {
                                y
                            }
                        }else{                        
                            y += dH + cH/2
                            nd = this.$flow.operation(x0, y, w, cH, name)
                        }         
                        nd.$step = step
                        this.drag(nd)  
                        nd.c.attr('fill', 'rgb(224, 223, 226)')
                        y += cH/2
                    }
                    // 判断节点
                    else if(3 == step.type){
                        y += dH + cH/2
                        nd = this.$flow.judge(x, y, w+60, cH, name)
                        nd.c.attr('fill', 'rgb(49, 174, 196)')
                        nd.$step = step
                        this.drag(nd)
                        // y += 80 + 20
                        y += cH/2
                        
                    }
                    // 结束
                    else if(9 == step.type){
                        y += dH + cH/2
                        nd = this.$flow.endpoint(x, y, cH/2, name)
                        nd.c.attr('fill', 'rgb(34, 185, 41)')
                        nd.$step = step
                        this.drag(nd)
                    }
                }
                

                if(nd){
                    if(!hasNode){
                        this.cNodeMap(code, nd)
                        this.line(nd)
                        this._eventBind(nd)
                    }else{
                        this.line(nd, step)
                    }
                }
            }
        }
    }
    // 自动检测高度，自适应
    checkPaperHight(y){
        var svg = this.config.dom.find('svg')
        var height = svg.height()
        if(height < (y + 50)){
            svg.css({'height': height + 100})
        }
    }
    // 新的布局算法(优化)、20180109
    draw(){
        this.getNodeCls()
        // clsCache
        var cc = H.src(this.$index, '_nodeCls') 

        var option = Util.clone(this.option)
        var beta1 = 0.21        // 分栏系数

        var 
            cH = this.conf('cH', 50),   // 容器高度
            dH = this.conf('dH', 30),   // 间距高度
            cnH = this.conf('h')       // 总容器高度
            , clsCount = cc.clsValue
            , sColumnMk = this.conf('sColumnMk', true)
        if(sColumnMk){
            beta1 = 0.43
        }else{
            beta1 = (cH* (clsCount - 1))+dH*clsCount < cnH? 0.43:beta1
        }        
        var
            X = this.conf('x', parseInt(this.conf('w') * beta1)),
            bX = X,
            Y = this.conf('y', 10),
            bY = Y
            
        var bkgOperCol = this.conf('bkgOperCol', 'rgb(224, 223, 226)'),
            bkgJudgeCol = this.conf('bkgJudgeCol', 'rgb(49, 174, 196)'),            
            currentCode = this.conf('currentCode', false)
            
          
        /**
         * 是否为多级节点
         * @param {string} _c 
         */
        cc.isMuti = (_c) =>{
            var _idx = cc.map[_c]
            var _cls = cc.mapDt[_idx]
            return _cls.length > 1
        }     
        /**
         * 获取多节点的 Y 坐标轴值
         * @param {*} _c 
         */
        cc.getMutiY = (_c, def) =>{
            var _y = 0
            def = def? def: 0
            var _idx = cc.map[_c]
            var _cls = cc.mapDt[_idx]
            if(_cls.length > 1){
                Util.each(_cls, (k, v)=>{
                    var _nd = this.getNodeByCode(v)
                    if(_nd){
                        _y = this.getStandY(_nd)
                        return false
                    }
                })
            }
            _y = _y? _y:def
            return _y
        }
        /**
         * 获取单级多节点统计量
         * @param {string} _c 
         */
        cc.getMutiCtt = (_c) =>{
            var _idx = cc.map[_c]
            var _cls = cc.mapDt[_idx]
            var len = _cls.length
            var hasEd = 0
            if(len > 1){
                Util.each(_cls, (k, v)=>{
                    if(this.getNodeByCode(v)){
                        hasEd += 1
                    }
                })
            }
            return {
                len, hasEd
            }
        }

        // console.log(clsCache)
        // var clsCacheMap = {}
        // 对象遍历            
        Util.each(option.step, (idx, node) => {
            var type = node.type
                , $node
                , code = node.code
                , name = node.name || code
                , x
                , y
            // 单列自动增高                
            if(sColumnMk){
                this.checkPaperHight(bY)
            }
            else if((bY + 2* cH) > cnH){
                bY = Y
                bX += X
            }
            switch(type){
                case 1: //  开始
                    bY += dH
                    $node = this.$flow.endpoint(bX, bY, cH/2, name)
                    $node.c.attr('fill', this.conf('pkgStartCol', 'rgb(181, 216, 126)'))
                    break
                case 2: // 操作
                    x = bX
                    if(!cc.isMuti(code)){
                        bY += 2*dH + cH/2
                    }else{
                        var y = cc.getMutiY(code, null)
                        var cCdt = cc.getMutiCtt(code)
                        if(cCdt.len == 2){
                            if(cCdt.hasEd > 0){
                                x += 50 + cH*1.5
                            }
                        }
                        else if(cCdt.len > 2){
                            var dW = 25                  
                            // 中心偏移量算法
                            var smClsD = Math.ceil(cCdt.len/2)
                            x = x + (dW + cH*2)*(smClsD - (cCdt.len - cCdt.hasEd))
                        }
                        if(!y){
                            bY += cc.getMutiY(code, 2*dH + cH/2)
                        }else{
                            bY = y
                        }
                        // bY += cc.getMutiY(code, 2*dH + cH/2)
                    }     
                    // console.log(x, bY)
                    // bY += 2*dH + cH/2               
                    // $node = this.$flow.operation(bX, bY, 100, cH, name)
                    $node = this.$flow.operation(x, bY, 100, cH, name)
                    $node.c.attr('fill', bkgOperCol)                    
                    break
                case 3: // 判断
                    bY += 2*dH + cH/2
                    $node = this.$flow.judge(bX, bY, 100, cH, name)
                    $node.c.attr('fill', bkgJudgeCol)
                    break
                case 9: // 结束
                    bY += dH*2 + cH/2
                    $node = this.$flow.endpoint(bX, bY, cH/2, name)
                    $node.c.attr('fill', this.conf('bkgEndCol', 'rgb(34, 185, 41)'))
                    break
            }
            // 拖动
            if($node){
                $node.$step = node
                $node.c.data('_code', code) // 保存代码为属性
                this.cNodeMap(code, $node)
                this.line($node)          
                this._eventBind($node)      
                this.drag($node)  
            }            
        })
    }
    // 节点级别
    getNodeCls(){
        var option = Util.clone(this.option)
        var clsValue = 0
        var map = {}
        var mapDt = {}
        Util.each(option.step, (idx, node) => {
            // console.log(node)
            var prev = node.prev,
                code = node.code
            if(prev){
                if(map[prev]){
                    clsValue = map[prev]
                }
            }
            clsValue += 1
            map[code] = clsValue
            if(!mapDt[clsValue]){
                mapDt[clsValue] = [code]
            }else{
                mapDt[clsValue].push(code)
            }
        })
        // 数据缓存
        H.src(this.$index, '_nodeCls', {
            map,
            mapDt,
            clsValue
        })
        // console.log(H.src(this.$index, '_nodeCls'))
    }
    // 移动处理
    drag(nd){
        // 不适用分割号时可能解析语句失败，报错
        var config = this.config;
        (function($nd, conf){
            var $c = $nd.c
            var cDragDt = {}
            $c.drag(
                // onmove
                function(dx, dy){
                    dx += cDragDt.x
                    dy += cDragDt.y
                    $nd.move(dx, dy)
                    // 直线同步移动
                    if(conf.line && conf.line == 'arrow'){
                        $nd.ToSyncArrow(dx, dy)
                    }
                    else{
                        $nd.ToSyncLine(dx, dy)
                    }
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
        })(nd, config)
    }
    /**
     * 连线
     * @param {NodeBase} nd 
     * @param {*} prefStep 
     */
    line(nd, prefStep){
        var step = Util.clone(nd.$step)
        if(step.prev){
            step.prev = step.prev.replace(/\s/g, '')
        }
        if(step.prev){
            var config = this.config   
            var rightAngle = 'undefined' == typeof config.rightAngle? true: config.rightAngle
            var makerLine = (from, to) => {
                var $lineInstance
                var fromNd = this.getNodeByCode(from)
                var toNd = this.getNodeByCode(to)
                // console.log(from, to)
                if(fromNd && toNd){
                    if(config.line && 'arrow' == config.line){
                        var $p1 = fromNd.getStlnP()
                        var $p2 = toNd.getEnlnP()
                        $lineInstance = this.$flow.arrow([$p1.x, $p1.y], [$p2.x, $p2.y], 
                            (config.arrowLen? config.arrowLen: 4))
                        $lineInstance.position = {from: $p1.position, to: $p2.position}
                        $lineInstance.c.attr('fill', 'rgb(14, 10, 10)')
                    }
                    else{
                        var $p1 = fromNd.getStlnP()
                        var $p2 = toNd.getEnlnP()                        
                        if(rightAngle){
                            $lineInstance = this.$flow.rightAngleLine({
                                p1: {x:$p1.x, y:$p1.y},
                                p2: {x:$p2.x, y:$p2.y}
                            })
                        }
                        else{
                            $lineInstance = this.$flow.line([$p1.x, $p1.y], [$p2.x, $p2.y])
                        }
                        $lineInstance.position = {from: $p1.position, to: $p2.position}
                    }
                    fromNd.recordLine('from', $lineInstance)
                    toNd.recordLine('to', $lineInstance)
                }
                var runIdx = this.nodeRunedMk(to)
                if(runIdx && $lineInstance){
                    var bkgRunedCol = this.conf('bkgRunedCol', 'rgb(255, 0, 0)')
                    // 连线
                    $lineInstance.c.attr({
                        'fill': bkgRunedCol,
                        'stroke': bkgRunedCol,
                    })
                    // 目标节点
                    toNd.c.attr({
                        'stroke': bkgRunedCol,
                    })
                    // 不重复填充颜色
                    if(runIdx == 2){
                        // 来源节点
                        fromNd.c.attr({
                            'stroke': bkgRunedCol,
                        })
                    }
                }
            }
            var prev
            prefStep = prefStep? prefStep:step
            if(prefStep.prev.indexOf(',') > -1){
                prev = prefStep.prev.split(',')
            }else{
                prev = [prefStep.prev]
            }
            for(var i=0; i<prev.length; i++){
                makerLine(prev[i], prefStep.code)
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
    /**
     * 根据code获取节点信息
     * @param {string} code 
     */
    getNodeByCode(code){
        var node = null
        var value = this.cNodeMap(code)
        if(value){
            node = value
        }
        return node
    }    
    /**
     * 代码分级算法
     * @param {object} steps 
     */
    codeIndex(steps){
        // 生成分级字典
        if('object' == typeof steps){
            var clsMap = {}
            for(var i=0; i<steps.length; i++){
                var step = steps[i]
                var code = step.code
                // 第一级
                if(!step.prev){
                    clsMap[code] = 1
                }
                else{
                    var prev = step.prev.replace(/\s/g, '').split(',')
                    for(var j=0; j<prev.length; j++){
                        var prevCode = prev[j]
                        var cls = clsMap[prevCode] ? clsMap[prevCode]: 0
                        // console.log(cls)
                        if('object' == typeof cls && cls.length){
                            cls = cls.length == 1? cls[0]: cls
                        }
                        cls += 1
                        if(!clsMap[code]){
                            clsMap[code] = cls
                        }else{
                            if('object' != typeof clsMap[code]){
                                var cls2 = clsMap[code]
                                clsMap[code] = [cls2]
                            }
                            clsMap[code].push(cls)
                            clsMap[code] = Util.ArrayMergeSameValue(clsMap[code])
                        }
                    }
                }
            }
            // console.log(clsMap)
            H.src(this.$index, 'clsMap', clsMap)
        }
        else if(steps){
            var clsMap = H.src(this.$index, 'clsMap')
            if(clsMap){
                var value = clsMap[steps] || null
                var List = [steps]
                for(var k in clsMap){
                    if(value == clsMap[k] && $.inArray(k, List) == -1){
                        List.push(k)
                    }
                }
                return List
            }
            
        }
    }
    /**
     * 节点表单x坐标
     * @param {NodeBase} nd 
     */
    getStandX(nd){
        var x = null
        if(nd && nd.c){
            var $c = nd.c
            switch($c.type){
                case 'circle':
                    x = $c.attr('cx')
                    break
                case 'rect':
                    x = $c.attr('x') + $c.attr('width')/2
                    break
                case 'path':
                    x = nd.opt.cx
                    break
            }
        }
        return x
    }
    /**
     * 节点表单Y坐标
     * @param {NodeBase} nd 
     */
    getStandY(nd){
        var y = null
        if(nd && nd.c){
            var $c = nd.c
            switch($c.type){
                case 'circle':
                    y = $c.attr('cy')
                    break
                case 'rect':
                    y = $c.attr('y') + $c.attr('height')/2
                    break
                case 'path':
                    y = nd.opt.cy
                    break
            }
        }
        return y
    }
    /**
     * 移除全部的边框
     */
    removeBBox(){
        var maps = this.cNodeMap()
        for(var k in maps){
            var node = maps[k]
            if(node.bBox){
                node.bBox.remove()
            }
        }
    }
    /**
     * 事件绑定处理方法
     */
    _eventBind(node){
        var $this = this
        // 点击处理
        node.c.click(function(){
            $this.removeBBox()
            if(node.bBox){
                node.bBox.remove()
            }
            var bt = this.getBBox()
            var dt = 5
            node.bBox = node.instance.rect(bt.x-dt, bt.y-dt, bt.width+dt*2, bt.height+dt*2)
            node.bBox.attr({
                'stroke': $this.conf('bkgNodeBox', 'rgb(15, 13, 105)')
            })
        })
    }
    /**
     * 配置键获取
     * @param {string} key 
     * @param {*} def 
     */
    conf(key, def){
        def = def || null
        if('undefined' != typeof this.config[key]){
            def = this.config[key]
        }
        return def
    }
    /**
     * 是否为已经执行的节点
     * @param {string} code 
     * @returns {bool}
     */
    nodeRunedMk(code){
        var currentCode = this.conf('currentCode', false)
        if(currentCode){
            var cc = H.src(this.$index, '_nodeCls') 
            var refIdx = cc.map[currentCode]
            var idx = cc.map[code]
            // console.log(refIdx, idx, code, idx <= refIdx)
            currentCode = (idx <= refIdx)? idx:false
        }
        return currentCode
    }
}


export default Worker