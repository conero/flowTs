/**
 * WE-Screen 屏幕移动
 */
export default class WeScreen{
    /**
     * 同步移动
     * @param x
     * @param y
     */
    static syncMoving(x: number, y: number) {
        //console.log(window.event);
        let e = <MouseEvent>window.event;
        let {screenX, screenY} = e;
        //console.log([screenX, screenY], [x, y], [e.clientX, e.clientY]);
        console.log(e);
    }

}