import React from 'react';
import { observer } from 'mobx-react-lite';

// store
import toolState from '../store/toolState';

// styles
import '../styles/toolbar.scss';

const SettingBar = observer(() => {

    return (
        <div className='setting-bar'>
            <label htmlFor='line-width'>Line Width</label>
            <input 
                style={{margin: '0 10px'}}
                onChange={e => toolState.setLineWidth(e.target.value)}
                id='line-width' 
                type="number"
                defaultValue={1} 
                min={1} 
                max={50} 
            />
            <label htmlFor='stroke-color'>Stroke Color</label>
            <input
                id="stroke-color"
                type='color' 
                onChange={e => toolState.setStrokeColor(e.target.value)} 
            />
        </div>
    );
});

export default SettingBar;
