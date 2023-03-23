import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// components
import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';

// styles
import './styles/app.scss';

const App = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/:id' element={
                        <div className="App">
                            <ToolBar />
                            <SettingBar />
                            <Canvas />
                        </div>
                    } />
                </Routes>
        </BrowserRouter >
    );
}

export default App;
