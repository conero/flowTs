// #set-n1
(function(){
    var paper = Raphael(document.getElementById('set-n1'), 1000, 300);
    var st = paper.set();
    st.push(
        paper.circle(20, 30, 20),
        paper.text(22, 20, 'J.c\nJoshua Conero')
    );
    st.attr({fill: "blue"}); // changes the fill of both circles
    st[1].attr({fill: "red"}); // changes the fill of both circles
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
    console.log($(paper));
})();