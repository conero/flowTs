
/**
 * 2018年3月29日 星期四
 * 节点队列
 */
import { Util } from "./util";
import NodeAbstract from "./node/NodeAbstract";
import NodeBegin from "./node/NodeBegin";
import NodeTask from "./node/NodeTask";
import NodeAudit from "./node/NodeAudit";
import NodeSign from "./node/NodeSign";
import NodeCond from "./node/NodeCond";
import NodeSubFlow from "./node/NodeSubFlow";
import NodeParallel from "./node/NodeParallel";
import NodeMerge from "./node/NodeMerge";
import NodeEnd from "./node/NodeEnd";
import NodeLn from "./node/NodeLn";
import NodeLnPoly from "./node/NodeLnPoly";
//export 
export class NodeQue{
    paper: RaphaelPaper
    constructor(paper: RaphaelPaper){
        this.paper = paper
    }
    /**
     * 生成节点
     * @param NodeType 
     * @param nOpt 
     */
    make(NodeType: string, nOpt: rSu.NodeOpt): rSu.Node{
        var name = Util.ucFirst(NodeType),
            paper = this.paper
        var ist: NodeAbstract
        // var ist: any
        switch(name){
            case 'Begin':
                ist = new NodeBegin(paper, nOpt)
                break
            case 'Task':
                ist = new NodeTask(paper, nOpt)
                break
            case 'Audit':
                ist = new NodeAudit(paper, nOpt)
                break
            case 'Sign':
                ist = new NodeSign(paper, nOpt)
                break
            case 'Cond':
                ist = new NodeCond(paper, nOpt)
                break
            case 'SubFlow':
                ist = new NodeSubFlow(paper, nOpt)
                break
            case 'Parallel':
                ist = new NodeParallel(paper, nOpt)
                break
            case 'Merge':
                ist = new NodeMerge(paper, nOpt)
                break
            case 'End':
                ist = new NodeEnd(paper, nOpt)
                break
            case 'Ln':
                ist = new NodeLn(paper, nOpt)
                break
            case 'LnPoly':
                ist = new NodeLnPoly(paper, nOpt)
                break
        }
        return ist
    }
}