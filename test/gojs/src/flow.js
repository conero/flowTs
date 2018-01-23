/**
 * 2018年1月22日 星期一
 * gojs 转换器
 */

 import go from 'gojs'

 var g = go.GraphObject.make

 class Flow{
     constructor(config){
        config = 'object' === typeof config? config:{}
        this.data = {}
        var setData = false
        if(config.data){
            this.data = config.data
            delete config.data
            setData = true
        }

        if(config.id){
            this.diagram = g(
                go.Diagram, config.id,
                {
                    initialContentAlignment: go.Spot.Center, // center Diagram contents
                    "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
                }
            )
        }else{
            this.diagram = false
        }
        this.config = config
        if(setData == true){
            this.draw()
        }
     }
     /**
      * @param {object} data 
      */
     setData(data){
         this.data = data
         return this
     }
     /**
      * 画图
      */
     draw(){
        var data = this.data 
        var steps = data.step
        var Model = g(go.Model)
        Model.nodeDataArray = []
        for(var i=0; i<steps.length; i++){
            var step = steps[i]
            Model.nodeDataArray.push({
                key: step.code
            })
        }
        console.log(Model.nodeDataArray)
        this.diagram.model = Model
     }
 }

 console.log(go)

 export {Flow}