import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

// store
import toolState from '../store/toolState';

// styles
import '../styles/toolbar.scss';

const SettingBar = observer(() => {

    const [lineWidth, setLineWidth] = useState(0);

    useEffect(() => {
        if (lineWidth > 0) {
            toolState.setLineWidth(lineWidth);
        }
        if (lineWidth !== toolState.lineWidth) {
            toolState.setLineWidth(lineWidth);
        }
    }, [lineWidth]);

    console.log('lineWidth', lineWidth);

    return (
        <div className='setting-bar'>
            <label htmlFor='line-width'>Line Width</label>
            <input 
                style={{margin: '0 10px'}}
                onChange={e => {
                    setLineWidth(e.target.value);
                    toolState.setLineWidth(lineWidth); 
                }
            }
                value={lineWidth}
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
