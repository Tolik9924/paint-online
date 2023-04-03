import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


// class
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';

// store
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';

// styles
import '../styles/canvas.scss';


const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();
    const [modal, setModal] = useState(true);
    const params = useParams();

    console.log('toolState tool', toolState.tool);

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        let ctx = canvasRef.current.getContext('2d');
        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(response => {
                const img = new Image();
                img.src = response.data;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                };
            });
    }, [params.id]);

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id);
            toolState.setTool(new Brush(canvasRef.current, false, socket, params.id));
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: 'connection',
                }));
            };
            socket.onmessage = async (event) => {
                let msg = await JSON.parse(event.data);
                switch (msg.method) {
                    case 'connection':
                        console.log(`user ${msg.username} connected`);
                        break;
                    case 'draw':
                        drawHandler(msg);
                        break;
                    case 'undo':
                        canvasState.setUndoList(msg.undoList);
                        canvasState.undo();
                        break;
                    case 'redo':
                        canvasState.setRedoList(msg.redoList);
                        canvasState.redo();
                        break;
                    default:
                        console.log('Does not work method.');
                        break;
                }
            };
        }
    }, [canvasState.username]);

    const drawHandler = (msg) => {
        const figure = msg.figure;
        const ctx = canvasRef.current.getContext('2d');
        switch (figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x , figure.y, figure.color, figure.width);
                break;
            case 'rect':
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
                break;
            case 'circle':
                Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.color, figure.width);
                break;
            case 'erase':
                Brush.draw(ctx, figure.x , figure.y, '#fff');
                break;
            case 'line':
                Line.staticDraw(ctx, figure.startX, figure.startY, figure.endX, figure.endY, figure.color);
                break;
            case 'finish':
                ctx.beginPath();
                break;
            default:
                console.log('Does not work tool item.');
        }
    };

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
            .then(response => console.log(response.data));
    };

    const connectHandler = () => {
        canvasState.setUsername(usernameRef.current.value);
        setModal(false);
    };

    return (
        <div className='canvas'>
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header closeButton>
                    <Modal.Title>Input your name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type='text' ref={usernameRef} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectHandler()}>
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                onMouseDown={() => mouseDownHandler()}
            />
        </div>
    );
});

export default Canvas;
