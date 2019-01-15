// #set-n1
(function(){
    // 画图
    class Draw{
        /**
         * @param {RaphaelPaper} p
         */
        constructor(p){
            this.paper = p;
            this.border = null;
        }
        // 开始
        start(x, y, rx, ry, text){
            let p = this.paper;
            let cc = p.set();
            let c = p.ellipse(x, y, rx, ry);
            cc.push(
                c,
                p.text(x, y, text)
            );
            this._bindEvt(cc);
            return cc;
        }
        task(x, y, rx, ry, text){
            let p = this.paper;
            let cc = p.set();
            let c = p.rect(x, y, rx, ry);
            cc.push(
                c,
                p.text(x+30, y+8, text)
            );
            this._bindEvt(cc);
            return cc;
        }
        /**
         * @param cc
         * @private
         */
        _bindEvt(cc){
            let $this = this;
            cc.attr("class", "wf-gnode");
            console.log(cc);
            // 拖动
            let tp = {x: 0, y: 0};
            cc.drag(
                function (dx, dy, x, y) {   // onmove
                    // console.log('onmove: ', dx, dy, x, y);
                    let nTp = {x: tp.x+dx, y: tp.y + dy};

                    // 位置变换
                    cc[0].attr({cx: nTp.x, cy: nTp.y});
                    cc[1].attr({x: nTp.x, y: nTp.y});
                    $this._borderSync(cc);
                },
                function (x, y, e) {       // onstart
                    // console.log('onstart: ', x, y, e);
                    tp.x = e.offsetX;
                    tp.y = e.offsetY;
                },
                function (e) {              // onend
                    //console.log('onend: ', e);
                    // tp.x = e.screenX;
                    // tp.y = e.screenY;
                }
            );
            // 点击
            cc.click(function (evt) {
               //console.log(evt);
                $this._borderSync(cc);
            });
        }
        _borderSync(cc){
            let rs = cc.getBBox();
            if(this.border){
                this.border.remove();
            }
            this.border = this.paper.rect(rs.x, rs.y, rs.width, rs.height);
        }
    }


    var $setN1 = document.getElementById('set-n1');
    var paper = Raphael($setN1, 1000, 300);
    var st = paper.set();
    st.push(
        paper.circle(20, 30, 20),
        paper.text(22, 20, 'J.c\nJoshua Conero')
    );
    st.attr({fill: "blue"}); // changes the fill of both circles
    st[1].attr({fill: "red"}); // changes the fill of both circles
    let $d = new Draw(paper);
    // console.log(st);
    // console.log(st.getBBox());
    // 拖动
    let tp = {x: 0, y: 0};
    st.drag(
        function (dx, dy, x, y) {   // onmove
            // console.log('onmove: ', dx, dy, x, y);
            let nTp = {x: tp.x+dx, y: tp.y + dy};

            // 位置变换
            st[0].attr({cx: nTp.x, cy: nTp.y});
            st[1].attr({x: nTp.x, y: nTp.y});
        },
        function (x, y, e) {       // onstart
            // console.log('onstart: ', x, y, e);
            tp.x = e.offsetX;
            tp.y = e.offsetY;
        },
        function (e) {              // onend
            //console.log('onend: ', e);
            // tp.x = e.screenX;
            // tp.y = e.screenY;
        }
    );


    // console.log($(paper));

    // 下载文档
    $('.set-n1-dl-svg').click(function () {
        // 使用XMLSerializer实例的serializeToString()方法，获取 SVG 元素的代码。
        var svgString = new XMLSerializer()
            .serializeToString($setN1.querySelector('svg'))
        ;
        //console.log(svgString);
        download(svgString, "set-n1-dl-svg.svg", "image/svg-xml");
    });


    // 使用 Draw
    let nd;
    nd = $d.start(50, 60, 20, 8, '开始').attr("fill", "red");
    nd[1].attr('fill', 'blue');

    nd = $d.task(50, 90, 60, 20, '任务').attr("fill", "red");
    nd[1].attr('fill', 'blue');


})();