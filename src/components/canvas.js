import React, { useState } from 'react';
import {SketchField, Tools} from 'react-sketch';

const Canvas = () => {

    /** state for config of canvas
     * setConfig to change, im assuming will trigger a re-render?
     * need to read more into the docs, but its minimal :(
     */
    const [config, setConfig] = useState({
        color: 'black',
        lineWidth: 3
    });

    const changeColor = (color) => {
        setConfig({
            ...config,
            color
        })
    }

    return (
        <div>
            <SketchField 
                className="canvas"
                width='50vw' 
                height='50vh' 
                tool={Tools.Pencil} 
                lineColor={config.color}
                lineWidth={config.lineWidth}/>
            
            <div onClick={() => {changeColor('red')}}>red</div>
            <div onClick={() => {changeColor('black')}}>black</div>
        </div>
    )
}

export default Canvas;