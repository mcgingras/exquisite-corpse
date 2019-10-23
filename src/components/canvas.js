import React, { useState } from 'react';
import {SketchField, Tools} from 'react-sketch';

/**
 * Canvas Component
 * 
 * @summary
 * this component is the canvas a user will sketch on.
 * 
 * @Anna 
 * this is good time to explain some gr8 things about react...
 * We know we are going to have many Canvas instances
 * current sketch vs adjacent sketch for neighbor
 * and those will have different logic incorporated to a similar canvas UI
 * 
 * So, rather than copy paste all the UI code for each, we can reuse it and
 * just add different logic depending on which state the user is in
 */
const Canvas = () => {

    /** state for config of canvas
     * --- 
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
            {/* using this library for sketching
                https://github.com/tbolis/react-sketch */}
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