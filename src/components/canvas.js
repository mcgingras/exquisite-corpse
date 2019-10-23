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

    return (
        <SketchField 
            className="canvas"
            width='800px' 
            height='600px' 
            tool={Tools.Pencil} 
            lineColor={config.color}
            lineWidth={config.lineWidth}/>
    )
}

export default Canvas;