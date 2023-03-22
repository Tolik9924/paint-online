import React from 'react';

// components
import Canvas from './components/Canvas';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';

// styles
import './styles/app.scss';

const App = () => {
  return (
    <div className="App">
      <ToolBar />
      <SettingBar />
      <Canvas />
    </div>
  );
}

export default App;
