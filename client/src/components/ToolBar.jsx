import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// store
import toolState from '../store/toolState';
import canvasState from '../store/canvasState';

// classes
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';

// styles
import '../styles/toolbar.scss';
import { observer } from 'mobx-react-lite';

const ToolBar = observer(() => {
    const params = useParams();

    console.log('canvas', canvasState.canvas);
    console.log('undoList', canvasState.undoList);
    console.log('redoList', canvasState.redoList);

    const changeColor = e => {
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    };

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = canvasState.sessionId + '.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className='toolbar'>
            <div className='paint-tools'>
                <button
                    className='toolbar__btn brush'
                    onClick={() => toolState.setTool(new Brush(canvasState.canvas, false, canvasState.socket, canvasState.sessionId))}
                />
                <button
                    className='toolbar__btn circle'
                    onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
                />
                <button
                    className='toolbar__btn eraser'
                    onClick={() => toolState.setTool(new Brush(canvasState.canvas, true, canvasState.socket, canvasState.sessionId))}
                />
                <button
                    className='toolbar__btn line'
                    onClick={() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
                />
                <button
                    className='toolbar__btn rect'
                    onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))}
                />
                <input
                    className='color'
                    type='color'
                    onChange={e => changeColor(e)}
                />
            </div>
            <div className='save-painting'>
                <button
                    className='toolbar__btn undo'
                    onClick={() => {
                        canvasState.socket.send(JSON.stringify({
                            method: 'undo',
                            id: params.id,
                            undoList: canvasState.undoList, 
                        }));
                    }
                    }
                />
                <button
                    className='toolbar__btn redo'
                    onClick={async () => {
                        canvasState.socket.send(JSON.stringify({
                            method: 'redo',
                            id: params.id,
                            redoList: canvasState.redoList,
                        }));
                    }
                }
                />
                <button className='toolbar__btn save' onClick={() => download()} />
            </div>
        </div>
    );
});

export default ToolBar;
