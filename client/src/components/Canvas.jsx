import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

// components
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


// class
import Brush from '../tools/Brush';

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

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        toolState.setTool(new Brush(canvasRef.current));
    });

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            socket.onopen = () => {
                console.log('Connected');
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: 'connection',
                }));
            };
            socket.onmessage = (event) => {
                console.log('event data', event.data);
            };
        }
    }, [canvasState.username]);

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL());
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
