import React from 'react';
import toolState from '../store/toolState';

// classes
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';

// styles
import '../styles/toolbar.scss';
import canvasState from '../store/canvasState';

const ToolBar = () => {
    return (
        <div className='toolbar'>
            <div className='paint-tools'>
                <button 
                    className='toolbar__btn brush' 
                    onClick={() => toolState.setTool(new Brush(canvasState.canvas))} 
                />
                <button 
                    className='toolbar__btn circle'
                    onClick={() => toolState.setTool(new Circle(canvasState.canvas))} 
                />
                <button 
                    className='toolbar__btn eraser'
                    onClick={() => toolState.setTool(new Brush(canvasState.canvas, true))} 
                />
                <button 
                    className='toolbar__btn line'
                    onClick={() => toolState.setTool(new Line(canvasState.canvas, true))} 
                />
                <button 
                    className='toolbar__btn rect'
                    onClick={() => toolState.setTool(new Rect(canvasState.canvas))}  
                />
                <input className='color' type='color' />
            </div>
            <div className='save-painting'>
                <button className='toolbar__btn undo' />
                <button className='toolbar__btn redo' />
                <button className='toolbar__btn save' />
            </div>
        </div>
    );
};

export default ToolBar;
