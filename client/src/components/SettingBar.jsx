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
                style={{ margin: '0 10px' }}
                onChange={e => {
                    toolState.setLineWidth(e.target.value);
                }
                }
                value={toolState.lineWidth}
                id='line-width'
                type="number"
                defaultValue={toolState.lineWidth}
                min={1}
                max={50}
            />
            <label htmlFor='stroke-color'>Stroke Color</label>
            <input
                style={{ margin: '0 10px' }}
                id="stroke-color"
                value={toolState.strokeStyle}
                defaultValue={toolState.strokeStyle}
                type='color'
                onChange={e => toolState.setStrokeStyle(e.target.value)}
            />
        </div>
    );
});

export default SettingBar;
