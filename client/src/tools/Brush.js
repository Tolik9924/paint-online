import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas, cleaning) {
        super(canvas);
        this.cleaning = cleaning;
        this.listen();
    }

    listen () {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.ctx.strokeStyle = "#000";
    }
    mouseDownHandler(e) {
        this.mouseDown = true;
        if (this.cleaning) {
            this.ctx.strokeStyle = "#fff";
        }
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }

    draw(x, y) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        console.log('draw brush');
    }
}
