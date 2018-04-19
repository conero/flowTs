
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
import NodeText from "./node/NodeText";
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
        var ist: rSu.Node
        // var ist: any
        switch(name){
            case 'Begin':
                ist = <rSu.Node>new NodeBegin(paper, nOpt)
                break
            case 'Task':
                ist = <rSu.Node>new NodeTask(paper, nOpt)
                break
            case 'Audit':
                ist = <rSu.Node>new NodeAudit(paper, nOpt)
                break
            case 'Sign':
                ist = <rSu.Node>new NodeSign(paper, nOpt)
                break
            case 'Cond':
                ist = <rSu.Node>new NodeCond(paper, nOpt)
                break
            case 'SubFlow':
                ist = <rSu.Node>new NodeSubFlow(paper, nOpt)
                break
            case 'Parallel':
                ist = <rSu.Node>new NodeParallel(paper, nOpt)
                break
            case 'Merge':
                ist = <rSu.Node>new NodeMerge(paper, nOpt)
                break
            case 'End':
                ist = <rSu.Node>new NodeEnd(paper, nOpt)
                break
            case 'Ln':
                ist = <rSu.Node>new NodeLn(paper, nOpt)
                break
            case 'LnPoly':
                ist = <rSu.Node>new NodeLnPoly(paper, nOpt)
                break
            case 'Text':
                ist = <rSu.Node>new NodeText(paper, nOpt)
                break
        }
        return ist
    }
}