import {makeAutoObservable} from 'mobx';

class ToolState {
    tool = null
    lineWidth = 1
    strokeStyle = '#000000';
    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool) {
        this.tool = tool;
    }

    setFillColor(color) {
        this.tool.fillColor = color;
    }

    setStrokeStyle(strokeStyle) {
        this.strokeStyle = strokeStyle;
        this.tool.strokeColor = strokeStyle;
        console.log('set stroke color', strokeStyle);
    }
    
    setLineWidth(lineWidth) {
        this.lineWidth = lineWidth;
        this.tool.lineWidth = lineWidth;
    }
}

export default new ToolState();
